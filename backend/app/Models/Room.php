<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'rows', 'columns'];

    public function movies()
    {
        return $this->hasMany(Movie::class);
    }

    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
    
    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }
}
