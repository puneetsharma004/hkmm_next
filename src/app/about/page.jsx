import React from 'react'
import PageHeader from '../components/about/PageHeader'
import TempleHistory from '../components/about/TempleHistory'
import MissionVision from '../components/about/MissionVision'
import SpiritualLineage from '../components/about/SpiritualLineage'
import TempleArchitecture from '../components/about/TempleArchitecture'
import CulturalImportance from '../components/about/CulturalImportance'

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