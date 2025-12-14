// src/components/SurveiKepuasanModal.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface SurveiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SurveiKepuasanModal({ isOpen, onClose }: SurveiModalProps) {
    if (!isOpen) return null;

    const surveiUrl = "https://bkad.kotabogor.go.id/ikm/tamu";

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div 
                className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-11/12"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
                <div className="text-center">
                    <div className="p-6 text-blue-900 border-b border-gray-200 mb-6">
                        <h3 className="font-bold text-2xl mb-2">Survei Kepuasan Masyarakat</h3>
                        <p className="text-sm">
                            Survei ini bertujuan untuk mengukur tingkat kepuasan masyarakat terhadap kualitas pelayanan publik yang diberikan oleh BKAD Kota Bogor.
                        </p>
                    </div>
                    
                    <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-2">Jenis Layanan:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>Layanan SPM</li>
                            <li>Surat Masuk</li>
                            <li>Tamu</li>
                        </ul>
                    </div>

                    <Link
                        href={surveiUrl}
                        className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                    >
                        Isi Survei Kepuasan
                    </Link>
                </div>
            </div>
        </div>
    );
}