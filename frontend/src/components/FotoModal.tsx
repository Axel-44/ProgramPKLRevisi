// src/components/FotoModal.tsx

"use client";

import React from 'react';
import Image from "next/image";


interface Photo {
    id: number;
    title: string;
    caption: string | null;
    file_path: string;
    url: string;
}

interface FotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    photos: Photo[];
}

export function FotoModal({ isOpen, onClose, photos }: FotoModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-xl relative w-full max-w-5xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-3xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h3 className="text-2xl font-serif font-bold text-center mb-6">Galeri Foto Lengkap</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh]">
                    {photos.map((photo) => (
                        <div key={photo.id} className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                                src={photo.url}
                                alt={photo.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                                <p className="text-white text-sm font-medium">{photo.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}