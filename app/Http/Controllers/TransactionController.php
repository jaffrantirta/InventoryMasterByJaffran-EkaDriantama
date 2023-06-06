<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionStorePurchaseRequest;
use App\Http\Requests\TransactionStoreRequest;
use App\Models\AccountSetting;
use App\Models\Cash;
use App\Models\Item;
use App\Models\Journal;
use App\Models\JournalDetail;
use App\Models\Purchase;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Transaction/Show', [
            'roles' => session('user_roles'),
            'transactions' => Transaction::doesntHave('purchase')->latest()->paginate(5, ['*'], 'page', $page)
        ]);
    }
    public function indexPurchase(Request $request)
    {
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Transaction/ShowPurchase', [
            'roles' => session('user_roles'),
            'transactions' => Transaction::whereHas('purchase')->latest()->paginate(5, ['*'], 'page', $page)
        ]);
    }
    public function create()
    {
        return Inertia::render('Transaction/Create', [
            'roles' => session('user_roles'),
            'items' => Item::orderBy('name', 'asc')->where('stock', '>', 0)->with('unit')->get(),
            'reference_code' => now()->timestamp,
        ]);
    }
    public function createPurchase()
    {
        return Inertia::render('Transaction/CreatePurchase', [
            'roles' => session('user_roles'),
            'items' => Item::orderBy('name', 'asc')->where('stock', '>', 0)->with('unit')->get(),
            'reference_code' => now()->timestamp,
        ]);
    }
    public function store(TransactionStoreRequest $request)
    {
        // dd($request);
        DB::beginTransaction();

        //get setting
        $cash_account = AccountSetting::where('name', 'kas')->first();
        $income_account = AccountSetting::where('name', 'pendapatan-usaha')->first();

        $grand_total = 0;

        foreach ($request->input('items_selected') as $item) {
            $grand_total += $item['price'] * $item['qty'];
        }

        //insert journal
        $journalData = $request->only(['date']);
        $journalData['user_id'] = auth()->user()->id;
        $journalData['description'] = 'Penjualan dengan kode transaksi : ' . $request->input('reference_code');
        $journal = Journal::create($journalData);

        //insert journal detail
        JournalDetail::create([
            'journal_id' => $journal->id,
            'account_id' => $cash_account->account_id,
            'debit' => $grand_total,
            'credit' => 0,
        ]);
        JournalDetail::create([
            'journal_id' => $journal->id,
            'account_id' => $income_account->account_id,
            'debit' => 0,
            'credit' => $grand_total,
        ]);

        //insert cash
        $cash = Cash::create([
            'journal_id' => $journal->id,
            'type' => 'in',
            'user_id' => auth()->user()->id,
        ]);

        //insert transaction
        $transaction = Transaction::create([
            'reference_code' => $request->input('reference_code'),
            'user_id' => auth()->user()->id,
            'cash_id' => $cash->id,
            'grand_total' => $grand_total
        ]);

        //insert transaction detail
        foreach ($request->input('items_selected') as $detail) {
            $item = Item::with('unit')->find($detail['item_id']);
            $final_qty = 0;
            $total = 0;
            $price = 0;
            if ($detail['is_wholesaler']) {
                $final_qty = $detail['qty'] * $item->unit->sum;
                $price = $item->unit->price;
                $total = $detail['qty'] * $price;
            } else {
                $final_qty = $detail['qty'];
                $price = $item->price;
                $total = $detail['qty'] * $price;
            }
            if ($final_qty > $item->stock) return redirect()->back()->withErrors(['Stok kurang']);
            $item->stock = $item->stock - $final_qty;
            $item->save();
            TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'item_id' => $detail['item_id'],
                'price' => $price,
                'qty' => $final_qty,
                'total' => $total,
            ]);
        }

        DB::commit();

        return Redirect::route('transaction.create');
    }
    public function storePurchase(TransactionStorePurchaseRequest $request)
    {
        // dd($request);
        DB::beginTransaction();

        //get setting
        $cash_account = AccountSetting::where('name', 'kas')->first();
        $income_account = AccountSetting::where('name', 'pembelian')->first();

        $grand_total = 0;

        foreach ($request->input('items_selected') as $item) {
            $grand_total += $item['price'] * $item['qty'];
        }

        //insert journal
        $journalData = $request->only(['date']);
        $journalData['user_id'] = auth()->user()->id;
        $journalData['description'] = 'Pembelian dengan kode transaksi : ' . $request->input('reference_code');
        $journal = Journal::create($journalData);

        //insert journal detail
        JournalDetail::create([
            'journal_id' => $journal->id,
            'account_id' => $cash_account->account_id,
            'debit' => $grand_total,
            'credit' => 0,
        ]);
        JournalDetail::create([
            'journal_id' => $journal->id,
            'account_id' => $income_account->account_id,
            'debit' => 0,
            'credit' => $grand_total,
        ]);

        //insert cash
        $cash = Cash::create([
            'journal_id' => $journal->id,
            'type' => 'in',
            'user_id' => auth()->user()->id,
        ]);

        //insert transaction
        $transaction = Transaction::create([
            'reference_code' => $request->input('reference_code'),
            'user_id' => auth()->user()->id,
            'cash_id' => $cash->id,
            'grand_total' => $grand_total
        ]);

        //insert transaction purchase
        Purchase::create([
            'transaction_id' => $transaction->id,
        ]);

        //insert transaction detail
        foreach ($request->input('items_selected') as $detail) {
            $item = Item::with('unit')->find($detail['item_id']);
            $final_qty = 0;
            $total = 0;
            $price = 0;
            if ($detail['is_wholesaler']) {
                $final_qty = $detail['qty'] * $item->unit->sum;
                $price = $item->unit->price;
                $total = $detail['qty'] * $price;
            } else {
                $final_qty = $detail['qty'];
                $price = $item->price;
                $total = $detail['qty'] * $price;
            }
            $item->stock = $item->stock + $final_qty;
            $item->save();
            TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'item_id' => $detail['item_id'],
                'price' => $price,
                'qty' => $final_qty,
                'total' => $total,
            ]);
        }

        DB::commit();

        return Redirect::route('transaction.create.purchase');
    }
    public function edit(Transaction $transaction)
    {
        //
    }
    public function update(Request $request, Transaction $transaction)
    {
        //
    }
    public function destroy(Transaction $transaction)
    {
        //
    }
}
