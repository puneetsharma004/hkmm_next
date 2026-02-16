import React from 'react'
import DonationsPageHero from '../components/donations/DonationPageHero'
import WhyDonate from '../components/donations/WhyDonate'
import SevaOptions from '../components/donations/SevaOptions'
import CurrentCampaigns from '../components/donations/CurrentCampaigns'
import HowToDonate from '../components/donations/HowToDonate'
import DonationForm from '../components/donations/DonationsForm'
import DonorTestimonials from '../components/donations/DonorTestimonials'
import DonationsCallToAction from '../components/donations/DonationsCallToAction'

export default function Donations() {
  return (
    <>
        <div className="bg-black">
            <DonationsPageHero />
            <WhyDonate />
            <SevaOptions />
            <CurrentCampaigns />
            <HowToDonate />
            <DonationForm />
            {/* <DonorTestimonials /> */}
            <DonationsCallToAction />
        </div>
    </>
  )
}
