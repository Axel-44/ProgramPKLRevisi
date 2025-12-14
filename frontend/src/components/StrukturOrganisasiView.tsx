"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { OrganogramChart, Pejabat } from '@/src/components/OrganogramChart'; 
import ProfileModal from '@/src/components/ProfilModal'; 

interface Staff {
    id: number;
    nama: string;
    jenis_kelamin: string;
    jenis: string;
    jabatan: string;
    gambar_url: string | null; 
}

interface StrukturOrganisasiViewProps {
    initialOrganogramData: Pejabat[];
}

const API_STAFF_URL = "http://127.0.0.1:8000/api/staff"; 

export function StrukturOrganisasiView({ initialOrganogramData }: StrukturOrganisasiViewProps) {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [showStaffList, setShowStaffList] = useState(false);
    
    const [staffData, setStaffData] = useState<Staff[]>([]);
    const [loadingStaff, setLoadingStaff] = useState(false);
    const [errorStaff, setErrorStaff] = useState<string | null>(null); 

    useEffect(() => {
        if (showStaffList && staffData.length === 0) {
            const fetchStaff = async () => {
                setLoadingStaff(true);
                setErrorStaff(null); 
                try {
                    const response = await fetch(API_STAFF_URL);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const result = await response.json();
                    if (result.success) {
                        setStaffData(result.data);
                    } else {
                        setErrorStaff("Gagal mengambil data staf.");
                    }
                } catch (error: any) {
                    setErrorStaff("Gagal mengambil data staf: " + error.message);
                } finally {
                    setLoadingStaff(false);
                }
            };
            fetchStaff();
        }
    }, [showStaffList, staffData.length]);

    const handleOpenProfileModal = () => setIsProfileModalOpen(true);
    const handleCloseProfileModal = () => setIsProfileModalOpen(false);
    const toggleStaffList = () => setShowStaffList(!showStaffList);

    return (
        <>
            <div className="container mx-auto pb-12 px-4">
                <div className="flex justify-center">
                    <OrganogramChart data={initialOrganogramData} />
                </div>
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={toggleStaffList}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    {showStaffList ? "Sembunyikan Daftar Staf" : "Lihat Daftar Staf"}
                </button>
            </div>

            {/* Bagian Daftar Staf yang akan muncul saat tombol diklik */}
            {showStaffList && (
                <div className="container mx-auto mt-8 px-4 pb-12">
                   <h2 className="text-2xl font-bold mb-4 text-center">Daftar Staf</h2>
                   <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                       {loadingStaff ? (
                           <p className="text-center p-8">Memuat daftar staf...</p>
                       ) : errorStaff ? (
                           <p className="text-center p-8 text-red-500">{errorStaff}</p>
                       ) : staffData.length === 0 ? (
                           <p className="text-center p-8">Tidak ada data staf yang ditemukan.</p>
                       ) : (
                           <table className="min-w-full divide-y divide-gray-200">
                               <thead className="bg-blue-50">
                                   <tr>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                   </tr>
                               </thead>
                               <tbody className="bg-white divide-y divide-gray-200">
                                   {staffData.map((staf) => (
                                       <tr key={staf.id}>
                                           <td className="px-6 py-4 whitespace-nowrap">
                                               <div className="flex-shrink-0 w-10 h-10">
                                                   {staf.gambar_url ? (
                                                       <Image
                                                           src={staf.gambar_url}
                                                           alt={staf.nama}
                                                           width={40}
                                                           height={40}
                                                           className="rounded-full object-cover"
                                                       />
                                                   ) : (
                                                       <span className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                                                           {staf.nama.charAt(0).toUpperCase()}
                                                       </span>
                                                   )}
                                               </div>
                                           </td>
                                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{staf.nama}</td>
                                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staf.jabatan}</td>
                                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staf.jenis_kelamin}</td>
                                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{staf.jenis}</td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                       )}
                   </div>
               </div>
            )}

            <ProfileModal isOpen={isProfileModalOpen} onClose={handleCloseProfileModal} />
        </>
    );
}

