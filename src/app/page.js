// src/pages/Home.jsx

import Announcements from "./components/common/AnnouncementBar";
import HeroSlider from "./components/common/HeroSlider";
import EventsAndDarshan from "./components/home/EventsAndDarshan";
import GalleryPreview from "./components/home/GalleryPreview";
import Testimonials from "./components/home/Testimonials";
import WelcomeSection from "./components/home/WelcomeSection";


async function Home() {
  await new Promise((res) => setTimeout(res, 3000));
  return (
    <>
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
