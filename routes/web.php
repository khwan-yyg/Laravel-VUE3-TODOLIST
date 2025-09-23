<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/employee/create', [EmployeeController::class, 'store']);
Route::get('employee/list', [EmployeeController::class, 'index']);
