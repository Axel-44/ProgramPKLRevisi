// "use client";

// import React from 'react';
// import Image from 'next/image';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import Link from 'next/link';

// // Data dummy untuk TikTok
// const tiktokVideos = [
//   { id: 1, src: "/images/tiktok-placeholder-1.jpg", alt: "Video TikTok 1" },
//   { id: 2, src: "/images/tiktok-placeholder-2.jpg", alt: "Video TikTok 2" },
//   { id: 3, src: "/images/tiktok-placeholder-3.jpg", alt: "Video TikTok 3" },
// ];

// export function TikTokWidget() {
//   return (
//     <Card className="shadow-md">
//       <CardHeader>
//         <CardTitle className="text-lg">TikTok</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-3 gap-2">
//           {tiktokVideos.map((video) => (
//             <div key={video.id} className="relative w-full h-24 overflow-hidden rounded-md">
//               <Image src={video.src} alt={video.alt} fill className="object-cover" />
//             </div>
//           ))}
//         </div>
//         <div className="mt-4 text-center">
//             <Link href="https://www.tiktok.com/@bkadkotabogor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                 Kunjungi Profil
//             </Link>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }