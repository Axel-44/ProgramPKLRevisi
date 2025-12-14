// src/components/agenda-section.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

// Definisikan tipe data untuk objek Agenda
interface AgendaItem {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

// URL API backend Laravel
const API_URL = "http://127.0.0.1:8000/api/agenda";

export function AgendaSection() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Gagal mengambil data agenda.");
        }
        const result = await response.json();
        setAgendaItems(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgenda();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatTime = (timeString: string) => {
    return `${timeString.substring(0, 5)} WIB`;
  };

  // === LOGIKA BARU UNTUK KELAS CSS DINAMIS ===
  // Tentukan kelas CSS berdasarkan jumlah item agenda
  const contentClasses = agendaItems.length > 3
    ? 'h-72 overflow-y-auto pr-4' // Jika item > 3, atur tinggi tetap dan scroll
    : 'pr-4';                       // Jika item <= 3, biarkan tinggi otomatis (tanpa scroll)

  const renderContent = () => {
    if (loading) {
      return <p className="text-sm text-muted-foreground">Memuat agenda...</p>;
    }
    if (error) {
      return <p className="text-sm text-red-500">{error}</p>;
    }
    if (agendaItems.length === 0) {
      return <p className="text-sm text-muted-foreground">Tidak ada agenda kegiatan terdekat.</p>;
    }
    return (
      <div className="space-y-4">
        {agendaItems.map((item) => (
          <div key={item.id} className="border-l-4 border-primary pl-4 py-2">
            <h4 className="font-semibold text-sm mb-2">{item.nama_kegiatan}</h4>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatDate(item.tanggal)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatTime(item.waktu)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{item.lokasi}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Agenda</CardTitle>
      </CardHeader>
      {/* Gunakan kelas dinamis yang sudah kita definisikan */}
      <CardContent className={contentClasses}>
        {renderContent()}
      </CardContent>
    </Card>
  );
}