"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { FaShoppingCart, FaArrowLeft, FaLeaf, FaStar, FaRegStar, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const rupees = (paise) => `₹${(paise / 100).toFixed(0)}`;

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(s =>
                s <= rating
                    ? <FaStar key={s} className="text-amber-400 text-sm" />
                    : <FaRegStar key={s} className="text-gray-300 text-sm" />
            )}
        </div>
    );
}

export default function ProductDetailPage() {
    const { slug } = useParams();
    const router   = useRouter();
    const { addItem, items } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);

    const inCart = product ? items.some(i => i.id === product.id) : false;
    const cartItem = product ? items.find(i => i.id === product.id) : null;

    useEffect(() => {
        fetch(`/api/store/products?slug=${slug}`)
            .then(r => r.json())
            .then(d => {
                if (d.product) setProduct(d.product);
                else router.push("/store");
            })
            .catch(() => router.push("/store"))
            .finally(() => setLoading(false));
    }, [slug]);

    const handleAdd = () => {
        for (let i = 0; i < qty; i++) {
            addItem({
                id:    product.id,
                slug:  product.slug,
                title: product.title,
                price: product.price,
                image: product.images?.[0] || null,
            });
        }
        toast.success("Added to cart!", { icon: "🛒" });
    };

    const handleBuyNow = () => {
        handleAdd();
        router.push("/store/checkout");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) return null;

    const discount = product.compare_price
        ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
        : 0;

    const avgRating = product.reviews?.length
        ? (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1)
        : null;

    return (
        <>
            <Toaster position="top-center" />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">

                {/* Breadcrumb */}
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <Link href="/store" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                        <FaArrowLeft className="text-xs" />
                        Back to Store
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto px-4 pb-20">
                    <div className="grid md:grid-cols-2 gap-10">

                        {/* ── Images ───────────────────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative h-80 md:h-[420px] bg-white/70 rounded-2xl border border-primary/15 overflow-hidden shadow-md">
                                {product.images?.[activeImg] ? (
                                    <Image
                                        src={product.images[activeImg]}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FaLeaf className="text-8xl text-primary/20" />
                                    </div>
                                )}
                                {discount > 0 && (
                                    <span className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                                        {discount}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.images?.length > 1 && (
                                <div className="flex gap-2 mt-3">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveImg(i)}
                                            className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all outline-none cursor-pointer
                                                ${i === activeImg ? "border-primary" : "border-transparent opacity-60"}`}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* ── Details ──────────────────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex flex-col"
                        >
                            {product.category && (
                                <Link href={`/store?category=${product.category.slug}`} className="text-xs text-primary/70 font-semibold uppercase tracking-wide hover:text-primary">
                                    {product.category.name}
                                </Link>
                            )}
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3 leading-snug">
                                {product.title}
                            </h1>

                            {/* Rating */}
                            {avgRating && (
                                <div className="flex items-center gap-2 mb-3">
                                    <StarRating rating={Math.round(avgRating)} />
                                    <span className="text-sm text-gray-500">{avgRating} ({product.reviews.length} reviews)</span>
                                </div>
                            )}

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-3xl font-bold text-primary">{rupees(product.price)}</span>
                                {product.compare_price && (
                                    <span className="text-lg text-gray-400 line-through">{rupees(product.compare_price)}</span>
                                )}
                                {discount > 0 && (
                                    <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                                        Save {rupees(product.compare_price - product.price)}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-5">{product.description || product.short_desc}</p>

                            {/* Stock indicator */}
                            {product.stock > 0 && product.stock <= 10 && (
                                <p className="text-amber-600 text-sm font-medium mb-4">
                                    ⚡ Only {product.stock} left in stock
                                </p>
                            )}
                            {product.stock === 0 && (
                                <p className="text-red-500 text-sm font-medium mb-4">Out of stock</p>
                            )}

                            {/* Qty + Add to cart */}
                            {product.stock > 0 && (
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center border border-primary/30 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setQty(q => Math.max(1, q - 1))}
                                            className="px-3 py-2 text-primary hover:bg-primary/10 transition-colors outline-none cursor-pointer font-bold"
                                        >−</button>
                                        <span className="px-4 py-2 font-semibold text-gray-800 min-w-[40px] text-center">{qty}</span>
                                        <button
                                            onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                                            className="px-3 py-2 text-primary hover:bg-primary/10 transition-colors outline-none cursor-pointer font-bold"
                                        >+</button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={handleAdd}
                                    disabled={product.stock === 0}
                                    className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed outline-none cursor-pointer"
                                >
                                    <FaShoppingCart />
                                    {inCart ? `In Cart (${cartItem?.quantity})` : "Add to Cart"}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="flex-1 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed outline-none cursor-pointer"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Shipping note */}
                            <div className="mt-5 space-y-2">
                                {[
                                    { icon: <IoShieldCheckmarkSharp />, text: "Secure payment via Razorpay" },
                                    { icon: <FaCheckCircle />, text: "Free shipping on orders above ₹500" },
                                    { icon: <FaCheckCircle />, text: "Dispatched within 2–3 business days" },
                                ].map(item => (
                                    <div key={item.text} className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="text-primary">{item.icon}</span>
                                        {item.text}
                                    </div>
                                ))}
                            </div>

                            {/* WhatsApp enquiry */}
                            <a
                                href={`https://wa.me/919116139371?text=Hare Krishna! I have a query about: ${product.title}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                                <FaWhatsapp className="text-base" />
                                Have a question? WhatsApp us
                            </a>
                        </motion.div>
                    </div>

                    {/* ── Reviews section ───────────────────────────────── */}
                    {product.reviews?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-16"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                Customer Reviews ({product.reviews.length})
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {product.reviews.map((review, i) => (
                                    <div key={i} className="bg-white/70 border border-primary/15 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-800">{review.buyer_name}</span>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                                        {review.verified && (
                                            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                                                <FaCheckCircle className="text-xs" /> Verified purchase
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}