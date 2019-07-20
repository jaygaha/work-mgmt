<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Company;

class CompanyController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::all();
        return $this->sendResponse($companies->toArray(), 'Companies retrieved successfully.');
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
            'name'=>'required',
            'address'=>'required',
            'contact_number'=>'required'
        ]);
        $request->request->add(['user_id' => $request->user()->id]);
        $company = Company::create($request->all());
        
        return $this->sendResponse($company->toArray(), 'Company created successfully.', 201);
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
     * @param  Company $company
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Company $company)
    {
        $request->validate([
            'name'=>'required',
            'address'=>'required',
            'contact_number'=>'required'
        ]);

        $company->name = $request->input('name');
        $company->address = $request->input('address');
        $company->contact_number = $request->input('contact_number');
        $company->save();

        return $this->sendResponse($company->toArray(), 'Company updated successfully.');
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
    public function getCompaniesForDropdown()
    {
        $companies = Company::all()->pluck('name', 'id');
        return $this->sendResponse($companies, 'Companies retrieved successfully.');
    }
}
