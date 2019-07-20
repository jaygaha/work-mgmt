<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'contact_number',
        'address',
        'gender',
        'position',
        'status'
    ];

    /**
     *  an accessor function to contact two column
     */
    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
