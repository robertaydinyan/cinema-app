<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'row',
        'column',
        'seatNumber',
        'time_slot_id',
        'name',
        'phone',
    ];

    /**
     * Get the time slot that the book belongs to.
     */
    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }
}
