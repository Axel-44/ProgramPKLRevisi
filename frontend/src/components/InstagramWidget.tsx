"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface InstagramPost {
  id: string;
  thumbnail_url: string;
  permalink: string;
  caption: string;
}

interface InstagramProfile {
  username: string;
  bio: string;
  followers: string;
  postsCount: string;
  profileImage: string;
}

const API_INSTAGRAM = "http://127.0.0.1:8000/api/instagram-feed";

export function InstagramWidget() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        const response = await fetch(API_INSTAGRAM);
        if (!response.ok) {
          throw new Error("Failed to fetch Instagram feed");
        }
        const result = await response.json();
        setPosts(result.data.slice(0, 6));
        setProfile(result.profile);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInstagramFeed();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative w-full aspect-square bg-gray-200 animate-pulse" />
          ))}
        </div>
      );
    }
    if (error) {
      return <div className="text-center text-red-500 p-4">Error: Gagal terhubung ke Instagram.</div>;
    }
    if (posts.length === 0) {
      return <p className="text-center text-gray-500 p-4">Tidak ada postingan.</p>;
    }

    return (
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full aspect-square block hover:opacity-80 transition-opacity"
          >
            <Image
              src={post.thumbnail_url}
              alt={post.caption}
              fill
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        {profile && (
            <>
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                    src={profile.profileImage}
                    alt="Profil Instagram"
                    fill
                    className="object-cover"
                />
                </div>
                <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold">{profile.username}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
                    </svg>
                </div>
                <p className="text-sm text-gray-500">{profile.bio}</p>
                <div className="flex gap-4 mt-2 text-sm">
                    <div className="flex flex-col items-start">
                    <span className="font-bold">{profile.followers}</span>
                    <span className="text-gray-500">pengikut</span>
                    </div>
                    <div className="flex flex-col items-start">
                    <span className="font-bold">{profile.postsCount}</span>
                    <span className="text-gray-500">kiriman</span>
                    </div>
                </div>
                </div>
            </>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {renderContent()}
      </CardContent>
    </Card>
  );
}