import { supabase } from "@/lib/supabase";
import QRCode from "qrcode";
import axios from "axios";

export async function POST(req) {
    try {
        const data = await req.json();
        console.log("Register API received:", data);

        const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/event/${data.slug}/verify/${data.paymentId}`;

        const { error: dbError } = await supabase
            .from("event_registrations")
            .insert({
                name: data.name,
                phone: data.phone,
                email: data.email,
                college: data.college,
                city: data.city,
                gender: data.gender ?? "Male",
                payment_id: data.paymentId,
                event_slug: data.slug,
                event_title: data.eventTitle,
                amount: data.amount,
                verify_url: verifyUrl,
            });

        if (dbError) {
            console.error("❌ Supabase error:", dbError);
            return Response.json({ success: false, error: dbError.message }, { status: 500 });
        }

        console.log("✅ Supabase insert success");

        // Generate QR as base64 PNG
        const qrBase64 = await QRCode.toDataURL(verifyUrl, {
            width: 400,
            margin: 2,
            color: { dark: "#AF1E2E", light: "#ffffff" },
        });

        // Send WhatsApp (non-fatal if fails)
        try {
            await sendWhatsAppWithQR(
                data.phone,
                data.name,
                verifyUrl,
                data.eventTitle,
                qrBase64
            );
            console.log("✅ WhatsApp sent");
        } catch (waErr) {
            console.error("⚠️ WhatsApp error (non-fatal):", waErr);
        }

        return Response.json({ success: true, verifyUrl });

    } catch (err) {
        console.error("❌ Register route crash:", err);
        return Response.json({ success: false, error: err.message }, { status: 500 });
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
            `https://graph.facebook.com/v19.0/${phoneNumberId}/media`,
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