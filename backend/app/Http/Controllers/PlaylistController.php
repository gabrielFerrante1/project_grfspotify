<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Playlist;
use App\Models\PlaylistMusic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaylistController extends Controller
{
    protected $user_id;

    public function __construct()
    {
        if (Auth::check()) $this->user_id = Auth::user()->id;
    }

    public function newPlaylist()
    {
        $data = ['error' => ''];

        $countMyPlaylist = Playlist::where('id_user', $this->user_id)->count();

        $save = new Playlist();
        $save->id_user = $this->user_id;
        $save->name = 'Minha playlist n°' . $countMyPlaylist + 1;
        $save->avatar = asset('imgs/avatar-default-playlist.jpg');
        $save->save();

        $data['id'] = $save->id;

        return $data;
    }

    public function getPlaylist(Int $id)
    {
        $data = ['error' => ''];

        $queryPlaylist = Playlist::select('name', 'avatar', 'privacy')->where('id_user', $this->user_id)->where('id', $id)->first();
        $queryPlaylistMusics = PlaylistMusic::with('musics')->where('id_playlist', $id)->get();

        if ($queryPlaylist) {
            $data['playlist'] = $queryPlaylist;

            $musicsForEach = [];
            foreach ($queryPlaylistMusics as $k => $v) {
                array_push($musicsForEach, $queryPlaylistMusics[$k]->musics[0]);
            }

            $data['playlist']->musics = $musicsForEach;
        } else {
            $data = ['error' => 'Playlist não encontrada'];
        }


        return $data;
    }

    public function editPlaylist(Int $id, Request $request)
    {
        $data = ['error' => ''];

        $queryPlaylist = Playlist::where('id_user', $this->user_id)->where('id', $id)->first();

        if (!$queryPlaylist) {
            $data['error'] = 'Este playlist não é sua / Ou não existe';
            return $data;
        }

        //Data request
        $dataRequest = $request->only([
            'avatar',
            'name',
            'privacy'
        ]);

        if (!empty($dataRequest['name'])) {
            Playlist::where('id', $id)->update(['name' => $dataRequest['name']]);
        }

        if (!empty($dataRequest['privacy'])) {
            Playlist::where('id', $id)->update(['privacy' => !$queryPlaylist->privacy]);
        }


        if ($request->hasFile('file')) {
            $arquivo = $_FILES['file'];
            $extension = pathinfo($arquivo['name'], PATHINFO_EXTENSION);

            if ($extension != 'png' && $extension != 'jpg' && $extension != 'jpeg') {
                $data['error'] = 'Esta extensão não é válida';
                return $data;
            }


            $name = $this->user_id . '@' . rand(615, 5173179) . rand(1, 5342) . rand(19, 173528) . rand(182, 525382) . rand(90, 198313) . time();

            move_uploaded_file($arquivo['tmp_name'], 'avatars/' . $name . '.' . $extension);

            Playlist::where('id', $id)->update(['avatar' => asset('avatars/' . $name . '.' . $extension)]);
        }

        return $data;
    }

    public function deletePlaylist(Request $request)
    {
        $data = ['error' => ''];

        $id_music  = $request->input('id_music');
        $id_playlist  = $request->input('id_playlist');

        if (!($id_music && $id_playlist)) {
            $data['error'] = 'Envie os ids';
            return $data;
        }

        $check_playlist = Playlist::where('id_user', $this->user_id)->where('id', $id_playlist);

        if (!$check_playlist) {
            $data['error'] = 'Essa playlist não é sua';
            return $data;
        }

        PlaylistMusic::where([
            'id_music' => $id_music,
            'id_playlist' => $id_playlist
        ])->delete();

        return $data;
    }

    public function getMyPlaylist()
    {
        $data = ['error' => ''];

        $queryPlaylist = Playlist::select('id', 'name', 'avatar', 'privacy')->where('id_user', $this->user_id)->orderBy('id', 'DESC')->get();

        $data['playlist'] = $queryPlaylist;

        foreach ($queryPlaylist as $k => $v) {
            $queryPlaylistMusics = PlaylistMusic::with('musics')->where('id_playlist', $v->id)->get();

            $musicsForEach = [];
            foreach ($queryPlaylistMusics as $k2 => $v2) {
                unset($queryPlaylistMusics[$k2]->musics[0]->id_user);

                array_push($musicsForEach, $queryPlaylistMusics[$k2]->musics[0]);
            }

            $data['playlist'][$k]['musics']  = $musicsForEach;
        }

        return $data;
    }

    public function addMusicToPlaylist($id_playlist, Request $request)
    {
        $data = ['error' => ''];
        $id_music = $request->input('id_music');

        if (!$id_music) {
            $data['error'] = 'Envie o id da musica';
            return $data;
        }
 
        $check_music_playlist = PlaylistMusic::where([
            'id_music' => $id_music,
            'id_playlist' => $id_playlist
        ])->first();
        if ($check_music_playlist) {
            $data['error'] = 'Essa musica já está nessa playlist';
            return $data;
        }

        $save = new PlaylistMusic();
        $save->id_music = $id_music;
        $save->id_playlist = $id_playlist;
        $save->save();

        return $data;
    }
}
