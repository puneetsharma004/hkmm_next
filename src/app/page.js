// src/pages/Home.jsx

import Announcements from "./common/AnnouncementBar";
import HeroSlider from "./common/HeroSlider";
import Loader from "./common/Loader";
import EventsAndDarshan from "./home/EventsAndDarshan";
import GalleryPreview from "./home/GalleryPreview";
import Testimonials from "./home/Testimonials";
import WelcomeSection from "./home/WelcomeSection";


function Home() {
  
  return (
    <>
      {/* Loader: Optional global or page-specific */}
      <Loader />

      <HeroSlider />
      <WelcomeSection />
      <EventsAndDarshan />
      <GalleryPreview />
      <Testimonials />
      <Announcements />
    </>
  );
}

export default Home;
