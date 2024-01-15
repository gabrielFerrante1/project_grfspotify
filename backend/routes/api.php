<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\PlaylistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route; 
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/not-allowed', function () {
    return response()->json(['message' => 'Login é necessário'], 401);
})->name('login');

Route::post('/create', [AuthController::class, 'create']);
Route::post('/login', [AuthController::class, 'login']);

//Consulta de autenticação
Route::get('/token-query', [AuthController::class, 'verifyAuthentication']);

Route::prefix('search')->group(function () {
    Route::get('/', [SearchController::class, 'getSearch']);
    Route::get('/home', [SearchController::class, 'getHomeInfo']);
});

Route::middleware('auth')->post('/music-heard/{id_music}', [MusicController::class, 'newMusicHeard']);
Route::middleware('auth')->get('/music-heard', [MusicController::class, 'getLastMusic']);

Route::middleware('auth')->prefix('playlist')->group(function () {
    Route::get('/', [PlaylistController::class, 'getMyPlaylist']);
    Route::post('/new', [PlaylistController::class, 'newPlaylist']);
    Route::get('{id}', [PlaylistController::class, 'getPlaylist']);
    Route::post('edit/{id}', [PlaylistController::class, 'editPlaylist']);
    Route::delete('/', [PlaylistController::class, 'deletePlaylist']);
    Route::post('/{id_playlist}/add-music', [PlaylistController::class, 'addMusicToPlaylist']);
});
