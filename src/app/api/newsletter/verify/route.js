import { supabase } from "@/lib/supabase";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return Response.json({ error: "Invalid token" }, { status: 400 });
    }

    const { data } = await supabase
        .from("newsletter_subscribers")
        .update({
            status: "active",
            verify_token: null,
        })
        .eq("verify_token", token)
        .select()
        .single();

    if (!data) {
        return Response.json({ error: "Invalid or expired" }, { status: 400 });
    }

    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/subscribed`);
}
