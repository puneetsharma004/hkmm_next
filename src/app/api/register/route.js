export async function POST(req) {
    const data = await req.json();

    console.log("User Registered:", data);

    // Later: save in DB

    return Response.json({ success: true });
}