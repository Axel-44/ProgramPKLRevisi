<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class Berita extends Model
{
    use HasFactory, LogsActivity; 

    protected $fillable = [
        'title',
        'slug',
        'type',
        'content',
        'image',
        'published_at',
        'image',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['title', 'type', 'content'])
            
            ->logOnlyDirty()
            
            ->dontSubmitEmptyLogs()
            
            ->setDescriptionForEvent(function(string $eventName) {
                $aksi = '';
                switch ($eventName) {
                    case 'created':
                        $aksi = 'dibuat';
                        break;
                    case 'updated':
                        $aksi = 'diubah';
                        break;
                    case 'deleted':
                        $aksi = 'dihapus';
                        break;
                }
                return "Berita dengan judul \"{$this->title}\" telah {$aksi}";
            });
    }
}
