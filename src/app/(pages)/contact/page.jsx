import React from 'react'
import ContactPageHero from '../../components/contact/ContactPageHero'
import ContactInformation from '../../components/contact/ContactInformation'
import ContactForm from '../../components/contact/ContactForm'
import MapAndDirections from '../../components/contact/MapAndDirections'
import OfficeHours from '../../components/contact/OfficeHours'
import ContactCallToAction from '../../components/contact/ContactCallToAction'

export const metadata = {
  title: "Contact Us | Hare Krishna Marwar Mandir Jodhpur",
  description:
    "Get in touch with Hare Krishna Marwar Mandir, Jodhpur. Find our location, contact details, office hours, and directions to visit the temple.",
  alternates: {
    canonical: "https://harekrishnamarwar.org/contact",
  },
  openGraph: {
    title: "Contact Hare Krishna Marwar Mandir Jodhpur",
    description:
      "Reach out to Hare Krishna Marwar Mandir for visits, events, and spiritual inquiries. View directions, contact info, and timings.",
    url: "https://harekrishnamarwar.org/contact",
    siteName: "Hare Krishna Marwar Mandir",
    type: "website",
  },
};

export default function Contact() {
  return (
    <>
        <div className="bg-black">
            <ContactPageHero />
            <ContactInformation />
            <ContactForm />
            <MapAndDirections />
            <OfficeHours />
            <ContactCallToAction />
        </div>
    </>
  )
}
