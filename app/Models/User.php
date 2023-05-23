<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'google_id',
        'profile_photo_path'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    // protected $attributes = [
    //     'profile_photo_path' => 'notProfileImage.jpg',
    // ];

    // Un usuario tiene muchas series agregadas a TvList
    public function tvlists()
    {
        return $this->hasMany(TvList::class);
    }
    // Un usuario tiene muchas series agregadas a TvList
    public function movielists()
    {
        return $this->hasMany(MovieList::class);
    }

    // Un usuario tiene muchas reviews
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
