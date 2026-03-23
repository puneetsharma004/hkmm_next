import Razorpay from "razorpay";

export async function POST(req) {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
        amount: 50 * 100,
        currency: "INR",
    });

    return Response.json(order);
}