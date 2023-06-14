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
use App\Http\Controllers\TransactionDetailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
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
    return Inertia::render('Auth/Login');
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
    Route::get('transaction-detail/{id}', [TransactionController::class, 'showDetail'])->name('transaction.detail');
    Route::get('transaction/purchase', [TransactionController::class, 'indexPurchase'])->name('transaction.index.purchase');
    Route::get('transaction/create-purchase', [TransactionController::class, 'createPurchase'])->name('transaction.create.purchase');
    Route::post('transaction/store-purchase', [TransactionController::class, 'storePurchase'])->name('transaction.store.purchase');
    Route::resource('category', CategoryController::class);
    Route::resource('item', ItemController::class);
    Route::resource('journal', JournalController::class);
    Route::resource('account', AccountController::class);
    Route::resource('user', UserController::class);

    //export
    Route::get('export/stock', [ReportController::class, 'export_stock'])->name('export.stock');
    Route::get('export/journal', [ReportController::class, 'export_journal'])->name('export.journal');
    Route::get('export/stock/history', [ReportController::class, 'export_stock_history'])->name('export.stock.history');
    Route::get('export', [ReportController::class, 'index'])->name('export.index');
    Route::get('export/transaction', [ReportController::class, 'export_transaction'])->name('export.transaction');
    Route::get('export/transaction/detail', [ReportController::class, 'export_transaction_detail'])->name('export.transaction.detail');
    
    
});

require __DIR__ . '/auth.php';
