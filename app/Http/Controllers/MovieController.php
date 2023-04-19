<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Arr;
use Illuminate\Http\Response;
use Illuminate\Http\Client\Pool;
use App\ViewModels\MovieViewModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Request;

class MovieController extends Controller
{
    private $language;
    private $tmdbToken;
    private $tmdbUrl;

    public function __construct()
    {
        $this->language = 'es-mx';
        $this->tmdbToken = config('services.tmdb.token');
        $this->tmdbUrl = config('services.tmdb.url');
    }

    public function genresFilter()
    {
        $params = Arr::add(Request::only('with_genres', 'page'), 'language', $this->language);
        $filteredMovies = Http::withToken($this->tmdbToken)
            ->get("{$this->tmdbUrl}/discover/movie", $params)
            ->json();

        return MovieViewModel::formatMovie($filteredMovies);
    }

    public function searchFilter()
    {
        $params = Arr::add(Request::only('query', 'page'), 'language', $this->language);
        Log::debug($params);
        $res = Http::withToken($this->tmdbToken)
            ->get("{$this->tmdbUrl}/search/movie", $params)
            ->json();


        return MovieViewModel::formatMovie($res);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $responses = Http::pool(fn (Pool $pool) => [
            $pool->as('trendingMovie')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/trending/movie/week", ['language' => $this->language]),
            $pool->as('popularMovie')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/movie/popular", ['language' => $this->language]),
            $pool->as('nowPlayingMovie')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/movie/now_playing", ['language' => $this->language]),
            $pool->as('topRatedMovie')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/movie/top_rated", ['language' => $this->language]),
            $pool->as('genres')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/genre/movie/list", ['language' => $this->language]),

        ]);

        $mapped = Arr::map($responses, function ($value, $key) {
            return $key === "genres" ? $value->json()['genres'] : $value->json();
        });

        $viewModel = new MovieViewModel($mapped);

        return Inertia::render('Movies/Index', ['data' => $viewModel]);
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
