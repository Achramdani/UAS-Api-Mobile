<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('perbaikans', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('part_perbaikans', function (Blueprint $table) {
            $table->id();
            $table->string('kerusakan');
            $table->string('solusi');
            $table->text('deskripsi')->nullable();
            $table->boolean('status')->default(0);

            $table->unsignedBigInteger('perbaikan_id');

            $table->timestamps();

            $table->foreign('perbaikan_id')->references('id')->on('perbaikans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perbaikans');
    }
};
