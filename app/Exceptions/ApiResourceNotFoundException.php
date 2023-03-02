<?php

namespace App\Exceptions;

use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class ApiResourceNotFoundException extends Exception
{
    /**
     * Report the exception.
     */
    public function report(): void
    {
        // ...
    }

    /**
     * Render the exception into an HTTP response.
     */
    public function render(Request $request)
    {
        $status = ['code' => $this->code, 'message' => $this->message];
        return Inertia::render('Error', ['status' => $status]);
    }
}
