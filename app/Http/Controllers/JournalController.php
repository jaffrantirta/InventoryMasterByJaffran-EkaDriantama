<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Journal;
use App\Models\JournalDetail;
use App\Http\Requests\JournalRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;

class JournalController extends Controller
{
    public function index(Request $request)
{
    $search = $request->query('search');
    $page = $request->query('page') ?? 1;

    $query = Journal::with('journal_details')->with('journal_details.account')
        ->latest();

    if ($search) {
        $query->whereHas('journal_details', function ($query) use ($search) {
            $query->where('description', 'like', '%' . $search . '%');
        });
    }

    $journals = $query->paginate(5, ['*'], 'page', $page);

    return Inertia::render('Journal/Show', [
        'roles' => session('user_roles'),
        'journals' => $journals,
        'search' => $search // Pass the search query to the view
    ]);
}

    public function create()
    {
        return Inertia::render('Journal/Create', [
            'roles' => session('user_roles'),
            'accounts' => Account::orderBy('code', 'asc')->get(),
        ]);
    }
    public function store(JournalRequest $request)
    {
        DB::beginTransaction();
        $journalData = $request->only(['description', 'date']);
        $journalData['user_id'] = auth()->user()->id;
        $journal = Journal::create($journalData);

        foreach ($request->input('journal_details') as $detail) {
            //update balance
            $account = Account::find($detail['account_id']);
            $account->update(['initial_balance' => $account->initial_balance + $detail['debit']]);
            $account->update(['initial_balance' => $account->initial_balance - $detail['credit']]);
            JournalDetail::create([
                'journal_id' => $journal->id,
                'account_id' => $detail['account_id'],
                'debit' => $detail['debit'],
                'credit' => $detail['credit']
            ]);
        }

        DB::commit();

        return Redirect::route('journal.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Journal $journal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Journal $journal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Journal $journal)
    {
        //
    }
}
