<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recruit extends Model
{
    protected $fillable = [
        'user_id',
        'job_id',
        'employee_id',
        'joined_at',
        'condition',
        'status'
    ];

    /**
     * Get the employee that owns the recruit.
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Get the job that owns the recruit.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
