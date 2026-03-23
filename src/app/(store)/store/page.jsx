// product listing

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaSearch, FaStar, FaLeaf } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

// ── Rupee formatter ───────────────────────────────────────────────────────────
const rupees = (paise) => `₹${(paise / 100).toFixed(0)}`;

// ── Product card ──────────────────────────────────────────────────────────────
function ProductCard({ product }) {
    const { addItem, items } = useCart();
    const inCart = items.some(i => i.id === product.id);
    const discount = product.compare_price
        ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
        : 0;

    const handleAdd = () => {
        addItem({
            id:    product.id,
            slug:  product.slug,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || null,
        });
        toast.success(`${product.title.slice(0, 30)}... added!`, { icon: "🛒" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group bg-white/70 backdrop-blur-sm border border-primary/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
        >
            {/* Image */}
            <Link href={`/store/${product.slug}`}>
                <div className="relative h-52 bg-orange-50 overflow-hidden">
                    {product.images?.[0] ? (
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <FaLeaf className="text-5xl text-primary/30" />
                        </div>
                    )}
                    {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Only {product.stock} left
                        </span>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white font-bold">Out of Stock</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div className="p-4">
                {product.category && (
                    <span className="text-xs text-primary/70 font-medium uppercase tracking-wide">
                        {product.category.name}
                    </span>
                )}
                <Link href={`/store/${product.slug}`}>
                    <h3 className="font-semibold text-gray-800 mt-1 mb-2 leading-snug line-clamp-2 hover:text-primary transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.short_desc}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">{rupees(product.price)}</span>
                        {product.compare_price && (
                            <span className="text-sm text-gray-400 line-through">{rupees(product.compare_price)}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={product.stock === 0}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 outline-none cursor-pointer
                            ${inCart
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : product.stock === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-primary/30"
                        }`}
                    >
                        <FaShoppingCart className="text-xs" />
                        {inCart ? "Added" : "Add"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

// ── Cart badge (floating) ─────────────────────────────────────────────────────
function CartBadge() {
    const { totalItems, totalPrice } = useCart();
    if (totalItems === 0) return null;
    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-20 right-5 z-40"
        >
            <Link href="/store/checkout">
                <div className="flex items-center gap-3 bg-primary text-white px-4 py-3 rounded-2xl shadow-xl shadow-primary/30 cursor-pointer">
                    <div className="relative">
                        <FaShoppingCart className="text-xl" />
                        <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    </div>
                    <div className="text-sm">
                        <p className="font-bold">{rupees(totalPrice)}</p>
                        <p className="text-xs opacity-80">View cart</p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function StorePage() {
    const [products, setProducts]     = useState([]);
    const [categories, setCategories] = useState([]);
    const [active, setActive]         = useState("all");
    const [search, setSearch]         = useState("");
    const [loading, setLoading]       = useState(true);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (active !== "all") params.set("category", active);
        if (search.trim()) params.set("q", search.trim());

        fetch(`/api/store/products?${params}`)
            .then(r => r.json())
            .then(d => {
                setProducts(d.products || []);
                if (d.categories?.length) setCategories(d.categories);
            })
            .finally(() => setLoading(false));
    }, [active, search]);

    return (
        <>
            <Toaster position="top-center" />
            <CartBadge />

            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">

                {/* ── Hero ───────────────────────────────────────────────── */}
                <section className="relative py-16 px-4 text-center overflow-hidden">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
                    <div className="absolute bottom-0 right-10 w-48 h-48 bg-orange-300/20 rounded-full blur-3xl opacity-40 pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 max-w-2xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                            <IoStorefrontOutline />
                            Govardhan Dham Store
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold gradient-text mb-4 leading-tight">
                            Spiritual Items &<br />Sacred Books
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Tilak, malas, Prabhupada's books & more — directly from our temple
                        </p>

                        {/* Search */}
                        <div className="relative max-w-md mx-auto">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search books, malas, tilak..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary/20 bg-white/80 backdrop-blur text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                            />
                        </div>
                    </motion.div>
                </section>

                {/* ── Category chips ──────────────────────────────────────── */}
                <div className="px-4 pb-4">
                    <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setActive("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all outline-none cursor-pointer
                                ${active === "all"
                                ? "bg-primary text-white shadow-md"
                                : "bg-white/80 text-gray-600 border border-primary/20 hover:border-primary/50"
                            }`}
                        >
                            All Items
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.slug}
                                onClick={() => setActive(cat.slug)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all outline-none cursor-pointer
                                    ${active === cat.slug
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-white/80 text-gray-600 border border-primary/20 hover:border-primary/50"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Products grid ───────────────────────────────────────── */}
                <section className="px-4 pb-24">
                    <div className="max-w-5xl mx-auto">

                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="bg-white/60 rounded-2xl h-72 animate-pulse" />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-20">
                                <FaLeaf className="text-4xl text-primary/30 mx-auto mb-4" />
                                <p className="text-gray-500">No products found.</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                                    {products.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </AnimatePresence>
                        )}

                        {/* Trust badges */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-500">
                            {[
                                { icon: "🙏", label: "Temple sourced" },
                                { icon: "📦", label: "Ships in 2–3 days" },
                                { icon: "🔒", label: "Secure payments" },
                                { icon: "🌿", label: "100% authentic" },
                            ].map(b => (
                                <div key={b.label} className="bg-white/60 border border-primary/10 rounded-xl py-4 px-3">
                                    <p className="text-2xl mb-1">{b.icon}</p>
                                    <p className="font-medium">{b.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}