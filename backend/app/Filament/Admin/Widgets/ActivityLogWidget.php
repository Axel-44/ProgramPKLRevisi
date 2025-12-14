<?php

namespace App\Filament\Admin\Widgets;

use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Spatie\Activitylog\Models\Activity;
use Filament\Notifications\Notification;

class ActivityLogWidget extends BaseWidget
{
    protected static ?string $heading = 'Log Aktivitas';
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(Activity::query())
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Waktu')
                    ->dateTime('d-m-Y H:i:s')
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('Aktivitas')
                    ->searchable(),
                Tables\Columns\TextColumn::make('causer.name')
                    ->label('User')
                    ->searchable(),
            ])
            ->headerActions([
                Tables\Actions\Action::make('bersihkanLog')
                    ->label('Bersihkan Log Aktivitas')
                    ->color('danger')
                    ->icon('heroicon-o-trash')
                    ->requiresConfirmation()
                    ->action(function () {
                        Activity::truncate();
                        Notification::make()
                            ->title('Log berhasil dibersihkan')
                            ->success()
                            ->send();
                    }),
            ]);
    }
}
