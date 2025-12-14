"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ProfileModal from '@/src/components/ProfilModal'; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Pejabat {
    id: number;
    nama: string;
    jabatan: string;
    gambar_url: string | null;
}

interface DataPejabatViewProps {
    pejabatList: Pejabat[];
}

export function DataPejabatView({ pejabatList }: DataPejabatViewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="bg-blue-600 text-white py-2 px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-1 text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </Link>
                    <span className="text-sm">/</span>
                    <div onClick={handleProfileClick} className="cursor-pointer text-sm hover:underline">
                        <span>PROFIL</span>
                    </div>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">DATA PEJABAT</span>
                </div>
            </div>
            <div className="container mx-auto py-8 text-center">
                <h1 className="text-3xl font-bold text-blue-900">
                    DATA PEJABAT <span className="text-blue-600">BKAD KOTA BOGOR</span>
                </h1>
                <div className="w-48 h-1 bg-blue-600 mx-auto mt-2" />
            </div>
            <div className="container mx-auto pb-12 px-4">
                <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
                    <Table>
                        <TableCaption className="py-4">Daftar nama dan jabatan pejabat.</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-[80px] text-center font-semibold">No.</TableHead>
                                <TableHead className="font-semibold">Nama</TableHead>
                                <TableHead className="font-semibold">Jabatan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pejabatList && pejabatList.length > 0 ? (
                                pejabatList.map((pejabat, index) => (
                                    <TableRow key={pejabat.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium text-center">{index + 1}</TableCell>
                                        <TableCell>{pejabat.nama}</TableCell>
                                        <TableCell>{pejabat.jabatan}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                                        Tidak ada data untuk ditampilkan.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            
            <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}