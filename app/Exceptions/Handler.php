<?php

namespace App\Exceptions;

use Throwable;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        $response = parent::render($request, $exception);

        if (
            (App::environment(['production']))
            // && $request->header('X-Inertia')
            && in_array($response->status(), [500, 503, 404, 403])
        ) {
            return Inertia::render('Error', ['status' => $response->status()])
                ->toResponse($request)
                ->setStatusCode($response->status());
        }

        return $response;
    }
}
