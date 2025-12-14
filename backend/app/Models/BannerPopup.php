<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BannerPopup extends Model
{
    use HasFactory;

    protected $table = 'banner_popups';

    protected $fillable = [
        'title',
        'image',
        'url',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
