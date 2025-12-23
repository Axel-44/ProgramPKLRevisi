<?php

namespace App\Filament\Admin\Resources\DokumenResource\Pages;

use App\Filament\Admin\Resources\DokumenResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth; // <-- Jangan lupa ini

class CreateDokumen extends CreateRecord
{
    protected static string $resource = DokumenResource::class;

    // 1. Fungsi agar kembali ke halaman List setelah Save
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    // 2. Fungsi agar otomatis mencatat SIAPA yang sedang login saat upload
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['user_id'] = Auth::id(); // Mengambil ID user yang sedang login
        return $data;
    }
}