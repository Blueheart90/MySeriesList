<?php

namespace App\ViewModels;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Spatie\ViewModels\ViewModel;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SerieShowViewModel extends ViewModel
{
    public $tvshow;
    public $tvListOldData;

    public $stateWatchingList;
    public $scoreList;
    public $editMode;

    // Se retiró $stateWatchingList del contructor, ya que se obtiene en el componente del dropDownform o el de livewire
    public function __construct($tvshow, $tvListOldData, $scoreList, $stateWatchingList)
    {
        $this->tvshow = $tvshow;
        $this->tvListOldData = $tvListOldData;
        $this->scoreList = $scoreList;
        $this->stateWatchingList = $stateWatchingList;
        $this->editMode = isset($this->tvListOldData) ? true : false;
    }

    // Si devuelve la serie creada por el User actual, si está en la DB
    public function tvListOldData()
    {
        return $this->tvListOldData;
    }

    public function editMode()
    {
        return $this->editMode;
    }

    protected function api_flags($codeNameCountry)
    {
        // return Http::get('https://flagcdn.com/en/codes.json')
        // ->json()[$nameCode];

        $response = Http::get('https://restcountries.com/v3.1/alpha/' . $codeNameCountry)
            ->json()[0];

        return collect($response)->merge([
            'name' => $response['translations']['spa'],
            'language' => collect($response['languages'])->flatten()[0]
        ])->only(['name', 'language', 'flags']);
    }


    public function info()
    {
        if ($this->tvshow['origin_country']) {
            $countryInfo = $this->api_flags(Str::lower($this->tvshow['origin_country'][0]));
        } else {
            $countryInfo = [
                'name' => 'No disponible',
                'flag' => 'No disponible',
                'language' => 'No disponible',
            ];
        }

        return collect(['basic' => [
            'Primera Emision' => Carbon::parse($this->tvshow['first_air_date'])->isoFormat('MMMM D, YYYY'),
            // 'Pagina Web' => '<a class="transition-all duration-300 hover:text-secundary hover:text-3xl" href="' . $this->tvshow['homepage'] . '">Sitio Oficial</a>',
            'Estado' => $this->tvshow['status'],
            'Ultimo Capitulo' => $this->tvshow['last_episode_to_air']
                ? Carbon::parse($this->tvshow['last_episode_to_air']['air_date'])->isoFormat('MMMM D, YYYY')
                : 'No Disponible',
            'Siguiente Capitulo' => $this->tvshow['next_episode_to_air']
                ? Carbon::parse($this->tvshow['next_episode_to_air']['air_date'])->isoFormat('MMMM D, YYYY')
                : 'No Disponible',
            'Temporadas' => $this->tvshow['number_of_seasons'],
            'Capitulos' => $this->tvshow['number_of_episodes'],
            'Compañia' => collect($this->tvshow['networks'])->pluck('name')->implode(', '),
            'Lenguaje Original' => $countryInfo['language'],
        ], 'originalCountry' => $countryInfo, 'homepage' => $this->tvshow['homepage']]);
    }

    public function tvshow()
    {
        return collect($this->tvshow)->merge([
            'poster_url' => $this->tvshow['poster_path']
                ? 'https://www.themoviedb.org/t/p/w342' . $this->tvshow['poster_path']
                : 'https://via.placeholder.com/500x750',
            'vote_average' => $this->tvshow['vote_average'] * 10,
            'first_air_date' => Carbon::parse($this->tvshow['first_air_date'])->format('M d, Y'),
            'genres' => collect($this->tvshow['genres'])->pluck('name')->flatten()->implode(', '),
            'cast' => collect($this->tvshow['credits']['cast'])->take(10)->map(function ($cast) {
                return collect($cast)->merge([
                    'profile_path' => $cast['profile_path']
                        ? 'https://image.tmdb.org/t/p/w300' . $cast['profile_path']
                        : 'https://via.placeholder.com/300x450',
                ]);
            }),
            'cast_str_list' => collect($this->tvshow['credits']['cast'])->pluck('name')->flatten()->join(', ', ' y '),
            'images' => collect($this->tvshow['images']['backdrops'])->take(10),
            'backdrops' => collect($this->tvshow['images']['backdrops'])->take(10)->map(function ($bd) {
                return collect($bd)->merge([
                    'thumbnail' => 'https://image.tmdb.org/t/p/w300/' . $bd['file_path'],
                    'w780' => 'https://image.tmdb.org/t/p/w780/' . $bd['file_path'],
                    'w1280' => 'https://image.tmdb.org/t/p/w1280/' . $bd['file_path'],
                    'original' => 'https://image.tmdb.org/t/p/original/' . $bd['file_path'],
                    'caption' => 'Resolution: ' . $bd['width'] . 'x' . $bd['height'],
                ]);
            }),
            'videos' => collect($this->tvshow['videos']['results'])->take(5)->map(function ($video) {
                return collect($video)->merge([
                    'file_path' => $video['site'] === 'YouTube'
                        ? 'https://www.youtube.com/watch?v=' . $video['key']
                        : $video['key'],
                ]);
            }),
            'gallery' => [
                'images' => collect($this->tvshow['images']['backdrops'])->take(10)->map(function ($image) {
                    return [
                        'thumbnail' => 'https://image.tmdb.org/t/p/w300/' . $image['file_path'],
                        'source' => 'https://image.tmdb.org/t/p/original/' . $image['file_path']
                    ];
                }), 'videos' => collect($this->tvshow['videos']['results'])->take(10)->map(function ($video) {
                    return [
                        'thumbnail' => 'https://img.youtube.com/vi/' . $video['key'] . '/mqdefault.jpg',
                        'source' => $video['key']
                    ];
                })
            ],
            'random_bg' => $this->tvshow['images']['backdrops']
                ? 'https://image.tmdb.org/t/p/w1280' . collect($this->tvshow['images']['backdrops'])->random()['file_path']
                : '',
            'tagline' => $this->tvshow['tagline'],
            'year' => Carbon::parse($this->tvshow['first_air_date'])->format('Y'),
            'stringEpCount' => collect($this->tvshow['seasons'])->mapWithKeys(function ($season) {
                return [$season['season_number'] => $season['episode_count']];
            }),
            'seasons' => collect($this->tvshow['seasons'])->mapWithKeys(function ($season) {
                return [$season['season_number'] => $season['episode_count']];
            })->reject(function ($value, $key) {
                // No toma el index 0, el cual equivale a los ep. especiales
                return $key == 0;
            }),

        ])->only([
            'poster_path', 'poster_url', 'id', 'genres', 'name', 'vote_average', 'overview', 'first_air_date', 'credits',
            'videos', 'gallery', 'images', 'backdrops', 'crew', 'cast', 'cast_str_list', 'images', 'random_bg', 'created_by', 'tagline', 'year', 'seasons', 'stringEpCount'
        ]);
    }
}
