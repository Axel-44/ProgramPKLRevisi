<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dokumen;
use App\Models\KategoriDokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DokumenController extends Controller
{
    public function index(Request $request)
    {
        // 1. UPDATE: Tambahkan 'user' agar nama uploader muncul di frontend
        $query = Dokumen::with(['kategoriDokumen', 'rilisKategori', 'user'])
            ->where('status', 'disetujui') 
            ->latest();
        
        // Filter Kategori ID
        if ($request->filled('category_id')) {
            $query->where('kategori_dokumen_id', $request->category_id);
        }

        // Filter Kategori Name (Opsional, jika masih dipakai)
        if ($request->filled('category_name')) {
            $query->whereHas('kategoriDokumen', function ($q) use ($request) {
                $q->where('nama_kategori', $request->category_name);
            });
        }

        // Filter Rilis Kategori
        if ($request->filled('rilis_kategori_id')) {
            $query->where('rilis_kategori_id', $request->rilis_kategori_id);
        }

        // 2. UPDATE: Tambahkan Filter Khusus Tahun
        if ($request->filled('tahun')) {
            // Jika kolom di database namanya 'tahun':
            $query->where('tahun', $request->tahun);
            
            // TAPI, jika Anda ingin memfilter berdasarkan tahun dari 'tanggal_dokumen',
            // Ganti baris di atas dengan:
            // $query->whereYear('tanggal_dokumen', $request->tahun);
        }

        // Filter Tanggal Spesifik
        if ($request->filled('tanggal_dokumen')) { // Frontend mengirim 'tanggal', sesuaikan namanya
             $query->where('tanggal_dokumen', $request->tanggal_dokumen);
        }
        // Jika frontend mengirim parameter bernama 'tanggal' (bukan tanggal_dokumen):
        if ($request->filled('tanggal')) {
            $query->whereDate('tanggal_dokumen', $request->tanggal);
        }

        // Search Global
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('tahun', 'like', "%{$search}%")
                  ->orWhereHas('kategoriDokumen', function ($qKategori) use ($search) {
                      $qKategori->where('nama_kategori', 'like', "%{$search}%");
                  });
            });
        }

        $dokumen = $query->paginate(10);

        // Transform URL (Agar frontend bisa akses file)
        $dokumen->getCollection()->transform(function ($item) {
            $item->file_url = $item->file_path ? asset(Storage::url($item->file_path)) : null;
            return $item;
        });

        return response()->json([
            'success' => true,
            'message' => 'Data dokumen berhasil diambil',
            'data'    => $dokumen
        ]);
    }

    public function show($filename)
    {
        $dokumen = Dokumen::where('file_path', 'LIKE', '%' . $filename)->first();

        if (!$dokumen) {
            return response()->json(['message' => 'Data dokumen tidak ditemukan di database'], 404);
        }

        if ($dokumen->status !== 'disetujui') {
             return response()->json(['message' => 'Dokumen ini belum diverifikasi.'], 403);
        }

        $path = $dokumen->file_path; 

        if (!Storage::disk('public')->exists($path)) {
             return response()->json(['message' => 'File fisik tidak ditemukan di server'], 404);
        }

        return Storage::disk('public')->download($path);
    }

    public function getCategories()
    {
        try {
            $categories = KategoriDokumen::select('id', 'nama_kategori')->get();

            return response()->json([
                'success' => true,
                'data' => $categories
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data kategori.'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $dokumen = Dokumen::find($id);

            if (!$dokumen) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data dokumen tidak ditemukan'
                ], 404);
            }

            if ($dokumen->file_path && Storage::disk('public')->exists($dokumen->file_path)) {
                Storage::disk('public')->delete($dokumen->file_path);
            }

            $dokumen->delete();

            return response()->json([
                'success' => true,
                'message' => 'Dokumen dan file berhasil dihapus'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus dokumen: ' . $e->getMessage()
            ], 500);
        }
    }
}