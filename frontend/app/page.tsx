"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { WelcomeSection } from "@/components/welcome-section";
import { NewsSection } from "@/components/news-section";
import { CalendarSection } from "@/components/calendar-section";
import { AgendaSection } from "@/components/agenda-section";
import { PhotoGallery } from "@/components/photo-gallery";
import { VideoGallery } from "@/components/video-gallery";
import { Footer } from "@/components/footer";
import SplashScreen from "@/components/SplashScreen";
import { FloatingNavigation } from "@/components/FloatingNavigation";
import { BannerPopup } from "@/components/banner-popup";
import { IconSection } from "@/components/icon-section";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [isBannerPopupOpen, setIsBannerPopupOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 300;
      setShowFloatingNav(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {isBannerPopupOpen && (
        <BannerPopup onClose={() => setIsBannerPopupOpen(false)} />
      )}

      <Header />

      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <IconSection />
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <WelcomeSection />
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">

            <ScrollReveal delay={0.2}>
               <NewsSection />
            </ScrollReveal>
          </div>
          <div className="space-y-6">
            <ScrollReveal delay={0.3}>
               <CalendarSection />
               <AgendaSection />
            </ScrollReveal>
          </div>
        </div>
      </div>

      <PhotoGallery />
      <VideoGallery />

      <Footer />

      <FloatingNavigation isVisible={showFloatingNav} />
    </div>
  );
}