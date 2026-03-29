import React from 'react'
import PageHeader from '../../components/about/PageHeader'
import TempleHistory from '../../components/about/TempleHistory'
import MissionVision from '../../components/about/MissionVision'
import SpiritualLineage from '../../components/about/SpiritualLineage'
import TempleArchitecture from '../../components/about/TempleArchitecture'
import CulturalImportance from '../../components/about/CulturalImportance'

export const metadata = {
  title: "About Us",
  description:
    "Learn about the history, mission, and vision of Hare Krishna Marawr Mandir — a Hare Krishna spiritual centre in Jodhpur, Rajasthan dedicated to devotion and community service.",
  alternates: { canonical: "https://harekrishnamarwar.org/about" },
  openGraph: {
    title: "About Hare Krishna Marawr Mandir Jodhpur",
    description: "Discover the spiritual legacy, architecture, and community programs of Hare Krishna Marawr Mandir.",
    url: "https://harekrishnamarwar.org/about",
  },
};

export default function Gallery() {
  return (
    <>
        <div className="bg-black">
      <PageHeader />
      <TempleHistory />
      <MissionVision />
      <SpiritualLineage />
      <TempleArchitecture />
      <CulturalImportance />
    </div>
    </>
  )
}