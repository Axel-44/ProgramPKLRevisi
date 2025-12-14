"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Untuk mengatur jeda waktu (0.1, 0.2, dst)
}

export const ScrollReveal = ({ children, width = "100%", delay = 0 }: Props) => {
  const ref = useRef(null);
  
  // useInView mendeteksi apakah elemen sudah masuk viewport (layar)
  // once: true artinya animasi hanya jalan 1x (tidak berulang saat scroll naik turun)
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      // Kondisi awal: Transparan (opacity 0) & Turun 75px (y: 75)
      initial={{ opacity: 0, y: 75 }} 
      
      // Kondisi akhir: Muncul (opacity 1) & Posisi Normal (y: 0)
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
      
      // Pengaturan durasi dan kehalusan gerakan
      transition={{
        duration: 0.5, 
        delay: delay, 
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};