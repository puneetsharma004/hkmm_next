import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

export const metadata = {
    title: "Govardhan Dham Store — Books, Malas & Spiritual Items",
    description: "Buy authentic spiritual items — Bhagavad Gita, Tulsi malas, Tilak, Deity items and more from Govardhan Dham, Jodhpur.",
};

export default function StoreLayout({ children }) {
    return (
        <CartProvider>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
            {children}
        </CartProvider>
    );
}