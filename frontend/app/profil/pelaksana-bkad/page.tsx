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

// Data statis untuk 9 gambar
const pelaksanaImages = [
    { id: 1, src: "/images/1.png", alt: "Pelaksana BKAD Foto 1", width: 800, height: 1200 },
    { id: 2, src: "/images/2.png", alt: "Pelaksana BKAD Foto 2", width: 800, height: 1200 },
    { id: 3, src: "/images/3.png", alt: "Pelaksana BKAD Foto 3", width: 800, height: 1200 },
    { id: 4, src: "/images/4.png", alt: "Pelaksana BKAD Foto 4", width: 800, height: 1200 },
    { id: 5, src: "/images/5.png", alt: "Pelaksana BKAD Foto 5", width: 800, height: 1200 },
    { id: 6, src: "/images/6.png", alt: "Pelaksana BKAD Foto 6", width: 800, height: 1200 },
    { id: 7, src: "/images/7.png", alt: "Pelaksana BKAD Foto 7", width: 800, height: 1200 },
    { id: 8, src: "/images/8.png", alt: "Pelaksana BKAD Foto 8", width: 800, height: 1200 },
    { id: 9, src: "/images/9.png", alt: "Pelaksana BKAD Foto 9", width: 800, height: 1200 },
];

export default function PelaksanaBKADPage() {
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
            {/* Mengganti HeroSection dengan FullWidthBanner */}
            <FullWidthBanner />

            {/* Breadcrumb Section */}
            <div className="bg-blue-600 text-white py-2 px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-1 text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </Link>
                    <span className="text-sm">/</span>
                    {/* Mengubah link PROFIL menjadi pop-up */}
                    <div onClick={handleOpenProfileModal} className="cursor-pointer text-sm hover:underline">
                        <span>PROFIL</span>
                    </div>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">PELAKSANA BKAD</span>
                </div>
            </div>

            {/* Judul Halaman */}
            <div className="container mx-auto py-8 text-center">
                <h1 className="text-3xl font-bold text-blue-900">
                    PELAKSANA <span className="text-blue-600">BKAD</span>
                </h1>
                <div className="w-48 h-1 bg-blue-600 mx-auto mt-2" />
            </div>

            {/* Galeri Gambar */}
            <div className="container mx-auto py-12 px-4">
                <div className="flex flex-col items-center gap-6">
                    {pelaksanaImages.map((image) => (
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