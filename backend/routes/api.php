<?php

use App\Http\Controllers\Api\FotoController;
use App\Http\Controllers\Api\VideoController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\AgendaController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\DokumenController;
use App\Http\Controllers\Api\InstagramController; 
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\BannerPopupController;
use App\Http\Controllers\Api\StrukturOrganisasiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VisiMisiController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/photos', [FotoController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita-kategori', [BeritaController::class, 'getCategories']);
Route::get('/agenda', [AgendaController::class, 'index']);
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/dokumen', [DokumenController::class, 'index']);
Route::get('/dokumen/{id}', [DokumenController::class, 'show']); 
Route::delete('/dokumen/{id}', [DokumenController::class, 'destroy']); // { changed code } - Hapus dokumen
Route::get('/dokumen-kategori', [DokumenController::class, 'getCategories']);
Route::get('/instagram-feed', [InstagramController::class, 'getFeed']);
Route::get('/staff', [StaffController::class, 'index']);
Route::get('/banner-popups', [BannerPopupController::class, 'index']);
Route::get('/struktur-organisasi', [StrukturOrganisasiController::class, 'index']);
Route::get('/visi-misi', [VisiMisiController::class, 'index']);
