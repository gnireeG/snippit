<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use Inertia\Inertia;
class FolderController extends Controller
{
    public function index(Request $request, $path = null)
{
    $rootFolder = Folder::where('team_id', auth()->user()->currentTeam->id)
        ->where('root', true)
        ->with('subfolders')
        ->first();

    if (!$path) {
        $rootFolder->showSubfolders = true;
        $rootFolder->load('snippits');
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

    $currentFolder->load('snippits', 'subfolders');

    return Inertia::render('Folders/Index', [
        'folder' => $currentFolder,
        'path' => $rootFolder
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
        $folder = Folder::where('team_id', auth()->user()->currentTeam->id)->where('id', $validated['folderId'])->with('snippits')->first();
        $path = $folder->getPath();
        return response()->json(['folder' => $folder, 'path' => $path]);
    }

    public function indexByPath($path)
{
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
}
