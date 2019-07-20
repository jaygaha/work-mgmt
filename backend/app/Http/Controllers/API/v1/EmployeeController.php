<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Employee;

class EmployeeController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::all();
        return $this->sendResponse($employees->toArray(), 'Employees retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'contact_number'=>'required',
            'gender'=>'required'
        ]);
        $request->request->add(['user_id' => $request->user()->id]);
        $employee = Employee::create($request->all());
        
        return $this->sendResponse($employee->toArray(), 'Employee created successfully.', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Employee $employee
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'first_name'=>'required',
            'last_name'=>'required',
            'contact_number'=>'required',
            'gender'=>'required'
        ]);

        $employee->first_name = $request->input('first_name');
        $employee->last_name = $request->input('last_name');
        $employee->first_name = $request->input('first_name');
        $employee->contact_number = $request->input('contact_number');
        $employee->gender = $request->input('gender');
        $employee->save();

        return $this->sendResponse($employee->toArray(), 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Get the resource in dropdown select.
     *
     * @return \Illuminate\Http\Response
     */
    public function getEmployeesForDropdown()
    {
        $employees = Employee::all()->pluck('full_name', 'id');
        return $this->sendResponse($employees, 'Employees retrieved successfully.');
    }
}
