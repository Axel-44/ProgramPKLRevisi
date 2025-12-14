"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Definisikan tipe data untuk objek foto agar sesuai dengan data dari API
interface Photo {
  id: number;
  url: string;
  title: string;
}

const API_URL = "http://127.0.0.1:8000/api/photos";

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Gagal mengambil data foto.");
        }
        const result = await response.json();
        
        const fetchedPhotos = result.data.map((item: any) => ({
          id: item.id,
          url: item.url,
          title: item.title,
        }));
        
        setPhotos(fetchedPhotos);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  
  useEffect(() => {
    if (photos.length <= 1) return;
    // Atur interval untuk memanggil handleNext setiap 5 detik
    const autoPlayInterval = setInterval(() => {
      handleNext();
    }, 5000); // 5000 milidetik = 5 detik

    // Bersihkan interval saat komponen tidak lagi ditampilkan untuk mencegah kebocoran memori
    return () => clearInterval(autoPlayInterval);
  }, [photos.length]); // Jalankan efek ini hanya jika jumlah foto berubah

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const activePhoto = photos[activeIndex];
  const displayedPhotos = photos.slice(activeIndex, activeIndex + 4);

  const handleOpenFullScreen = () => {
    setIsFullScreenOpen(true);
  };

  const handleCloseFullScreen = () => {
    setIsFullScreenOpen(false);
  };

  if (loading) {
    return (
      <section className="py-12 text-center">
        <p>Memuat galeri foto...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 text-center text-red-500">
        <p>Terjadi kesalahan: {error}</p>
      </section>
    );
  }

  if (photos.length === 0) {
    return (
      <section className="py-12 text-center">
        <p>Tidak ada foto yang ditemukan.</p>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 relative h-[500px] flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 cursor-pointer"
            onClick={handleOpenFullScreen}
          >
            <Image src={activePhoto.url} alt={activePhoto.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 z-10 text-white relative">
          <div className="flex justify-between items-center mb-6">
            <div className="text-left">
              <h2 className="text-sm font-semibold">BKAD KOTA BOGOR</h2>
              <h1 className="text-4xl font-bold mt-2">{activePhoto.title}</h1>
            </div>
          </div>

          <div className="flex items-center justify-between mt-12">
            <div className="flex space-x-4">
              {displayedPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActiveIndex(photos.findIndex(p => p.id === photo.id))}
                  className={`relative w-32 h-48 rounded-xl overflow-hidden cursor-pointer shadow-lg transition-all duration-300 ${activePhoto.id === photo.id ? 'border-4 border-blue-500' : 'border-4 border-transparent'}`}
                >
                  <Image src={photo.url} alt={photo.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-3 text-white">
                    <div>
                      <p className="text-xs">{photo.title}</p>
                      <h3 className="font-bold text-xs mt-1">{photo.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <button onClick={handlePrev} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={handleNext} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Layar Penuh */}
      {isFullScreenOpen && activePhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseFullScreen}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={activePhoto.url}
              alt={activePhoto.title}
              fill
              className="object-contain"
            />
            {/* Tombol Navigasi di Modal */}
            <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2 rounded-full bg-white/20 hover:bg-white/40"
            >
                <ChevronLeft size={36} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2 rounded-full bg-white/20 hover:bg-white/40"
            >
                <ChevronRight size={36} />
            </button>
            
            <button 
              className="absolute top-4 right-4 text-white text-4xl font-bold z-10"
              onClick={handleCloseFullScreen}
            >
              &times;
            </button>
            <div className="absolute inset-x-0 bottom-4 text-white text-center">
              <p className="text-lg">{activePhoto.title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}