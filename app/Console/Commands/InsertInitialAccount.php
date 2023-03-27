<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Account;

class InsertInitialAccount extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:insert-initial-account';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->line('starting bro...');
        Account::insert([
            [
                'classification'=>1,
                'code'=>101,
                'name'=>'Kas',
                'initial_balance'=>5000000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'classification'=>3,
                'code'=>301,
                'name'=>'Modal Perusahaan',
                'initial_balance'=>5000000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'classification'=>4,
                'code'=>401,
                'name'=>'Pendapatan Usaha',
                'initial_balance'=>0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'classification'=>5,
                'code'=>501,
                'name'=>'Beban Penyusutan',
                'initial_balance'=>0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'classification'=>1,
                'code'=>104,
                'name'=>'Akumulasi Penyusutan',
                'initial_balance'=>0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            ]);
            $this->info('Initial account has been created - Supported by Jaffran');
    }
}
