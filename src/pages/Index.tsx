import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactForm from "@/components/ContactForm";

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)", fontFamily: "'Golos Text', sans-serif" }}>
      <SiteHeader scrolled={scrolled} onCallClick={scrollToForm} />
      <HeroSection onCtaClick={scrollToForm} />
      <ProjectsSection onCardClick={scrollToForm} />
      <ContactForm formRef={formRef} />
    </div>
  );
}
