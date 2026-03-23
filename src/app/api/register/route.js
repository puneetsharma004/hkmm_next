import { supabase } from "@/lib/supabase";
import QRCode from "qrcode";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const data = await req.json();
        console.log("Register API received data for:", data.name);

        const { screenshotBase64, amount } = data;

        if (!screenshotBase64) {
            // Friendly message instead of technical "screenshot is required"
            return Response.json({ success: false, error: "Please attach your payment screenshot so we can verify your entry. 🖼️" }, { status: 400 });
        }

        // 1. Prepare image for Gemini
        // Remove the data:image/png;base64, prefix
        const base64String = screenshotBase64.split(",")[1];
        const mimeType = screenshotBase64.substring(screenshotBase64.indexOf(":") + 1, screenshotBase64.indexOf(";"));

        // 2. Ask Gemini to verify the screenshot and extract UTR
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // TWEAKED PROMPT: Instructed Gemini to write a polite, user-friendly reason
        const prompt = `
            Analyze this UPI payment screenshot.
            1. Check if the payment was successful.
            2. Check if the amount paid is exactly ₹${amount} or ${amount}.
            3. Extract the 12-digit UPI Transaction ID (sometimes called UTR or Ref No).
            
            Return ONLY a raw JSON object (no markdown, no backticks) with this exact structure:
            {
                "isValid": true or false,
                "utr": "the 12 digit number or null",
                "reason": "If isValid is false, explain why in a short, polite, user-friendly sentence (e.g., 'We couldn't find a matching amount of ₹${amount}.', 'The payment appears to be failed.', 'We couldn't clearly see the 12-digit UTR number. Please upload a clearer image.')"
            }
        `;

        const imageParts = [{
            inlineData: { data: base64String, mimeType }
        }];

        const result = await model.generateContent([prompt, ...imageParts]);
        const responseText = result.response.text().trim();

        // Parse Gemini's JSON response
        let verification;
        try {
            verification = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, ''));
        } catch (e) {
            console.error("Failed to parse Gemini response:", responseText); // You see this
            // User sees this:
            return Response.json({ success: false, error: "We couldn't read the image properly. Could you please upload a clearer screenshot? 🧐" }, { status: 400 });
        }

        if (!verification.isValid || !verification.utr) {
            // User sees the friendly reason Gemini generated, or a polite fallback
            return Response.json({ success: false, error: verification.reason || "We couldn't verify this payment screenshot. Please try a clearer image." }, { status: 400 });
        }

        const paymentId = verification.utr;
        const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/event/${data.slug}/verify/${paymentId}`;

        // 3. Insert into Supabase (using the extracted UTR as payment_id)
        const { error: dbError } = await supabase
            .from("event_registrations")
            .insert({
                name: data.name,
                phone: data.phone,
                email: data.email,
                college: data.college,
                city: data.city,
                gender: data.gender ?? "Male",
                payment_id: paymentId,
                event_slug: data.slug,
                event_title: data.eventTitle,
                amount: data.amount,
                verify_url: verifyUrl,
            });

        if (dbError) {
            console.error("❌ Supabase error:", dbError); // You see the raw DB error

            // Handle unique constraint if UTR is already used
            if(dbError.code === '23505') {
                return Response.json({ success: false, error: "Looks like this payment screenshot has already been used! 🚫" }, { status: 400 });
            }
            // Friendly fallback for any other database crash
            return Response.json({ success: false, error: "Oops! Our servers are taking a quick break. Please try again in a moment. ⏳" }, { status: 500 });
        }

        // 4. Generate QR & Send WhatsApp Message
        const qrBase64 = await QRCode.toDataURL(verifyUrl, {
            width: 400,
            margin: 2,
            color: { dark: "#AF1E2E", light: "#ffffff" },
        });

        try {
            await sendWhatsAppWithQR(data.phone, data.name, verifyUrl, data.eventTitle, qrBase64);
        } catch (waErr) {
            console.error("⚠️ WhatsApp error (non-fatal):", waErr);
        }

        return Response.json({ success: true, verifyUrl, paymentId });

    } catch (err) {
        console.error("❌ Register route crash:", err); // You see the raw crash log
        // User sees a polite apology instead of "TypeError: Cannot read properties..."
        return Response.json({ success: false, error: "Something went wrong on our end. Please give it another try! 🙏" }, { status: 500 });
    }
}


async function sendWhatsAppWithQR(phone, name, verifyUrl, eventTitle, qrBase64) {
    const cleanPhone = phone.replace(/^0+/, "");
    const formattedPhone = cleanPhone.startsWith("91")
        ? cleanPhone
        : `91${cleanPhone}`;

    console.log("Sending WhatsApp to:", formattedPhone);

    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    // Convert base64 to buffer
    const base64Data = qrBase64.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Step 1 — Upload media
    const formData = new FormData();
    formData.append("file", buffer, {
        filename: "entry-pass.png",
        contentType: "image/png",
    });
    formData.append("type", "image/png");
    formData.append("messaging_product", "whatsapp");

    try {
        const uploadRes = await axios.post(
            url =  `https://graph.facebook.com/v19.0/${phoneNumberId}/media`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...formData.getHeaders(), // IMPORTANT
                },
            }
        );

        console.log("Media upload response:", uploadRes.data);

        const mediaId = uploadRes.data.id;

        // Step 2 — Send message
        const msgRes = await axios.post(
            `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to: formattedPhone,
                type: "image",
                image: {
                    id: mediaId,
                    caption: ` *Hare Krishna, ${name}!*\n\n✅ Registration confirmed for *${eventTitle}*!\n\n📍 Show this QR code at the venue entry gate.\n\n🔗 Or open: ${verifyUrl}\n\n_Save this message! — FOLK Spirituals Jodhpur_ 🌸`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("WhatsApp message response:", msgRes.data);

    } catch (error) {
        console.error("WhatsApp Error:", error.response?.data || error.message);
        throw error;
    }
}