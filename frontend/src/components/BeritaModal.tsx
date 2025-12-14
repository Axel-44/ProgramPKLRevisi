"use client";

import React from 'react';
import Image from "next/image";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_at: string;
  kategori: string;
}

interface BeritaModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: NewsItem | null;
}

const BeritaModal: React.FC<BeritaModalProps> = ({ isOpen, onClose, newsItem }) => {
  if (!isOpen || !newsItem) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-y-auto p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl z-10"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6 mb-4 flex-grow overflow-hidden">
          <div className="relative w-full md:w-1/2 flex-shrink-0">
            <Image
              src={newsItem.image_url || "/placeholder.svg"}
              alt={newsItem.title}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <h2 className="text-3xl font-bold mb-2 sticky top-0 bg-white z-10">{newsItem.title}</h2>
            <p className="text-sm text-gray-500 mb-4 sticky top-12 bg-white z-10">{formatDate(newsItem.published_at)} | Kategori: {newsItem.kategori}</p>
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} className="prose max-w-none text-gray-700 leading-relaxed overflow-y-auto flex-1 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeritaModal;