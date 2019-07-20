<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'contact_number'
    ];

    /**
     * Get the jobs for the company.
     */
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
