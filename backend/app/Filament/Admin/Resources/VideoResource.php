<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\VideoResource\Pages;
use App\Filament\Admin\Resources\VideoResource\RelationManagers;
use App\Models\Video;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Get;
use Illuminate\Support\Facades\Storage;

class VideoResource extends Resource
{
    protected static ?string $model = Video::class;

    protected static ?string $navigationIcon = 'heroicon-o-video-camera';
    protected static ?string $navigationLabel = 'Manajemen Video';
    protected static ?string $pluralModelLabel = 'Video';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Judul Video')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Forms\Components\Radio::make('type')
                    ->label('Tipe Video')
                    ->options([
                        'file' => 'Upload File',
                        'youtube' => 'Link YouTube',
                    ])
                    ->default('file')
                    ->reactive(),

                Forms\Components\FileUpload::make('file_path')
                    ->label('File Video')
                    ->disk('public')
                    ->directory('videos')
                    ->acceptedFileTypes(['video/mp4', 'video/webm'])
                    ->requiredIf('type', 'file')
                    ->hidden(fn (Get $get) => $get('type') !== 'file'),

                Forms\Components\TextInput::make('youtube_url')
                    ->label('URL Video YouTube')
                    ->requiredIf('type', 'youtube')
                    ->url()
                    ->rule('regex:/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/')
                    ->hidden(fn (Get $get) => $get('type') !== 'youtube'),

                Forms\Components\Textarea::make('description')
                    ->label('Deskripsi (Opsional)')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'file' => 'info',
                        'youtube' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Upload')
                    ->dateTime('d M Y'),
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
            'index' => Pages\ListVideos::route('/'),
            'create' => Pages\CreateVideo::route('/create'),
            'edit' => Pages\EditVideo::route('/{record}/edit'),
        ];
    }
}
