import React from 'react';
import { Poppins } from 'next/font/google';
import { FullWidthBanner } from '@/components/FullWidthBanner';
import { DataPejabatView } from '@/src/components/DataPejabatView';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});


interface PejabatHierarki {
    id: number;
    nama: string;
    jabatan: string;
    gambar_url: string | null;
    children: PejabatHierarki[];
}

const API_URL = "http://127.0.0.1:8000/api/struktur-organisasi";

function flattenHierarki(nodes: PejabatHierarki[]): PejabatHierarki[] {
    let list: PejabatHierarki[] = [];
    for (const node of nodes) {
        list.push(node);
        if (node.children && node.children.length > 0) {
            list = list.concat(flattenHierarki(node.children));
        }
    }
    return list;
}

async function getPejabatList(): Promise<PejabatHierarki[]> {
    try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) {
            console.error('Gagal mengambil data pejabat.');
            return [];
        }
        const result = await response.json();
        return flattenHierarki(result.data || []);
    } catch (error) {
        console.error("Error fetching pejabat:", error);
        return [];
    }
}

export default async function DataPejabatPage() {
    const pejabatList = await getPejabatList();

    return (
        <main className={`bg-gray-100 min-h-screen ${poppins.className}`}>
            <FullWidthBanner />
           
            <DataPejabatView pejabatList={pejabatList} />
        </main>
    );
}

