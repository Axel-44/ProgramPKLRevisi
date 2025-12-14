<?php

namespace App\Filament\Admin\Resources\FotoResource\Pages;

use App\Filament\Admin\Resources\FotoResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListFotos extends ListRecords
{
    protected static string $resource = FotoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
