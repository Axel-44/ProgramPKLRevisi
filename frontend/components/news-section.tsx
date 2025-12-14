// src/components/news-section.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewsModal from "@/src/components/BeritaModal";

// Definisikan tipe data untuk objek Berita
interface Berita {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_at: string;
  kategori: string;
}

const API_BASE_URL = "http://127.0.0.1:8000/api";

export function NewsSection() {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Berita | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/berita-kategori`);
        if (!response.ok) throw new Error("Gagal memuat kategori");
        const result = await response.json();
        setCategories(result.data);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBerita = async () => {
      setLoading(true);
      setError(null);
      let url = `${API_BASE_URL}/berita`;
      
      if (selectedCategory !== "Semua") {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }

      try {
        const response = await fetch(url);
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
  }, [selectedCategory]);

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
  
  const featuredNews = berita.length > 0 ? berita[0] : null;
  const otherNews = berita.length > 1 ? berita.slice(1, 4) : [];

  const renderContent = () => {
    if (loading) {
      return <p className="text-center pt-10">Memuat berita...</p>;
    }
    if (error) {
      return <p className="text-center pt-10 text-red-500">{error}</p>;
    }
    if (berita.length === 0) {
      return <p className="text-center pt-10">Tidak ada berita yang dapat ditampilkan.</p>;
    }
    
    return (
      <div className="space-y-8">
        {featuredNews && (
          <div
            key={featuredNews.id}
            onClick={() => handleNewsClick(featuredNews)}
            className="flex flex-col md:flex-row gap-6 p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative w-full md:w-1/2 h-64 md:h-auto flex-shrink-0">
              <Image
                src={featuredNews.image_url || "/placeholder.svg"}
                alt={featuredNews.title}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">{featuredNews.title}</h3>
              <p className="text-muted-foreground text-base mb-4">{featuredNews.excerpt}</p>
              <p className="text-sm text-muted-foreground">{formatDate(featuredNews.published_at)}</p>
            </div>
          </div>
        )}

        {otherNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.map((news) => (
              <div
                key={news.id}
                onClick={() => handleNewsClick(news)}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={news.image_url || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-md mb-2 truncate">{news.title}</h4>
                  <p className="text-xs text-muted-foreground">{formatDate(news.published_at)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-transparent border-none shadow-none h-full flex flex-col">
      <CardHeader>
        <div className="flex gap-2">
          {/* Tombol 'Semua Berita' dengan warna biru */}
          <Button
            variant={selectedCategory === "Semua" ? "default" : "outline"}
            onClick={() => setSelectedCategory("Semua")}
            className={selectedCategory === "Semua" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
          >
            Semua Berita
          </Button>
          {/* Tombol kategori lainnya dengan warna biru */}
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col"> 
        <div className="flex-grow">
          {renderContent()}
        </div>
        
        {berita.length > 4 && (
          <div className="text-center mt-8">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/berita">Selengkapnya</Link>
            </Button>
          </div>
        )}
      </CardContent>

      <NewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newsItem={selectedNews}
      />
    </Card>
  );
}