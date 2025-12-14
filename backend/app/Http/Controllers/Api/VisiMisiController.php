<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VisiMisi;
use Illuminate\Http\JsonResponse;

class VisiMisiController extends Controller
{
    public function index()
    {
        $data = VisiMisi::first();

        if (!$data) {
            return response()->json([
                'visi' => 'Visi belum diisi oleh Admin.',
                'misi' => 'Misi belum diisi oleh Admin.'
            ]);
        }

        return response()->json($data);
    }
}