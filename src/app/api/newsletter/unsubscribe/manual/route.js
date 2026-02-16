import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return Response.json({ success: false, message: "Email required" });
        }

        const cleanEmail = email.toLowerCase().trim();

        // find subscriber
        const { data, error } = await supabase
            .from("newsletter_subscribers")
            .select("id, status")
            .eq("email", cleanEmail)
            .maybeSingle();

        if (error) {
            console.log("DB ERROR:", error);
            return Response.json({ success: false, message: "Database error" });
        }

        if (!data) {
            return Response.json({
                success: false,
                message: "This email is not subscribed with us.",
            });
        }

        if (data.status === "unsubscribed") {
            return Response.json({
                success: false,
                message: "This email is already unsubscribed.",
            });
        }

        // update status
        await supabase
            .from("newsletter_subscribers")
            .update({ status: "unsubscribed" })
            .eq("id", data.id);

        return Response.json({ success: true });
    } catch (err) {
        console.log("SERVER ERROR:", err);
        return Response.json({ success: false, message: "Server failure" });
    }
}
