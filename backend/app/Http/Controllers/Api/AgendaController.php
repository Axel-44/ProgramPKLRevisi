<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    public function index(Request $request)
    {
        $query = Agenda::query();

        if ($request->has('year') && $request->has('month')) {
            $query->whereYear('tanggal', $request->year)
                  ->whereMonth('tanggal', $request->month);
        } else {
            $query->where('tanggal', '>=', now()->toDateString())
                  ->orderBy('tanggal', 'asc')
                  ->orderBy('waktu', 'asc');
        }

        $agenda = $query->get();

        return response()->json([
            'success' => true,
            'data' => $agenda
        ]);
    }
}