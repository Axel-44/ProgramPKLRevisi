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
        $query = Dokumen::with('kategoriDokumen', 'rilisKategori')->latest();

        if ($request->filled('category_id')) {
            $query->where('kategori_dokumen_id', $request->category_id);
        }

        if ($request->filled('category_name')) {
            $query->whereHas('kategoriDokumen', function ($q) use ($request) {
                $q->where('nama_kategori', $request->category_name);
            });
        }

        if ($request->filled('rilis_kategori_id')) {
            $query->where('rilis_kategori_id', $request->rilis_kategori_id);
        }

        if ($request->filled('tanggal_dokumen')) {
            $query->where('tanggal_dokumen', $request->tanggal_dokumen);
        }

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

    // --- PERBAIKAN UTAMA ADA DI SINI ---
    // Mengubah parameter $id menjadi $filename agar sesuai dengan URL
    public function show($filename)
    {
        // 1. Cari dokumen berdasarkan nama file di kolom file_path
        // Menggunakan LIKE %... untuk mencocokkan jika path di database lengkap (misal: documents/namafile.pdf)
        $dokumen = Dokumen::where('file_path', 'LIKE', '%' . $filename)->first();

        // Jika tidak ditemukan di Database
        if (!$dokumen) {
            // Opsional: Coba cari langsung fisik filenya jika tidak ada di DB (backup logic)
            // Tapi sebaiknya stick to DB first.
            return response()->json(['message' => 'Data dokumen tidak ditemukan di database'], 404);
        }

        $path = $dokumen->file_path; 

        // 2. Cek apakah file fisik benar-benar ada di storage
        if (!Storage::disk('public')->exists($path)) {
             return response()->json(['message' => 'File fisik tidak ditemukan di server'], 404);
        }

        // 3. Download file tersebut
        return Storage::disk('public')->download($path);
    }
    // -----------------------------------

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

            // 1. Hapus file fisik dari storage/public
            if ($dokumen->file_path && Storage::disk('public')->exists($dokumen->file_path)) {
                Storage::disk('public')->delete($dokumen->file_path);
            }

            // 2. Hapus data dari database
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