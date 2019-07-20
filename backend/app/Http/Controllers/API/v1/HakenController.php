<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Haken;

class HakenController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $hakens = Haken::all();
        return $this->sendResponse($hakens->toArray(), 'Hakens retrieved successfully.');
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
        $haken = Haken::create($request->all());
        
        return $this->sendResponse($haken->toArray(), 'Haken created successfully.', 201);
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
     * @param  Haken $haken
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Haken $haken)
    {
        $request->validate([
            'name'=>'required',
            'address'=>'required',
            'contact_number'=>'required'
        ]);

        $haken->name = $request->input('name');
        $haken->address = $request->input('address');
        $haken->contact_number = $request->input('contact_number');
        $haken->save();

        return $this->sendResponse($haken->toArray(), 'Haken updated successfully.');
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
    public function getHakensForDropdown()
    {
        $hakens = Haken::all()->pluck('name', 'id');
        return $this->sendResponse($hakens, 'Hakens retrieved successfully.');
    }
}
