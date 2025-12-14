<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RilisKategori extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'slug', 'deskripsi'];

    public function dokumens(): HasMany
    {
        return $this->hasMany(Dokumen::class);
    }
}
