<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index(Request $request){
        $snippits = $request->user()->currentTeam->snippits()->limit(5)->get();
        return Inertia::render('App', [
            'snippits' => $snippits,
        ]);
    }
}
