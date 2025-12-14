"use client";

import React from 'react';
import Image from "next/image";

interface GalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const galleryItems = [
    { name: "Foto", iconSrc: "/icons/foto.gif", href: "/galeri/foto" },
    { name: "Video", iconSrc: "/icons/video.gif", href: "/galeri/video" },
];

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-11/12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Galeri</h3>
                    <div className="flex justify-center gap-8">
                        {galleryItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <Image src={item.iconSrc} alt={item.name} width={64} height={64} />
                                <span className="mt-2 text-sm font-medium text-gray-700">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;