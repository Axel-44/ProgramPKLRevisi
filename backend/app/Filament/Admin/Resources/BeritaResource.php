<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\BeritaResource\Pages;
use App\Filament\Admin\Resources\BeritaResource\RelationManagers;
use App\Models\Berita;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions;
use Filament\Schemas\Schema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Filament\Forms\Set;

class BeritaResource extends Resource
{
    protected static ?string $model = Berita::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationLabel = 'Manajemen Berita';
    protected static ?string $modelLabel = 'Berita';
    protected static ?string $pluralModelLabel = 'Berita';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Judul Berita')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                Forms\Components\RichEditor::make('content')
                    ->label('Isi Berita')
                    ->required()
                    ->columnSpanFull(),

                Forms\Components\FileUpload::make('image')
                    ->label('Gambar Utama')
                    ->disk('public')
                    ->directory('berita')
                    ->image(),

                Forms\Components\Select::make('type')
                    ->label('Jenis Berita')
                    ->options([
                        'bkad' => 'Berita BKAD',
                        'kota_bogor' => 'Berita Kota Bogor',
                    ])
                    ->required(),

                Forms\Components\DateTimePicker::make('published_at')
                    ->label('Tanggal Publikasi')
                    ->default(now())
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
             ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Gambar')
                    ->disk('public'), 

                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),

                Tables\Columns\TextColumn::make('type')
                    ->label('Kategori') 
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'bkad' => 'Berita BKAD',
                        'kota_bogor' => 'Berita Kota Bogor',
                        default => 'Tidak Diketahui',
                    }),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Tanggal Upload') 
                    ->dateTime('d M Y')
                    ->sortable(),
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
            'index' => Pages\ListBeritas::route('/'),
            'create' => Pages\CreateBerita::route('/create'),
            'edit' => Pages\EditBerita::route('/{record}/edit'),
        ];
    }
}
