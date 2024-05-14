<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AppController;
use App\Http\Controllers\TeamsController;
use App\Http\Controllers\FolderController;

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

        // Homepage
        Route::get('/app', [AppController::class, 'index'])->name('app');

        // Teams
        Route::group(['prefix' => '/teams'], function(){
                
            Route::get('/', [TeamsController::class, 'index'])->name('app.teams');

        });

        // Snippit
        Route::group(['prefix' => '/snippit'], function(){
                
            Route::get('/', function(){
                return Inertia::render('App');
            })->name('app.snippit');

        });

        Route::group(['prefix' => '/folder'], function(){
            Route::get('/', [FolderController::class, 'index'])->name('app.folders.index');
            Route::get('/loadFolderWithContent', [FolderController::class, 'loadFolderWithContent'])->name('app.folders.loadFolderWithContent');
            Route::get('/loadSubfoldersById', [FolderController::class, 'loadSubfoldersById'])->name('app.folders.loadSubfoldersById');
            Route::get('/{path}', [FolderController::class, 'index'])->where('path', '.*')->name('app.folders.path');
        });

        // Homepage OOB
        Route::get('/oob', function(){
            return Inertia::render('AppOob');
        });

});
