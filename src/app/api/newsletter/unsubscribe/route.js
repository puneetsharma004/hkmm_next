import { supabase } from "@/lib/supabase";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    await supabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed" })
        .eq("unsub_token", token);

    return Response.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/unsubscribed`);
}
