"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

import ProfileModal from "../src/components/ProfilModal";
import GalleryModal from "../src/components/GalleryModal";
import KontakModal from "../src/components/KontakModal";
import PengaduanModal from "../src/components/PengaduanModal";
import LayananModal from "../src/components/LayananModal";
import { SurveiKepuasanModal } from "../src/components/SurveiKepuasanModal";
import { SurveiKorupsiModal } from "../src/components/SurveiKorupsiModal";

interface MenuItem {
  iconSrc: string;
  label: string;
  href: string | null;
  modalName?: string;
}

// Daftar icon
const allIcons: MenuItem[] = [
  { iconSrc: "/icons/profil-icon.png", label: "Profil", href: null, modalName: 'profil' },
  { iconSrc: "/icons/dokumen-icon.png", label: "Dokumen", href: "/dokumen" },
  { iconSrc: "/icons/berita-icon.png", label: "Berita", href: "/berita" },
  { iconSrc: "/icons/pengaduan.png", label: "Pengaduan", href: null, modalName: 'pengaduan' },
  { iconSrc: "/icons/layanan-icon.png", label: "Layanan", href: null, modalName: 'layanan' },
  { iconSrc: "/icons/galeri-icon.png", label: "Galeri", href: null, modalName: 'galeri' },
  { iconSrc: "/icons/kontak-icon.png", label: "Kontak", href: null, modalName: 'kontak' },
  { iconSrc: "/icons/survey.png", label: "Survei Kepuasan", href: null, modalName: 'survei-kepuasan' },
  { iconSrc: "/icons/survey.jpg", label: "Survei Anti Korupsi", href: null, modalName: 'survei-korupsi' },
];

// Lima icon utama
const primaryIconNames = ["Profil", "Dokumen", "Berita", "Kontak", "Layanan"];

const primaryIcons = allIcons.filter((icon) =>
  primaryIconNames.includes(icon.label)
);
const secondaryIcons = allIcons.filter(
  (icon) => !primaryIconNames.includes(icon.label)
);

export function IconSection() {
  const [showAll, setShowAll] = useState(false);

  // State modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isKontakModalOpen, setIsKontakModalOpen] = useState(false);
  const [isPengaduanModalOpen, setIsPengaduanModalOpen] = useState(false);
  const [isLayananModalOpen, setIsLayananModalOpen] = useState(false);
  const [isSurveiKepuasanModalOpen, setIsSurveiKepuasanModalOpen] = useState(false);
  const [isSurveiKorupsiModalOpen, setIsSurveiKorupsiModalOpen] = useState(false);

  // Handle klik modal
  const handleItemClick = (modalName: string, e: React.MouseEvent) => {
    e.preventDefault();
    switch (modalName) {
      case 'profil':
        setIsProfileModalOpen(true);
        break;
      case 'pengaduan':
        setIsPengaduanModalOpen(true);
        break;
      case 'layanan':
        setIsLayananModalOpen(true);
        break;
      case 'galeri':
        setIsGalleryModalOpen(true);
        break;
      case 'kontak':
        setIsKontakModalOpen(true);
        break;
      case 'survei-kepuasan':
        setIsSurveiKepuasanModalOpen(true);
        break;
      case 'survei-korupsi':
        setIsSurveiKorupsiModalOpen(true);
        break;
    }
  };

  const iconsToDisplay = showAll ? allIcons : primaryIcons;

  return (
    <>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
            
            {iconsToDisplay.map((item) => {
              const isModal = item.href === null;
              
              const iconContent = (
                <>
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all">
                    <Image
                      src={item.iconSrc}
                      alt={item.label}
                      width={48}
                      height={48}
                      className="h-10 w-10 md:h-12 md:w-12"
                    />
                  </div>
                  <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary">
                    {item.label}
                  </span>
                </>
              );

              if (isModal) {
                return (
                  <div
                    key={item.label}
                    onClick={(e) => handleItemClick(item.modalName!, e)}
                    className="flex flex-col items-center text-center group w-24 cursor-pointer"
                  >
                    {iconContent}
                  </div>
                );
              }

              return (
                <Link
                  href={item.href || '#'}
                  key={item.label}
                  className="flex flex-col items-center text-center group w-24"
                >
                  {iconContent}
                </Link>
              );
            })}
          </div>

          {secondaryIcons.length > 0 && (
            <div className="text-center mt-6">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAll(!showAll);
                }}
                className="rounded-full"
              >
                {showAll ? "Tampilkan Lebih Sedikit" : "Selengkapnya"}
                {showAll ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Komponen Modal */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
      <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} />
      <KontakModal isOpen={isKontakModalOpen} onClose={() => setIsKontakModalOpen(false)} />
      <PengaduanModal isOpen={isPengaduanModalOpen} onClose={() => setIsPengaduanModalOpen(false)} />
      <LayananModal isOpen={isLayananModalOpen} onClose={() => setIsLayananModalOpen(false)} />
      <SurveiKepuasanModal isOpen={isSurveiKepuasanModalOpen} onClose={() => setIsSurveiKepuasanModalOpen(false)} />
      <SurveiKorupsiModal isOpen={isSurveiKorupsiModalOpen} onClose={() => setIsSurveiKorupsiModalOpen(false)} />
    </>
  );
}