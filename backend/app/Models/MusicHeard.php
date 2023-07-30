<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MusicHeard extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $table = 'musics_heard';

    public function music()
    {
        return $this->belongsTo(Music::class, 'id_music');
    }
}
