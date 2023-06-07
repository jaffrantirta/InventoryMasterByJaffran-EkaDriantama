<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromView;

class TransactionExport implements FromView
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return view('exports.transactions', [
            'transactions' => Transaction::all()
        ]);
    }
}
