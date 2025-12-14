"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';

// Impor komponen banner full-width
import { FullWidthBanner } from '@/components/FullWidthBanner';

// Impor komponen pop-up profil
import ProfileModal from '@/src/components/ProfilModal';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

const tugasFungsiImages = [
    { id: 1, src: "/images/tugas-pokok-dan-fungsi-1.jpg", alt: "Tugas Pokok & Fungsi", width: 1000, height: 1500 },
];

export default function TugasFungsiPage() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleOpenProfileModal = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
    };

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
                    {/* Mengubah link PROFIL menjadi pop-up */}
                    <div onClick={handleOpenProfileModal} className="cursor-pointer text-sm hover:underline">
                        <span>PROFIL</span>
                    </div>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-semi-bold">TUGAS POKOK & FUNGSI</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-blue-900 mb-8">
                    Tugas Pokok & Fungsi <span className="text-blue-600">BKAD KOTA BOGOR</span>
                </h1>
                
                <div className="flex flex-col items-center gap-6">
                    {tugasFungsiImages.map((image) => (
                        <div key={image.id} className="relative w-full max-w-2xl rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={image.width}
                                height={image.height}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Render modal profil */}
            <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />
        </main>
    );
}