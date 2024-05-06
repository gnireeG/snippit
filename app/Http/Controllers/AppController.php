<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index(Request $request){
        $snippits = $request->user()->currentTeam->snippits()->get();
        return Inertia::render('App', [
            'snippits' => $snippits,
        ]);
    }
}
