import Navbar from "@/components/layout/NavBar";
import HeroSection from "@/components/home/HeroSection";
import AllBlogsHome from "@/components/home/AllBlogsHome";
import HeroBlogsTransition from "@/components/home/HeroBlogsTransition";
import QuoteSection from "@/components/home/QuoteSection";
import StatsSection from "@/components/home/StatsSection";
import ContactPage from "@/components/contact/ContactPage";

import Footer from "@/components/footer/Footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroBlogsTransition hero={<HeroSection />} panel={  <QuoteSection />} />
     <StatsSection />
     <AllBlogsHome />
      {/* <ContactPage /> */}
      <Footer />
    </div>
  );
}