<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('dokumens', function (Blueprint $table) {
            // 1. Status dokumen (default: menunggu)
            $table->string('status')->default('menunggu'); 
            
            // 2. Siapa yang memverifikasi (Superadmin), boleh kosong (nullable)
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            
            // 3. Kapan diverifikasi
            $table->timestamp('verified_at')->nullable();
            
            // 4. Catatan jika ditolak
            $table->text('catatan_verifikasi')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dokumens', function (Blueprint $table) {
            // Hapus foreign key dulu
            $table->dropForeign(['verified_by']);
            // Baru hapus kolom-kolomnya
            $table->dropColumn(['status', 'verified_by', 'verified_at', 'catatan_verifikasi']);
        });
    }
};