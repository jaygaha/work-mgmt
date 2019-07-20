<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBasicTimeAndOtTimeToWorkLogs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('work_logs', function (Blueprint $table) {
            $table->double('basic_time', 4, 2)->after('out_datetime');
            $table->double('ot_time', 4, 2)->after('basic_time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_logs', function (Blueprint $table) {
            $table->dropColumn(['basic_time', 'ot_time']);
        });
    }
}
