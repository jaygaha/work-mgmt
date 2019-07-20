<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use DB;

class WorkLog extends Model
{
    protected $fillable = [
        'user_id',
        'recruit_id',
        'entry_datetime',
        'out_datetime',
        'basic_time',
        'ot_time'
    ];

    /**
     * Get the recruits that owns the logs.
     */
    public function recruit()
    {
        return $this->belongsTo(Recruit::class);
    }

    /**
     * Eloquent accessors to convert date time to time zone
     */
    public function getEntryDatetimeAttribute($value)
    {
        return Carbon::parse($value)->timezone('Asia/Tokyo');
    }

    /**
     * Eloquent accessors to convert date time to time zone
     */
    public function getOutDatetimeAttribute($value)
    {
        return Carbon::parse($value)->timezone('Asia/Tokyo');
    }

    public function getPaymentCalculationPerMonth($recruidId, $startDate, $endDate)
    {
        $statement = "SELECT working_days, basic_hours, ot_hours, pph_amount, ot_amount, ROUND((basic_hours * pph_amount), 2) AS basic_payment, 
        ROUND((ot_hours * ot_amount), 2) AS ot_payment, ROUND((basic_hours * pph_amount + ot_hours * ot_amount), 2) AS total_payment, 'Pending' AS `status`
            FROM (
            SELECT COUNT(*) AS working_days, ROUND(SUM(w.basic_time), 2) AS basic_hours, ROUND(SUM(w.ot_time), 2) AS ot_hours,
            rj.*
            FROM work_logs w
            JOIN (
            SELECT r.id AS jrecruit_id, j.pph_amount, 
            j.ot_amount, j.night_pph_amount, j.night_ot_amount
            FROM recruits r
            LEFT JOIN jobs j ON j.id = r.job_id
            WHERE r.id = {$recruidId}) rj ON w.recruit_id = rj.jrecruit_id
            WHERE w.recruit_id = {$recruidId} AND 
            w.entry_datetime BETWEEN CONVERT_TZ('{$startDate}', 'Asia/Tokyo', 'UTC') AND CONVERT_TZ('{$endDate}', 'Asia/Tokyo', 'UTC')) rjw;";
        return DB::select(DB::raw($statement));
    }
}
