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
    public function index(): Response
    {
        return Inertia::render('Account/Show', [
            'status' => session('status'),
            'account' => Account::latest()->get()
        ]);
    }
    public function store(AccountRequest $request): RedirectResponse
    {
        Account::create($request->validated())->save();
        return Redirect::route('account.index');
    }
    public function update(AccountRequest $request): RedirectResponse
    {
        Account::find($request->id)->update($request->validated());
        return Redirect::route('account.index');
    }
    public function destroy($id): RedirectResponse
    {
        Account::find($id)->delete();
        return Redirect::route('account.index');
    }
}
