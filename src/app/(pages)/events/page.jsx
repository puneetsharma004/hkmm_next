import React from 'react'
import DailyDarshanTimings from '../../components/events/DailyDarshanTimings'
import SpecialPrograms from '../../components/events/SpecialPrograms'
import PrasadamAndSeva from '../../components/events/PrasadamAndSeva'
import EventsCallToAction from '../../components/events/EventsCallToAction'
import EventsHero from "../../components/events/PageHero";
import FolkSpiritualsEventBanner from "@/app/components/folkSpirituals/FolkSpiritualsEventBanner ";

export const metadata = {
  title: "Events | Hare Krishna Marwar Mandir Jodhpur",
  description:
    "Explore upcoming and past events at Hare Krishna Marwar Mandir, Jodhpur. Join festivals, kirtans, spiritual discourses, and community programs.",
  alternates: {
    canonical: "https://harekrishnamarwar.org/events",
  },
  openGraph: {
    title: "Events at Hare Krishna Marwar Mandir Jodhpur",
    description:
      "Stay updated with upcoming festivals, kirtans, and spiritual gatherings at Hare Krishna Marwar Mandir.",
    url: "https://harekrishnamarwar.org/events",
    siteName: "Hare Krishna Marwar Mandir",
    type: "website",
  },
};

export default function Events() {
  return (
    <>
        <div className="bg-black">
      <EventsHero />
            <FolkSpiritualsEventBanner />
      <DailyDarshanTimings />
      <SpecialPrograms />
      <PrasadamAndSeva />
      <EventsCallToAction />
    </div>
    </>
  )
}
