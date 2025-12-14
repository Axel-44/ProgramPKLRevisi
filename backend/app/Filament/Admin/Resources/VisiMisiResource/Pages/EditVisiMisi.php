<?php

namespace App\Filament\Admin\Resources\VisiMisiResource\Pages;

use App\Filament\Admin\Resources\VisiMisiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditVisiMisi extends EditRecord
{
    protected static string $resource = VisiMisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
