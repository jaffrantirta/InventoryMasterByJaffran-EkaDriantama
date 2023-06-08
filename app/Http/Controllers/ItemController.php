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
    public function index(Request $request)
{
    $search = $request->query('search');

    $items = Item::latest()
        ->with('categories')
        ->with('unit')
        ->when($search, function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        })
        ->paginate();

    return Inertia::render('Item/Show', [
        'status' => session('status'),
        'roles' => session('user_roles'),
        'items' => $items,
        'categories' => Category::orderBy('name')->get(),
        'search' => $search // Pass the search query to the view
    ]);
}

    public function store(ItemRequest $request)
    {
        DB::beginTransaction();
        if ($request->is_wholesaler) $request->merge(['stock' => $request->input('stock') * $request->input('unit_sum')]);
        $item = Item::create($request->except('categories'));
        $item->categories()->attach($request->categories);
        if ($request->is_wholesaler) {
            $item->unit()->create([
                'name' => $request->input('unit_name'),
                'price' => $request->input('unit_price'),
                'sum' => $request->input('unit_sum')
            ]);
        }
        DB::commit();
        return Redirect::route('item.index');
    }
    public function update(Request $request, Item $item)
    {
        DB::beginTransaction();
        if ($request->is_wholesaler) $request->merge(['stock' => $request->input('stock') * $request->input('unit_sum')]);
        $item->update($request->except('categories'));
        $item->categories()->detach();
        if (is_array($request->categories)) {
            $categoryIds = collect($request->categories)->pluck('id')->toArray();
            $item->categories()->sync($categoryIds);
        } else {
            $item->categories()->attach($request->categories);
        }
        if ($request->is_wholesaler) {
            $item->unit()->updateOrCreate(
                ['item_id' => $item->id],
                [
                    'name' => $request->input('unit_name'),
                    'price' => $request->input('unit_price'),
                    'sum' => $request->input('unit_sum')
                ]
            );
        } else {
            $item->unit()->delete();
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
