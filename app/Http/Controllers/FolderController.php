<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Folder;
use Inertia\Inertia;


class FolderController extends Controller {

    public function index(Request $request, $path = null){
        $only = $request->header('X-Inertia-Partial-Data') ? explode(',', $request->header('X-Inertia-Partial-Data')) : [];
        $folder_id = $request->query('id') ? $request->query('id') : null;

        if(empty($only) || !$folder_id){

            $rootFolder = Folder::where('team_id', auth()->user()->currentTeam->id)
                ->where('root', true)
                ->with('subfolders')
                ->first();

            if (!$path) {
                $rootFolder->showSubfolders = true;
                $rootFolder->load('snippits.tags');
                return Inertia::render('Folders/Index', [
                    'folder' => $rootFolder,
                    'path' => $rootFolder
                ]);
            }

            $slugs = explode('/', trim($path, '/'));
            $currentFolder = $rootFolder;
            $currentFolder->showSubfolders = true;

            foreach ($slugs as $slug) {
                $currentFolder = $currentFolder->subfolders->firstWhere('slug', $slug);

                if (!$currentFolder) {
                    abort(404);
                }

                $currentFolder->showSubfolders = true;
            }

            $currentFolder->load('snippits.tags', 'subfolders');

            return Inertia::render('Folders/Index', [
                'folder' => $currentFolder,
                'path' => $rootFolder,
                'simplePath' => $currentFolder->getPath()
            ]);
        }

        // partial reload (only clicked folder)

        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $folder_id)->with('snippits.tags')->first();
        return Inertia::render('Folders/Index', [
            'folder' => $folder
        ]);
        
    }

    public function loadSubfoldersById(Request $request){
        $validated = $request->validate([
            'folderId' => 'required|integer'
        ]);
        $folders = Folder::where('team_id', auth()->user()->currentTeam->id)->where('root', false)->where('parent_id', $validated['folderId'])->get();
        return response()->json($folders);
    }

    public function loadFolderWithContent(Request $request){
        $validated = $request->validate([
            'folderId' => 'required|integer'
        ]);
        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['folderId'])->with('snippits.tags')->first();
        $path = $folder->getPath();
        return response()->json(['folder' => $folder, 'path' => $path]);
    }

    public function loadRootFolder(Request $request){
        $rootFolder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('root', true)->with('snippits')->first();
        return response()->json($rootFolder);
    }

    public function indexByPath($path){
        $slugs = explode('/', trim($path, '/'));

        $folderQuery = Folder::query();

        foreach ($slugs as $index => $slug) {
            $folderQuery->whereHas('parentFolder', function ($query) use ($slug, $index) {
                $query->where('slug', $slug);

                if ($index === 0) {
                    $query->where('root', true);
                }
            });
        }

        $folder = $folderQuery->where('team_id', auth()->user()->currentTeam->id)
            ->with('snippits')
            ->with('subfolders')
            ->first();
        dd($folder);
        return Inertia::render('Folders/Index', [
            'folder' => $folder
        ]);
    }

    public function create(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'parent_id' => 'required|integer'
        ]);

        $duplicates = Folder::where('team_id', auth()->user()->currentTeam->id)
            ->where('parent_id', $validated['parent_id'])
            ->where('name', $validated['name'])
            ->count();

        // if there are duplicates, return an error message
        if ($duplicates > 0) {
            return response()->json(['message' => 'Folder already exists'], 422);
        }

        $folder = new Folder();
        $folder->name = $validated['name'];
        $folder->slug = Str::slug($validated['name']);
        $folder->team_id = auth()->user()->currentTeam->id;
        $folder->parent_id = $validated['parent_id'];
        $folder->save();

        return response()->json($folder);
    }

    public function delete(Request $request){
        $validated = $request->validate([
            'folder_id' => 'required|integer'
        ]);
        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['folder_id'])->first();
        $deletedFolder = $folder->toArray();
        $folderName = $folder->name;
        $folder->delete();

        return response()->json(['message' => 'Folder '.$folderName.' deleted', 'deleted_folder' => $deletedFolder]);
    }

    public function rename(Request $request){
        
        $validated = $request->validate([
            'folder_id' => 'required|integer',
            'name' => 'required|string|min:3|max:40'
        ]);

        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['folder_id'])->first();
        
        $duplicates = Folder::where('team_id', auth()->user()->currentTeam->id)
            ->where('parent_id', $folder->parent_id)
            ->where('name', $validated['name'])
            ->count();

        // if there are duplicates, return an error message
        if ($duplicates > 0) {
            return response()->json(['message' => 'Folder already exists'], 422);
        }
        $folder->name = $validated['name'];
        $folder->slug = Str::slug($validated['name']);
        $folder->save();

        return response()->json(['message' => 'Folder renamed', 'folder' => $folder]);
    }
}
