import React from 'react'
import ContactPageHero from '../components/contact/ContactPageHero'
import ContactInformation from '../components/contact/ContactInformation'
import ContactForm from '../components/contact/ContactForm'
import MapAndDirections from '../components/contact/MapAndDirections'
import OfficeHours from '../components/contact/OfficeHours'
import ContactCallToAction from '../components/contact/ContactCallToAction'

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
