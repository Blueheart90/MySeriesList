<?php

namespace App\Http\Controllers;

use App\Models\MovieList;
use App\Models\Review;
use App\Models\TvList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ReviewController extends Controller
{
    public function allReviews($apiId)
    {
        $allReviews = Review::where('api_id', $apiId)->with(['user', 'reviewable'])->get();

        return response()->json($allReviews);
    }

    public function store(Request $request, $model)
    {
        $validatedData = $request->validate([
            'recommended' => 'required',
            'api_id' => 'required',
            'content' => 'required',
            'tvlist_id' => '',
        ]);

        try {
            if ($model === 'tv') {
                $list = TvList::where([
                    ['api_id', $validatedData['api_id']],
                    ['user_id', auth()->id()]
                ])->firstOrFail();
            }
            if ($model === 'movie') {
                $list = MovieList::where([
                    ['api_id', $validatedData['api_id']],
                    ['user_id', auth()->id()]
                ])->firstOrFail();
            }
            // $review = auth()->user()->reviews()->create([
            //     'content' => $validatedData['content'],
            //     'api_id' => $validatedData['api_id'],
            //     'recommended' => $validatedData['recommended'],
            //     'tvlist_id' => $validatedData['tvlist_id'],
            // ]);
            $review = $list->review()->create([
                'content' => $validatedData['content'],
                'api_id' => $validatedData['api_id'],
                'recommended' => $validatedData['recommended'],
                'user_id' => auth()->id(),
            ]);


            $newRecord = collect($review)->merge(['reviewable' => $list, 'user' => auth()->user()]);
            return response()->json(['code' => 200, 'message' => 'Se agregó correctamente tu reseña', 'newRecord' => $newRecord], 200);
        } catch (ModelNotFoundException $th) {
            // Log::debug($th->getMessage());
            // Log::debug($th->getCode());
            // Log::debug(get_class($th));
            return response()->json(['code' => 404, 'message' => 'Debes primero agregar una lista'], 404);
        }
    }
    public function update(Review $review, Request $request)
    {
        $validatedData = $request->validate([
            'recommended' => 'required',
            'content' => 'required',
        ]);
        try {
            $review->update([
                'content' => $validatedData['content'],
                'recommended' => $validatedData['recommended']
            ]);
            $reviewUpdated = $review->fresh();
            return response()->json(['code' => 200, 'message' => 'Se Actualizo correctamente tu reseña', 'newRecord' => $reviewUpdated], 200);
        } catch (\Throwable $th) {
            // Log::debug($th->getMessage());
            // Log::debug($th->getCode());
            // Log::debug(get_class($th));
            return response()->json(['code' => $th->getCode(), 'message' => $th->getMessage()], $th->getCode());
        }
    }
}
