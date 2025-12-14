<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', true)      
            ->orderBy('sort_order', 'asc') 
            ->get();

        $formattedBanners = $banners->map(function ($banner) {
            $banner->image_url = $banner->image ? asset(Storage::url($banner->image)) : null;
            return $banner;
        });

        return response()->json([
            'success' => true,
            'data' => $formattedBanners,
        ]);
    }
}