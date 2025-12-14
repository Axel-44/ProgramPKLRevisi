"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import BeritaModal from "@/src/components/BeritaModal"; 

interface Berita {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_at: string;
  kategori: string;
}

// SUDAH BENAR: Terhubung ke backend lokal Anda
const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function BeritaPage() {
    const [berita, setBerita] = useState<Berita[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<Berita | null>(null);

    useEffect(() => {
        const fetchBerita = async () => {
            setLoading(true);
            setError(null);
            try {
                // SUDAH BENAR: Mengambil data dari /api/berita
                const response = await fetch(`${API_BASE_URL}/berita`);
                if (!response.ok) throw new Error("Gagal memuat berita");
                const result = await response.json();
                setBerita(result.data.data);
            } catch (err: any) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBerita();
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const handleNewsClick = (newsItem: Berita) => {
        setSelectedNews(newsItem);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedNews(null);
    };

    const featuredNews = berita[0];
    const otherNews = berita.slice(1, 7);

    if (loading) {
        return (
            <main className="bg-white min-h-screen flex items-center justify-center">
                <p>Memuat berita...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-white min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            {/* Header dengan Logo dan Nama Website */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image src="/logo-bkad-kota-bogor.png" alt="Logo BKAD" fill className="object-cover" />
                        </div>
                        <div className="text-blue-900">
                            <h1 className="text-xl font-bold">WEBSITE BKAD</h1>
                            <p className="text-sm">KOTA BOGOR</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Breadcrumb / Navigasi Atas */}
            <div className="bg-blue-600 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-1 text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </Link>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">BERITA</span>
                </div>
            </div>

            {/* Featured Post Section (di dalam container) */}
            <div className="container mx-auto px-4 py-8">
                {featuredNews && (
                    <div className="relative w-full h-[300px] bg-gray-200 cursor-pointer" onClick={() => handleNewsClick(featuredNews)}>
                        <Image
                            src={featuredNews.image_url}
                            alt={featuredNews.title}
                            fill
                            className="object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-end p-6 text-white rounded-lg">
                            <div className="max-w-xl">
                                <h2 className="text-sm font-semibold mb-2">FEATURED</h2>
                                <h1 className="text-2xl font-bold leading-tight">
                                    {featuredNews.title}
                                </h1>
                                <p className="mt-2 text-sm max-w-md">{featuredNews.excerpt}</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNewsClick(featuredNews); }}
                                    className="mt-3 text-sm text-blue-400 hover:text-blue-200"
                                >
                                    Baca Selengkapnya
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Stories Section */}
            <div className="container mx-auto py-12 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold border-b-2 border-blue-600 inline-block">
                        CERITA TERBARU
                    </h2>
                    <Link href="/">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Kembali ke Beranda
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {otherNews.map((news) => (
                        <Card key={news.id} className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleNewsClick(news)}>
                            <div className="relative h-36 w-full">
                                <Image
                                    src={news.image_url}
                                    alt={news.title}
                                    fill
                                    className="object-cover rounded-t-lg"
                                />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-base mb-1">{news.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{news.excerpt}</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNewsClick(news); }}
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    Baca Selengkapnya
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <BeritaModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                newsItem={selectedNews}
            />
        </main>
    );
}