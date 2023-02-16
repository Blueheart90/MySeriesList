<?php

namespace Database\Seeders;

use App\Models\WatchingState;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WatchingStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WatchingState::create([
            'id' => 1,
            'name' => 'Viendo',
        ]);
        WatchingState::create([
            'id' => 2,
            'name' => 'Completa',
        ]);
        WatchingState::create([
            'id' => 3,
            'name' => 'En Espera',
        ]);
        WatchingState::create([
            'id' => 4,
            'name' => 'Abandonada',
        ]);
        WatchingState::create([
            'id' => 5,
            'name' => 'Planeando Ver',
        ]);
    }
}
