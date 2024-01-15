<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaylistMusic extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $table = 'playlist_musics';

    public function musics()
    {
        return $this->hasMany(Music::class, 'id', 'id_music');
    }
}
