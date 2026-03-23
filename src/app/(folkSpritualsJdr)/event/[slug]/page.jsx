import { events } from "@/data/events";
import EventHero from "@/app/(folkSpritualsJdr)/event/eventComp/EventHero";
import EventDetails from "@/app/(folkSpritualsJdr)/event/eventComp/EventDetails";
import EventOrganizer from "@/app/(folkSpritualsJdr)/event/eventComp/EventOrganizer";
import EventCTA from "@/app/(folkSpritualsJdr)/event/eventComp/EventCTA";

export default async function EventPage({ params }) {
    const { slug } = await params;
    const normalizedSlug = slug?.toLowerCase();
    const event = events[normalizedSlug];

    if (!event) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-primary">
                    Event not found: {normalizedSlug}
                </h1>
            </div>
        );
    }

    return (
        <main className="smooth-scroll-container">

            {/* 1. Hero */}
            <EventHero event={event} slug={slug} />

            {/* 2. Details */}
            <EventDetails event={event} slug={slug} />

            {/* 3. Organizer */}
            <EventOrganizer event={event} slug={slug} />

            {/* 4. CTA */}
            <EventCTA event={event} slug={normalizedSlug}/>

        </main>
    );
}