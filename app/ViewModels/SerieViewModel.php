<?php

namespace App\ViewModels;

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Spatie\ViewModels\ViewModel;

class SerieViewModel extends ViewModel
{
    protected $ignore = ['formatTv'];

    public $trendingTv;
    public $popularTv;
    public $onAirTv;
    public $topRatedTv;
    public $genres;

    public function __construct($data)
    {
        $this->trendingTv = $data['trendingTv'];
        $this->popularTv = $data['popularTv'];
        $this->onAirTv = $data['onAirTv'];
        $this->topRatedTv = $data['topRatedTv'];
        $this->genres = $data['genres'];
    }

    public function trendingTv()
    {
        return $this->formatTv($this->trendingTv);
    }
    public function popularTv()
    {
        return $this->formatTv($this->popularTv);
    }
    public function onAirTv()
    {
        return $this->formatTv($this->onAirTv);
    }

    public function topRatedTv()
    {
        return $this->formatTv($this->topRatedTv);
    }

    public function genres()
    {

        return collect($this->genres);
    }

    public static function formatTv($tv)
    {
        $tv['results'] = collect($tv['results'])->map(function ($tvshow) {
            return collect($tvshow)->merge([
                'poster_path' => $tvshow['poster_path'] ? 'https://www.themoviedb.org/t/p/w440_and_h660_face' . $tvshow['poster_path'] : 'https://dummyimage.com/440x660/20234f/7cdb29&text=No+Image',
                'poster_thumbnail' => $tvshow['poster_path'] ? 'https://www.themoviedb.org/t/p/w220_and_h330_face' . $tvshow['poster_path'] : 'https://dummyimage.com/220x330/20234f/7cdb29&text=No+Image',
                'vote_average' => $tvshow['vote_average'] * 10 . '%',
                'first_air_date' => array_key_exists('first_air_date', $tvshow) ? Carbon::parse($tvshow['first_air_date'])->format('M d, Y') : 'n/a',
                'year' => array_key_exists('first_air_date', $tvshow) ? Carbon::parse($tvshow['first_air_date'])->format('Y') : "n/a",
                'slug' => Str::of($tvshow['name'])->slug('-'),
            ])->only([
                'poster_path', 'poster_thumbnail', 'id', 'genre_ids', 'name', 'vote_average', 'overview', 'first_air_date', 'year', 'slug',
            ]);
        });

        return $tv;
    }
}
