<?php

namespace App\Http\Controllers;

use App\Models\StrukturOrganisasi;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class StrukturOrganisasiPhotoController extends Controller
{
    /**
     *
     * @param  \App\Models\StrukturOrganisasi  $pejabat
     * @return \Symfony\Component\HttpFoundation\StreamedResponse|\Illuminate\Http\Response
     */
    public function show(StrukturOrganisasi $pejabat)
    {
        if (!$pejabat->gambar) {
            abort(404, 'Informasi gambar tidak ditemukan di database.');
        }

        if (!Storage::disk('public')->exists($pejabat->gambar)) {
            abort(404, 'File gambar fisik tidak ditemukan di server.');
        }

        $path = Storage::disk('public')->path($pejabat->gambar);
        
        $headers = [
            'Content-Type' => mime_content_type($path),
            'Content-Disposition' => 'inline; filename="' . basename($path) . '"',
        ];

        return response()->file($path, $headers);
    }
}

