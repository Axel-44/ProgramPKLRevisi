<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\VisiMisiResource\Pages;
use App\Filament\Admin\Resources\VisiMisiResource\RelationManagers;
use App\Models\VisiMisi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Schemas\Schema; 
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Tables\Columns\TextColumn;

class VisiMisiResource extends Resource
{
    protected static ?string $model = VisiMisi::class;

    protected static ?string $navigationIcon = 'heroicon-o-flag';

    protected static ?string $navigationLabel = 'Visi & Misi'; 
    protected static ?string $modelLabel = 'Visi Misi';        
    protected static ?string $pluralModelLabel = 'Visi Misi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Textarea::make('visi')
                    ->label('Visi BKAD')
                    ->rows(4)
                    ->required()
                    ->columnSpanFull(),

                RichEditor::make('misi')
                    ->label('Misi BKAD')
                    ->toolbarButtons([
                        'bold', 'italic', 'bulletList', 'orderedList', 'undo', 'redo'
                    ])
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('visi')
                    ->label('Visi')
                    ->limit(50),
                    // SAYA HAPUS ->searchable() AGAR KOTAK SEARCH HILANG

                TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('d M Y'),
            ])
            ->filters([
                //
            ])
            ->actions([
                // Tombol Edit & Delete
                Actions\EditAction::make(),
                Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                //
            ]);
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
            'index' => Pages\ListVisiMisis::route('/'),
            'create' => Pages\CreateVisiMisi::route('/create'),
            'edit' => Pages\EditVisiMisi::route('/{record}/edit'),
        ];
    }
}
