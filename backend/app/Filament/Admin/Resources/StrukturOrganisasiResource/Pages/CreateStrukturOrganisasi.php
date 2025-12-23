<?php

namespace App\Filament\Admin\Resources\StrukturOrganisasiResource\Pages;

use App\Filament\Admin\Resources\StrukturOrganisasiResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateStrukturOrganisasi extends CreateRecord
{
    protected static string $resource = StrukturOrganisasiResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

}