<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ItemController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', ['roles'=>session('user_roles')]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/accounts', [AccountController::class, 'index'])->name('account.index');
    Route::patch('/accounts', [AccountController::class, 'update'])->name('account.update');
    Route::post('/accounts', [AccountController::class, 'store'])->name('account.store');
    Route::delete('/accounts/{account}', [AccountController::class, 'destroy'])->name('account.destroy');

    Route::get('/items', [ItemController::class, 'index'])->name('item.index');
    Route::patch('/items', [ItemController::class, 'update'])->name('item.update');
    Route::post('/items', [ItemController::class, 'store'])->name('item.store');
    Route::delete('/items/{item}', [ItemController::class, 'destroy'])->name('item.destroy');
});

require __DIR__.'/auth.php';
