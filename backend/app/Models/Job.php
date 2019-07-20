<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'user_id',
        'company_id',
        'name',
        'description',
        'start_time',
        'night_start_time',
        'pph_amount',
        'ot_amount',
        'night_pph_amount',
        'night_ot_amount',
        'teji'
    ];

    /**
     * Get the company that owns the job.
     */
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * The hakens that belong to the jobs.
     */
    public function hakens()
    {
        return $this->belongsToMany(Haken::class, 'haken_job');
    }
}
