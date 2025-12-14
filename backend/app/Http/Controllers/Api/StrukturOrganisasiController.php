<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StrukturOrganisasiController extends Controller
{
    public function index()
    {
        $semuaPejabat = StrukturOrganisasi::orderBy('sort_order', 'asc')->get();

        $pejabatList = $semuaPejabat->map(function ($pejabat) {
            return [
                'id' => $pejabat->id,
                'nama' => $pejabat->nama,
                'jabatan' => $pejabat->jabatan,
                'parent_id' => $pejabat->parent_id,
                'gambar_url' => $pejabat->gambar ? asset(Storage::url($pejabat->gambar)) : null,
                'children' => [], 
            ];
        });

        $pejabatArray = $pejabatList->toArray();
        
        $hirarki = $this->buildTree($pejabatArray);

        return response()->json([
            'success' => true,
            'data' => $hirarki,
        ]);
    }

    /**
     *
     * @param array $elements
     * @param int|null $parentId
     * @return array
     */
    private function buildTree(array $elements, $parentId = null): array
    {
        $branch = [];

        foreach ($elements as $element) {
            if ($element['parent_id'] == $parentId) {
                $children = $this->buildTree($elements, $element['id']);
                if ($children) {
                    $element['children'] = $children;
                }
                $branch[] = $element;
            }
        }

        return $branch;
    }
}
