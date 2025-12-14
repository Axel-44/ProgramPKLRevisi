<?php

namespace App\Filament\Admin\Resources\StrukturOrganisasiResource\Pages;

use App\Filament\Admin\Resources\StrukturOrganisasiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStrukturOrganisasis extends ListRecords
{
    protected static string $resource = StrukturOrganisasiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
