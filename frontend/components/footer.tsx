import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import Link from 'next/link';
import dynamic from 'next/dynamic'; // 1. Import library dynamic dari Next.js

// 2. Konfigurasi Import Dynamic untuk FooterMap
// ssr: false (Server-Side Rendering dimatikan agar tidak error "window is not defined")
const FooterMap = dynamic(
  () => import("@/src/components/FooterMap").then((mod) => mod.FooterMap), 
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-700 animate-pulse rounded flex items-center justify-center text-sm text-gray-400">Memuat Peta...</div> // Tampilan sementara saat peta loading
  }
);

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 pb-24 font-sans">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Bagian Peta */}
                    <div className="w-full h-full min-h-[250px]">
                        <h3 className="text-xl font-bold mb-4">Lokasi BKAD</h3>
                        <FooterMap />
                    </div>

                    {/* Bagian Kontak */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="mt-1 flex-shrink-0" />
                                <span>Jl. Ir. H. Juanda No. 10, Bogor Tengah, Kota Bogor, Jawa Barat 16121</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} />
                                <span>(0251) 8321075</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} />
                                <span>bkad@bogorkota.go.id</span>
                            </div>
                        </div>
                    </div>

                    {/* Bagian Jam Pelayanan */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Jam Pelayanan</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                                <Clock size={16} />
                                <span>Senin - Jumat: 08:00 - 16:00 WIB</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock size={16} />
                                <span>Sabtu - Minggu: Tutup</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Social Media & Copyright */}
                <div className="border-t border-gray-600 mt-8 pt-8 text-center">
                    <div className="flex justify-center space-x-4 mb-4">
                        <Link href="https://www.instagram.com/bkadkotabogor?igsh=MTJtY2FpZ3lzZzVpZw==" target="_blank" rel="noopener noreferrer">
                            <Instagram size={24} className="hover:text-white transition-colors" />
                        </Link>
                    </div>
                    <p className="text-sm text-gray-300">
                        © 2025 BKAD Kota Bogor. Seluruh hak cipta dilindungi undang-undang.
                    </p>
                </div>
            </div>
        </footer>
    )
}