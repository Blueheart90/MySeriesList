<?php

namespace App\Http\Controllers;

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
        $allReviews = Review::where('api_id', $apiId)->with(['user', 'tvlist'])->get();

        return response()->json($allReviews);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'recommended' => 'required',
            'api_id' => 'required',
            'content' => 'required',
            'tvlist_id' => '',
        ]);

        try {

            DB::transaction(function () use ($validatedData) {
                TvList::where([
                    ['api_id', $validatedData['api_id']],
                    ['user_id', auth()->id()]
                ])->firstOrFail();

                $query = auth()->user()->reviews()->create([
                    'content' => $validatedData['content'],
                    'api_id' => $validatedData['api_id'],
                    'recommended' => $validatedData['recommended'],
                    'tvlist_id' => $validatedData['tvlist_id'],
                ]);
            }, $deadlockRetries = 5);

            return response()->json(['code' => 200, 'message' => 'Se agregó correctamente tu reseña'], 200);
        } catch (ModelNotFoundException $th) {
            Log::debug($th->getMessage());
            Log::debug($th->getCode());
            Log::debug(get_class($th));
            return response()->json(['code' => 404, 'message' => 'Debes primero agregar una lista'], 404);
        }
    }
}
