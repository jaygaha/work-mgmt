<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group([
	'prefix' => 'auth'
], function() {
	Route::post('login', 'AuthController@login');
	Route::post('signup', 'AuthController@signup');
	
	Route::group([
      'middleware' => ['auth:api']
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('me', 'AuthController@user');
    });
});

/**
 * API v1
 */
Route::group([
    'middleware' => ['auth:api', 'cors'],
    'prefix' => 'v1',
    'namespace' => 'API\v1'
  ], function() {      
    Route::get('haken/dropdown-hakens', 'HakenController@getHakensForDropdown');
    Route::apiResource('haken', 'HakenController');
    Route::get('companies/dropdown-companies', 'CompanyController@getCompaniesForDropdown');
    Route::apiResource('companies', 'CompanyController');
    Route::get('jobs/dropdown-jobs', 'JobController@getJobsForDropdown');
    Route::apiResource('jobs', 'JobController');
    Route::get('employees/dropdown-employees', 'EmployeeController@getEmployeesForDropdown');
    Route::apiResource('employees', 'EmployeeController');
    Route::get('recruits/related-data/{id}', 'RecruitController@getRelatedData');
    Route::apiResource('recruits', 'RecruitController');
    Route::post('work-logs/{recruitId}', 'WorkLogController@store');
    Route::get('work-logs/{recruitId}', 'WorkLogController@index');
    Route::put('work-logs/{id}', 'WorkLogController@update');
    Route::post('payments/{recruitId}', 'PaymentController@store');
    Route::get('payments/{recruitId}/{year?}/{month?}', 'PaymentController@index');
    Route::put('payments/{id}', 'PaymentController@update');
});