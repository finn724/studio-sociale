import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import StatementPanel from "@/components/StatementPanel";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Services />
        <StatementPanel />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
