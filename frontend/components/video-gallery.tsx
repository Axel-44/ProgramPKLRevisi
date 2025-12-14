"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from 'next/link'; // Pastikan Link diimpor

interface Video {
    id: number;
    title: string;
    description: string | null;
    type: 'file' | 'youtube';
    source_url: string | null;
    youtube_video_id: string | null;
    thumbnail_url: string | null;
}

const API_URL = "http://127.0.0.1:8000/api/videos";

export function VideoGallery() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error("Gagal mengambil data video dari server.");
                }
                const result = await response.json();
                setVideos(result.data);
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching videos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    const handlePlayVideo = (video: Video) => {
        setSelectedVideo(video);
    };

    const closeModal = () => {
        setSelectedVideo(null);
    };

    if (loading) {
        return <section className="py-12 text-center">Memuat video...</section>;
    }

    if (error) {
        return <section className="py-12 text-center text-red-500">Terjadi kesalahan: {error}</section>;
    }
    
    // Memastikan hanya dua video yang ditampilkan
    const displayedVideos = videos.slice(0, 2);

    return (
        <>
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif text-center">Video Terbaru</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {displayedVideos.length === 0 ? (
                                <p className="text-gray-500 text-center">Tidak ada video yang tersedia.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {displayedVideos.map((video) => (
                                        <div key={video.id} className="group cursor-pointer" onClick={() => handlePlayVideo(video)}>
                                            <div className="relative overflow-hidden rounded-lg aspect-video shadow-md bg-gray-200">
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
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-colors">
                                                    {/* Play button dengan warna merah */}
                                                    <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                                                        <Play size={24} className="text-white ml-1" fill="currentColor" />
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 className="mt-2 text-sm font-medium text-center">{video.title}</h3>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Modal Video Player */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-black rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="aspect-video bg-black flex items-center justify-center">
                            {selectedVideo.type === 'youtube' && selectedVideo.youtube_video_id ? (
                                <iframe
                                    className="w-full h-full rounded-t-lg"
                                    src={`https://www.youtube.com/embed/${selectedVideo.youtube_video_id}?autoplay=1&rel=0`}
                                    title={selectedVideo.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <video className="w-full h-full rounded-t-lg" controls autoPlay src={selectedVideo.source_url ?? ''}>
                                    Browser Anda tidak mendukung tag video.
                                </video>
                            )}
                        </div>
                        <div className="p-4 bg-white rounded-b-lg">
                            <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                            {selectedVideo.description && (
                                <p className="text-sm text-gray-600 mt-2">{selectedVideo.description}</p>
                            )}
                        </div>
                        <button
                            className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center text-xl font-bold border-2 border-white"
                            onClick={closeModal}
                            aria-label="Tutup"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}