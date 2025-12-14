<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);

        $user = User::firstOrCreate(
            ['email' => 'superadmin@app.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('12345678'),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole($role);
    }
}