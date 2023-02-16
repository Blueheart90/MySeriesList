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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->string('api_id');
            $table->boolean('recommended');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // $table->foreignId('tvlist_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->unique(['user_id', 'api_id']);
        });

        Schema::create('watching_states', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('scores', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('tv_lists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('api_id');
            $table->string('poster');
            $table->integer('season');
            $table->integer('episode');
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
        Schema::dropIfExists('tv_lists');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('watching_states');
        Schema::dropIfExists('scores');
    }
};
