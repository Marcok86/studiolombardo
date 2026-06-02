import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Targets from "@/components/Targets";
import Services from "@/components/Services";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Targets />
        <Services />
        <Manifesto />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
