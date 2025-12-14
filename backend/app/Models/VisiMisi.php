<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VisiMisi extends Model
{
    use HasFactory;

    protected $table = 'visi_misis';

    protected $fillable = [
        'visi',
        'misi',
    ];
}
