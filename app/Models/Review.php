<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'content', 'api_id', 'recommended', 'user_id'
    ];

    // Una review pertenece a un User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Una review pertenece a un User
    public function tvlist()
    {
        return $this->hasOne(TvList::class);
    }

    // Una review pertenece a un User
    public function movielist()
    {
        return $this->hasOne(MovieList::class);
    }
}
