<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dompdf\Dompdf;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
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
        $dompdf->stream('document.pdf', ['Attachment' => false]);
    }
}
