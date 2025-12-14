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
        Schema::create('dokumens', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->string('file_path'); 
            $table->foreignId('kategori_dokumen_id')->constrained('kategori_dokumens')->cascadeOnDelete();            
            $table->foreignId('rilis_kategori_id')->nullable()->constrained('rilis_kategoris')->onDelete('set null');
            $table->date('tanggal_dokumen')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumens');
    }
};
