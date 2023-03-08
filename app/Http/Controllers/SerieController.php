<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Score;
// use Illuminate\Http\Request;
use App\Models\TvList;
use Illuminate\Support\Arr;
use App\Models\WatchingState;
use Illuminate\Http\Response;
use Illuminate\Http\Client\Pool;
use App\ViewModels\SerieViewModel;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\RedirectResponse;
use App\ViewModels\SerieShowViewModel;
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


    public function genresFilter()
    {
        $params = Arr::add(Request::only('with_genres', 'page'), 'language', $this->language);
        $filteredTv = Http::withToken($this->tmdbToken)
            ->get("{$this->tmdbUrl}/discover/tv", $params)
            ->json();

        return SerieViewModel::formatTv($filteredTv);
    }

    public function searchFilter()
    {
        $params = Arr::add(Request::only('query', 'page'), 'language', $this->language);
        Log::debug($params);
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Params
        $imageLanguage = 'en,es,null';
        $appendResponse = 'credits,videos,images';

        try {
            // Detalles de la Serie
            $tvShowDetails = Http::withToken($this->tmdbToken)
                ->get("{$this->tmdbUrl}/tv/{$id}", ['language' => $this->language, 'append_to_response' => $appendResponse, 'include_image_language' => $imageLanguage])
                ->json();

            if (array_key_exists('success', $tvShowDetails)) {

                throw new ApiResourceNotFoundException('El recurso no esta disponible en la api', 404);
            }
        } catch (ApiResourceNotFoundException $e) {
            session()->flash('message', $e->getMessage());
            return view('users.notfound');
        }

        // ** Se comprueba si el user ya agregó la serie
        // $tvCheck = TvList::where([['api_id', $serie],['user_id', Auth::id()]])->exists();

        // ** Se obtiene el registro de la serie agregada por el User
        $tvListOldData = TvList::where([['api_id', $id], ['user_id', Auth::id()]])->first();

        // ** Se obtiene los estados. ej viendo, en plan para ver , etc..
        $stateWatchingList = WatchingState::all(['id', 'name']);

        // ** Se obtiene la escala de puntaje 1 a 10
        $scoreList = Score::all(['id', 'name']);

        $viewModel = new SerieShowViewModel(
            $tvShowDetails,
            $tvListOldData,
            $scoreList,
            $stateWatchingList
        );


        return Inertia::render('Series/Show', ['data' => $viewModel]);

        // Log::debug($tvShowDetails);
    }
}
