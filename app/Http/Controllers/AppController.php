<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Snippit;

class AppController extends Controller
{
    public function index(Request $request){
        $snippits = $request->user()->currentTeam->snippits()->limit(5)->with('tags')->orderBy('created_at', 'DESC')->get();
        return Inertia::render('App', [
            'snippits' => $snippits,
        ]);
    }

    public function search(Request $request){
        // retrieve the search params
        $search = $request->input('q');
        $tags = $request->input('tags');
        if($tags){
            $tags = explode(',', $tags);
        }

        $searchTitle = filter_var($request->input('title'), FILTER_VALIDATE_BOOLEAN);
        $searchDesc = filter_var($request->input('description'), FILTER_VALIDATE_BOOLEAN);
        $searchCode = filter_var($request->input('code'), FILTER_VALIDATE_BOOLEAN);

        $query = Snippit::where('team_id', $request->user()->currentTeam->id);

        $query = $query->where(function($q) use ($search, $searchTitle, $searchDesc, $searchCode){
            if($searchTitle){
                $q->where('title', 'LIKE', '%'.$search.'%');
            }
            if($searchDesc){
                $q->orWhere('description', 'LIKE', '%'.$search.'%');
            }
            if($searchCode){
                $q->orWhere('code', 'LIKE', '%'.$search.'%');
            }
        });

        if($tags){
            $query = $query->withAllTags($tags);
        }
        if($tags || $search){
            $snippits = $query->with('tags')->get();
        } else{
            $snippits = [];
        }

        return Inertia::render('Search', [
            'snippits' => $snippits,
        ]);
    }
}
