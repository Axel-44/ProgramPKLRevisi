"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

import { FullWidthBanner } from '@/components/FullWidthBanner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Sp4nLaporPage() {
  return (
    <main className={`bg-gray-100 min-h-screen ${poppins.className}`}>
      {/* Header banner full-width */}
      <FullWidthBanner />

      {/* Breadcrumb Section */}
      <div className="bg-blue-600 text-white py-2 px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-sm hover:underline">
            <span>🏠 HOME</span>
          </Link>
          <span className="text-sm">/</span>
          <span className="text-sm">Pengaduan</span>
          <span className="text-sm">/</span>
          <span className="text-sm font-bold">SP4N Lapor</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12 px-4">
        {/* Judul Halaman */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
          SP4N <span className="text-blue-600">Lapor!</span>
        </h1>
        
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-3xl mx-auto text-center">
          <p className="text-gray-700 leading-relaxed mb-8">
            SP4N Lapor! adalah sistem pengaduan layanan publik terpadu yang disediakan oleh Pemerintah Indonesia. Sistem ini bertujuan untuk meningkatkan transparansi dan akuntabilitas dalam penyelenggaraan pelayanan publik.
            Sampaikan pengaduan Anda mengenai Pemerintah Kota Bogor melalui link berikut:
          </p>
          
          <div className="flex justify-center mb-8">
            <a href="https://www.lapor.go.id" target="_blank" rel="noopener noreferrer">
              <Image
                src="/icons/SP4N Lapor.gif" 
                alt="Logo SP4N Lapor"
                width={120}
                height={120}
              />
            </a>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Aduan Anda akan dikelola oleh tim yang berwenang untuk ditindaklanjuti.
          </p>
          
          <div className="flex justify-center gap-6">
            <a href="https://play.google.com/store/apps/details?id=com.lapor" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/playstore.png" alt="Google Play" width={150} height={45} />
            </a>
            <a href="https://apps.apple.com/id/app/lapor/id12345" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/appstore.png" alt="App Store" width={150} height={45} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}