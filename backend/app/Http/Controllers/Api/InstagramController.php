<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class InstagramController extends Controller
{
    public function getFeed()
    {
        
        return Cache::remember('instagram_feed_bkad', 3600, function () {
            $userId = env('INSTAGRAM_USER_ID', '17841405822335555'); 
            $accessToken = env('INSTAGRAM_ACCESS_TOKEN');

            if (empty($accessToken)) {
                return response()->json(['error' => 'Instagram Access Token is not configured.'], 500);
            }

            $mediaResponse = Http::get("https://graph.instagram.com/me/media", [
                'fields' => 'id,caption,media_type,media_url,thumbnail_url,permalink',
                'access_token' => $accessToken,
            ]);

            if ($mediaResponse->failed()) {
                return response()->json(['error' => 'Failed to fetch Instagram media.', 'details' => $mediaResponse->json()], 500);
            }

            $media = $mediaResponse->json()['data'] ?? [];
            $profileResponse = Http::get("https://graph.instagram.com/me", [
                'fields' => 'username,media_count',
                'access_token' => $accessToken,
            ]);

            $profileData = $profileResponse->json();

            $formattedProfile = [
                'username' => $profileData['username'] ?? 'bkadkotabogor',
                'postsCount' => $profileData['media_count'] ?? count($media),
                'followers' => 'N/A',
                'bio' => 'Akun Resmi Badan Keuangan dan Aset Daerah Kota Bogor',
                'profileImage' => '/logo-bkad.png',
            ];

            $formattedMedia = collect($media)->map(function ($item) {
                // Untuk video, gunakan thumbnail_url. Untuk gambar, gunakan media_url.
                $imageUrl = $item['media_type'] === 'VIDEO' ? ($item['thumbnail_url'] ?? $item['media_url']) : $item['media_url'];
                return [
                    'id' => $item['id'],
                    'thumbnail_url' => $imageUrl,
                    'permalink' => $item['permalink'],
                    'caption' => $item['caption'] ?? 'Instagram post',
                ];
            });

            return response()->json([
                'profile' => $formattedProfile,
                'data' => $formattedMedia,
            ]);
        });
    }
}