import React from 'react'
import DailyDarshanTimings from '../../components/events/DailyDarshanTimings'
import SpecialPrograms from '../../components/events/SpecialPrograms'
import PrasadamAndSeva from '../../components/events/PrasadamAndSeva'
import EventsCallToAction from '../../components/events/EventsCallToAction'
import EventsHero from "../../components/events/PageHero";
import FolkSpiritualsEventBanner from "@/app/components/folkSpirituals/FolkSpiritualsEventBanner ";

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
