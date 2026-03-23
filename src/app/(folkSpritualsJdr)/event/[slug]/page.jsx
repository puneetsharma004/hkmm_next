import { events } from "@/data/events";

export default function EventPage({ params }) {
    const slug = params.slug?.toLowerCase(); // ✅ normalize

    const event = events[slug];

    console.log("slug:", slug);
    console.log("event:", event);

    if (!event) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-primary">
                    Event not found: {slug}
                </h1>
            </div>
        );
    }

    return (
        <div>
            <h1>{event.title}</h1>
        </div>
    );
}