<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    /**
     * Get data by time_slot_id.
     *
     * @param  int  $time_slot_id
     * @return \Illuminate\Http\Response
     */
    public function getByTimeSlot($time_slot_id)
    {
        $seatNumbers = Book::where('time_slot_id', $time_slot_id)->pluck('seatNumber')->toArray();
        return response()->json($seatNumbers);
    }

    /**
     * Book a place.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bookPlace(Request $request)
    {
        $request->validate([
            // 'row' => 'required|integer|min:0',
            // 'column' => 'required|integer|min:0',
            // 'seat' => 'required|integer',
            'time_slot_id' => 'required',
            'name' => 'required|string',
            'phone' => 'required|string',
        ]);

        if ($request->selectedSeats) {
            foreach ($request->selectedSeats as $seatData) {
                $book = new Book();
                $book->row = $seatData["row"];
                $book->column = $seatData["col"];
                $book->seatNumber = $seatData["seatNumber"];
                $book->time_slot_id = $request->time_slot_id;
                $book->name = $request->name;
                $book->phone = $request->phone;
                $book->save();
            } 
        }

        return response()->json(['message' => 'Booking successful', 'book' => $book], 201);
    }
}
