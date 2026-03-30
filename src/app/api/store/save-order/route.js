// HMAC verify (already have pattern)

import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            // Order meta (passed from client after payment)
            buyerName,
            buyerEmail,
            buyerPhone,
            shippingAddress,
            items,
            subtotal,
            shipping,
            total,
        } = body;

        // ── 1. Verify HMAC signature ──────────────────────────────────────
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return Response.json({ success: false, error: "Payment verification failed." }, { status: 400 });
        }

        // ── 2. Check for duplicate (idempotency) ──────────────────────────
        const { data: existing } = await supabase
            .from("store_orders")
            .select("id, order_number")
            .eq("payment_id", razorpay_payment_id)
            .single();

        if (existing) {
            return Response.json({ success: true, orderId: existing.id, orderNumber: existing.order_number });
        }

        // ── 3. Save order to Supabase ─────────────────────────────────────
        const { data: order, error: dbError } = await supabase
            .from("store_orders")
            .insert({
                payment_id:       razorpay_payment_id,
                razorpay_order:   razorpay_order_id,
                items:            items,
                subtotal:         subtotal,
                shipping:         shipping,
                total:            total,
                buyer_name:       buyerName,
                buyer_email:      buyerEmail,
                buyer_phone:      buyerPhone,
                shipping_address: shippingAddress,
                status:           "paid",
            })
            .select()
            .single();

        if (dbError) {
            console.error("Order save error:", dbError);
            return Response.json({ success: false, error: "Order save failed." }, { status: 500 });
        }

        // ── 4. Decrement stock ────────────────────────────────────────────
        for (const item of items) {
            await supabase.rpc("decrement_stock", {
                product_id: item.id,
                qty: item.quantity,
            }).catch(err => console.error("Stock decrement error:", err));
        }

        // ── 5. Send confirmation email ────────────────────────────────────
        const itemsHtml = items
            .map(i => `<tr>
                <td style="padding:6px 0">${i.title}</td>
                <td style="padding:6px 0;text-align:center">×${i.quantity}</td>
                <td style="padding:6px 0;text-align:right">₹${((i.price * i.quantity) / 100).toFixed(0)}</td>
            </tr>`)
            .join("");

        await resend.emails.send({
            from: "Govardhan Dham Store <orders@harekrishnamarwar.org>",
            to:   buyerEmail,
            subject: `Order Confirmed — ${order.order_number} 🙏`,
            html: `
                <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#333">
                    <h2 style="color:#AF1E2E">Hare Krishna, ${buyerName}!</h2>
                    <p>Thank you for your order. Your payment has been received and your items will be shipped within 2–3 business days.</p>
                    <table style="width:100%;border-collapse:collapse;margin:20px 0">
                        <thead>
                            <tr style="border-bottom:2px solid #AF1E2E">
                                <th style="text-align:left;padding:6px 0">Item</th>
                                <th style="text-align:center;padding:6px 0">Qty</th>
                                <th style="text-align:right;padding:6px 0">Amount</th>
                            </tr>
                        </thead>
                        <tbody>${itemsHtml}</tbody>
                        <tfoot>
                            <tr style="border-top:1px solid #eee">
                                <td colspan="2" style="padding:6px 0">Subtotal</td>
                                <td style="text-align:right;padding:6px 0">₹${(subtotal / 100).toFixed(0)}</td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding:6px 0">Shipping</td>
                                <td style="text-align:right;padding:6px 0">${shipping > 0 ? `₹${(shipping/100).toFixed(0)}` : "Free"}</td>
                            </tr>
                            <tr style="font-weight:bold;border-top:2px solid #AF1E2E">
                                <td colspan="2" style="padding:8px 0">Total</td>
                                <td style="text-align:right;padding:8px 0;color:#AF1E2E">₹${(total / 100).toFixed(0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p><strong>Order ID:</strong> ${order.order_number}</p>
                    <p><strong>Shipping to:</strong><br>${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state} — ${shippingAddress.pincode}</p>
                    <hr style="border:none;border-top:1px solid #eee;margin:20px 0"/>
                    <p style="font-size:13px;color:#888">Questions? Reply to this email or WhatsApp us at +91 91161 39371</p>
                    <p style="color:#AF1E2E;font-weight:bold">Hare Krishna 🙏</p>
                </div>
            `,
        }).catch(err => console.error("Order email error (non-fatal):", err));

        return Response.json({ success: true, orderId: order.id, orderNumber: order.order_number });

    } catch (err) {
        console.error("Save-order route crash:", err);
        return Response.json({ success: false, error: "Something went wrong. Please contact support." }, { status: 500 });
    }
}