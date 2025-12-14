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

export default function SibadraPage() {
  return (
    <main className={`bg-gray-100 min-h-screen ${poppins.className}`}>
      <FullWidthBanner />
      <div className="bg-blue-600 text-white py-2 px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-sm hover:underline">
            <span>🏠 HOME</span>
          </Link>
          <span className="text-sm">/</span>
          <span className="text-sm">Pengaduan</span>
          <span className="text-sm">/</span>
          <span className="text-sm font-bold">SiBadra</span>
        </div>
      </div>

      
      <div className="container mx-auto py-12 px-4">
        
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-8">
          SiBadra <span className="text-blue-600">APP</span>
        </h1>
        
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-3xl mx-auto text-center">
          <p className="text-gray-700 leading-relaxed mb-8">
            SiBadra (Sistem Informasi Berbagi Aduan dan Saran) adalah media bagi Masyarakat Kota Bogor untuk mempermudah dalam menyampaikan pengaduan, saran, dan permintaan layanan publik serta kegawatdaruratan kepada Pemerintah Kota Bogor secara real time.
            Sampaikan pengaduan atau saran mengenai Pemerintah Kota Bogor melalui link berikut:
          </p>
          
          <div className="flex justify-center mb-8">
            <a href="https://sibadra.kotabogor.go.id" target="_blank" rel="noopener noreferrer">
              <Image
                src="/icons/SiBadra.png"
                alt="Logo SiBadra"
                width={120}
                height={120}
              />
            </a>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            Atau bisa juga download aplikasinya melalui PlayStore atau AppStore di HP kalian
          </p>
          
          <div className="flex justify-center gap-6">
            <a href="https://play.google.com/store/apps/details?id=com.bogor.aspirasi&hl=id" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/playstore.png" alt="Google Play" width={150} height={45} />
            </a>
            <a href="https://apps.apple.com/id/app/sibadra/id1484986803" target="_blank" rel="noopener noreferrer">
              <Image src="/icons/appstore.png" alt="App Store" width={150} height={45} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}