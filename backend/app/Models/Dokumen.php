<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\User; // Jangan lupa import ini

class Dokumen extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'dokumens';

    protected $fillable = [
        'title',
        'file_path',
        'kategori_dokumen_id',
        'rilis_kategori_id',
        'tahun',
        'tanggal_dokumen',
        

        'user_id',            // Siapa yang upload
        'status',             // Menunggu/Disetujui/Ditolak
        'verified_by',        // Siapa yang memverifikasi
        'verified_at',        // Kapan
        'catatan_verifikasi', // Alasan penolakan
    ];

    public function kategoriDokumen(): BelongsTo
    {
        return $this->belongsTo(KategoriDokumen::class);
    }

    public function rilisKategori(): BelongsTo
    {
        return $this->belongsTo(RilisKategori::class);
    }

    // --- TAMBAHAN RELASI BARU ---

    // 1. Relasi ke User peng-upload
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // 2. Relasi ke User verifikator (Superadmin)
    public function verifikator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
    // ----------------------------

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['title', 'kategoriDokumen.nama_kategori', 'status']) 
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(function(string $eventName) {
                $aksi = match ($eventName) {
                    'created' => 'dibuat',
                    'updated' => 'diubah',
                    'deleted' => 'dihapus',
                    default => $eventName,
                };
                return "Dokumen \"{$this->title}\" telah {$aksi}";
            });
    }
}