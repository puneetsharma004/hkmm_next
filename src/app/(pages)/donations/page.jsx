import React from 'react'
import DonationsPageHero from '../../components/donations/DonationPageHero'
import WhyDonate from '../../components/donations/WhyDonate'
import SevaOptions from '../../components/donations/SevaOptions'
import CurrentCampaigns from '../../components/donations/CurrentCampaigns'
import HowToDonate from '../../components/donations/HowToDonate'
import DonationForm from '../../components/donations/DonationsForm'
import DonationsCallToAction from '../../components/donations/DonationsCallToAction'

export const metadata = {
  title: "Donate | Hare Krishna Marwar Mandir Jodhpur",
  description:
    "Support Hare Krishna Marwar Mandir, Jodhpur through donations. Contribute to temple services, community programs, prasadam distribution, and spiritual activities.",
  alternates: {
    canonical: "https://harekrishnamarwar.org/donate",
  },
  openGraph: {
    title: "Donate to Hare Krishna Marwar Mandir Jodhpur",
    description:
      "Make a donation to support temple activities, charity programs, and spiritual initiatives at Hare Krishna Marwar Mandir.",
    url: "https://harekrishnamarwar.org/donate",
    siteName: "Hare Krishna Marwar Mandir",
    type: "website",
  },
};

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
            <DonationsCallToAction />
        </div>
    </>
  )
}
