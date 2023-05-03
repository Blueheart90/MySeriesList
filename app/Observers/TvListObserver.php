<?php

namespace App\Observers;

use App\Models\TvList;
use Illuminate\Support\Facades\Log;

class TvListObserver
{
    /**
     * Handle the TvList "created" event.
     */
    public function created(TvList $tvList): void
    {
    }

    /**
     * Handle the TvList "updated" event.
     */
    public function updated(TvList $tvList): void
    {
        //
    }

    /**
     * Handle the TvList "deleted" event.
     */
    public function deleted(TvList $tvList): void
    {
        $tvList->review()->delete();
    }

    /**
     * Handle the TvList "restored" event.
     */
    public function restored(TvList $tvList): void
    {
        //
    }

    /**
     * Handle the TvList "force deleted" event.
     */
    public function forceDeleted(TvList $tvList): void
    {
        //
    }
}
