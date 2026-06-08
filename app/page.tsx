import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Principles from "@/components/Principles";
import Problem from "@/components/Problem";
import CinematicBand from "@/components/CinematicBand";
import MethodScene from "@/components/MethodScene";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Audience from "@/components/Audience";
import Profile from "@/components/Profile";
import FinalCta from "@/components/FinalCta";
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
        <Principles />
        <Problem />
        <CinematicBand
          src="/assets/cinematic/cantiere.png"
          align="left"
          eyebrow="Il punto"
          title={
            <>
              Prima si verifica.
              <br />
              Poi si decide. Poi si interviene.
            </>
          }
          text="Ogni intervento parte da un controllo tecnico: documenti, stato di fatto, vincoli. È lì che si evitano ritardi, costi e responsabilità."
        />
        <MethodScene />
        <CinematicBand
          src="/assets/cinematic/rilievo.png"
          align="left"
          eyebrow="Strumenti"
          title="Misure prima delle decisioni."
          text="Rilievi GNSS/RTK e restituzioni precise: la base affidabile su cui poggia ogni progetto, pratica o cantiere."
        />
        <Services />
        <Gallery />
        <Audience />
        <Profile />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
