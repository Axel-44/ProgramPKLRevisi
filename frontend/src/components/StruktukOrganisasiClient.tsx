"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { FullWidthBanner } from '@/components/FullWidthBanner';
import { StrukturOrganisasiView } from './StrukturOrganisasiView';
import ProfileModal from './ProfilModal';
import { Pejabat } from './OrganogramChart';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

interface StrukturOrganisasiClientProps {
    initialOrganogramData: Pejabat[];
}

export function StrukturOrganisasiClient({ initialOrganogramData }: StrukturOrganisasiClientProps) {
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
            <FullWidthBanner />
            <div className="bg-blue-600 text-white py-2 px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <Link href="/" className="text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </Link>
                    <span className="text-sm">/</span>
                    <div onClick={handleOpenProfileModal} className="cursor-pointer text-sm hover:underline">
                        <span>PROFIL</span>
                    </div>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">STRUKTUR ORGANISASI</span>
                </div>
            </div>
            <div className="container mx-auto py-8 text-center">
                <h1 className="text-3xl font-serif font-bold text-blue-900">
                    STRUKTUR ORGANISASI <span className="text-blue-600">BKAD Kota Bogor</span>
                </h1>
                <div className="w-32 h-1 bg-blue-600 mx-auto mt-2" />
            </div>

            <StrukturOrganisasiView initialOrganogramData={initialOrganogramData} />
            
            <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />
        </main>
    );
}