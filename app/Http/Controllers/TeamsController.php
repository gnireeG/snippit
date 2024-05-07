<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
class TeamsController extends Controller
{
    public function index(Request $request){
        $teams = $request->user()->allTeams();
        $teams = $teams->map(function ($team) {
            $team->users_count = $team->allUsers()->count();
            return $team;
        });
        return Inertia::render('Teams/Index', [
            'teams' => $teams,
        ]);
    }
}
