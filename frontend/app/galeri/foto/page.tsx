"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

const API_URL = "http://127.0.0.1:8000/api/photos";

interface Photo {
  id: number;
  url: string;
  title: string;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // state untuk fullscreen
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal mengambil data foto.");
        const result = await response.json();

        const fetchedPhotos = result.data.map((item: any) => ({
          id: item.id,
          url: item.url,
          title: item.title,
        }));

        setPhotos(fetchedPhotos);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // buka fullscreen
  const openFullscreen = (index: number) => {
    setSelectedIndex(index);
  };

  // tutup fullscreen
  const closeFullscreen = () => {
    setSelectedIndex(null);
  };

  // navigasi ke kiri
  const showPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1
      );
    }
  };

  // navigasi ke kanan
  const showNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p>Memuat galeri foto...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-500">Terjadi kesalahan: {error}</p>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* HEADER BANNER DINAMIS DARI API */}
      <HeroSection />

      {/* BREADCRUMB */}
      <div className="bg-blue-600 text-white py-2 px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm hover:underline"
          >
            <span>🏠 HOME</span>
          </Link>
          <span className="text-sm">/</span>
          <span className="text-sm font-bold">Foto</span>
        </div>
      </div>

      {/* JUDUL */}
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-serif font-bold text-blue-900">
          Foto <span className="text-blue-600">BKAD Kota Bogor</span>
        </h1>
        <div className="w-48 h-1 bg-blue-600 mx-auto mt-2" />
      </div>

      {/* GALERI FOTO DINAMIS */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {photos.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada foto yang ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openFullscreen(index)}
              >
                <div className="relative w-full h-56">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-lg font-semibold text-center px-2">
                    {photo.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN VIEWER */}
      {selectedIndex !== null && photos[selectedIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Tombol Close */}
          <button
            className="absolute top-5 right-5 text-white"
            onClick={closeFullscreen}
          >
            <X size={40} />
          </button>

          {/* Tombol Prev */}
          <button
            className="absolute left-5 text-white"
            onClick={showPrev}
          >
            <ChevronLeft size={50} />
          </button>

          {/* Gambar Fullscreen */}
          <div className="text-center">
            <Image
              src={photos[selectedIndex].url}
              alt={photos[selectedIndex].title}
              width={1000}
              height={700}
              className="object-contain max-h-[80vh] max-w-[90vw] rounded-lg"
            />
            <p className="mt-4 text-lg font-semibold text-white">
              {photos[selectedIndex].title}
            </p>
          </div>

          {/* Tombol Next */}
          <button
            className="absolute right-5 text-white"
            onClick={showNext}
          >
            <ChevronRight size={50} />
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#cce7f0] text-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BKAD Kota Bogor</h3>
            <p className="text-sm">
              Badan Keuangan dan Aset Daerah Kota Bogor berkomitmen memberikan
              pelayanan terbaik dalam pengelolaan keuangan dan aset daerah dengan
              prinsip transparansi dan akuntabilitas.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <p className="text-sm">Jl. Ir. H. Juanda No. 10, Bogor Tengah</p>
            <p className="text-sm">Kota Bogor, Jawa Barat 16121</p>
            <p className="text-sm">(0251) 8321075</p>
            <p className="text-sm">bkad@kotabogor.go.id</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Jam Pelayanan</h4>
            <p className="text-sm">Senin - Jumat: 08:00 - 16:00 WIB</p>
            <p className="text-sm">Sabtu - Minggu: Tutup</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
          © 2025 BKAD Kota Bogor. Seluruh hak cipta dilindungi undang-undang.
        </div>
      </footer>
    </main>
  );
}
