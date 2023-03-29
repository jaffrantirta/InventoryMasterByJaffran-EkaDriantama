<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use App\Models\JournalDetail;
use App\Models\Account;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class JournalController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Journal/Show', [
            'roles' => session('user_roles'),
            'journals' => Journal::with('journal_details')->with('journal_details.account')->latest()->paginate(5, ['*'], 'page', $page)
        ]);
    }
    public function create()
    {
        return Inertia::render('Journal/Create', [
            'roles'=>session('user_roles'),
            'accounts' => Account::orderBy('code', 'asc')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required',
            'date' => 'required|date',
            'journal_details' => 'required|array|min:2',
            'journal_details.*.account_id' => 'required|exists:accounts,id',
            'journal_details.*.debit' => 'required|numeric|min:0',
            'journal_details.*.credit' => 'required|numeric|min:0',
        ]);

        // Create a new journal instance
    $journal = new Journal([
        'description' => $request->input('description'),
        'date' => $request->input('date'),
        'user_id' => auth()->user()->id
    ]);

    // Save the journal
    $journal->save();

    // Save the journal details
    foreach ($request->input('journal_details') as $detail) {
        $journalDetail = new JournalDetail([
            'journal_id' => $journal->id,
            'account_id' => $detail['account_id'],
            'debit' => $detail['debit'],
            'credit' => $detail['credit']
        ]);
        $journalDetail->save();
    }

    // Return a response
    return Redirect::route('journal.create');
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneralJournal $generalJournal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeneralJournal $generalJournal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GeneralJournal $generalJournal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneralJournal $generalJournal)
    {
        //
    }
}
