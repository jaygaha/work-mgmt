<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHakenJobTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('haken_job', function (Blueprint $table) {
            $table->unsignedBigInteger('haken_id');
            $table->unsignedBigInteger('job_id');

            $table->foreign('haken_id')->references('id')->on('hakens');
            $table->foreign('job_id')->references('id')->on('jobs');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('haken_job');
    }
}
