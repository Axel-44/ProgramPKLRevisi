"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const modalItems = [
    { name: "Visi dan Misi", iconSrc: "/icons/visi misi.gif", href: "/profil/visi-misi" },
    { name: "Data Pejabat", iconSrc: "/icons/data pejabar.gif", href: "/profil/data-pejabat" },
    { name: "Struktur Organisasi", iconSrc: "/icons/struktur organisasi.gif", href: "/profil/struktur-organisasi" },
    { name: "Tugas Pokok & Fungsi", iconSrc: "/icons/tugas dan fungsi.gif", href: "/profil/tugas-pokok-dan-fungsi" },
    { name: "Pelaksana BKAD", iconSrc: "/icons/pelaksana.gif", href: "/profil/pelaksana-bkad" },
];

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-11/12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>

                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Profil</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {modalItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={onClose}
                            >
                                <Image src={item.iconSrc} alt={item.name} width={64} height={64} />
                                <span className="mt-2 text-sm font-medium text-gray-700">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;