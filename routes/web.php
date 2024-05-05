<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {

    Route::group(['prefix' => '/app'], function(){

        // Homepage
        Route::get('/', [AppController::class, 'index'])->name('app');

        // Teams
        Route::group(['prefix' => '/teams'], function(){
                
            Route::get('/', function(){
                return Inertia::render('App');
            })->name('app.teams');

        });

        // Snippit
        Route::group(['prefix' => '/snippit'], function(){
                
            Route::get('/', function(){
                return Inertia::render('App');
            })->name('app.snippit');

        });

        // Homepage OOB
        Route::get('/oob', function(){
            return Inertia::render('AppOob');
        });
    });

});
