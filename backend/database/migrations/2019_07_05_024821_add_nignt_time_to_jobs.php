<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNigntTimeToJobs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->double('night_pph_amount', 6, 2)->comment('Payment per hour at night')->after('ot_amount');
            $table->double('night_ot_amount', 6, 2)->comment('Payment per overtime hour at night')->after('night_pph_amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn(['night_pph_amount', 'night_ot_amount']);
        });
    }
}
