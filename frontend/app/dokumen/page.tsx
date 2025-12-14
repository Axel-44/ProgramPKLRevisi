"use client";

import React, { useEffect, useState } from 'react';
import { Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface KategoriDokumenInfo {
    id: number;
    nama_kategori: string;
}

interface RilisKategoriInfo {
    id: number;
    nama: string;
}

interface Dokumen {
    id: number;
    title: string;
    file_path: string; 
    created_at: string;
    tanggal_dokumen?: string;
    tahun: number; 
    kategori_dokumen?: KategoriDokumenInfo;
    rilis_kategori?: RilisKategoriInfo;
}


const API_BASE_URL = "http://127.0.0.1:8000/api";
const STORAGE_URL = "http://127.0.0.1:8000/storage/";

export default function DokumenPage() {
    const [documents, setDocuments] = useState<Dokumen[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tanggalFilter, setTanggalFilter] = useState<string>("");
    const [rilisFilter, setRilisFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                
                
                if (searchTerm) {
                    params.append('search', searchTerm);
                }
                if (tanggalFilter) {
                    params.append('tanggal_dokumen', tanggalFilter);
                }
                if (rilisFilter) {
                    params.append('rilis_kategori_id', rilisFilter);
                }
                params.append('page', currentPage.toString());

                console.log("Mengambil data dari:", `${API_BASE_URL}/dokumens?${params.toString()}`);


                const response = await fetch(`${API_BASE_URL}/dokumen?${params.toString()}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                console.log("Hasil Data:", result); 
                
                if (result.success) {
                    setDocuments(result.data.data);
                    setTotalPages(result.data.last_page);
                } else {
                    setDocuments([]);
                }

            } catch (error) {
                console.error("Gagal mengambil data:", error);
                setDocuments([]);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchDocuments();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, tanggalFilter, rilisFilter, currentPage]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    const renderHeader = () => (
        <>
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <div className="flex items-center gap-4">
                        <img src="/logo-bkad-kota-bogor.png" alt="Logo BKAD" className="w-12 h-12 object-cover rounded-full" />
                        <div className="text-blue-900">
                            <h1 className="text-xl font-bold">PORTAL BKAD</h1>
                            <p className="text-sm">KOTA BOGOR</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="bg-blue-600 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex items-center gap-2">
                    <a href="/" className="flex items-center gap-1 text-sm hover:underline">
                        <span>🏠 HOME</span>
                    </a>
                    <span className="text-sm">/</span>
                    <span className="text-sm font-bold">DOKUMEN & ARSIP</span>
                </div>
            </div>
            <div className="bg-white p-6 md:p-12 shadow-md border-b">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">DOKUMEN PUBLIK</h1>
                        <p className="text-gray-500">Arsip Laporan Kinerja dan Dokumen Resmi Lainnya</p>
                    </div>
                    <img src="/icons/logo kota bogor.jpg" alt="Icon" className="w-24 h-24 object-contain hidden md:block" />
                </div>
            </div>
        </>
    );

    const renderContent = () => (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-50">
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex-1 w-full md:w-auto">
                        <a href="/">
                            <Button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold w-full md:w-auto">
                                ← Kembali
                            </Button>
                        </a>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-auto md:w-64">
                            <Input 
                                type="text" 
                                placeholder="Cari Judul" 
                                className="pl-10 border-2 border-blue-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-md transition-all duration-200"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
                        </div>
                        
                        <div className="flex-1 md:flex-auto md:w-48">
                            <Input 
                                type="date" 
                                className="border-2 border-blue-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-md transition-all duration-200"
                                value={tanggalFilter}
                                onChange={(e) => {
                                    setTanggalFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        
                        <select
                            value={rilisFilter}
                            onChange={(e) => {
                                setRilisFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="flex-1 md:flex-auto md:w-48 px-3 py-2 border-2 border-blue-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-blue-600 rounded-md transition-all duration-200"
                        >
                            <option value="">Semua Kategori Rilis</option>
                            <option value="1">Pertahun</option>
                            <option value="2">Perbulan</option>
                            <option value="3">Perminggu</option>
                        </select>
                    </div>
                </div>
              <div className="border border-blue-100 rounded-lg overflow-hidden">
                    <div className="bg-blue-600 text-white rounded-t-lg">
                        <div className="grid grid-cols-[50px_1.5fr_2fr_1.5fr_1.2fr_1fr] px-6 py-3 text-xs font-medium uppercase tracking-wider">
                            <div className="text-left">No</div>
                            <div className="text-left hidden md:block">Kategori</div>
                            <div className="text-left">Judul Dokumen</div>
                            <div className="text-left">Tanggal</div>
                            <div className="text-left">Kategori Rilis</div>
                            <div className="text-center">Aksi</div>
                        </div>
                    </div>

                    <div className="divide-y divide-blue-50 bg-white">
                        {loading ? (
                            <p className="text-center p-8 text-gray-500">Memuat data...</p>
                        ) : documents.length > 0 ? (
                            documents.map((doc, index) => (
                                <div key={doc.id} className="grid grid-cols-[50px_1.5fr_2fr_1.5fr_1.2fr_1fr] text-sm items-center px-6 py-4 hover:bg-blue-50 transition">
                                    <div className="font-medium text-gray-900">{index + 1 + (currentPage - 1) * 10}</div>
                                    
                                    <div className="hidden md:block">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                            doc.kategori_dokumen?.nama_kategori === 'LKIP' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                            doc.kategori_dokumen?.nama_kategori === 'RENJA' ? 'bg-green-100 text-green-700 border border-green-200' :
                                            'bg-gray-100 text-gray-700 border border-gray-200'
                                        }`}>
                                            {doc.kategori_dokumen?.nama_kategori || 'Umum'}
                                        </span>
                                    </div>

                                    <div className="text-gray-800 font-medium">{doc.title}</div>
                                    <div className="text-gray-600">{doc.tanggal_dokumen ? formatDate(doc.tanggal_dokumen) : '-'}</div>
                                    <div>
                                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                                            {doc.rilis_kategori?.nama || '-'}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <a href={`${STORAGE_URL}${doc.file_path}`} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                                                <Download size={16} className="mr-1" /> Unduh
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-10 text-gray-500 italic bg-gray-50">
                                {searchTerm ? `Tidak ada dokumen ditemukan untuk "${searchTerm}"` : "Tidak ada dokumen yang tersedia."}
                            </div>
                        )}
                    </div>
                </div>

                {!loading && totalPages > 1 && (
                    <div className="mt-6 flex justify-between items-center text-sm">
                        <Button 
                            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-400"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        
                        <span className="font-medium text-blue-900">
                            Halaman <span className="font-bold">{currentPage}</span> dari {totalPages}
                        </span>
                        
                        <Button 
                            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-400"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    return (

        <main className="bg-gray-100 min-h-screen">
            {renderHeader()}
            {renderContent()}
        </main>
    );
}