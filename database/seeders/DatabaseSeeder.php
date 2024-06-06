<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Team;
use App\Models\Snippit;
use App\Models\Folder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->withPersonalTeam()->create();
        Team::factory(10)->create();
        

        User::factory()->withPersonalTeam()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        Snippit::factory(100)->create();
        Snippit::factory()->create([
            'title' => 'CSS Test Snippit',
            'description' => 'This is a test snippit for testing CSS',
            'code' => 'body {
    background-color: #f4f4f4;
}',
            'user_id' => rand(1, 10),
            'team_id' => 21,
            'language' => 'css'
        ]);
        Snippit::factory()->create([
            'title' => 'JavaScript Test Snippit',
            'description' => 'This is a test snippit for testing JavaScript',
            'code' => 'function test(){
    console.log("Hello World!");
}',
            'user_id' => rand(1, 10),
            'team_id' => 21,
            'language' => 'javascript'
        ]);
        Snippit::factory()->create([
            'title' => 'HTML Test Snippit',
            'description' => 'This is a test snippit for testing HTML',
            'code' => '<!DOCTYPE html>
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <h1>Hello World!</h1>
        </body>
    </html>',
            'user_id' => rand(1, 10),
            'team_id' => 21,
            'language' => 'html'
        ]);
        Snippit::factory()->create([
            'title' => 'PHP Test Snippit',
            'description' => 'This is a test snippit for testing PHP',
            'code' => '<?php
    echo "Hello World!";
?>',
            'user_id' => rand(1, 10),
            'team_id' => 21,
            'language' => 'php'
        ]);
        Snippit::factory()->create([
            'title' => 'Python Test Snippit',
            'description' => 'This is a test snippit for testing Python',
            'code' => 'print("Hello, Python!")
            def greet(name):
                print(f"Hello, {name}!")

            def add_numbers(a, b):
                return a + b

            def multiply_numbers(a, b):
                return a * b

            def main():
                name = "John"
                result = add_numbers(5, 3)
                print(f"The sum is: {result}")
                product = multiply_numbers(2, 4)
                print(f"The product is: {product}")
                greet(name)

            if __name__ == "__main__":
                main()',
            'user_id' => rand(1, 10),
            'team_id' => 21,
            'language' => 'python'
        ]);

        $teams = Team::all();
        foreach($teams as $team){
            Folder::create([
                'name' => 'Root',
                'slug' => 'root',
                'team_id' => $team->id,
                'root' => true
            ]);
        }

        $snippits = Snippit::all();
        foreach($snippits as $snippit){
            $rootFolderId = Folder::where('team_id', $snippit->team_id)->where('root', true)->first()->id;
            $snippit->folder_id = $rootFolderId;
            $snippit->save();
        }

        $testRootFolder = Folder::where('team_id', 21)->where('root', true)->first();
        $testRootFolder->subfolders()->create([
            'name' => 'CSS',
            'slug' => 'css',
            'team_id' => 21
        ]);
        $testRootFolder->subfolders()->create([
            'name' => 'JavaScript',
            'slug' => 'javascript',
            'team_id' => 21
        ]);
        $testRootFolder->subfolders()->create([
            'name' => 'HTML',
            'slug' => 'html',
            'team_id' => 21
        ]);
        $testRootFolder->subfolders()->create([
            'name' => 'PHP',
            'slug' => 'php',
            'team_id' => 21
        ]);
        $testRootFolder->subfolders()->create([
            'name' => 'Python',
            'slug' => 'python',
            'team_id' => 21
        ]);

        $testTeam = Team::find(21);
        $rootfolder = $testTeam->rootFolder();
        $subFolders = $rootfolder->subfolders()->get();
        foreach($subFolders as $subFolder){
            for ($i = 0; $i < 10; $i++){
                $subFolder->subfolders()->create([
                    'name' => $subFolder->name.'-sub-' . $i,
                    'slug' => $subFolder->name.'-sub-' . $i,
                    'team_id' => 21,
                    'parent_id' => $subFolder->id
                ]);
            }
        }

        // create 5000 users, each with a personal team. each personal team has a root folder. each root folder has 5 subfolders. each subfolder has 5 snippits and 10 subfolders
        User::factory(5000)->withPersonalTeam()->withRootFolder()->withSubfolders()->create();
        $users = User::all();
        foreach($users as $user){
            $rootFolder = $user->currentTeam->rootFolder();
            $subFolders = $rootFolder->subfolders()->get();
            foreach($subFolders as $subFolder){
                for ($i = 0; $i < 5; $i++){
                    $subFolder->snippits()->create([
                        'title' => $subFolder->name.'-snippit-' . $i,
                        'description' => 'This is a test snippit for testing ' . $subFolder->name,
                        'code' => 'This is a test snippit for testing ' . $subFolder->name,
                        'user_id' => $user->id,
                        'team_id' => $user->currentTeam->id,
                        'language' => $subFolder->name
                    ]);
                }
            }
        }

    }
}
