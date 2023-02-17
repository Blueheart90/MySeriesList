<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;

class SerieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $language = 'es-mx';
        // Inertia::share('tmdbUrl', config('services.tmdb.url'));
        // Inertia::share('tmdbToken', config('services.tmdb.token'));

        $trendingTv = Http::withToken(config('services.tmdb.token'))
            ->get('https://api.themoviedb.org/3/trending/tv/week', ['language' => $language])
            ->json()['results'];

        return Inertia::render('Series/Index', ['trendingTv' => $trendingTv]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        //
    }
}
