"use client";

import React from 'react';
import Image from "next/image";

interface KontakModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const kontakItems = [
   
    { name: "WhatsApp", iconSrc: "/icons/whatsapp.gif", href: "https://api.whatsapp.com/send?phone=6281918846511&text=Halo%20Admin%20Saya%20Mau%20Buat%20Surat%20Kunjungan%20Kerja" },
    { name: "Instagram", iconSrc: "/icons/instagram.gif", href: "https://www.instagram.com/bkadkotabogor" },
];

const KontakModal: React.FC<KontakModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div 
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-11/12" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-4">Kontak</h3>
                    <div className="flex justify-center gap-12"> 
                        {kontakItems.map((item) => (
                            <a 
                                key={item.name} 
                                href={item.href} 
                                className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={onClose} 
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

export default KontakModal;