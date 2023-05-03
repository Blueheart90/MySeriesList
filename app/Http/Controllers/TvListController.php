<?php

namespace App\Http\Controllers;

use App\Models\TvList;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\StoreTvListRequest;

class TvListController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'api_id' => 'required',
            'poster' => 'required',
            'season' => 'required',
            'episode' => 'required',
            'score_id' => 'required|numeric|min:1',
            'watching_state_id' => 'required|numeric|min:1',
        ]);

        $response = null;
        try {
            if (Auth::check()) {
                $list = auth()->user()->tvlists()->create($validatedData);
                Log::debug($list);
                return response()->json(['code' => 200, 'message' => 'Se agregó a tu lista con exito', 'tvlist' => $list], 200);
            } else {

                return response()->json(['code' => 401, 'message' => 'Debes iniciar sesion antes'], 401);
            }
        } catch (\Throwable $e) {

            return response()->json(['code' => 404, 'message' => 'Error desconocido. Intentalo mas tarde'], 404);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(TvList $tvList, Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'api_id' => 'required',
            'poster' => 'required',
            'season' => 'required',
            'episode' => 'required',
            'score_id' => 'required|numeric|min:1',
            'watching_state_id' => 'required|numeric|min:1',
        ]);
        // dd($tvList);
        try {

            $tvList->update($validatedData);
            // $tvList->update(['poster' => 'prueba']);
            return response()->json(['code' => 200, 'message' => 'Se Actualizó tu lista con exito'], 200);
        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'message' => $th->getMessage()], $th->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TvList $list)
    {
        $list->delete();
        return response()->json(['code' => 200, 'message' => 'Se eliminó tu lista con exito', 'list' => $list], 200);
    }
}
