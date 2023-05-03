<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashStoreRequest;
use App\Models\Account;
use App\Models\AccountSetting;
use App\Models\Cash;
use App\Models\Journal;
use App\Models\JournalDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class CashController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Cash/Show', [
            'roles' => session('user_roles'),
            'cashes_in' => Cash::with('journal.journal_details.account')->where('type', 'in')->latest()->paginate(5, ['*'], 'page', $page),
            'cashes_out' => Cash::with('journal.journal_details.account')->where('type', 'out')->latest()->paginate(5, ['*'], 'page', $page)
        ]);
    }
    public function create()
    {
        return Inertia::render('Cash/Create', [
            'roles' => session('user_roles'),
            'accounts' => Account::orderBy('code', 'asc')->get(),
        ]);
    }
    public function store(CashStoreRequest $request)
    {

        DB::beginTransaction();

        //get setting
        $cash_account = AccountSetting::where('name', 'kas')->first();

        //insert journal
        $journalData = $request->only(['description', 'date']);
        $journalData['user_id'] = auth()->user()->id;
        $journal = Journal::create($journalData);

        //insert journal detail
        JournalDetail::create([
            'journal_id' => $journal->id,
            'account_id' => $request->input('account_id'),
            'debit' => $request->input('type') === 'in' ? 0 : $request->input('amount'),
            'credit' => $request->input('type') === 'in' ? $request->input('amount') : 0,
        ]);
        JournalDetail::create([
            'journal_id' => $journal->id,
            'account_id' => $cash_account->account_id,
            'debit' => $request->input('type') === 'in' ? $request->input('amount') : 0,
            'credit' => $request->input('type') === 'in' ? 0 : $request->input('amount'),
        ]);

        //insert cash
        Cash::create([
            'journal_id' => $journal->id,
            'type' => $request->input('type'),
            'user_id' => auth()->user()->id,
        ]);

        DB::commit();
        return Redirect::route('cash.create');
    }
    public function show(Cash $cash)
    {
        //
    }
    public function edit(Cash $cash)
    {
        //
    }
    public function update(Request $request, Cash $cash)
    {
        //
    }
    public function destroy(Cash $cash)
    {
        //
    }
}
