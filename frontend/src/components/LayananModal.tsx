"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LayananModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const layananItems = [
    { name: "Simasda", iconSrc: "/icons/simasda.gif", href: "https://simasda.kotabogor.go.id/" },
    { name: "Kunjungan Kerja", iconSrc: "/icons/kunjungan kerja.gif", href: "https://bkad.kotabogor.go.id/surat-masuk/create-surat-kunjungan-kerja" },
    { name: "E-Sewa Bmd", iconSrc: "/icons/e sewa.gif", href: "https://simasda.kotabogor.go.id/sewa/aset/manfaat/sewa" },
    { name: "Smart BKAD", iconSrc: "/icons/logo-bkad-kota-bogor.png", href: "https://bkad.kotabogor.go.id/" },
];

const LayananModal: React.FC<LayananModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();

    if (!isOpen) {
        return null;
    }

    const handleItemClick = (href: string, isExternal: boolean) => {
        onClose();
        if (!isExternal) {
            router.push(href);
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
         
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-11/12" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Layanan</h3>
                    <div className="flex justify-center gap-8">
                        {layananItems.map((item) => {
                            const isExternal = item.href.startsWith('http');
                            return isExternal ? (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => handleItemClick(item.href, true)}
                                >
                                    <Image src={item.iconSrc} alt={item.name} width={64} height={64} />
                                    <span className="mt-2 text-sm font-medium text-gray-700">{item.name}</span>
                                </a>
                            ) : (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                    onClick={() => handleItemClick(item.href, false)}
                                >
                                    <Image src={item.iconSrc} alt={item.name} width={64} height={64} />
                                    <span className="mt-2 text-sm font-medium text-gray-700">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayananModal;