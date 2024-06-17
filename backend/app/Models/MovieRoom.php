<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieRoom extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'movie_id',
        'room_id',
        'time_slot_id',
        'date'
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class); // Change hasOne to belongsTo for Movie relationship
    }

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class); // Change hasOne to belongsTo for TimeSlot relationship
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
