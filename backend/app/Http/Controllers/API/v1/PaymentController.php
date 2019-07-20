<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use App\Models\Payment;
use App\Models\WorkLog;
use Carbon\Carbon;

class PaymentController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id, $year=null, $month=null)
    {
        //Check if the year and month is defined or not
        //If not assign current year and month
        if($year && $month) {
            $date = $year . '-' . $month . '-01';
        } else {
            $dt = Carbon::now('Asia/Tokyo');
            $date = $dt->toDateString();
            $year = $dt->year;
            $month = $dt->month;
        }

        $day = 1;
        $tz = 'Asia/Tokyo';
        $startMonth = Carbon::createFromDate($year, $month, $day, $tz)->startOfMonth();
        $endMonth = Carbon::createFromDate($year, $month, $day, $tz)->endOfMonth();

        $py = Payment::whereYear('year_month', '=', $year)
              ->whereMonth('year_month', '=', $month)
              ->get();
        $worklog = new WorkLog();
        if ($py->count()) {
            
        } else {
            $data = $worklog->getPaymentCalculationPerMonth($id, $startMonth, $endMonth);
            $status = $data ? $data[0]->status : 'Pending';
        }

        $workingDays = $data ? $data[0]->working_days : null;
        $basicHours = $data ? $data[0]->basic_hours : null;
        $otHours = $data ? $data[0]->ot_hours : null;
        $basicPayment = $data ? $data[0]->basic_payment : null;
        $otPayment = $data ? $data[0]->ot_payment : null;
        $totalPayment = $data ? $data[0]->total_payment : null;

        //dropdown data
        $dropDownList = $worklog->select(\DB::raw("YEAR(CONVERT_TZ(entry_datetime, 'UTC', 'Asia/Tokyo')) year, MONTH(CONVERT_TZ(entry_datetime, 'UTC', 'Asia/Tokyo')) month"))
        ->groupby('year','month')
        ->get();

        $data = [
            'date' => $date,
            'working_days' => $workingDays,
            'basic_hours' => $basicHours,
            'ot_hours' => $otHours,
            'basic_payment'=>$basicPayment,
            'ot_payment' => $otPayment,
            'total_payment' => $totalPayment,
            'status' => $status,
            'dropdown' => $dropDownList
        ];

        return $this->sendResponse($data, 'Payment retrieved successfully.');
    }
}
