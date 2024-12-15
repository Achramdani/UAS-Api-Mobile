<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => 'auth'], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/logout', [AuthController::class, 'logout']);
});

Route::group(['middleware' => 'auth:sanctum', 'prefix' => 'transaksi'], function () {
    Route::get('get_perbaikan', [TransaksiController::class, 'index']);
    Route::post('create_transaksi', [TransaksiController::class, 'createTransaksi']);
    Route::get('get_transaksi/{filter}', [TransaksiController::class, 'getTransaksi']);
    Route::get('get_detail_transaksi/{id}', [TransaksiController::class, 'getDetailTransaksi']);
});
