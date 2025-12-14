"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { FullWidthBanner } from '@/components/FullWidthBanner';
import ProfileModal from '@/src/components/ProfilModal';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});


interface VisiMisiData {
  visi: string;
  misi: string;
}

export default function VisiMisiPage() {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    

    const [data, setData] = useState<VisiMisiData | null>(null);
    const [loading, setLoading] = useState(true);

 
    const API_URL = "http://127.0.0.1:8000/api/visi-misi";

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil data:", err);
                setLoading(false);
            });
    }, []);

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
                    <span className="text-sm font-bold">VISI DAN MISI</span>
                </div>
            </div>

            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-blue-900 mb-8">
                    VISI DAN MISI <span className="text-blue-600">BKAD Kota Bogor</span>
                </h1>


                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-500">Memuat data visi misi...</p>
                    </div>
                ) : (
                    <>
                        {/* BAGIAN VISI */}
                        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md border-t-4 border-blue-500 mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-800">VISI BKAD</h2>
                            <p className="text-gray-700 leading-relaxed text-lg italic">
                                "{data?.visi || 'Data Visi belum diisi'}"
                            </p>
                        </div>

                        {/* BAGIAN MISI */}
                        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md border-t-4 border-blue-500">
                            <h2 className="text-2xl font-bold mb-4 text-blue-800">MISI BKAD</h2>
                            <div 
                                className="text-gray-700 leading-relaxed prose max-w-none [&>ul]:list-disc [&>ul]:list-inside [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:list-inside"
                                dangerouslySetInnerHTML={{ __html: data?.misi || '<p>Data Misi belum diisi</p>' }} 
                            />
                        </div>
                    </>
                )}
            </div>

            <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />
        </main>
    );
}