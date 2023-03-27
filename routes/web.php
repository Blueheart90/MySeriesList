<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SerieController;
use App\Http\Controllers\TvListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Series
// Route::resource('series', SerieController::class);
Route::get('/series', [SerieController::class, 'index'])->name('series.index');
Route::get('/series/{id}/{slug?}', [SerieController::class, 'show'])->name('serie.show');
Route::get('/filter/series/genres', [SerieController::class, 'genresFilter'])->name('series.genres');
Route::get('/filter/series/search', [SerieController::class, 'searchFilter'])->name('series.search');

//TvList
Route::post('/tvlist', [TvListController::class, 'store'])->name('tvlist.store');
Route::put('/tvlist/{tvList}', [TvListController::class, 'update'])->name('tvlist.update');

//Review
Route::get('/review/{apiId}', [ReviewController::class, 'allReviews'])->name('reviews.all');


// Route::get('/test', [SerieController::class, 'test'])->name('series.test');



require __DIR__ . '/auth.php';
