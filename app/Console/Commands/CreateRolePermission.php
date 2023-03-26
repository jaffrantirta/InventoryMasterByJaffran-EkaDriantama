<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateRolePermission extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-role-permission';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert default role permission';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        DB::beginTransaction();
        $this->line('starting...');
        // $this->resetRolePermission();
        $this->line('inserting role and permissions');
        $this->createRolePermission();
        $this->line('assigning permissions to each roles');
        $this->assignRolePermission();
        $this->line('creating super admin account');
        $this->warn('super admin\'s password is "superadmin", please change it in database');
        $this->createSuperAdminUser();
        $this->line('super admin account created');
        $this->info('Insert and assign role permission is successful');
        $this->info('Supported by Jaffran');
        DB::commit();

    }
    public function createSuperAdminUser()
    {
        DB::table('users')->insert([
            'id' => 1,
            'name' => 'super admin',
            'email' => 'super@admin',
            'password' => \Hash::make('superadmin'),
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
    public function resetRolePermission(): void
    {
        DB::table('roles')->truncate();
        DB::table('permissions')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('model_has_permissions')->truncate();
        Permission::truncate();
        Role::truncate();
    }
    public function createRolePermission()
    {
        Role::insert([
            [
                'name' => 'accountant',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'cashier',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'super-admin',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        Permission::insert([
            //account
            [
                'name' => 'create-account',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-account',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-account',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-account',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //account-setting
            [
                'name' => 'create-account-setting',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-account-setting',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-account-setting',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-account-setting',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //asset
            [
                'name' => 'create-asset',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-asset',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-asset',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-asset',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //cash
            [
                'name' => 'create-cash',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-cash',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-cash',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-cash',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //deprecation
            [
                'name' => 'create-deprecation',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-deprecation',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-deprecation',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-deprecation',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //item
            [
                'name' => 'create-item',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-item',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-item',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-item',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //journal
            [
                'name' => 'create-journal',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-journal',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-journal',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-journal',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //journal-detail
            [
                'name' => 'create-journal-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-journal-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-journal-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-journal-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //transaction
            [
                'name' => 'create-transaction',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-transaction',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-transaction-status',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-transaction',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-transaction',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            //transaction-detail
            [
                'name' => 'create-transaction-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'update-transaction-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'delete-transaction-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'view-transaction-detail',
                'guard_name' => 'api',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
    public function assignRolePermission()
    {
        //set role permission
        Role::findByName('super-admin', 'api')->givePermissionTo(
            Permission::get('name')->pluck('name')->toArray() //assign all permission
        );

        //cashier
        Role::findByName('cashier', 'api')->givePermissionTo(
            //transaction
            'create-transaction',
            'update-transaction-status',
            'view-transaction'
        );

        //accountant
        Role::findByName('accountant', 'api')->givePermissionTo(
            //transaction
            'create-transaction',
            'update-transaction-status',
            'view-transaction',

            //transaction-detail
            'create-transaction-detail',
            'update-transaction-detail',
            'view-transaction-detail',

            //journal
            'create-journal',
            'update-journal',
            'view-journal',

            //journal-detail
            'create-journal-detail',
            'update-journal-detail',
            'view-journal-detail',

            //asset
            'create-asset',
            'update-asset',
            'delete-asset',
            'view-asset',

            //account
            'create-account',
            'update-account',
            'delete-account',
            'view-account',

            //account-setting
            'create-account-setting',
            'update-account-setting',
            'delete-account-setting',
            'view-account-setting',

            //cash
            'create-cash',
            'update-cash',
            'view-cash',

            //deprecation
            'create-deprecation',
            'update-deprecation',
            'delete-deprecation',
            'view-deprecation',

            //item
            'create-item',
            'update-item',
            'delete-item',
            'view-item',
        );
    }
}
