import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { generateToken } from "@/lib/tokens";

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return Response.json({ error: "Email required" }, { status: 400 });
    }

    // check existing
    const { data: existing } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .eq("email", email)
        .single();

    if (existing) {
        if (existing.status === "active") {
            return Response.json({
                message: "You are already subscribed 🙂",
            });
        }

        if (existing.status === "pending") {
            return Response.json({
                message: "Please check your inbox to verify.",
            });
        }

        if (existing.status === "unsubscribed") {
            // revive subscription
            const verifyToken = generateToken();

            await supabase
                .from("newsletter_subscribers")
                .update({
                    status: "pending",
                    verify_token: verifyToken,
                })
                .eq("email", email);

            const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${verifyToken}`;

            await resend.emails.send({
                from: "delivered@resend.dev",
                to: email,
                subject: "Confirm subscription again",
                html: `<a href="${verifyUrl}">Verify</a>`,
            });

            return Response.json({
                message: "Welcome back! Please verify again ✨",
            });
        }
    }


    const verifyToken = generateToken();
    const unsubToken = generateToken();

    const { data, error } = await supabase
        .from("newsletter_subscribers")
        .insert({
            email,
            verify_token: verifyToken,
            unsub_token: unsubToken,
            status: "pending",
        })
        .select();

    console.log("INSERT DATA:", data);
    console.log("INSERT ERROR:", error);

    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }


    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/verify?token=${verifyToken}`;

    await resend.emails.send({
        from: "delivered@resend.dev",
        //replace with email parameter
        to: email,
        subject: "Confirm your subscription",
        html: `
      <h2>Confirm subscription</h2>
      <p>Click below:</p>
      <a href="${verifyUrl}">Verify Email</a>
    `,
    });

    return Response.json({
        message: "Check your email to confirm",
    });
}
