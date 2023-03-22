<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountRequest;
use App\Models\Account;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function show(Request $request): Response
    {
        return Inertia::render('Account/Show', [
            'status' => session('status'),
            'account' => Account::all()
        ]);
    }
    public function store(AccountRequest $request): RedirectResponse
    {
        Account::create($request->validated())->save();
        return Redirect::route('account.show');
    }
    public function update(AccountRequest $request): RedirectResponse
    {
        $request->account()->fill($request->validated());
        $request->account()->save();

        return Redirect::route('account.show');
    }
    public function destroy(Request $request): RedirectResponse
    {
        $account->delete();

        return Redirect::route('account.show');
    }
}
