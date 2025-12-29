import React from 'react'
import ContactPageHeader from '../components/contact/ContactPageHeader'
import ContactInformation from '../components/contact/ContactInformation'
import ContactForm from '../components/contact/ContactForm'
import MapAndDirections from '../components/contact/MapAndDirections'
import OfficeHours from '../components/contact/OfficeHours'
import ContactCallToAction from '../components/contact/ContactCallToAction'

export default function Contact() {
  return (
    <>
        <div className="bg-black">
            <ContactPageHeader />
            <ContactInformation />
            <ContactForm />
            <MapAndDirections />
            {/* <SocialMediaLinks /> */}
            <OfficeHours />
            {/* <EmergencyNotices /> */}
            <ContactCallToAction />
        </div>
    </>
  )
}
