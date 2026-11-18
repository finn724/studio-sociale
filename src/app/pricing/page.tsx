import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Studio Socialé",
  description: "Plans and packages for social media management, content and strategy.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
