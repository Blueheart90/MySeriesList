<?php

namespace App\Http\Controllers;

use App\Models\MovieList;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class MovieListController extends Controller
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
            'score_id' => 'required|numeric|min:1',
            'watching_state_id' => 'required|numeric|min:1',
        ]);

        $response = null;
        try {
            if (Auth::check()) {
                $list = auth()->user()->movielists()->create($validatedData);
                Log::debug($list);
                return response()->json(['code' => 200, 'message' => 'Se agregó a tu lista con exito', 'movielists' => $list], 200);
            } else {

                return response()->json(['code' => 401, 'message' => 'Debes iniciar sesion antes'], 401);
            }
        } catch (\Throwable $th) {

            return response()->json(['code' => $th->getCode(), 'message' => $th->getMessage()], $th->getCode());
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(MovieList $movieList): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MovieList $movieList): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MovieList $movielist, Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'api_id' => 'required',
            'poster' => 'required',
            'score_id' => 'required|numeric|min:1',
            'watching_state_id' => 'required|numeric|min:1',
        ]);
        try {

            $movielist->update($validatedData);
            return response()->json(['code' => 200, 'message' => 'Se Actualizó tu lista con exito'], 200);
        } catch (\Throwable $th) {
            return response()->json(['code' => $th->getCode(), 'message' => $th->getMessage()], $th->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MovieList $movieList): RedirectResponse
    {
        //
    }
}
