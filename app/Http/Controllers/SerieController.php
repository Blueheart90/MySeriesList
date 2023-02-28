<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Arr;
// use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Client\Pool;
use App\ViewModels\SerieViewModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;


class SerieController extends Controller
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


    public function test()
    {
        $params = Arr::add(Request::only('query', 'page'), 'language', $this->language);
        $res = Http::withToken($this->tmdbToken)
            ->get("{$this->tmdbUrl}/search/tv", $params)
            ->json();

        $format = SerieViewModel::formatTv($res);
        Log::debug($format);
    }

    public function genresFilter(string $ids, $page = null)
    {

        $filteredTv = Http::withToken($this->tmdbToken)
            ->get("{$this->tmdbUrl}/discover/tv", ['language' => $this->language, 'with_genres' => $ids, 'page' => $page])
            ->json();

        return SerieViewModel::formatTv($filteredTv);
    }

    public function searchFilter()
    {
        $params = Arr::add(Request::only('query', 'page'), 'language', $this->language);
        $res = Http::withToken($this->tmdbToken)
            ->get("{$this->tmdbUrl}/search/tv", $params)
            ->json();


        return SerieViewModel::formatTv($res);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $language = 'es-mx';
        $tmdbToken = config('services.tmdb.token');
        $tmdbUrl = config('services.tmdb.url');

        // Inertia::share('tmdbUrl', config('services.tmdb.url'));
        // Inertia::share('tmdbToken', config('services.tmdb.token'));

        $responses = Http::pool(fn (Pool $pool) => [
            $pool->as('trendingTv')->withToken($tmdbToken)
                ->get("{$tmdbUrl}/trending/tv/week", ['language' => $language]),
            $pool->as('popularTv')->withToken($tmdbToken)
                ->get("{$tmdbUrl}/tv/popular", ['language' => $language]),
            $pool->as('onAirTv')->withToken($tmdbToken)
                ->get("{$tmdbUrl}/tv/on_the_air", ['language' => $language]),
            $pool->as('topRatedTv')->withToken($tmdbToken)
                ->get("{$tmdbUrl}/tv/top_rated", ['language' => $language]),
            $pool->as('genres')->withToken($tmdbToken)
                ->get("{$tmdbUrl}/genre/tv/list", ['language' => $language]),

        ]);

        $mapped = Arr::map($responses, function ($value, $key) {
            return $key === "genres" ? $value->json()['genres'] : $value->json();
        });

        $viewModel = new SerieViewModel($mapped);

        return Inertia::render('Series/Index', ['data' => $viewModel]);
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
