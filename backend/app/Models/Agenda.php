<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Agenda extends Model
{
    use HasFactory, LogsActivity;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama_kegiatan',
        'tanggal',
        'waktu',
        'lokasi',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal' => 'date',
        'waktu' => 'datetime:H:i', 
    ];


    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['nama_kegiatan', 'tanggal', 'waktu', 'lokasi'])

            ->logOnlyDirty()

            ->dontSubmitEmptyLogs()

            ->setDescriptionForEvent(function(string $eventName) {
                $aksi = match ($eventName) {
                    'created' => 'dibuat',
                    'updated' => 'diubah',
                    'deleted' => 'dihapus',
                    default => $eventName,
                };
                return "Agenda \"{$this->nama_kegiatan}\" telah {$aksi}";
            });
    }
}
