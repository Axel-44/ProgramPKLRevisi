"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Impor semua modal yang diperlukan
import ProfileModal from '@/src/components/ProfilModal';
import GalleryModal from '@/src/components/GalleryModal';
import KontakModal from '@/src/components/KontakModal';
import PengaduanModal from '@/src/components/PengaduanModal';
import LayananModal from '@/src/components/LayananModal';

interface FloatingNavigationProps {
    isVisible: boolean;
}

const navItems = [
    { name: 'Profil', iconSrc: "/icons/profil-icon.png", href: null, modal: 'profile' },
    { name: 'Berita', iconSrc: "/icons/berita-icon.png", href: "/berita" },
    { name: 'Dokumen', iconSrc:"/icons/dokumen-icon.png", href: '/dokumen' },
    { name: 'Pengaduan', iconSrc: "/icons/pengaduan.png", href: null, modal: 'pengaduan' },
    { name: 'Layanan', iconSrc: "/icons/layanan-icon.png", href: null, modal: 'layanan' },
    { name: 'Galeri', iconSrc: "/icons/galeri-icon.png", href: null, modal: 'galeri' },
    { name: 'Kontak', iconSrc: "/icons/kontak-icon.png", href: null, modal: 'kontak' },
];

export function FloatingNavigation({ isVisible }: FloatingNavigationProps) {
    const pathname = usePathname();

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [isKontakModalOpen, setIsKontakModalOpen] = useState(false);
    const [isPengaduanModalOpen, setIsPengaduanModalOpen] = useState(false);
    const [isLayananModalOpen, setIsLayananModalOpen] = useState(false);

    const handleItemClick = (modalName: string | null, e: React.MouseEvent) => {
        if (modalName) {
            e.preventDefault();
            switch (modalName) {
                case 'profile':
                    setIsProfileModalOpen(true);
                    break;
                case 'galeri':
                    setIsGalleryModalOpen(true);
                    break;
                case 'kontak':
                    setIsKontakModalOpen(true);
                    break;
                case 'pengaduan':
                    setIsPengaduanModalOpen(true);
                    break;
                case 'layanan':
                    setIsLayananModalOpen(true);
                    break;
            }
        }
    };

    return (
        <>
            <nav 
                className={`fixed bottom-0 left-0 right-0 z-40 flex justify-center p-4 transition-transform duration-300 transform ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                {/* Mengubah rounded-full menjadi rounded-lg */}
                <div className="flex bg-white shadow-xl rounded-lg p-2 space-x-4 md:space-x-8">
                    {navItems.map((item) => (
                        item.href ? (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center justify-center text-xs text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center p-2">
                                    <Image src={item.iconSrc} alt={item.name} width={32} height={32} />
                                </div>
                                <span className={`mt-1 text-center ${pathname === item.href ? 'text-blue-600' : ''}`}>{item.name}</span>
                            </Link>
                        ) : (
                            <div
                                key={item.name}
                                onClick={(e) => handleItemClick(item.modal!, e)}
                                className="flex flex-col items-center justify-center text-xs text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                            >
                                <div className="bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center p-2">
                                    <Image src={item.iconSrc} alt={item.name} width={32} height={32} />
                                </div>
                                <span className="mt-1 text-center">{item.name}</span>
                            </div>
                        )
                    ))}
                </div>
            </nav>

            
            {isProfileModalOpen && <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />}
            {isGalleryModalOpen && <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} />}
            {isKontakModalOpen && <KontakModal isOpen={isKontakModalOpen} onClose={() => setIsKontakModalOpen(false)} />}
            {isPengaduanModalOpen && <PengaduanModal isOpen={isPengaduanModalOpen} onClose={() => setIsPengaduanModalOpen(false)} />}
            {isLayananModalOpen && <LayananModal isOpen={isLayananModalOpen} onClose={() => setIsLayananModalOpen(false)} />}
        </>
    );
}