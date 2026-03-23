import crypto from "crypto";

export async function POST(req) {
    const body = await req.json();

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
        .digest("hex");

    if (generatedSignature === body.razorpay_signature) {
        return Response.json({ success: true });
    } else {
        return Response.json({ success: false }, { status: 400 });
    }
}