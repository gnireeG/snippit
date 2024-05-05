<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Snippit extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'code',
        'language',
        'user_id',
        'team_id',
    ];

    public function owner(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function team(){
        return $this->belongsTo(Team::class);
    }
}
