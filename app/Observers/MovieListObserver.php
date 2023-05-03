<?php

namespace App\Observers;

use App\Models\MovieList;

class MovieListObserver
{
    /**
     * Handle the MovieList "created" event.
     */
    public function created(MovieList $movieList): void
    {
        //
    }

    /**
     * Handle the MovieList "updated" event.
     */
    public function updated(MovieList $movieList): void
    {
        //
    }

    /**
     * Handle the MovieList "deleted" event.
     */
    public function deleted(MovieList $movieList): void
    {
        $movieList->review()->delete();
    }

    /**
     * Handle the MovieList "restored" event.
     */
    public function restored(MovieList $movieList): void
    {
        //
    }

    /**
     * Handle the MovieList "force deleted" event.
     */
    public function forceDeleted(MovieList $movieList): void
    {
        //
    }
}
