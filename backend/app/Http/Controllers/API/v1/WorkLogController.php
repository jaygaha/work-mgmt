<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Rules\CheckDateRule;
use App\Models\WorkLog;
use App\Models\Recruit;
use Carbon\Carbon;

class WorkLogController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $logs = WorkLog::where('recruit_id', $id)->orderBy('entry_datetime', 'DESC')->get();
        return $this->sendResponse($logs->toArray(), 'Work logs retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $request->validate([
            'recruit_id'=>'required',
            'entry_datetime'=>['required', new CheckDateRule($id)],
            'out_datetime'=>'required',
        ]);
        $request->request->add(['user_id' => $request->user()->id]);
        $entryAt = Carbon::parse($request->input('entry_datetime'))->setTimezone('Asia/Tokyo');
        $outAt = Carbon::parse($request->input('out_datetime'))->setTimezone('Asia/Tokyo');
        
        $request->merge(['entry_datetime' => Carbon::parse($request->input('entry_datetime')), 
            'out_datetime' => Carbon::parse($request->input('out_datetime'))]);
       
        $recruit = Recruit::find($id);
        $teji = $recruit->job->teji;
        $tejiTime = $this->convertTime($recruit->job->teji);
        $startTime = $recruit->job->start_time;
        $startNightTime = $recruit->job->night_start_time;
        $sDt = $entryAt->format('Y-m-d') . " " . $startTime;

        $actualStartAt = Carbon::createFromFormat('Y-m-d H:i:s', $sDt, 'Asia/Tokyo');
        $breakTime = 1; //An hour break time
        list($tejiHours, $tejiMinutes) = preg_split('/[ :]/', $tejiTime);
        
        /**
         * TODO 
         * Frontend TODO
         *   -handling of time punched after starting time
         *   -handling for night shift time card
         *   -Edit date conversion to local timezone, now utc
         */

        //check if the punched time is after starting time 
        if ($entryAt->gt($actualStartAt)) { 
            echo 'late'; exit(); //TODO
        } else {
            $totalDiff = $actualStartAt->diff($outAt);
            $diffHours = $totalDiff->h - $breakTime;
            $diffMinutes = $totalDiff->i > 15 ? $totalDiff->i : 0;
            
            $basic_time = $diffHours;
            $ot_time = 0;

            $strTime = strtotime($diffHours . ":" . $diffMinutes . ":00");
            $strTeji = strtotime($tejiTime);
            //if there is overtime
            if($strTime > $strTeji) {
                $strDiffSeconds = abs($strTime - $strTeji);
                $ot_time = $strDiffSeconds/60/60;
                $basic_time = $teji;
            }
            $request->merge(['basic_time' => $basic_time, 'ot_time' => $ot_time]);
            /* $actualEndAt = $actualStartAt->addHours($tejiHours + $breakTime)->addMinutes($tejiMinutes); */
        }
        $workLog = WorkLog::create($request->all());

        return $this->sendResponse($workLog, 'Work log created successfully.', 201);
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
     * @param  Int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $workLog = WorkLog::find($id);
        
        $request->validate([
            //'entry_datetime'=>['required', new CheckDateRule($request->input('recruit_id'))],
            'entry_datetime'=>'required',
            'out_datetime'=>'required',
        ]);
        $entryAt = Carbon::parse($request->input('entry_datetime'))->setTimezone('Asia/Tokyo');
        $outAt = Carbon::parse($request->input('out_datetime'))->setTimezone('Asia/Tokyo');
        
        $workLog->entry_datetime = Carbon::parse($request->input('entry_datetime'));
        $workLog->out_datetime = Carbon::parse($request->input('out_datetime'));

        $recruit = Recruit::find($request->input('recruit_id'));
        $teji = $recruit->job->teji;
        $tejiTime = $this->convertTime($recruit->job->teji);
        $startTime = $recruit->job->start_time;
        $startNightTime = $recruit->job->night_start_time;
        $sDt = $entryAt->format('Y-m-d') . " " . $startTime;

        $actualStartAt = Carbon::createFromFormat('Y-m-d H:i:s', $sDt, 'Asia/Tokyo');
        $breakTime = 1; //An hour break time
        list($tejiHours, $tejiMinutes) = preg_split('/[ :]/', $tejiTime);
        
        //check if the punched time is after starting time 
        if ($entryAt->gt($actualStartAt)) { 
            echo 'late'; exit(); //TODO
        } else {
            $totalDiff = $actualStartAt->diff($outAt);
            $diffHours = $totalDiff->h - $breakTime;
            $diffMinutes = $totalDiff->i > 15 ? $totalDiff->i : 0;

            $basic_time = $diffHours;
            $ot_time = 0;

            $strTime = strtotime($diffHours . ":" . $diffMinutes . ":00");
            $strTeji = strtotime($tejiTime);
            //if there is overtime
            if($strTime > $strTeji) {
                $strDiffSeconds = abs($strTime - $strTeji);
                $ot_time = $strDiffSeconds/60/60;
                $basic_time = $teji;
            }
            $workLog->basic_time = $basic_time;
            $workLog->ot_time = $ot_time;

            /* $actualEndAt = $actualStartAt->addHours($tejiHours + $breakTime)->addMinutes($tejiMinutes); */
        }
        $workLog->save();
        return $this->sendResponse($workLog, 'Work log updated successfully.');
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

    function convertTime($dec)
    {
        // start by converting to seconds
        $seconds = ($dec * 3600);
        // we're given hours, so let's get those the easy way
        $hours = floor($dec);
        // since we've "calculated" hours, let's remove them from the seconds variable
        $seconds -= $hours * 3600;
        // calculate minutes left
        $minutes = floor($seconds / 60);
        // remove those from seconds as well
        $seconds -= $minutes * 60;
        // return the time formatted HH:MM:SS
        return $hours.":".$minutes.":".$seconds;
    }
}
