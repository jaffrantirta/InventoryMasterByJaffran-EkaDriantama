<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\ItemRequest;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->has('page') ? $request->input('page') : 1;
        return Inertia::render('Item/Show', [
            'status' => session('status'),
            'roles'=>session('user_roles'),
            'items' => Item::latest()->paginate(5, ['*'], 'page', $page)
        ]);
    }
    public function store(ItemRequest $request)
    {
        Item::create($request->validated())->save();
        return Redirect::route('item.index');
    }
    public function update(ItemRequest $request): RedirectResponse
    {
        Item::find($request->id)->update($request->validated());
        return Redirect::route('item.index');
    }
    public function destroy(Item $item)
    {
        $item->delete();
        return Redirect::route('item.index');
    }
}
