<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'recruit_id',
        'year_month',
        'working_days',
        'basic_hours',
        'ot_hours',
        'total_payments',
        'status'
    ];

    /**
     * Get the recruits that owns the logs.
     */
    public function recruit()
    {
        return $this->belongsTo(Recruit::class);
    }

    /**
     * Eloquent accessors to convert status value to human readable
     */
    public function getStatusAttribute($value)
    {
        return $value == 1 ? 'Paid' : 'Pending';
    }
}
