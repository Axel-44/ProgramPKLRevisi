"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  url: string | null;
  image_url: string | null;
}

const API_URL = "http://127.0.0.1:8000/api/banner-popups";

interface BannerPopupProps {
  onClose: () => void;
}

export function BannerPopup({ onClose }: BannerPopupProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchInitiated = useRef(false);

  useEffect(() => {
    if (fetchInitiated.current) {
      return;
    }
    fetchInitiated.current = true;

    const fetchBanners = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal memuat data banner.");
        const result = await response.json();
        if (result.data && result.data.length > 0) {
          setBanners(result.data);
          setCurrentIndex(0);
        } else {
          onClose(); 
        }
      } catch (error) {
        console.error(error);
        onClose(); 
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [onClose]);

  useEffect(() => {
    if (currentIndex !== null && banners.length > 0) {
      const timer = setTimeout(() => {
        if (currentIndex === banners.length - 1) {
          onClose(); 
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, banners.length, onClose]);
  
  if (loading || currentIndex === null || banners.length === 0) {
    return null;
  }

  const activeBanner = banners[currentIndex];

  return (
    <AnimatePresence>
      {activeBanner && (
        <motion.div
          key={activeBanner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center z-20 hover:bg-gray-200 transition-colors shadow-lg"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <a
                href={activeBanner.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {activeBanner.image_url && (
                  <Image
                    src={activeBanner.image_url}
                    alt={activeBanner.title}
                    width={800}
                    height={600}
                    className="object-contain w-full h-auto max-h-[80vh]"
                  />
                )}
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}