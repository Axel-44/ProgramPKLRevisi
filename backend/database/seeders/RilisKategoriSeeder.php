<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RilisKategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\RilisKategori::create(['nama' => 'Pertahun', 'slug' => 'pertahun', 'deskripsi' => 'Rilis per tahun']);
        \App\Models\RilisKategori::create(['nama' => 'Perbulan', 'slug' => 'perbulan', 'deskripsi' => 'Rilis per bulan']);
        \App\Models\RilisKategori::create(['nama' => 'Perminggu', 'slug' => 'perminggu', 'deskripsi' => 'Rilis per minggu']);
    }
}
