// src/pages/Home.jsx

import Announcements from "./components/common/AnnouncementBar";
import HeroSlider from "./components/common/HeroSlider";
import Loader from "./components/common/Loader";
import EventsAndDarshan from "./components/home/EventsAndDarshan";
import GalleryPreview from "./components/home/GalleryPreview";
import Testimonials from "./components/home/Testimonials";
import WelcomeSection from "./components/home/WelcomeSection";


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
