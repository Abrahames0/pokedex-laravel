<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    // Obtener todos los Pokémon guardados
    public function index()
    {
        $pokemons = Pokemon::all();
        return response()->json($pokemons, 200);
    }

    // Guardar un nuevo Pokémon
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'number' => 'required|integer',
            'type' => 'required|string',
            'abilities' => 'required|array',
            'image' => 'required|url',
        ]);
    
        // Verificar si el Pokémon ya existe
        $existingPokemon = Pokemon::where('name', $request->name)->orWhere('number', $request->number)->first();
    
        if ($existingPokemon) {
            return response()->json([
                'message' => 'El Pokémon ya existe',
                'status' => 400
            ], 400);
        }
    
        // Guardar el Pokémon
        $pokemon = Pokemon::create([
            'name' => $request->name,
            'number' => $request->number,
            'type' => $request->type,
            'abilities' => json_encode($request->abilities),
            'image' => $request->image,
        ]);
    
        if (!$pokemon) {
            return response()->json([
                'message' => 'Error al guardar el Pokémon',
                'status' => 500
            ], 500);
        }
    
        return response()->json($pokemon, 201);
    }    

    public function show($id)
    {
        $pokemon = Pokemon::find($id);

        if(!$pokemon) {
            $data = [
                'message' => 'Pokemon no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'pokemon' => $pokemon,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    // Eliminar un Pokémon por ID
    public function destroy($id)
    {
        $pokemon = Pokemon::findOrFail($id);
        $pokemon->delete();
        return response()->json(['message' => 'Pokémon eliminado'], 200);
    }
}