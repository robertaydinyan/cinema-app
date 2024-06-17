<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\TimeSlotController;
use App\Http\Controllers\MovieRoomController;
use App\Http\Controllers\BookController;

Route::post('login', [AuthController::class, 'login']);

Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', 'App\Http\Controllers\AuthController@user');
});

Route::apiResource('rooms', RoomController::class);
Route::apiResource('sessions', MovieRoomController::class);
Route::apiResource('movies', MovieController::class);

Route::prefix('rooms')->group(function () {
    Route::get('{room}/time-slots', [TimeSlotController::class, 'index']);
    Route::post('{room}/time-slots', [TimeSlotController::class, 'store']);
    Route::put('{room}/time-slots/{timeSlot}', [TimeSlotController::class, 'update']);
    Route::delete('{room}/time-slots/{timeSlot}', [TimeSlotController::class, 'destroy']);
});

Route::get('time-slots', [TimeSlotController::class, 'search']);
// Route::get('seats', [SeatController::class, 'search']);
Route::get('/books/by-time-slot/{time_slot_id}', [BookController::class, 'getByTimeSlot']);

Route::post('/books/book', [BookController::class, 'bookPlace']);

// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('products', ProductController::class);
// });

