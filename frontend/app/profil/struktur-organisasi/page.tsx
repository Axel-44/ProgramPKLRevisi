import React from 'react';
import { Poppins } from 'next/font/google';
import { Pejabat } from '@/src/components/OrganogramChart';
import { StrukturOrganisasiClient } from '@/src/components/StruktukOrganisasiClient';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

const API_ORGANOGRAM_URL = "http://127.0.0.1:8000/api/struktur-organisasi";

async function getOrganogramData(): Promise<Pejabat[]> {
    try {
        const response = await fetch(API_ORGANOGRAM_URL, { cache: 'no-store' });
        if (!response.ok) {
            console.error('Gagal mengambil data struktur organisasi dari API.');
            return [];
        }
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data organogram:", error);
        return [];
    }
}

export default async function StrukturOrganisasiPage() {
    const organogramData = await getOrganogramData();
    return <StrukturOrganisasiClient initialOrganogramData={organogramData} />;
}