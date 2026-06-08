import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Targets from "@/components/Targets";
import ServicesShowcase from "@/components/ServicesShowcase";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Team from "@/components/Team";
import CinematicCTA from "@/components/CinematicCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyUs />
        <Process />
        <Targets />
        <ServicesShowcase />
        <Manifesto />
        <About />
        <Team />
        <CinematicCTA />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
