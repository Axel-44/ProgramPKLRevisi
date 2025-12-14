<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Foto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoController extends Controller
{
    /**
     * Menyediakan data foto untuk API publik.
     */
    public function index()
    {
        $fotos = Foto::latest()->get();

        $formattedFotos = $fotos->map(function ($foto) {
            $foto->url = $foto->file_path ? asset(Storage::url($foto->file_path)) : null;
            return $foto;
        });

        return response()->json([
            'success' => true,
            'message' => 'Daftar foto berhasil diambil.',
            'data'    => $formattedFotos
        ]);
    }
}