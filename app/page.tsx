import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Architecture from "@/components/Architecture";
import FeaturedProjects from "@/components/FeaturedProjects";
import Honors from "@/components/Honors";
import Volunteering from "@/components/Volunteering";
import CoreCompetencies from "@/components/CoreCompetencies";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black font-sans selection:bg-[#B388FF]/30">
      <Preloader />
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <Hero />
        <Architecture />
        <FeaturedProjects />
        <Honors />
        <Volunteering />
        <CoreCompetencies />
      </main>
      <Footer />
    </div>
  );
}
