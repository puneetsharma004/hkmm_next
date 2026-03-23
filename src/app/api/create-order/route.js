import Razorpay from "razorpay";

export async function POST(req) {
    try {
        const { amount } = await req.json();

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount: amount * 100, // convert ₹ to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return Response.json(order);
    } catch (err) {
        console.error("Razorpay error:", err);
        return Response.json({ error: "Order creation failed" }, { status: 500 });
    }
}