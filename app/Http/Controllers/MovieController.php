<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Score;
use App\Models\MovieList;
use Illuminate\Support\Arr;
use App\Models\WatchingState;
use Illuminate\Http\Response;
use Illuminate\Http\Client\Pool;
use App\ViewModels\MovieViewModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Request;
use App\Exceptions\ApiResourceNotFoundException;
use App\ViewModels\MovieShowViewModel;

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
    public function show(string $id)
    {
        // Params
        $imageLanguage = 'en,es,null';
        $appendResponse = 'credits,videos,images';

        try {
            // Detalles de la Pelicula
            $movieShowDetails = Http::withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/movie/{$id}", ['language' => $this->language, 'append_to_response' => $appendResponse, 'include_image_language' => $imageLanguage])
                ->json();

            if (array_key_exists('success', $movieShowDetails)) {

                throw new ApiResourceNotFoundException('El recurso no esta disponible en la api', 404);
            }
        } catch (ApiResourceNotFoundException $e) {
            session()->flash('message', $e->getMessage());
            return view('users.notfound');
        }

        // ** Se comprueba si el user ya agregó la serie
        // $tvCheck = TvList::where([['api_id', $serie],['user_id', Auth::id()]])->exists();

        // ** Se obtiene el registro de la pelicula agregada por el User
        $movieListOldData = MovieList::where([['api_id', $id], ['user_id', Auth::id()]])->first();


        // ** Se obtiene la escala de puntaje 1 a 10
        $scoreList = Score::all(['id', 'name']);

        // ** Se obtiene los estados. ej viendo, en plan para ver , etc..
        $stateWatchingList = WatchingState::all(['id', 'name']);


        $viewModel = new MovieShowViewModel(
            $movieShowDetails,
            $movieListOldData,
            $scoreList,
            $stateWatchingList
        );


        return Inertia::render('Movies/Show', ['data' => $viewModel]);
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
