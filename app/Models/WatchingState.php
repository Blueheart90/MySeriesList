<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchingState extends Model
{
    use HasFactory;

    // Un estado lo puede tener muchas series listphp
    public function tvlists()
    {
        return $this->hasMany(TvList::class);
    }

    // Un estado lo puede tener muchas pelicula listphp
    public function movielists()
    {
        return $this->hasMany(MovieList::class);
    }
}
