<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        // if(!auth()->user()->hasPermissionTo('view-account'))return redirect()->back()->withErrors(['message'=>'You do not have permission to access this resource.']);
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('User/Show', [
            'status' => session('status'),
            'roles' => session('user_roles'),
            'users' => User::role('cashier')->latest()->paginate(5, ['*'], 'page', $page)
        ]);
    }
    public function store(UserRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['password'] = \Hash::make($validatedData['password']);

        $user = User::create($validatedData);
        $user->assignRole('cashier');

        return redirect()->route('user.index');
    }
    public function update(UserRequest $request, User $user)
{
    $validatedData = $request->validated();
    
    if(isset($validatedData['password'])) {
        $validatedData['password'] = Hash::make($validatedData['password']);
    }

    $user->update($validatedData);

    return redirect()->route('user.index');
}

public function destroy(User $user)
{
    $user->delete();

    return redirect()->route('user.index');
}

}
