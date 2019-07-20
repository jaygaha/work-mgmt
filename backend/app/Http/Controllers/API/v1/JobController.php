<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Job;

class JobController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs = Job::with('company:id,name', 'hakens:id,name')->get();
        return $this->sendResponse($jobs->toArray(), 'Jobs retrieved successfully.');
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
            'company_id'=>'required',
            'start_time'=>'required',
            'night_start_time'=>'required',
            'pph_amount'=>'required',
            'ot_amount'=>'required',
            'night_pph_amount'=>'required',
            'night_ot_amount'=>'required',
            'teji'=>'required',
            'haken_id'=>'required'
        ]);
        $request->request->add(['user_id' => $request->user()->id]);
        $job = Job::create($request->all());
        
        $hakenIds = $request->input('haken_id');
        $job->hakens()->sync($hakenIds);
        $job->company;
        $job->hakens;
        
        return $this->sendResponse($job, 'Job created successfully.', 201);
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
     * @param  Job $job
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Job $job)
    {
        $request->validate([
            'name'=>'required',
            'company_id'=>'required',
            'start_time'=>'required',
            'night_start_time'=>'required',
            'pph_amount'=>'required',
            'ot_amount'=>'required',
            'night_pph_amount'=>'required',
            'night_ot_amount'=>'required',
            'teji'=>'required',
            'haken_id'=>'required'
        ]);

        $job->name = $request->input('name');
        $job->company_id = $request->input('company_id');
        $job->description = $request->input('description');
        $job->start_time = $request->input('start_time');
        $job->night_start_time = $request->input('night_start_time');
        $job->pph_amount = $request->input('pph_amount');
        $job->ot_amount = $request->input('ot_amount');
        $job->night_pph_amount = $request->input('night_pph_amount');
        $job->night_ot_amount = $request->input('night_ot_amount');
        $job->teji = $request->input('teji');
        $job->save();

        $hakenIds = $request->input('haken_id');
        $arrHakens = [];
        foreach($hakenIds as $key=>$value) {
            $arrHakens[] = isset($value['name']) ? $value['id'] :  $value;
        }
        $job->hakens()->sync($arrHakens);
        $job->company;
        $job->hakens;

        return $this->sendResponse($job, 'Job updated successfully.');
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
    public function getJobsForDropdown()
    {
        $jobs = Job::all()->pluck('name', 'id');
        return $this->sendResponse($jobs, 'Jobs retrieved successfully.');
    }
}
