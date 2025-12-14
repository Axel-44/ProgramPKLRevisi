// src/components/calendar-section.tsx

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Definisikan tipe data untuk objek Agenda
interface AgendaItem {
  id: number;
  nama_kegiatan: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
}

const API_URL = "http://127.0.0.1:8000/api/agenda";

export function CalendarSection() {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [eventDays, setEventDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  useEffect(() => {
    const fetchEventsForMonth = async () => {
      setLoading(true);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      try {
        const response = await fetch(`${API_URL}?year=${year}&month=${month}`);
        if (!response.ok) throw new Error("Gagal mengambil data agenda.");
        
        const result = await response.json();
        const agendaForMonth: AgendaItem[] = result.data;
        
        // --- LOGIKA BARU UNTUK MEMFILTER AGENDA YANG SUDAH LEWAT ---
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set waktu ke awal hari untuk perbandingan tanggal yang akurat

        const upcomingAgenda = agendaForMonth.filter(item => {
          const eventDate = new Date(item.tanggal);
          return eventDate >= today;
        });

        // Sekarang, kita hanya mengambil tanggal dari agenda yang akan datang
        const daysWithEvents = [...new Set(upcomingAgenda.map(item => new Date(item.tanggal).getDate()))];
        setEventDays(daysWithEvents);

      } catch (error) {
        console.error("Error fetching agenda for calendar:", error);
        setEventDays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsForMonth();
  }, [currentDate]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(1);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Kalender</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isToday = day === today.getDate() && 
                            currentDate.getMonth() === today.getMonth() &&
                            currentDate.getFullYear() === today.getFullYear();

            const hasEvent = day !== null && eventDays.includes(day);

            return (
              <div
                key={index}
                className={`
                  text-center p-2 text-sm rounded-md transition-colors
                  ${day === null ? "" : "hover:bg-accent/20 cursor-pointer"}
                  ${hasEvent ? "bg-primary text-primary-foreground font-semibold" : ""}
                  ${isToday ? "ring-2 ring-accent" : ""}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}