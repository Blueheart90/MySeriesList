<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function allReviews($apiId)
    {
        $allReviews = Review::where('api_id', $apiId)->with(['user', 'tvlist'])->get();
        return response()->json($allReviews);
    }
}
