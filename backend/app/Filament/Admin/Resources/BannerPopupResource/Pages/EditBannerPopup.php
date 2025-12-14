<?php

namespace App\Filament\Admin\Resources\BannerPopupResource\Pages;

use App\Filament\Admin\Resources\BannerPopupResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBannerPopup extends EditRecord
{
    protected static string $resource = BannerPopupResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
