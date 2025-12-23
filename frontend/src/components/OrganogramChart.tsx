"use client";

import React from 'react';
import Image from 'next/image';
import { Tree, TreeNode } from 'react-organizational-chart';

// Definisikan tipe data agar sesuai dengan API dari backend
export interface Pejabat {
    id: number;
    nama: string;
    jabatan: string;
    gambar_url: string | null;
    children: Pejabat[];
}

// Komponen kecil untuk styling kartu pejabat (card)
const PejabatCard = ({ pejabat }: { pejabat: Pejabat }) => (
    <div className="inline-flex flex-col items-center">
        <div className="bg-white border-2 border-blue-100 rounded-xl shadow-md p-4 w-60 text-center hover:shadow-xl hover:border-blue-500 transition-all duration-300">
            <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                    src={pejabat.gambar_url || '/placeholder-avatar.png'} 
                    alt={pejabat.nama}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-sm"
                />
            </div>
          
            <h3 className="font-bold text-sm text-blue-600 leading-tight">
                {pejabat.jabatan}
            </h3>
            
            <p className="text-black font-bold mt-1">
                {pejabat.nama}
            </p>
        </div>
    </div>
);

// Fungsi rekursif untuk mengubah data JSON Anda menjadi komponen TreeNode
const renderTreeNodes = (pejabat: Pejabat) => (
    <TreeNode key={pejabat.id} label={<PejabatCard pejabat={pejabat} />}>
        {pejabat.children && pejabat.children.map(renderTreeNodes)}
    </TreeNode>
);

// Komponen Utama yang akan Anda panggil di halaman
interface OrganogramChartProps {
  data: Pejabat[];
}

export function OrganogramChart({ data }: OrganogramChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-center p-8">Data struktur organisasi tidak tersedia.</div>;
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg overflow-x-auto">
        <Tree
            lineWidth={'2px'}
            lineColor={'#cbd5e1'} // Warna abu-abu muda
            lineBorderRadius={'10px'}
            label={<div className="font-bold text-lg text-blue-900">Struktur Organisasi BKAD</div>}
        >
            {data.map(renderTreeNodes)}
        </Tree>
    </div>
  );
}