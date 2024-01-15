<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\MusicHeard;
use Illuminate\Http\Request;

class MusicController extends Controller
{
    public function newMusicHeard($id_music)
    {
        $data = ['error' => ''];

        $music = MusicHeard::where('id_music', $id_music)->where('id_user', auth()->user()->id)->first();
        if ($music) {
            return $data;
        }

        $music = new MusicHeard();
        $music->id_music = $id_music;
        $music->id_user = auth()->user()->id;
        $music->save();

        return $data;
    }

    public function getLastMusic() {
        $data = ['error' => ''];

        $music = MusicHeard::select('id_music')->where('id_user', auth()->user()->id)->orderBy('id', 'desc')->first();
        if (!$music) {
            $data['error'] = 'Nehuma ultima musica tocada';
            return $data;
        }

        $data['music'] = Music::find($music->id_music);
        return $data;
    }
}
