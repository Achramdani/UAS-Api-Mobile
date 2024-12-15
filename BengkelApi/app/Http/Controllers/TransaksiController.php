<?php

namespace App\Http\Controllers;

use App\Models\Perbaikan;
use App\Models\Transaksi;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index()
    {
        $perbaikan = Perbaikan::doesntHave('transaski')->with('user')->get();
        return response()->json($perbaikan, 200);
    }

    public function createTransaksi(Request $request)
    {
        $user = request()->user();
        $code = "TRX-" . date("Ymd") . "-" . rand(100000, 999999);
        $transaksi = Transaksi::create([
            'kode' => $code,
            'perbaikan_id' => $request->perbaikan_id,
            'nominal' => $request->nominal,
            'created_by' => $user->id,
        ]);

        return response()->json($transaksi, 201);
    }
    public function getTransaksi($filter)
    {
        if ($filter == '0' || $filter == '1') {
            $transaksi = Transaksi::with('perbaikan.user')->where('status', $filter)->get();
        } else {
            $transaksi = Transaksi::with('perbaikan.user')->get();

        }
        return response()->json($transaksi, 200);
    }

    public function getDetailTransaksi($id)
    {
        $transaksi = Transaksi::with('perbaikan.user', 'perbaikan.part_perbaikans', 'createdBy')->find($id);
        return response()->json($transaksi, 200);
    }
}
