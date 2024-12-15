<?php

namespace Database\Seeders;

use App\Models\Perbaikan;
use Illuminate\Database\Seeder;

class PerbaikanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $service_rutin = Perbaikan::create([
            'user_id' => 2,
            'kode' => 'SR-001',
        ]);

        $service_rutin->part_perbaikans()->create([
            'kerusakan' => 'Kerusakan 1',
            'solusi' => 'Solusi 1',
            'deskripsi' => 'Deskripsi 1',
            'status' => 1,
        ]);

        $service_rutin->part_perbaikans()->create([
            'kerusakan' => 'Kerusakan 2',
            'solusi' => 'Solusi 2',
            'deskripsi' => 'Deskripsi 2',
            'status' => 1,
        ]);

        $service_berat = Perbaikan::create([
            'user_id' => 2,
            'kode' => 'SR-002',
        ]);

        $service_berat->part_perbaikans()->create([
            'kerusakan' => 'Kerusakan 1',
            'solusi' => 'Solusi 1',
            'deskripsi' => 'Deskripsi 1',
            'status' => 1,
        ]);

        $service_berat->part_perbaikans()->create([
            'kerusakan' => 'Kerusakan 2',
            'solusi' => 'Solusi 2',
            'deskripsi' => 'Deskripsi 2',
            'status' => 1,
        ]);
    }
}
