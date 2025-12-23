"use client";

import React, { useEffect, useState } from 'react';
import { Download, Search, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// --- Interfaces (Sesuaikan dengan data dari API) ---
interface Kategori {
    id: number;
    nama_kategori: string;
}

interface User {
    id: number;
    name: string;
}

interface Dokumen {
    id: number;
    title: string;
    file_path: string;
    created_at: string;
    tanggal_dokumen: string; // Tanggal input manual
    tahun: string | number;  // Tahun input manual
    kategori_dokumen?: { nama_kategori: string };
    rilis_kategori?: { nama: string };
    user?: User; // Data uploader
}

// --- Konfigurasi API ---
const API_BASE_URL = "http://127.0.0.1:8000/api";
const STORAGE_URL = "http://127.0.0.1:8000/storage/";

export default function DokumenPage() {
    // State Data
    const [documents, setDocuments] = useState<Dokumen[]>([]);
    const [categories, setCategories] = useState<Kategori[]>([]);
    const [loading, setLoading] = useState(true);

    // State Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // State Filter
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // null = Semua Kategori

    // 1. Fetch Daftar Kategori (Sekali saja saat load)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/categories`);
                const result = await response.json();
                if (result.success) {
                    setCategories(result.data);
                }
            } catch (error) {
                console.error("Gagal mengambil kategori:", error);
            }
        };
        fetchCategories();
    }, []);

    // 2. Fetch Dokumen (Setiap kali filter berubah)
    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            
            params.append('page', currentPage.toString());
            if (searchTerm) params.append('search', searchTerm);
            if (selectedYear) params.append('tahun', selectedYear); // Filter Tahun Spesifik
            if (selectedDate) params.append('tanggal', selectedDate); // Filter Tanggal
            if (selectedCategory) params.append('category_id', selectedCategory.toString()); // Filter Kategori (Pills)

            const response = await fetch(`${API_BASE_URL}/dokumen?${params.toString()}`);
            const result = await response.json();

            if (result.success) {
                setDocuments(result.data.data);
                setTotalPages(result.data.last_page);
                setTotalItems(result.data.total);
            } else {
                setDocuments([]);
            }
        } catch (error) {
            console.error("Gagal mengambil dokumen:", error);
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    // Efek Samping: Fetch ulang saat filter/page berubah
    useEffect(() => {
        // Debounce sedikit agar tidak spam API saat ketik
        const timeoutId = setTimeout(() => {
            fetchDocuments();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedYear, selectedDate, selectedCategory, currentPage]);

    // Reset Filter
    const handleReset = () => {
        setSearchTerm("");
        setSelectedYear("");
        setSelectedDate("");
        setSelectedCategory(null);
        setCurrentPage(1);
    };

    // Format Tanggal Indonesia
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <main className="bg-gray-50 min-h-screen font-sans text-gray-800 pb-10">
            
            {/* --- HEADER ATAS (Logo BKAD) --- */}
            <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         {/* Pastikan file logo ada di public folder */}
                        <img src="/logo-bkad-kota-bogor.png" alt="Logo BKAD" className="w-10 h-10 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} /> 
                        <div>
                            <h1 className="text-lg font-bold text-blue-900 leading-tight">PORTAL BKAD</h1>
                            <p className="text-xs text-gray-500 font-medium tracking-wide">KOTA BOGOR</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- BREADCRUMB BIRU --- */}
            <div className="bg-blue-600 text-white py-3 shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex items-center text-sm font-medium gap-2">
                    <a href="/" className="hover:text-blue-200 transition">HOME</a>
                    <span className="opacity-50">/</span>
                    <span>DOKUMEN & ARSIP</span>
                </div>
            </div>

            {/* --- JUDUL HALAMAN --- */}
            <div className="max-w-7xl mx-auto px-4 mt-8 mb-6">
                 <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">DOKUMEN PUBLIK</h2>
                        <p className="text-gray-500 mt-1">Arsip Laporan Kinerja dan Dokumen Resmi Lainnya</p>
                    </div>
                     {/* Logo Kota Bogor di Kanan (Opsional) */}
                    <img src="/icons/logo kota bogor.jpg" alt="Logo Kota" className="w-16 h-16 object-contain hidden md:block opacity-80" onError={(e) => e.currentTarget.style.display = 'none'}/>
                 </div>
            </div>

            {/* --- MAIN CARD --- */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    
                    {/* FILTER SECTION (Padding Besar) */}
                    <div className="p-6 md:p-8 space-y-6">
                        
                        {/* Baris 1: Tombol Kembali & Inputs */}
                        <div className="flex flex-col xl:flex-row gap-4">
                            
                            {/* Tombol Kembali (Kiri) */}
                            <div className="shrink-0">
                                <a href="/">
                                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 px-6">
                                        ← Kembali
                                    </Button>
                                </a>
                            </div>

                            {/* Group Filter (Kanan) */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3">
                                
                                {/* Search */}
                                <div className="md:col-span-5 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input 
                                        placeholder="Cari judul dokumen..." 
                                        className="pl-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Tahun */}
                                <div className="md:col-span-2">
                                    <Input 
                                        type="text" // atau number
                                        placeholder="Tahun" 
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10 text-center"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                    />
                                </div>

                                {/* Tanggal */}
                                <div className="md:col-span-3">
                                    <Input 
                                        type="date"
                                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    />
                                </div>

                                {/* Reset Button */}
                                <div className="md:col-span-2 flex items-center">
                                     <button 
                                        onClick={handleReset}
                                        className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 font-medium transition-colors px-2"
                                     >
                                        <RefreshCw size={14} /> Reset Filter
                                     </button>
                                </div>
                            </div>
                        </div>

                        {/* Baris 2: Kategori PILLS */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                                    selectedCategory === null 
                                    ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                                }`}
                            >
                                Semua Kategori
                            </button>

                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                                        selectedCategory === cat.id
                                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                                    }`}
                                >
                                    {cat.nama_kategori}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TABLE SECTION */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-blue-600 text-white uppercase text-xs font-semibold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 w-16 text-center">No</th>
                                    <th className="px-6 py-4 w-40">Kategori</th>
                                    <th className="px-6 py-4">Judul Dokumen</th>
                                    <th className="px-6 py-4 w-24 text-center">Tahun</th>
                                    <th className="px-6 py-4 w-48">Tanggal Upload</th>
                                    <th className="px-6 py-4 w-32 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex justify-center items-center gap-2">
                                                <RefreshCw className="animate-spin h-5 w-5" /> Memuat data...
                                            </div>
                                        </td>
                                    </tr>
                                ) : documents.length > 0 ? (
                                    documents.map((doc, index) => (
                                        <tr key={doc.id} className="hover:bg-blue-50/50 transition-colors">
                                            <td className="px-6 py-4 text-center font-medium text-gray-500">
                                                {index + 1 + (currentPage - 1) * 10}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                                    {doc.kategori_dokumen?.nama_kategori || "-"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-800">{doc.title}</div>
                                                {/* Tampilkan Badge Rilis (Misal: Pertahun) sebagai sub-info jika ada */}
                                                {doc.rilis_kategori && (
                                                    <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                        {doc.rilis_kategori.nama}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center font-medium text-gray-600">
                                                {doc.tahun || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <div className="flex flex-col">
                                                    <span>{formatDate(doc.tanggal_dokumen)}</span>
                                                    {doc.user && (
                                                        <span className="text-[11px] text-gray-400 mt-0.5">
                                                            Oleh: {doc.user.name}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <a 
                                                    href={`${STORAGE_URL}${doc.file_path}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-9 w-full">
                                                        <Download size={16} className="mr-2" /> Unduh
                                                    </Button>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic bg-gray-50">
                                            Tidak ada dokumen yang ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {!loading && totalPages > 1 && (
                        <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1"
                            >
                                <ChevronLeft size={16} /> Previous
                            </Button>
                            
                            <span className="text-sm text-gray-600 font-medium">
                                Halaman <span className="text-blue-600 font-bold">{currentPage}</span> dari {totalPages}
                            </span>
                            
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1"
                            >
                                Next <ChevronRight size={16} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}