<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class StrukturOrganisasi extends Model
{
    use HasFactory, LogsActivity;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'struktur_organisasis';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nama',
        'jabatan',
        'gambar',
        'parent_id',
        'sort_order',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(StrukturOrganisasi::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(StrukturOrganisasi::class, 'parent_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['nama', 'jabatan', 'parent.nama']) 
            ->logOnlyDirty() 
            ->dontSubmitEmptyLogs() 
            ->setDescriptionForEvent(fn(string $eventName) => "Pejabat \"{$this->nama}\" di struktur organisasi telah di-" . match($eventName) {
                'created' => 'tambahkan',
                'updated' => 'ubah',
                'deleted' => 'hapus',
                default => $eventName
            });
    }
}
