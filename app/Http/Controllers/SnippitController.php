<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Folder;
class SnippitController extends Controller
{
    public function showCreate(Request $request){
        // get the folder id from the url and validate it
        $folderId = $request->query('folder_id');
        $parentFolder = null;
        if(is_numeric($folderId)){
            $parentFolder = Folder::select('id', 'name', 'slug', 'parent_id')->where('team_id', auth()->user()->currentTeam->id)->where('id', $folderId)->first();
        }
        if(!$parentFolder){
            $parentFolder = Folder::select('id', 'name', 'slug', 'parent_id')->where('team_id', auth()->user()->currentTeam->id)->where('root', true)->first();
        }

        $path = $parentFolder->getPath(true);
        return Inertia::render('Snippit/Editor', [
            'parentFolder' => $parentFolder,
            'path' => $path,
        ]);
    }
}
