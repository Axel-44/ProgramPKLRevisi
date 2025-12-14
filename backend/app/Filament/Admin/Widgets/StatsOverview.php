<?php

namespace App\Filament\Admin\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Berita;
use App\Models\Agenda;
// use App\Models\Dokumen;
use App\Models\User;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = -10;

    protected function getStats(): array
    {
        return [
            Stat::make('Berita', Berita::count())
                ->description('Total berita terpublikasi')
                ->descriptionIcon('heroicon-m-newspaper')
                ->chart([7, 2, 10, 3, 15, 4, 17]) 
                ->color('info'),


            Stat::make('Agenda', Agenda::count())
                ->description('Total agenda kegiatan')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('danger'),

            // Stat::make('Dokumen', Dokumen::count())
            //     ->description('Total dokumen arsip')
            //     ->descriptionIcon('heroicon-m-document-text')
            //     ->color('warning'), 

            Stat::make('Users', User::count())
                ->description('Total pengguna terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'), 
        ];
    }
}
