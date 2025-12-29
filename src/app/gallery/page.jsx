


import React from 'react'
import GalleryPageHeader from '../components/gallery/GalleryPageHeader'
import PhotoGallery from '../components/gallery/PhotoGallery'
import VideoGallery from '../components/gallery/VideoGallery'
import SocialMediaFeed from '../components/gallery/SocialMediaFeed'
import GalleryCallToAction from '../components/gallery/GalleryCallToAction'


export default function About() {
  return (
    <>
       <div className="bg-black">
      <GalleryPageHeader />
      <PhotoGallery />
      <VideoGallery />
      {/* <FeaturedMoments /> */}
      <SocialMediaFeed />
      <GalleryCallToAction />
    </div>
    </>
  )
}
