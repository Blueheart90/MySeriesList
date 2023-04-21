<?php

namespace App\ViewModels;

use Carbon\Carbon;
use Spatie\ViewModels\ViewModel;

class MovieShowViewModel extends ViewModel
{
    public $movie;
    public $movieListOldData;
    public $scoreList;
    public $stateWatchingList;
    public $editMode;

    // Se retiró $stateWatchingList del contructor, ya que se obtiene en el componente del dropDownform o el de livewire
    public function __construct($movie, $movieListOldData, $scoreList, $stateWatchingList)
    {
        $this->movie = $movie;
        $this->movieListOldData = $movieListOldData;
        $this->scoreList = $scoreList;
        $this->stateWatchingList = $stateWatchingList;
        $this->editMode = isset($this->movieListOldData) ? true : false;
    }

    protected function timeToHoursMinutes($time, $format = '%02dh %02dmin')
    {
        if ($time < 1) {
            return;
        }
        $hours = floor($time / 60);
        $minutes = ($time % 60);
        return sprintf($format, $hours, $minutes);
    }

    // Devuelve la serie creada por el User actual, si está en la DB
    public function movieListOldData()
    {
        return $this->movieListOldData;
    }

    public function editMode()
    {
        return $this->editMode;
    }

    // public function codeToLanguage($codeLang)
    // {
    //     if (Storage::exists('json/languages.json')) {
    //         $languages = json_decode(Storage::get('json/languages.json'), true);
    //     }

    //     // name o  nativeName
    //     return $languages[$codeLang]['name'];
    // }

    public function info()
    {
        return collect(['basic' => [
            'Titulo original' => $this->movie['original_title'],
            'Estreno' => Carbon::parse($this->movie['release_date'])->isoFormat('MMMM D, YYYY'),
            // 'Pagina Web' => '<a class=" hover:text-blue-800 hover:font-bold" href="' . $this->movie['homepage'] . '">Sitio Oficial</a>',
            'Estado' => $this->movie['status'],
            'Duración' => $this->timeToHoursMinutes($this->movie['runtime']),
            'Presupuesto' => $this->movie['budget'] == 0 ? 'No disponible' : '$' . number_format($this->movie['budget']),
            'Ingresos' => $this->movie['revenue'] == 0 ? 'No disponible' : '$' . number_format($this->movie['revenue']),
            'Lenguaje Original' => $this->movie['original_language'],

        ], 'homepage' => $this->movie['homepage']]);
    }

    public function movie()
    {
        return collect($this->movie)->merge([
            'poster_url' => $this->movie['poster_path']
                ? 'https://www.themoviedb.org/t/p/w440_and_h660_face' . $this->movie['poster_path']
                : 'https://via.placeholder.com/500x750',
            'vote_average' => $this->movie['vote_average'] * 10,
            'imdb_link' => 'https://www.imdb.com/title/' . $this->movie['imdb_id'],
            'release_date' => Carbon::parse($this->movie['release_date'])->format('M d, Y'),
            'runtime' => $this->timeToHoursMinutes($this->movie['runtime']),
            'genres' => collect($this->movie['genres'])->pluck('name')->flatten()->implode(', '),
            'name' => $this->movie['title'],
            'cast' => collect($this->movie['credits']['cast'])->take(10)->map(function ($cast) {
                return collect($cast)->merge([
                    'profile_path' => $cast['profile_path']
                        ? 'https://image.tmdb.org/t/p/w300' . $cast['profile_path']
                        : 'https://via.placeholder.com/300x450',
                ]);
            }),
            'cast_str_list' => collect($this->movie['credits']['cast'])->pluck('name')->flatten()->join(', ', ' y '),
            'crew' => collect($this->movie['credits']['crew'])->where('job', 'Director'),
            'director' => collect($this->movie['credits']['crew'])->where('job', 'Director'),
            'screenplay' => collect($this->movie['credits']['crew'])->where('job', 'Screenplay'),
            'images' => collect($this->movie['images']['backdrops'])->take(9),
            'backdrops' => collect($this->movie['images']['backdrops'])->take(5)->map(function ($bd) {
                return collect($bd)->merge([
                    'thumbnail' => 'https://image.tmdb.org/t/p/w300/' . $bd['file_path'],
                    'w780' => 'https://image.tmdb.org/t/p/w780/' . $bd['file_path'],
                    'w1280' => 'https://image.tmdb.org/t/p/w1280/' . $bd['file_path'],
                    'original' => 'https://image.tmdb.org/t/p/original/' . $bd['file_path'],
                    'caption' => 'Resolution: ' . $bd['width'] . 'x' . $bd['height'],
                ]);
            }),
            'videos' => collect($this->movie['videos']['results'])->take(5)->map(function ($video) {
                return collect($video)->merge([
                    'url' => $video['site'] === 'YouTube'
                        ? 'https://www.youtube.com/watch?v=' . $video['key']
                        : $video['key'],
                ]);
            }),
            'gallery' => [
                'images' => collect($this->movie['images']['backdrops'])->take(10)->map(function ($image) {
                    return [
                        'thumbnail' => 'https://image.tmdb.org/t/p/w300/' . $image['file_path'],
                        'source' => 'https://image.tmdb.org/t/p/original/' . $image['file_path']
                    ];
                }), 'videos' => collect($this->movie['videos']['results'])->take(10)->map(function ($video) {
                    return [
                        'thumbnail' => 'https://img.youtube.com/vi/' . $video['key'] . '/mqdefault.jpg',
                        'source' => $video['key']
                    ];
                })
            ],
            'random_bg' => $this->movie['images']['backdrops']
                ? 'http://image.tmdb.org/t/p/w1280' . collect($this->movie['images']['backdrops'])->random()['file_path']
                : '',
            'tagline' => $this->movie['tagline'],
            'year' => Carbon::parse($this->movie['release_date'])->format('Y'),

        ])->only([
            'poster_path', 'poster_url', 'id', 'genres', 'name', 'vote_average', 'imdb_link', 'overview', 'release_date', 'runtime', 'credits',
            'videos', 'gallery', 'images', 'backdrops', 'crew', 'director', 'screenplay', 'cast', 'cast_str_list', 'images', 'random_bg', 'created_by', 'tagline', 'year'
        ]);
    }
}
