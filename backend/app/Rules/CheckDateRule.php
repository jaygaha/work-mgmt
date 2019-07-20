<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\Models\WorkLog;
use Carbon\Carbon;

class CheckDateRule implements Rule
{
    private $recruitId;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($recruitId)
    {
        $this->recruitId = $recruitId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $date = Carbon::parse($value)->setTimezone('Asia/Tokyo');
        $ruled = WorkLog::where('recruit_id', $this->recruitId)->whereDate($attribute, '=', date('Y-m-d', strtotime($date)))->exists();
        return $ruled == 1 ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The given date is already registered.';
    }
}
