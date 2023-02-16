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
        Schema::create('movie_lists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('api_id');
            $table->string('poster');
            $table->foreignId('review_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('watching_state_id')->constrained()->onDelete('cascade');
            $table->foreignId('score_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            // Indica que user_id o api_id deben ser distintos a otros registros (un user puede crear solo un registro por api_id)
            $table->unique(['user_id', 'api_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movie_lists');
    }
};
