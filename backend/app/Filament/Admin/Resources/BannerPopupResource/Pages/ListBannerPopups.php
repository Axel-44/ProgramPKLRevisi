<?php

namespace App\Filament\Admin\Resources\BannerPopupResource\Pages;

use App\Filament\Admin\Resources\BannerPopupResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListBannerPopups extends ListRecords
{
    protected static string $resource = BannerPopupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
