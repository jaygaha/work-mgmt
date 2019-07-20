<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Recruit;

class RecruitController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recruits = Recruit::with('job:id,name', 'employee:id,first_name,last_name')->get();
        return $this->sendResponse($recruits->toArray(), 'Recruits retrieved successfully.');
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
            'job_id'=>'required',
            'employee_id'=>'required',
            'joined_at'=>'required',
            'condition'=>'required'
        ]);
        $request->request->add(['user_id' => $request->user()->id]);
        $joinedAt = date('Y-m-d', strtotime($request->input('joined_at')));
        $request->merge(['joined_at' => $joinedAt]);
        $recruit = Recruit::create($request->all());
        $recruit->job;
        $recruit->employee;
        return $this->sendResponse($recruit, 'Recruit created successfully.', 201);
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
     * @param  Recruit $recruit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Recruit $recruit)
    {
        $request->validate([
            'job_id'=>'required',
            'employee_id'=>'required',
            'joined_at'=>'required',
            'condition'=>'required'
        ]);

        $recruit->job_id = $request->input('job_id');
        $recruit->employee_id = $request->input('employee_id');
        $joinedAt = date('Y-m-d', strtotime($request->input('joined_at')));
        $recruit->joined_at = $joinedAt;
        $recruit->condition = $request->input('condition');
        $recruit->save();

        $recruit->job;
        $recruit->employee;

        return $this->sendResponse($recruit, 'Recruit updated successfully.');
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
     * get relation data of recruit
     */
    public function getRelatedData($id)
    {
        $recruit = Recruit::find($id);
        $recruit->employee;
        $recruit->job;
        $recruit->job->company->name;
        $recruit->job->hakens[0]->name;
        return $this->sendResponse($recruit, 'Recruits related data retrieved successfully.');
    }
}
