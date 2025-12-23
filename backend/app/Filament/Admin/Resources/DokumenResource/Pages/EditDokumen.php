<?php

namespace App\Filament\Admin\Resources\DokumenResource\Pages;

use App\Filament\Admin\Resources\DokumenResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditDokumen extends EditRecord
{
    protected static string $resource = DokumenResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }


    protected function mutateFormDataBeforeSave(array $data): array
    {

        if ($this->record->status === 'revisi') {
            $data['status'] = 'menunggu';

        }

        return $data;
    }
}