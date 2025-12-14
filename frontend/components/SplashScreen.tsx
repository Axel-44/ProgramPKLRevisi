"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Tunda untuk menampilkan logo selama 2 detik
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    
    const fadeTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <Image
          src="/icons/logo-bkad-kota-bogor.png"
          alt="Logo BKAD Kota Bogor"
          width={150}
          height={150}
          className="mx-auto mb-4 animate-pulse"
        />
        <h1 className="text-2xl font-bold text-blue-900">
          Selamat Datang di BKAD
        </h1>
        <p className="text-lg text-gray-600">
          WEBSITE BKAD KOTA BOGOR
        </p>
      </div>
    </div>
  );
}