import React from 'react'
import EventsPageHeader from '../components/events/PageHeader'
import DailyDarshanTimings from '../components/events/DailyDarshanTimings'
import EventsCalendar from '../components/events/EventsCalendar'
import MajorFestivals from '../components/events/MajorFestival'
import SpecialPrograms from '../components/events/SpecialPrograms'
import PrasadamAndSeva from '../components/events/PrasadamAndSeva'
import EventsCallToAction from '../components/events/EventsCallToAction'

export default function Events() {
  return (
    <>
        <div className="bg-black">
      <EventsPageHeader />
      {/* <VirtualDarshan /> */}
      <DailyDarshanTimings />
      <EventsCalendar />
      <MajorFestivals />
      <SpecialPrograms />
      <PrasadamAndSeva />
      <EventsCallToAction />
    </div>
    </>
  )
}
