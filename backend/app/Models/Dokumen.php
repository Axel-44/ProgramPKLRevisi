<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

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
    ];

    public function kategoriDokumen(): BelongsTo
    {
        return $this->belongsTo(KategoriDokumen::class);
    }

    public function rilisKategori(): BelongsTo
    {
        return $this->belongsTo(RilisKategori::class);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['title', 'kategoriDokumen.nama_kategori']) 
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(function(string $eventName) {
                $aksi = match ($eventName) {
                    'created' => 'dibuat',
                    'updated' => 'diubah',
                    'deleted' => 'dihapus',
                    default => $eventName,
                };
                return "Dokumen \"{$this->title}\" ({$this->kategori}) telah {$aksi}";
            });
    }
}
