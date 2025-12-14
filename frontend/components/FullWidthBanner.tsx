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

export function FullWidthBanner() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
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
        <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center animate-pulse">
          <p className="text-gray-500">Memuat Banner...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full h-[300px] bg-red-100 flex items-center justify-center text-center p-4">
          <p className="text-red-700">{error}</p>
        </div>
      );
    }

    if (banners.length === 0) {
      return (
        <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600">Tidak ada banner.</p>
        </div>
      );
    }

    return (
      <div className="w-full" aria-label="Galeri Banner">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="embla__slide flex-[0_0_100%] relative h-[200px] md:h-[300px] lg:h-[350px]"
              >
                <Image
                  src={banner.image_url}
                  alt={banner.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-3 space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                selectedIndex === index ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-6 bg-gray-50">
      {renderContent()}
    </section>
  );
}