<?php

namespace App\Http\Controllers;

use App\Models\TimeSlot;
use App\Models\Room;
use App\Models\MovieRoom;
use Illuminate\Http\Request;

class TimeSlotController extends Controller
{
    public function index(Room $room)
    {
        $timeSlots = $room->timeSlots()->get();
        return response()->json($timeSlots);
    }

    public function search(Request $request) {
        $roomID = $request->query('roomID');
        $filmID = $request->query('filmID');
        $movieRooms = MovieRoom::where('room_id', $roomID)->where('movie_id', $filmID)->get(['id', 'time_slot_id', 'date']);

        $groupedData = [];

        foreach ($movieRooms as $room) {
            $date = $room->date; //->format('Y-m-d')

            if (!isset($groupedData[$date])) {
                $groupedData[$date] = [];
            }

            $groupedData[$date][] = array(
                'id' => $room->id, 
                'time_slot' => TimeSlot::findOrFail($room->time_slot_id)
            );
        }

        return $groupedData;
    }

    public function store(Request $request, Room $room)
    {
        $validatedData = $request->validate([
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $timeSlot = new TimeSlot($validatedData);
        $room->timeSlots()->save($timeSlot);

        return response()->json($timeSlot, 201);
    }

    public function update(Request $request, Room $room, TimeSlot $timeSlot)
    {
        $validatedData = $request->validate([
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $timeSlot->update($validatedData);

        return response()->json($timeSlot, 200);
    }

    public function destroy(Room $room, TimeSlot $timeSlot)
    {
        $timeSlot->delete();

        return response()->json(null, 204);
    }
}
