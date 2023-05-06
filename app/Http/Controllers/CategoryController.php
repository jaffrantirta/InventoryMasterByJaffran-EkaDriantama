<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Category/Show', [
            'roles' => session('user_roles'),
            'categories' => Category::latest()->paginate()
        ]);
    }
    public function store(CategoryStoreRequest $request)
    {
        Category::create($request->validated())->save();
        return redirect()->back();
    }
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->back();
    }
    public function destroy(Category $category)
    {
        if ($category->item()->count() > 0) return redirect()->back()->withErrors(['message' => 'You cannot delete this category because it has items.']);
        $category->delete();
        return redirect()->back();
    }
}
