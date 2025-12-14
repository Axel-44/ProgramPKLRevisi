"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Banner {
  id: number;
  title: string;
  image_url: string;
}

const API_URL = "http://127.0.0.1:8000/api/banners";

export function HeroSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal memuat data banner.");
        const result = await response.json();
        setBanners(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="w-full h-[300px] md:h-[450px] bg-gray-200 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Memuat Banner...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="container mx-auto px-4">
          <div className="w-full h-[300px] bg-red-100 rounded-xl flex items-center justify-center text-center p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      );
    }

    if (banners.length === 0) {
      return (
        <div className="container mx-auto px-4">
          <div className="w-full h-[300px] bg-gray-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-600">Tidak ada banner.</p>
          </div>
        </div>
      );
    }

    return (
      // REVISI: Tambahkan 'relative' untuk posisi dots
      <div className="w-full relative" aria-label="Galeri Banner">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="embla__slide flex-[0_0_100%] relative h-[300px] md:h-[450px]"
              >
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* REVISI: Pindahkan dots agar 'absolute' di atas gambar */}
        <div className="absolute bottom-4 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedIndex === index 
                      ? "bg-white scale-110" 
                      : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section>
      {renderContent()}
    </section>
  );
}