<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriDokumen extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = ['nama_kategori', 'slug'];
    
    protected static function booted(): void
    {
        static::creating(function (KategoriDokumen $kategori) {
            $kategori->slug = Str::slug($kategori->nama_kategori);
        });

        static::created(function (KategoriDokumen $kategori) {
            Storage::disk('public')->makeDirectory('dokumen/' . $kategori->slug);
        });

        static::deleting(function (KategoriDokumen $kategori) {
            Storage::disk('public')->deleteDirectory('dokumen/' . $kategori->slug);
        });
    }

    public function dokumens(): HasMany
    {
        return $this->hasMany(Dokumen::class);
    }
    
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['nama_kategori'])
            ->setDescriptionForEvent(fn(string $eventName) => "Kategori Dokumen \"{$this->nama_kategori}\" telah di-" . match($eventName) {
                'created' => 'buat',
                'updated' => 'ubah',
                'deleted' => 'hapus',
                default => $eventName
            });
    }
}
