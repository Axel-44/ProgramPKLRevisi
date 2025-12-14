<?php

namespace App\Filament\Admin\Resources\StrukturOrganisasiResource\Pages;

use App\Filament\Admin\Resources\StrukturOrganisasiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditStrukturOrganisasi extends EditRecord
{
    protected static string $resource = StrukturOrganisasiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
