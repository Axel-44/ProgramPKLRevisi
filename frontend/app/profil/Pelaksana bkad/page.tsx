"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PelaksanaModal } from '@/src/components/PelaksanaModal'; // Impor modal baru

interface Pelaksana {
    id: number;
    name: string;
    position: string;
    image_url: string;
}

const pelaksanaData: Pelaksana[] = [
    { id: 1, name: "RINA LATIFAH S.E., AK", position: "Bendahara", image_url: "/images/rina-latifah.jpg" },
    { id: 2, name: "NASIKAH S.Kom", position: "Bendahara", image_url: "/images/nasikah.jpg" },
    { id: 3, name: "RADHA RIKA APRIANTI S.HUT., M.Si", position: "Bendahara", image_url: "/images/radha-rika.jpg" },
    { id: 4, name: "DANI DARMAWAN S.I.P", position: "Analis Aset Daerah", image_url: "/images/dani-darmawan.jpg" },
];

const PelaksanaCard: React.FC<{ data: Pelaksana, onClick: () => void }> = ({ data, onClick }) => (
    <div
        className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500 cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={onClick}
    >
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
            <Image src={data.image_url} alt={data.name} fill className="object-cover" />
        </div>
        <div className="text-center">
            <p className="text-sm font-semibold text-blue-900">{data.name}</p>
            <p className="text-xs text-gray-500">{data.position}</p>
        </div>
    </div>
);

export default function PelaksanaBKADPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPelaksana, setSelectedPelaksana] = useState<Pelaksana | null>(null);

    const handleCardClick = (person: Pelaksana) => {
        setSelectedPelaksana(person);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPelaksana(null);
    };

    return (
        <main className="bg-gray-100 min-h-screen">
            <div className="bg-blue-600 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <Link href="/" className="text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </Link>
                    <span className="text-sm">/</span>
                    <Link href="/profil" className="text-sm hover:underline">
                        <span>PROFIL</span>
                    </Link>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">PELAKSANA BKAD</span>
                </div>
            </div>

            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-center text-blue-900 mb-8">
                    PELAKSANA <span className="text-blue-600">BKAD</span>
                </h1>
                
                <div className="flex flex-col items-center gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                        {pelaksanaData.slice(0, 2).map((person) => (
                            <PelaksanaCard key={person.id} data={person} onClick={() => handleCardClick(person)} />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                        {pelaksanaData.slice(2, 4).map((person) => (
                            <PelaksanaCard key={person.id} data={person} onClick={() => handleCardClick(person)} />
                        ))}
                    </div>
                </div>
            </div>

            <PelaksanaModal isOpen={isModalOpen} onClose={handleCloseModal} pelaksana={selectedPelaksana} />
        </main>
    );
}