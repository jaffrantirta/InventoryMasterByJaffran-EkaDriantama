<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dompdf\Dompdf;
use App\Models\Item;
use App\Models\Journal;
use App\Models\StockHistory;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        $data['roles'] = session('user_roles');
        return Inertia::render('Export/Show', $data);
    }
    public function export_stock()
    {
        // Create a new Dompdf instance
        $dompdf = new Dompdf();

        $type = request()->query('type');

        if($type === null) return 'tidak ada tipe';

        if($type === 'low'){
            $data = Item::where('stock', '<=', 'min_stock')->get();
        }else if($type === 'enough'){
            $data = Item::whereBetween('stock', [DB::raw('min_stock + 1'), DB::raw('min_stock * 1.25')])->get();
        }else if($type === 'safe'){
            $data = Item::where('stock', '>', DB::raw('min_stock * 1.25'))->get();
        }else{
            return 'tipe tidak tersedia';
        }

         // Generate the table HTML with borders
         $html = '<table style="border-collapse: collapse; width: 100%;">';
         $html .= '<thead>';
         $html .= '<tr>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">No.</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Nama Barang</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Minimal stok</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Stok saat ini</th>';
         $html .= '</tr>';
         $html .= '</thead>';
         $html .= '<tbody>';
         foreach ($data as $key => $value) {
            $html .= '<tr>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$key.'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['name'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['min_stock'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['stock'].'</td>';
            $html .= '</tr>';
         }
         $html .= '</tbody>';
         $html .= '</table>';
 
         // Load the HTML content
         $dompdf->loadHtml($html);

        // (Optional) Set paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to the browser
        $dompdf->stream($type.'.pdf', ['Attachment' => false]);
    }

    public function export_stock_history()
    {
        // Create a new Dompdf instance
        $dompdf = new Dompdf();

        $start_date = Carbon::createFromFormat('Y-m-d', request()->query('start_date'))->startOfDay();
        $end_date = Carbon::createFromFormat('Y-m-d', request()->query('end_date'))->endOfDay();

        if ($start_date === null || $end_date === null) {
            return 'Masukkan tanggal awal dan akhir.';
        }

        $data = StockHistory::with('item')
        ->whereBetween('created_at', [$start_date, $end_date])
        ->get();

         // Generate the table HTML with borders
         $html = '<table style="border-collapse: collapse; width: 100%;">';
         $html .= '<thead>';
         $html .= '<tr>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">No.</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Nama Barang</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Stok masuk/keluar</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Stok terakhir</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Tanggal</th>';
         $html .= '</tr>';
         $html .= '</thead>';
         $html .= '<tbody>';
         foreach ($data as $key => $value) {
            $html .= '<tr>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$key.'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['item']['name'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['stock'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['latest_stock'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['created_at'].'</td>';
            $html .= '</tr>';
         }
         $html .= '</tbody>';
         $html .= '</table>';
 
         // Load the HTML content
         $dompdf->loadHtml($html);

        // (Optional) Set paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to the browser
        $dompdf->stream('stock-history.pdf', ['Attachment' => false]);
    }

    public function export_journal()
    {
        // Create a new Dompdf instance
        $dompdf = new Dompdf();

        $start_date = request()->query('start_date');
        $end_date = request()->query('end_date');

        if ($start_date === null || $end_date === null) {
            return 'Masukkan tanggal awal dan akhir.';
        }

        $data = Journal::with('journal_details')
            ->with('journal_details.account')
            ->whereBetween('date', [$start_date, $end_date])
            ->latest()
            ->get();


        // dd($data);

         // Generate the table HTML with borders
         $html = '<table style="border-collapse: collapse; width: 100%;">';
         $html .= '<thead>';
         $html .= '<tr>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">No.</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Tanggal</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Deskripsi</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Kode akun</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Reff</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Debit</th>';
         $html .= '<th style="border: 1px solid #000; padding: 8px;">Kredit</th>';
         $html .= '</tr>';
         $html .= '</thead>';
         $html .= '<tbody>';
         foreach ($data as $key => $value) {
            $html .= '<tr>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$key.'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['date'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['description'].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
            $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
            $html .= '</tr>';
            foreach ($value['journal_details'] as $key => $value) {
                $html .= '<tr>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value[''].'</td>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['account']['code'].'</td>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['account']['name'].'</td>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['debit'].'</td>';
                $html .= '<td style="border: 1px solid #000; padding: 8px;">'.$value['credit'].'</td>';
                $html .= '</tr>';
            }
         }
         $html .= '</tbody>';
         $html .= '</table>';
 
         // Load the HTML content
         $dompdf->loadHtml($html);

        // (Optional) Set paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to the browser
        $dompdf->stream('ass.pdf', ['Attachment' => false]);
    }
}
