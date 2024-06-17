<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        return response()->json(Room::all(), 200);
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $room = Room::create($request->all());

        return response()->json($room, 201);
    }

    // Display the specified resource.
    public function show($id)
    {
        $room = Room::findOrFail($id);
        return response()->json($room, 200);
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'capacity' => 'sometimes|integer|min:1'
        ]);

        $room = Room::findOrFail($id);
        $room->update($request->all());

        return response()->json($room, 200);
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return response()->json(null, 204);
    }
}
