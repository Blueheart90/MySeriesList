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


        // 

        // Log::debug($validatedData);

        if (Auth::check()) {
            auth()->user()->tvlists()->create($validatedData);
            // session()->flash('success', 'Agregada exitosamente');
        } else {
            session()->flash('error', 'Debes iniciar sesion');
        }
    }


    public function checkUser($api_id)
    {
        // Se revisa si ya el usuario tiene agregada la serie en una lista
        $oldData = TvList::where('api_id', $api_id)->where('user_id', auth()->id())->first();
        return $oldData;
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
    public function update(Request $request, TvList $tvList): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TvList $tvList): RedirectResponse
    {
        //
    }
}
