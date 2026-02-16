


import React from 'react'
import GalleryPageHero from '../components/gallery/GalleryPageHero'
import PhotoGallery from '../components/gallery/PhotoGallery'
import VideoGallery from '../components/gallery/VideoGallery'
import SocialMediaFeed from '../components/gallery/SocialMediaFeed'
import GalleryCallToAction from '../components/gallery/GalleryCallToAction'


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
