<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Jesus David',
            'username' => 'blueheart',
            'email' => 'chuchober@hotmail.com',
            'password' => Hash::make('123456'),
            'email_verified_at' => Carbon::now()
        ]);

        User::create([
            'name' => 'Jacobo',
            'username' => 'jacobo11',
            'email' => 'jacobo@hotmail.com',
            'password' => Hash::make('123456'),
        ]);

        User::create([
            'name' => 'Gabriel',
            'username' => 'gabriel16',
            'email' => 'gabriel@hotmail.com',
            'password' => Hash::make('123456'),
        ]);
    }
}
