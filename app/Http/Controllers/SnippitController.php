<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Folder;
use App\Models\Snippit;
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

    public function showEdit(Request $request){
        $snippitId = $request->route('id');
        $snippit = Snippit::where('team_id', auth()->user()->currentTeam->id)->where('id', $snippitId)->first();
        if(!$snippit){
            abort(404);
        }

        $path = $snippit->folder->getPath(true);
        $parentFolder = $snippit->folder;
        return Inertia::render('Snippit/Editor', [
            'snippit' => $snippit,
            'path' => $path,
            'parentFolder' => $parentFolder,
        ]);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255|min:3',
            'code' => 'required|string',
            'folder_id' => 'required|numeric',
            'language' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['folder_id'])->first();

        if(!$folder){
            abort(403);
        }

        $snippit = Snippit::create([
            'title' => $validated['title'],
            'code' => $validated['code'],
            'language' => $validated['language'],
            'folder_id' => $validated['folder_id'],
            'description' => $validated['description'],
            'team_id' => auth()->user()->currentTeam->id,
            'user_id' => auth()->user()->id,
        ]);

        //return to_route('app.snippit.showEdit', ['id' => $snippit->id]);
        return redirect()->route('app.snippit.showEdit', ['id' => $snippit->id])->with('alert', ['type' => 'success', 'message' => 'Snippit created successfully']);
    }

    public function update(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255|min:3',
            'code' => 'required|string',
            'folder_id' => 'required|numeric',
            'language' => 'required|string',
            'description' => 'nullable|string',
            'id' => 'required|numeric',
        ]);

        $snippit = Snippit::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['id'])->first();

        if(!$snippit){
            abort(404);
        }

        $snippit->update([
            'title' => $validated['title'],
            'code' => $validated['code'],
            'language' => $validated['language'],
            'folder_id' => $validated['folder_id'],
            'description' => $validated['description'],
        ]);

        return redirect()->back()->with('alert', ['type' => 'success', 'message' => 'Snippit updated successfully']);
    }

    public function move(Request $request){
        $validated = $request->validate([
            'snippit_id' => 'required|numeric',
            'folder_id' => 'required|numeric',
        ]);

        $snippit = Snippit::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['snippit_id'])->first();
        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['folder_id'])->first();

        if(!$snippit || !$folder){
            abort(404);
        }

        $snippit->update([
            'folder_id' => $validated['folder_id'],
        ]);

        return response()->json(['message' => 'Snippit moved successfully']);
    }

    public function destroy(Request $request){
        $validated = $request->validate([
            'id' => 'required|numeric',
        ]);

        $snippit = Snippit::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['id'])->first();

        if(!$snippit){
            abort(404);
        }

        $snippit->delete();

        return response()->json(['message' => 'Snippit deleted successfully']);
    }
}
