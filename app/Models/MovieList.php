<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieList extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'api_id', 'poster', 'review_id', 'score_id', 'watching_state_id', 'user_id'
    ];

    // Una Pelicula agregada a la tabla MovieList pertenece a un User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Una Pelicula pertenece a un estado
    public function watchingstate()
    {
        return $this->belongsTo(WatchingState::class);
    }

    public function review()
    {
        return $this->belongsTo(Review::class);
    }
}
