<?php

namespace App\Http\Controllers;

use App\Models\Cash;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        //
    }
    public function store(Request $request)
    {
        //
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
