<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Staff; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StaffController extends Controller
{
    public function index()
    {
        $staff = Staff::orderBy('nama', 'asc')->get();

        $staff->transform(function ($member) {
            $member->gambar_url = $member->gambar ? asset(Storage::url($member->gambar)) : null;
            return $member;
        });

        return response()->json([
            'success' => true,
            'data' => $staff,
        ]);
    }
}