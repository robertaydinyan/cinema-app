<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $movies = Movie::all();
        return response()->json($movies, 200);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'poster' => 'required|file|image|max:2048', // Adjust max size as needed (in KB)
        ]);

        // Process file upload
        if ($request->hasFile('poster')) {
            $posterPath = $request->file('poster')->store('posters', 'public'); // Store in 'storage/app/public/posters' directory
        }

        // Create Movie record with full storage path
        $movie = Movie::create([
            'title' => $request->title,
            'poster' => $posterPath ?? null, // Store the full storage path in the database, or null if no file was uploaded
        ]);

        return response()->json($movie, 201);
    }

    // Display the specified resource.
    public function show($id)
    {
        $movie = Movie::findOrFail($id);
        return response()->json($movie, 200);
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'poster' => 'sometimes|file|image|max:2048', // Adjust max size as needed (in KB)
        ]);

        $movie = Movie::findOrFail($id);

        // Check if a new file is uploaded
        if ($request->hasFile('poster')) {
            // Delete the old file if it exists
            if ($movie->poster) {
                Storage::disk('public')->delete($movie->poster);
            }
            // Store the new file
            $posterPath = $request->file('poster')->store('posters', 'public');
            $request->merge(['poster' => $posterPath]);
        }

        // Update Movie record with full storage path if poster is updated
        $movie->update([
            'title' => $request->title,
            'poster' => $request->poster ?? $movie->poster, // Keep the existing poster path if not updated
        ]);

        return response()->json($movie, 200);
    }

    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);

        if ($movie->poster) {
            Storage::disk('public')->delete($movie->poster);
        }

        $movie->delete();

        return response()->json(null, 204);
    }
}
