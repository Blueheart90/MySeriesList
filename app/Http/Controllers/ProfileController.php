<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($request->hasFile('profile_photo_path')) {
            // Almacena la imagen en myapp/storage/app/public
            // Ej. 'profile/image_name.jpg'
            $url = $request->file('profile_photo_path')->store('profile', 'public');

            // comprobamos si el user tiene un avatar
            if (isset($request->user()->profile_photo_path)) {
                // Si es asi, preguntamos si esta imagen existe en la carpeta 'public/courses/image.jpg
                if (Storage::exists('public/' . $request->user()->profile_photo_path)) {
                    // Si esta existe se elimina
                    Storage::delete('public/' . $request->user()->profile_photo_path);
                }
            }
            // actualizamos por medio de la relacion la url
            $request->user()->profile_photo_path = $url;
        }
        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
