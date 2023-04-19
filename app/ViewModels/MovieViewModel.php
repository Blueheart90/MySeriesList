<?php

namespace App\ViewModels;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Spatie\ViewModels\ViewModel;

class MovieViewModel extends ViewModel
{
    protected $ignore = ['formatMovie'];

    public $trendingMovie;
    public $popularMovie;
    public $nowPlayingMovie;
    public $topRatedMovie;
    public $genres;

    public function __construct($data)
    {
        $this->trendingMovie = $data['trendingMovie'];
        $this->popularMovie = $data['popularMovie'];
        $this->nowPlayingMovie = $data['nowPlayingMovie'];
        $this->topRatedMovie = $data['topRatedMovie'];
        $this->genres = $data['genres'];
    }

    public function trendingMovie()
    {
        return $this->formatMovie($this->trendingMovie);
    }
    public function popularMovie()
    {
        return $this->formatMovie($this->popularMovie);
    }
    public function nowPlayingMovie()
    {
        return $this->formatMovie($this->nowPlayingMovie);
    }

    public function topRatedMovie()
    {
        return $this->formatMovie($this->topRatedMovie);
    }

    public function genres()
    {
        return collect($this->genres);
    }

    public static function formatMovie($tv)
    {
        $tv['results'] = collect($tv['results'])->map(function ($tvshow) {
            return collect($tvshow)->merge([
                'poster_path' => $tvshow['poster_path'] ? 'https://www.themoviedb.org/t/p/w440_and_h660_face' . $tvshow['poster_path'] : 'https://dummyimage.com/440x660/20234f/7cdb29&text=No+Image',
                'poster_thumbnail' => $tvshow['poster_path'] ? 'https://www.themoviedb.org/t/p/w220_and_h330_face' . $tvshow['poster_path'] : 'https://dummyimage.com/220x330/20234f/7cdb29&text=No+Image',
                'vote_average' => $tvshow['vote_average'] * 10 . '%',
                'release_date' => array_key_exists('release_date', $tvshow) ? Carbon::parse($tvshow['release_date'])->format('M d, Y') : 'n/a',
                'year' => array_key_exists('release_date', $tvshow) ? Carbon::parse($tvshow['release_date'])->format('Y') : 'n/a',
                'name' => $tvshow['title'],
                'slug' => Str::of($tvshow['title'])->slug('-'),
            ])->only([
                'poster_path', 'poster_thumbnail', 'id', 'genre_ids', 'title', 'name', 'vote_average', 'overview', 'release_date', 'year', 'genres', 'slug',
            ]);
        });

        return $tv;
    }
}
