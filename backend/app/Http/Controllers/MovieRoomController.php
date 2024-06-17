<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MovieRoom; // Make sure to import your MovieRoom model

class MovieRoomController extends Controller
{
    public function index()
    {
        // Fetch all movie room data
        $movieRooms = MovieRoom::with('movie', 'timeSlot', 'room')->orderBy('date', 'desc')->get();

        return response()->json($movieRooms);
    }

    public function store(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'movie_id' => 'required|integer',
            'room_id' => 'required|integer',
            'time_slot_id' => 'required|integer',
            'date' => 'required|date'
        ]);

        $movieRoom = MovieRoom::create($validated);

        $movieRoom->load('movie', 'timeSlot', 'room');

        return response()->json($movieRoom, 201);
    }

    public function show($id)
    {
        // Fetch a single movie room record
        $movieRoom = MovieRoom::findOrFail($id);
        $movieRoom->load('movie', 'timeSlot', 'room');

        return response()->json($movieRoom);
    }

    public function update(Request $request, $id)
    {
        // Validate incoming request
        $validated = $request->validate([
            'movie_id' => 'sometimes|required|integer',
            'room_id' => 'sometimes|required|integer',
            'time_slot_id' => 'sometimes|required|integer',
        ]);

        // Find the movie room record and update it
        $movieRoom = MovieRoom::findOrFail($id);
        $movieRoom->update($validated);

        return response()->json($movieRoom, 200);
    }

    public function destroy($id)
    {
        // Find the movie room record and delete it
        $movieRoom = MovieRoom::findOrFail($id);
        $movieRoom->delete();

        return response()->json(null, 204);
    }
}
