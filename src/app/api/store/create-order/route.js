import Razorpay from "razorpay";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return Response.json({ error: "Cart is empty" }, { status: 400 });
        }

        // ── Re-validate prices from DB (never trust client prices) ───────
        const ids = items.map(i => i.id);
        const { data: dbProducts, error } = await supabase
            .from("store_products")
            .select("id, price, stock, title")
            .in("id", ids)
            .eq("is_active", true);

        if (error || !dbProducts) {
            return Response.json({ error: "Could not validate products" }, { status: 500 });
        }

        // Check stock and calculate server-side total
        let totalPaise = 0;
        const validatedItems = [];

        for (const cartItem of items) {
            const dbProduct = dbProducts.find(p => p.id === cartItem.id);
            if (!dbProduct) {
                return Response.json({ error: `Product not found: ${cartItem.title}` }, { status: 400 });
            }
            if (dbProduct.stock < cartItem.quantity) {
                return Response.json({
                    error: `Only ${dbProduct.stock} left in stock for "${dbProduct.title}"`
                }, { status: 400 });
            }
            totalPaise += dbProduct.price * cartItem.quantity;
            validatedItems.push({ ...cartItem, price: dbProduct.price });
        }

        // Add flat shipping ₹60 if total < ₹500
        const shippingPaise = totalPaise < 50000 ? 6000 : 0;
        const grandTotalPaise = totalPaise + shippingPaise;

        // ── Create Razorpay order ─────────────────────────────────────────
        const razorpay = new Razorpay({
            key_id:     process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount:   grandTotalPaise,
            currency: "INR",
            receipt:  `store_${Date.now()}`,
            notes: {
                source: "govardhan_store",
                items_count: items.length,
            },
        });

        return Response.json({
            ...order,
            subtotal: totalPaise,
            shipping: shippingPaise,
            total:    grandTotalPaise,
            validatedItems,
        });

    } catch (err) {
        console.error("Store create-order crash:", err);
        return Response.json({ error: "Order creation failed. Please try again." }, { status: 500 });
    }
}