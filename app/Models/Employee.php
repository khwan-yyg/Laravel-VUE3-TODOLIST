<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'current_experience',
        'city',
        'state',
        'gender',
    ];
}
