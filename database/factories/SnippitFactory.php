<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Snippit>
 */
class SnippitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(rand(1, 5), true),
            'description' => $this->faker->sentences(rand(1, 3), true),
            'code' => $this->faker->text(rand(150, 500), true),
            'language' => $this->faker->randomElement(['php', 'javascript', 'html', 'css', 'python', 'java', 'c++']),
            'user_id' => rand(1, 21),
            'team_id' => rand(1, 21),
            
        ];
    }
}
