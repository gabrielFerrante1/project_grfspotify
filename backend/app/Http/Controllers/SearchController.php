<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\MusicHeard;
use App\Models\Playlist;
use App\Models\PlaylistMusic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function getSearch(Request $request)
    {
        $data = $request->only([
            'limit',
            'offset',
            'query'
        ]);

        if (!isset($data['query'])) return response()->json(['error' => 'Query é necessário'], 400);

        $musics = Music::select('id', 'name', 'avatar', 'path', 'genre', 'author')
            ->where('name', 'LIKE', '%' . $data['query'] . '%')
            ->orWhere('author', 'LIKE', '%' . $data['query'] . '%')
            ->orWhere('genre', 'LIKE', '%' . $data['query'] . '%')
            ->get();


        foreach ($musics as $k => $v) {
            $musics[$k]->tipo = 'Música';
        }

        $playlists = Playlist::select('id', 'name', 'avatar')
            ->where('name', 'LIKE', '%' . $data['query'] . '%')
            ->where('privacy', 0)
            ->get();
        foreach ($playlists as $k => $v) {
            $playlists[$k]->tipo = 'Playlist';
            $playlists[$k]->musics = [];

            $queryMusics =  PlaylistMusic::with('musics')->where('id_playlist', $v->id)->get();

            $musicsForEach = [];

            foreach ($queryMusics as $kk => $vv) {
                array_push($musicsForEach, $queryMusics[$kk]->musics[0]);

                $playlists[$k]->musics  =  $musicsForEach;
            }
        }

        $collection = collect(array_merge($musics->toArray(), $playlists->toArray()));
        $collectionOrderned = $collection->sortByDesc('id')->values()->toArray();

        $limit = count($collectionOrderned);
        if (!empty($data['limit'])) {
            $limit = $data['limit'];
        }

        $offset = 0;
        if (!empty($data['offset'])) {
            $offset = $data['offset'];
        }

        return [
            'data' => array_slice($collectionOrderned, $offset, $limit),
            'count' => count($collectionOrderned),
            'error' => ''
        ];
    }

    public function getHomeInfo()
    {
        $data = ['error' => ''];

        $playlists = Playlist::select('id', 'name', 'avatar')
            ->where('id_user', 1)
            ->where('privacy', 0)
            ->get();
        foreach ($playlists as $k => $v) {
            $playlists[$k]->privacy = 0;
            $playlists[$k]->musics = [];

            $queryMusics =  PlaylistMusic::with('musics')->where('id_playlist', $v->id)->get();

            $musicsForEach = [];

            foreach ($queryMusics as $kk => $vv) {
                array_push($musicsForEach, $queryMusics[$kk]->musics[0]);

                $playlists[$k]->musics  =  $musicsForEach;
            }
        }

        $data['featured_playlist'] = $playlists;


        if (Auth::check()) {
            // Get genres more heard
            $musics_heard = MusicHeard::where('id_user', Auth::user()->id)->get();
            $genres = [];
            foreach ($musics_heard as $k => $v) {
                $color = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
                array_push($genres, ['name' => $v->music->genre, 'color' => $color]);
            }

            $genres = collect($genres)->unique('name')->values();
            $data['most_listened_genres'] = $genres->slice(0, 4)->toArray();
        }  


        return $data;
    }
}
