import React from 'react'
import DailyDarshanTimings from '../components/events/DailyDarshanTimings'
import SpecialPrograms from '../components/events/SpecialPrograms'
import PrasadamAndSeva from '../components/events/PrasadamAndSeva'
import EventsCallToAction from '../components/events/EventsCallToAction'
import EventsHero from "../components/events/PageHero";

export default function Events() {
  return (
    <>
        <div className="bg-black">
      <EventsHero />
      <DailyDarshanTimings />
      <SpecialPrograms />
      <PrasadamAndSeva />
      <EventsCallToAction />
    </div>
    </>
  )
}
