<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@email.com',
            'password' => Hash::make('password'),
        ])->assignRole('admin');

        User::create([
            'name' => 'Pelanggan',
            'email' => 'pelanggan@email.com',
            'password' => Hash::make('password'),
        ])->assignRole('pelanggan');

        User::create([
            'name' => 'Teknisi',
            'email' => 'teknisi@email.com',
            'password' => Hash::make('password'),
        ])->assignRole('teknisi');

        User::create([
            'name' => 'Kasir',
            'email' => 'kasir@email.com',
            'password' => Hash::make('password'),
        ])->assignRole('kasir');
    }
}
