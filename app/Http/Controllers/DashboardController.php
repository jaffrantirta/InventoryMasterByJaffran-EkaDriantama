<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $data['out_of_stock'] = DB::select('SELECT COUNT(*) as count FROM items WHERE stock <= min_stock')[0]->count;
        $data['low_stock'] = Item::whereBetween('stock', [DB::raw('min_stock + 1'), DB::raw('min_stock * 1.25')])->count();
        $items = DB::table('items')
            ->join('transaction_details', 'items.id', '=', 'transaction_details.item_id')
            ->select('items.*', DB::raw('AVG(transaction_details.qty) / items.shipping_day AS avg_sell_per_day'))
            ->whereNotNull('items.shipping_day')
            ->groupBy('items.id', 'items.name', 'items.min_stock', 'items.shipping_day', 'items.reference_code', 'items.stock', 'items.created_at', 'items.updated_at', 'items.price')
            ->get();
        $data['items'] = [];
        foreach ($items as $key => $item) {
            $reorder_point = ($item->avg_sell_per_day * $item->shipping_day) + $item->min_stock;
            if ($item->stock == $reorder_point) {
                $data['items'][$key] = array_merge((array) $item, ['reorder_point' => $reorder_point]);
            }
        }
        $data['roles'] = session('user_roles');

        return Inertia::render('Dashboard/Show', $data);
    }
}
