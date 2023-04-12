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
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

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
                return response()->json(['code' => 200, 'message' => 'Se agregó a tu lista con exito', 'tvlist_id' => $list->id], 200);
            } else {

                return response()->json(['code' => 401, 'message' => 'Debes iniciar sesion antes'], 401);
            }
        } catch (\Throwable $e) {

            return response()->json(['code' => 404, 'message' => 'Error desconocido. Intentalo mas tarde'], 404);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(TvList $tvList): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TvList $tvList): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TvList $tvList)
    {
        $response = null;
        $validatedData = $request->validate([
            'name' => 'required',
            'api_id' => 'required',
            'poster' => 'required',
            'season' => 'required',
            'episode' => 'required',
            'score_id' => 'required|numeric|min:1',
            'watching_state_id' => 'required|numeric|min:1',
        ]);

        try {

            $tvList->update($validatedData);
            $response = ['success' => 'Agregada exitosamente'];
        } catch (\Throwable $e) {
            $response = ['error' => $e->message];
        }

        // return response()->json(['success' => true]);
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TvList $tvList): RedirectResponse
    {
        //
    }
}
