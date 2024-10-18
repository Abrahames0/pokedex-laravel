<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PokemonController;

Route::get('/pokemons', [PokemonController::class, 'index']);
Route::get('/pokemons/{id}',[PokemonController::class, 'show'] );
Route::post('/pokemons', [PokemonController::class, 'store']);
Route::delete('/pokemons/{id}', [PokemonController::class, 'destroy']);
