<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\AgendaResource\Pages;
use App\Filament\Admin\Resources\AgendaResource\RelationManagers;
use App\Models\Agenda;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AgendaResource extends Resource
{
    protected static ?string $model = Agenda::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationLabel = 'Manajemen Agenda';

    protected static ?string $pluralModelLabel = 'Agenda';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
               Forms\Components\TextInput::make('nama_kegiatan')
                    ->label('Nama Kegiatan')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\DatePicker::make('tanggal')
                    ->label('Tanggal')
                    ->required(),
                Forms\Components\TimePicker::make('waktu')
                    ->label('Waktu')
                    ->required(),
                Forms\Components\TextInput::make('lokasi')
                    ->label('Lokasi')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_kegiatan')
                    ->label('Nama Kegiatan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tanggal')
                    ->label('Tanggal')
                    ->date('d F Y') // Format tanggal menjadi "02 September 2025"
                    ->sortable(),
                Tables\Columns\TextColumn::make('waktu')
                    ->label('Waktu')
                    ->time('H:i') // Format waktu menjadi "08:20"
                    ->sortable(),
                Tables\Columns\TextColumn::make('lokasi')
                    ->label('Lokasi')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Actions\BulkActionGroup::make([
                    Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('tanggal', 'asc');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAgendas::route('/'),
            'create' => Pages\CreateAgenda::route('/create'),
            'edit' => Pages\EditAgenda::route('/{record}/edit'),
        ];
    }
}
