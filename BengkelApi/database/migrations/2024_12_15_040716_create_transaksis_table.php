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
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->unsignedBigInteger('created_by');
            $table->boolean('status')->default(0)->comment('0 = Belum Dibayar, 1 = Sudah Dibayar');
            $table->string('nominal');
            $table->unsignedBigInteger('perbaikan_id');
            $table->timestamp('bayar_at')->nullable();
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('perbaikan_id')->references('id')->on('perbaikans')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
