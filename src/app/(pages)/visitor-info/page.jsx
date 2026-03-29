import React from 'react'
import VisitorInfoPageHeader from '../../components/visitors/VisitorInfoPageHeader'
import LocationAndMap from '../../components/visitors/LocationAndMap'
import HowToReach from '../../components/visitors/HowToReach'
import TempleTimings from '../../components/visitors/TempleTimings'
import AartiSchedule from '../../components/visitors/AartiSchedule'
import DressCodeEtiquette from '../../components/visitors/DressCodeEtiquette'
import Accommodation from '../../components/visitors/Accommodation'
import Facilities from '../../components/visitors/Facilities'
import TipsForVisitors from '../../components/visitors/TipsForVisitors'
import VisitorContact from '../../components/visitors/VisitorContact'
import VisitorInfoCallToAction from '../../components/visitors/VisitorInfoCallToAction'

export const metadata = {
  title: "Visitor Information | Hare Krishna Marwar Mandir Jodhpur",
  description:
    "Plan your visit to Hare Krishna Marwar Mandir, Jodhpur. Find visiting hours, guidelines, directions, and facilities for a peaceful spiritual experience.",
  alternates: {
    canonical: "https://harekrishnamarwar.org/visitor-information",
  },
  openGraph: {
    title: "Visitor Information - Hare Krishna Marwar Mandir Jodhpur",
    description:
      "Get complete visitor details including timings, directions, temple rules, and available facilities at Hare Krishna Marwar Mandir.",
    url: "https://harekrishnamarwar.org/visitor-information",
    siteName: "Hare Krishna Marwar Mandir",
    type: "website",
  },
};

export default function VisitorInfo() {
  return (
    <>
        <div className="bg-black">
            <VisitorInfoPageHeader />
            <LocationAndMap />
            <HowToReach />
            <TempleTimings />
            <AartiSchedule />
            <DressCodeEtiquette />
            <Accommodation />
            <Facilities />
            <TipsForVisitors />
            <VisitorContact />
            <VisitorInfoCallToAction />
        </div>
    </>
  )
}
