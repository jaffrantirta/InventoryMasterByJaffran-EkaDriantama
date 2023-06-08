<?php

namespace App\Http\Controllers;

use App\Models\TransactionDetail;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionDetailController extends Controller
{
    public function index()
    {
        return Inertia::render('Transaction/Detail', [
            'roles' => session('user_roles'),
            'transaction_detail' => TransactionDetail::with('item')->with('transaction')->where('transaction_id'),
        ]);
    }
    public function showDetail(Transaction $transaction)
    {
        return Inertia::render('Transaction/Detail', [
            'roles' => session('user_roles'),
            'transaction' => $transaction->with('transaction_details.item')->where('id', $transaction->id)->first(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TransactionDetail $transactionDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TransactionDetail $transactionDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TransactionDetail $transactionDetail)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TransactionDetail $transactionDetail)
    {
        //
    }
}
