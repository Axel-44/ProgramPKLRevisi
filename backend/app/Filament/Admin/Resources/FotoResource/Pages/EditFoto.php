<?php

namespace App\Filament\Admin\Resources\FotoResource\Pages;

use App\Filament\Admin\Resources\FotoResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditFoto extends EditRecord
{
    protected static string $resource = FotoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
