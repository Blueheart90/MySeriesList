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
                auth()->user()->tvlists()->create($validatedData);
                $response = ['success' => 'Agregada exitosamente'];
            } else {

                $response = ['error' => 'Debes iniciar sesion'];
            }
        } catch (\Throwable $e) {
            return back()->withErrors(['msg' => 'Hubo un problema al guardar el registro. Por favor, intenta de nuevo.']);
        }

        return $response;
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
