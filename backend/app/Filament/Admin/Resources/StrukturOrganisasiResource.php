<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\StrukturOrganisasiResource\Pages;
use App\Filament\Admin\Resources\StrukturOrganisasiResource\RelationManagers;
use App\Models\StrukturOrganisasi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;


class StrukturOrganisasiResource extends Resource
{
    protected static ?string $model = StrukturOrganisasi::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Struktur Organisasi';
    protected static ?string $pluralModelLabel = 'Struktur Organisasi';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('gambar')
                    ->label('Foto Pejabat')
                    ->disk('public')
                    ->directory('struktur-organisasi')
                    ->image()
                    ->imageEditor()
                    ->columnSpanFull(),
                Forms\Components\TextInput::make('nama')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('jabatan')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Select::make('parent_id')
                    ->label('Atasan Langsung')
                    ->options(fn ($record) => StrukturOrganisasi::where('id', '!=', $record?->id)->pluck('nama', 'id'))
                    ->searchable()
                    ->placeholder('Kosongkan jika ini pejabat tertinggi'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('gambar')
                    ->label('Foto')
                    ->disk('public')
                    ->circular(),
                Tables\Columns\TextColumn::make('nama')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('jabatan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('parent.nama')
                    ->label('Atasan Langsung')
                    ->badge(),
            ])
            ->filters([
                Tables\Filters\Filter::make('root')
                    ->label('Hanya Tampilkan Pejabat Tertinggi')
                    ->query(fn ($query) => $query->whereNull('parent_id')),
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
            ->reorderable('sort_order')
            ->defaultSort('sort_order', 'asc'); 
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
            'index' => Pages\ListStrukturOrganisasis::route('/'),
            'create' => Pages\CreateStrukturOrganisasi::route('/create'),
            'edit' => Pages\EditStrukturOrganisasi::route('/{record}/edit'),
        ];
    }
}
