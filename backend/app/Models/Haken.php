<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Haken extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'address',
        'contact_number'
    ];
}
