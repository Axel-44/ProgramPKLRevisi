"use client";

import React, { useState } from "react";
import ProfileModal from "@/src/components/ProfilModal";
import GalleryModal from "@/src/components/GalleryModal";
import KontakModal from "@/src/components/KontakModal";
import PengaduanModal from "@/src/components/PengaduanModal";
import LayananModal from "@/src/components/LayananModal";
import Image from "next/image";
import Link from 'next/link';
import { SurveiKepuasanModal } from "@/src/components/SurveiKepuasanModal";
import { SurveiKorupsiModal } from "@/src/components/SurveiKorupsiModal";

interface MenuItem {
    iconSrc: string;
    label: string;
    href: string | null;
    modalName?: string;
}

export function Navigation() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const [isKontakModalOpen, setIsKontakModalOpen] = useState(false);
    const [isPengaduanModalOpen, setIsPengaduanModalOpen] = useState(false);
    const [isLayananModalOpen, setIsLayananModalOpen] = useState(false);
    const [isSurveiKepuasanModalOpen, setIsSurveiKepuasanModalOpen] = useState(false);
    const [isSurveiKorupsiModalOpen, setIsSurveiKorupsiModalOpen] = useState(false);

    const mainMenuItems: MenuItem[] = [
        { iconSrc: "/icons/profil-icon.png", label: "Profil", href: null, modalName: 'profil' },
        { iconSrc: "/icons/dokumen-icon.png", label: "Dokumen", href: "/dokumen" },
        { iconSrc: "/icons/berita-icon.png", label: "Berita", href: "/berita" },
        { iconSrc: "/icons/pengaduan.png", label: "Pengaduan", href: null, modalName: 'pengaduan' },
        { iconSrc: "/icons/layanan-icon.png", label: "Layanan", href: null, modalName: 'layanan' },
        { iconSrc: "/icons/galeri-icon.png", label: "Galeri", href: null, modalName: 'galeri' },
        { iconSrc: "/icons/kontak-icon.png", label: "Kontak", href: null, modalName: 'kontak' },
        { iconSrc: "/icons/survey.png", label: "Survei Kepuasan", href: null, modalName: 'survei-kepuasan' },
        { iconSrc: "/icons/survey.jpg", label: "Survei Anti Korupsi", href: null, modalName: 'survei-korupsi' },
    ];

    const subMenuItems: MenuItem[] = [];

    const handleItemClick = (modalName: string, e: React.MouseEvent) => {
        e.preventDefault();
        switch (modalName) {
            case 'profil':
                setIsProfileModalOpen(true);
                break;
            case 'pengaduan':
                setIsPengaduanModalOpen(true);
                break;
            case 'layanan':
                setIsLayananModalOpen(true);
                break;
            case 'galeri':
                setIsGalleryModalOpen(true);
                break;
            case 'kontak':
                setIsKontakModalOpen(true);
                break;
            case 'survei-kepuasan':
                setIsSurveiKepuasanModalOpen(true);
                break;
            case 'survei-korupsi':
                setIsSurveiKorupsiModalOpen(true);
                break;
        }
    };

    return (
        <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-center justify-center space-x-4 md:space-x-8 py-4">
                    {mainMenuItems.map((item) => {
                        const isModal = item.href === null;
                        const content = (
                            <>
                                <div className="p-3 rounded-lg bg-white group-hover:bg-gray-100 transition-colors">
                                    <Image src={item.iconSrc} alt={item.label} width={24} height={24} />
                                </div>
                                <span className="text-sm font-medium">{item.label}</span>
                            </>
                        );
                        
                        if (isModal) {
                            return (
                                <div
                                    key={item.label}
                                    onClick={(e) => handleItemClick(item.modalName!, e)}
                                    className="flex flex-col items-center gap-2 hover:text-accent transition-colors group cursor-pointer"
                                >
                                    {content}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href || '#'}
                                className="flex flex-col items-center gap-2 hover:text-accent transition-colors group"
                            >
                                {content}
                            </Link>
                        );
                    })}
                </div>
                <div className="flex items-center justify-center gap-8 py-3 border-t border-primary-foreground/20">
                    {subMenuItems.map((item) => {
                         const isExternal = item.href && item.href.startsWith('http');
                         const isModal = item.modalName !== undefined;

                         const content = (
                             <>
                                 <div className="p-3 rounded-lg bg-white group-hover:bg-gray-100 transition-colors">
                                     <Image src={item.iconSrc} alt={item.label} width={16} height={16} />
                                 </div>
                                 <span className="text-sm">{item.label}</span>
                             </>
                         );

                         if (isModal) {
                             return (
                                 <div
                                     key={item.label}
                                     onClick={(e) => handleItemClick(item.modalName!, e)}
                                     className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer"
                                 >
                                     {content}
                                 </div>
                             );
                         }

                         return (
                             <Link
                                 key={item.label}
                                 href={item.href || '#'}
                                 className="flex items-center gap-2 hover:text-accent transition-colors"
                                 target={isExternal ? "_blank" : undefined}
                                 rel={isExternal ? "noopener noreferrer" : undefined}
                             >
                                 {content}
                             </Link>
                         );
                    })}
                </div>
            </div>

            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
            <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} />
            <KontakModal isOpen={isKontakModalOpen} onClose={() => setIsKontakModalOpen(false)} />
            <PengaduanModal isOpen={isPengaduanModalOpen} onClose={() => setIsPengaduanModalOpen(false)} />
            <LayananModal isOpen={isLayananModalOpen} onClose={() => setIsLayananModalOpen(false)} />
            <SurveiKepuasanModal isOpen={isSurveiKepuasanModalOpen} onClose={() => setIsSurveiKepuasanModalOpen(false)} />
            <SurveiKorupsiModal isOpen={isSurveiKorupsiModalOpen} onClose={() => setIsSurveiKorupsiModalOpen(false)} />
        </nav>
    );
}