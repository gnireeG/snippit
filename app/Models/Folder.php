<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use Illuminate\Database\Eloquent\Builder;


class Folder extends Model
{
    protected $fillable = ['name', 'parent_id', 'team_id', 'slug', 'root'];

    protected static function boot(){
        parent::boot();

        // Order by name ASC
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('name', 'asc');
        });
    }

    public function getPath($withRoot = false)
    {
        $path = [];
    
        $currentFolder = $this;
    
        while ($currentFolder && ($withRoot || !$currentFolder->root)) {
            $path[] = [
                'name' => $currentFolder->name,
                'slug' => $currentFolder->slug,
            ];
    
            $currentFolder = $currentFolder->parentFolder;
        }
    
        return array_reverse($path);
    }

    // Define the one-to-many relationship with Snippit
    public function snippits(): HasMany
    {
        return $this->hasMany(Snippit::class);
    }

    // Define the self-referential relationship for subfolders
    public function subfolders(): HasMany
    {
        return $this->hasMany(Folder::class, 'parent_id');
    }

    // Define the inverse of the self-referential relationship
    public function parentFolder(): BelongsTo
    {
        return $this->belongsTo(Folder::class, 'parent_id');
    }

    // Define the team relationship
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);    
    }

    // Define the validation rules
    public static function validationRules($parentId = null)
    {
        $uniqueNameRule = Rule::unique('folders', 'name')->where(function ($query) use ($parentId) {
            $query->where('parent_id', $parentId);
        });

        return [
            'name' => ['required', 'string', 'max:255', $uniqueNameRule],
        ];
    }
}
