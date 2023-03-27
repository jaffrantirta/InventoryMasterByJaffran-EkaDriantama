<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JournalController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Journal/Show', [
            'status' => session('status'),
            'roles'=>session('user_roles'),
            'journals' => Journal::with('journal_details')->with('journal_details.account')->latest()->paginate(5, ['*'], 'page', $page)
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
