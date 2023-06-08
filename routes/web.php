<?php

use App\Exports\TransactionExport;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\CashController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Transaction;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::middleware(['permission:create-account', 'permission:update-account', 'permission:delete-account', 'permission:view-account'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::resource('cash', CashController::class);
    Route::resource('transaction', TransactionController::class)->except(['show']);
    Route::get('transaction/purchase', [TransactionController::class, 'indexPurchase'])->name('transaction.index.purchase');
    Route::get('transaction/create-purchase', [TransactionController::class, 'createPurchase'])->name('transaction.create.purchase');
    Route::post('transaction/store-purchase', [TransactionController::class, 'storePurchase'])->name('transaction.store.purchase');
    Route::resource('category', CategoryController::class);
    Route::resource('item', ItemController::class);
    Route::resource('journal', JournalController::class);
    Route::resource('account', AccountController::class);
    Route::resource('user', UserController::class);
});

require __DIR__ . '/auth.php';
