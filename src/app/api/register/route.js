import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const data = await req.json();
        console.log("Register API received:", data);

        const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/event/${data.slug}/verify/${data.paymentId}`;

        // 1. Save to Supabase
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
            console.error("❌ Supabase insert error:", dbError);
            return Response.json(
                { success: false, error: "DB error: " + dbError.message },
                { status: 500 }
            );
        }

        console.log("✅ Supabase insert success");

        // 2. Send WhatsApp
        try {
            await sendWhatsAppMessage(
                data.phone,
                data.name,
                verifyUrl,
                data.eventTitle
            );
            console.log("✅ WhatsApp sent");
        } catch (waErr) {
            // Don't fail the whole request if WhatsApp fails
            console.error("⚠️ WhatsApp error (non-fatal):", waErr);
        }

        return Response.json({ success: true, verifyUrl });

    } catch (err) {
        console.error("❌ Register route crash:", err);
        return Response.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}

async function sendWhatsAppMessage(phone, name, verifyUrl, eventTitle) {
    const formattedPhone = `91${phone}`;

    const message = `🙏 *Hare Krishna, ${name}!*\n\n✅ Your registration for *${eventTitle}* is confirmed!\n\n🎟️ *Your Entry Pass:*\n${verifyUrl}\n\nOpen this link to show your QR code at the venue.\n\nSave this message!\n\n_— FOLK Spirituals Jodhpur_ 🌸`;

    const res = await fetch(
        `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: formattedPhone,
                type: "text",
                text: { body: message },
            }),
        }
    );

    const result = await res.json();
    console.log("WhatsApp API response:", result);

    if (!res.ok) {
        throw new Error(`WhatsApp API failed: ${JSON.stringify(result)}`);
    }
}