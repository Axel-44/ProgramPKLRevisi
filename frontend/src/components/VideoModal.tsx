// src/components/VideoModal.tsx

"use client";

import React, { useRef } from 'react';
import { X, Fullscreen } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
  title: string | null;
}

export function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen || !videoUrl) return null;

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-4xl z-10"
        >
          <X size={32} />
        </button>
        <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            title={title || "Video"}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            autoPlay
          />
          <button
            onClick={handleFullscreen}
            className="absolute bottom-4 right-4 text-white p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
          >
            <Fullscreen size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}