<?php

namespace App\Http\Controllers;

use App\Models\TimeSlot;
use App\Models\Room;
use App\Models\MovieRoom;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
        $currentDate = Carbon::now()->toDateString();
        $movieRooms = MovieRoom::where('room_id', $roomID)
                            ->where('movie_id', $filmID)
                            ->where('date', '>=', $currentDate)
                            ->get(['id', 'time_slot_id', 'date']);
        $currentDateTime = Carbon::now();
        $currentHour = $currentDateTime->hour;
        $currentMinute = $currentDateTime->minute;
        $groupedData = [];

        foreach ($movieRooms as $room) {
            $date = $room->date; //->format('Y-m-d')

            if (!isset($groupedData[$date])) {
                $groupedData[$date] = [];
            }
            $timeSlot = TimeSlot::findOrFail($room->time_slot_id);
            $startTime = Carbon::parse($timeSlot->start_time);

            if ($date == $currentDate &&
                ($startTime->hour > $currentHour || 
                ($startTime->hour == $currentHour && $startTime->minute > $currentMinute))) {
                
                $groupedData[$date][] = [
                    'id' => $room->id,
                    'time_slot' => $timeSlot,
                ];
            } elseif ($date != $currentDate) {
                // For dates other than today, include all time slots
                $groupedData[$date][] = [
                    'id' => $room->id,
                    'time_slot' => $timeSlot,
                ];
            }
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
