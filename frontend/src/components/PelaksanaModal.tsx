// src/components/PelaksanaModal.tsx

"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface Pelaksana {
    id: number;
    name: string;
    position: string;
    image_url: string;
}

interface PelaksanaModalProps {
    isOpen: boolean;
    onClose: () => void;
    pelaksana: Pelaksana | null;
}

export function PelaksanaModal({ isOpen, onClose, pelaksana }: PelaksanaModalProps) {
    if (!isOpen || !pelaksana) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    <X size={24} />
                </button>
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                        <Image src={pelaksana.image_url} alt={pelaksana.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900">{pelaksana.name}</h3>
                    <p className="text-sm text-gray-600">{pelaksana.position}</p>
                </div>
                <div className="mt-4 pt-4 border-t text-gray-700">
                    <p>Ini adalah detail lebih lanjut tentang {pelaksana.name}.</p>
                    {/* Tambahkan informasi lain di sini */}
                </div>
            </div>
        </div>
    );
}