import { supabase } from "@/lib/supabase";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");   // slug
        const featured = searchParams.get("featured");   // "true"
        const search   = searchParams.get("q");
        const slug     = searchParams.get("slug");       // single product

        // ── Single product by slug ───────────────────────────────────────
        if (slug) {
            const { data, error } = await supabase
                .from("store_products")
                .select(`
                    *,
                    category:store_categories(id, name, slug),
                    reviews:store_reviews(rating, comment, buyer_name, created_at, verified)
                `)
                .eq("slug", slug)
                .eq("is_active", true)
                .single();

            if (error || !data) {
                return Response.json({ error: "Product not found" }, { status: 404 });
            }
            return Response.json({ product: data });
        }

        // ── Product list ─────────────────────────────────────────────────
        let query = supabase
            .from("store_products")
            .select(`
                id, slug, title, short_desc, price, compare_price,
                stock, images, is_featured, tags,
                category:store_categories(id, name, slug)
            `)
            .eq("is_active", true)
            .order("is_featured", { ascending: false })
            .order("created_at", { ascending: false });

        if (category) {
            // Join via category slug
            const { data: cat } = await supabase
                .from("store_categories")
                .select("id")
                .eq("slug", category)
                .single();
            if (cat) query = query.eq("category_id", cat.id);
        }

        if (featured === "true") {
            query = query.eq("is_featured", true);
        }

        if (search) {
            query = query.ilike("title", `%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Products fetch error:", error);
            return Response.json({ error: "Failed to fetch products" }, { status: 500 });
        }

        // Also fetch categories for filter chips
        const { data: categories } = await supabase
            .from("store_categories")
            .select("*")
            .order("sort_order");

        return Response.json({ products: data || [], categories: categories || [] });

    } catch (err) {
        console.error("Products route crash:", err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}