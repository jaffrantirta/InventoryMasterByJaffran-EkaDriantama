<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\ItemRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Item/Show', [
            'status' => session('status'),
            'roles' => session('user_roles'),
            'items' => Item::latest()->with('categories')->paginate(),
            'categories' => Category::orderBy('name')->get()
        ]);
    }
    public function store(ItemRequest $request)
    {
        DB::beginTransaction();
        $item = Item::create($request->except('categories'));
        $item->categories()->attach($request->categories);
        DB::commit();
        return Redirect::route('item.index');
    }
    public function update(Request $request, Item $item)
    {
        DB::beginTransaction();
        $item->update($request->except('categories'));
        $item->categories()->detach();
        if (is_array($request->categories)) {
            $categoryIds = collect($request->categories)->pluck('id')->toArray();
            $item->categories()->sync($categoryIds);
        } else {
            $item->categories()->attach($request->categories);
        }
        DB::commit();
        return Redirect::route('item.index');
    }


    public function destroy(Item $item)
    {
        $item->delete();
        return Redirect::route('item.index');
    }
}
