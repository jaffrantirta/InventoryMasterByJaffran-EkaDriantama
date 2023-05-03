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
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Journal/Show', [
            'roles' => session('user_roles'),
            'journals' => Journal::with('journal_details')->with('journal_details.account')->latest()->paginate(5, ['*'], 'page', $page)
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
