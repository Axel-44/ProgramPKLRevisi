<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::latest()->get();

        $formattedVideos = $videos->map(function ($video) {
            
            $source_url = null;
            $thumbnail_url = null;
            $youtube_video_id = null;

            if ($video->type === 'file' && $video->file_path) {
                $source_url = asset(Storage::url($video->file_path));
                $thumbnail_url = $video->thumbnail_path ? asset(Storage::url($video->thumbnail_path)) : null; 
            } 
            elseif ($video->type === 'youtube' && $video->youtube_url) {
                $source_url = $video->youtube_url;
                
                $videoId = null;
                $youtube_video_id = $video->getYouTubeVideoId();

                if ($youtube_video_id) {
                    $thumbnail_url = "https://img.youtube.com/vi/{$youtube_video_id}/hqdefault.jpg";
                }
            }

            return [
                'id' => $video->id,
                'title' => $video->title,
                'description' => $video->description,
                'type' => $video->type,
                'source_url' => $source_url,
                'youtube_video_id' => $youtube_video_id,
                'thumbnail_url' => $thumbnail_url,
                'created_at' => $video->created_at->toIso8601String(),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $formattedVideos,
        ]);
    }
}