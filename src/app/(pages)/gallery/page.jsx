


import React from 'react'
import GalleryPageHero from '../../components/gallery/GalleryPageHero'
import PhotoGallery from '../../components/gallery/PhotoGallery'
import VideoGallery from '../../components/gallery/VideoGallery'
import SocialMediaFeed from '../../components/gallery/SocialMediaFeed'
import GalleryCallToAction from '../../components/gallery/GalleryCallToAction'

export const metadata = {
  title: "Gallery | Hare Krishna Marwar Mandir Jodhpur",
  description:
    "Explore photos and videos of Hare Krishna Marwar Mandir, Jodhpur. View festival celebrations, temple architecture, kirtans, and spiritual moments.",
  alternates: {
    canonical: "https://harekrishnamarwar.org/gallery",
  },
  openGraph: {
    title: "Gallery of Hare Krishna Marwar Mandir Jodhpur",
    description:
      "Browse images and videos showcasing temple festivals, events, and spiritual life at Hare Krishna Marwar Mandir.",
    url: "https://harekrishnamarwar.org/gallery",
    siteName: "Hare Krishna Marwar Mandir",
    type: "website",
  },
};

export default function About() {
  return (
    <>
       <div className="bg-black">
      <GalleryPageHero />
      <PhotoGallery />
      <VideoGallery />
      <SocialMediaFeed />
      <GalleryCallToAction />
    </div>
    </>
  )
}
