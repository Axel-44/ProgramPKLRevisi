<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;


class Staff extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'staff';

    protected $fillable = [
        'nama',
        'jenis_kelamin',
        'jenis',
        'jabatan',
        'gambar',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['nama', 'jenis_kelamin', 'jenis', 'jabatan'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->setDescriptionForEvent(function(string $eventName) {
                $aksi = match ($eventName) {
                    'created' => 'ditambahkan',
                    'updated' => 'diubah',
                    'deleted' => 'dihapus',
                    default => $eventName,
                };
                return "Data staff dengan nama \"{$this->nama}\" telah {$aksi}";
            });
    }
}
