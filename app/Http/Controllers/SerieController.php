<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Arr;
// use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\Client\Pool;
use App\ViewModels\SerieViewModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Request;
use App\Exceptions\ApiResourceNotFoundException;


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

        // Inertia::share('tmdbUrl', config('services.tmdb.url'));
        // Inertia::share('tmdbToken', config('services.tmdb.token'));

        $responses = Http::pool(fn (Pool $pool) => [
            $pool->as('trendingTv')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/trending/tv/week", ['language' => $this->language]),
            $pool->as('popularTv')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/tv/popular", ['language' => $this->language]),
            $pool->as('onAirTv')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/tv/on_the_air", ['language' => $this->language]),
            $pool->as('topRatedTv')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/tv/top_rated", ['language' => $this->language]),
            $pool->as('genres')->withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/genre/tv/list", ['language' => $this->language]),

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
    public function show(string $id)
    {
        // // Params
        // $imageLanguage = 'en,es,null';
        // $appendResponse = 'credits,videos,images';

        // try {
        //     // Detalles de la Serie
        //     $tvShowDetails = Http::withToken(config('services.tmdb.token'))
        //         ->get("{$this->tmdbUrl}/trending/tv/{$id}", ['language' => $this->language, 'append_to_response' => $appendResponse, 'include_image_language' => $imageLanguage])
        //         ->json();

        //     if (array_key_exists('success', $tvShowDetails)) {

        //         throw new ApiResourceNotFoundException('El recurso no esta disponible en la api');
        //     }
        // } catch (ApiResourceNotFoundException $e) {
        //     session()->flash('message', $e->getMessage());
        //     return view('users.notfound');
        // }

        // // ** Se comprueba si el user ya agregó la serie
        // // $tvCheck = TvList::where([['api_id', $serie],['user_id', Auth::id()]])->exists();

        // // ** Se obtiene el registro de la serie agregada por el User
        // $tvCheck = TvList::where([['api_id', $serie], ['user_id', Auth::id()]])->first();

        // // ** Se obtiene los estados. ej viendo, en plan para ver , etc..
        // // $stateWatchingList = WatchingState::all(['id','name']);

        // // ** Se obtiene la escala de puntaje 1 a 10
        // $scoreList = Score::all(['id', 'name']);

        // $viewModel = new TvShowViewModel(
        //     $tvShowDetails,
        //     $tvCheck,
        //     // $stateWatchingList,
        //     $scoreList
        // );


        // return view('series.show', $viewModel);

        throw new ApiResourceNotFoundException('El recurso no esta disponible en la api', 600);
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
