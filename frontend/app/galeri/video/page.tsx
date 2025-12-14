// app/galeri/video/page.tsx

"use client";

// PERBAIKAN: Gunakan kurung kurawal {} untuk mengimpor hooks
import { useState, useEffect } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { HeroSection } from "@/components/hero-section";

// Definisikan tipe data LENGKAP agar cocok dengan output API
interface Video {
  id: number;
  title: string;
  description: string | null;
  type: 'file' | 'youtube';
  source_url: string | null;
  youtube_video_id: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

const API_URL = "http://127.0.0.1:8000/api/videos";

export default function VideoGalleryPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // State untuk modal: kita simpan seluruh objek video
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data video.");
                }
                const result = await response.json();
                setVideos(result.data); // Langsung gunakan data dari API
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching videos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const handleOpenModal = (video: Video) => {
        setSelectedVideo(video); // Simpan seluruh objek video
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    if (loading) {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <p>Memuat video...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-gray-100 min-h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    return (
        <main className="bg-white min-h-screen">
            {/* HEADER BANNER DINAMIS DARI API */}
            <HeroSection />

            {/* BREADCRUMB */}
            <div className="bg-blue-600 text-white py-2 px-8">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-1 text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </Link>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">Video</span>
                </div>
            </div>

            {/* JUDUL */}
            <div className="container mx-auto py-8 text-center">
                <h1 className="text-3xl font-serif font-bold text-blue-900">
                    Video <span className="text-blue-600">BKAD Kota Bogor</span>
                </h1>
                <div className="w-48 h-1 bg-blue-600 mx-auto mt-2" />
            </div>

            {/* Grid untuk semua video */}
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            onClick={() => handleOpenModal(video)}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden rounded-lg shadow-md aspect-video bg-gray-300">
                                {video.thumbnail_url ? (
                                    <Image 
                                        src={video.thumbnail_url} 
                                        alt={video.title} 
                                        fill 
                                        className="object-cover transition-transform duration-300 group-hover:scale-105" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Play size={48} className="text-gray-400" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Play size={64} className="text-white/90" />
                                </div>
                            </div>
                            <h3 className="mt-3 font-semibold text-gray-800">{video.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Player */}
            {selectedVideo && (
              <div 
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={handleCloseModal}
              >
                <div 
                  className="relative bg-black rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="aspect-video">
                    {selectedVideo.type === 'youtube' && selectedVideo.youtube_video_id ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}?autoplay=1&rel=0`}
                        title={selectedVideo.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-t-lg"
                      ></iframe>
                    ) : (
                      <video className="w-full h-full rounded-t-lg" controls autoPlay src={selectedVideo.source_url ?? ''}>
                        Browser Anda tidak mendukung tag video.
                      </video>
                    )}
                  </div>
                  <div className="p-4 bg-white rounded-b-lg">
                    <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                  </div>
                  <button 
                    className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold border-2 border-white"
                    onClick={handleCloseModal}
                    aria-label="Tutup"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}

            {/* FOOTER */}
            <footer className="bg-[#cce7f0] text-gray-800 py-10">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">BKAD Kota Bogor</h3>
                    <p className="text-sm">
                    Badan Keuangan dan Aset Daerah Kota Bogor berkomitmen memberikan
                    pelayanan terbaik dalam pengelolaan keuangan dan aset daerah dengan
                    prinsip transparansi dan akuntabilitas.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
                    <p className="text-sm">Jl. Ir. H. Juanda No. 10, Bogor Tengah</p>
                    <p className="text-sm">Kota Bogor, Jawa Barat 16121</p>
                    <p className="text-sm">(0251) 8321075</p>
                    <p className="text-sm">bkad@kotabogor.go.id</p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">Jam Pelayanan</h4>
                    <p className="text-sm">Senin - Jumat: 08:00 - 16:00 WIB</p>
                    <p className="text-sm">Sabtu - Minggu: Tutup</p>
                </div>
                </div>
                <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
                © 2025 BKAD Kota Bogor. Seluruh hak cipta dilindungi undang-undang.
                </div>
            </footer>
        </main>
    );
}