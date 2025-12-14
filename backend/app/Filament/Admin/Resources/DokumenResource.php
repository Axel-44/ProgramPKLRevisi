<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\DokumenResource\Pages;
use App\Filament\Admin\Resources\DokumenResource\RelationManagers;
use App\Models\Dokumen;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;

class DokumenResource extends Resource
{
    protected static ?string $model = Dokumen::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Manajemen Dokumen';

    protected static ?string $pluralModelLabel = 'Dokumen';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('file_path')
                    ->label('File Dokumen')
                    ->disk('public')
                    ->directory('dokumen') 
                    ->required()
                    // --- 1. VALIDASI FILE & UKURAN ---
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ])
                    ->maxSize(10240) // 10MB
                    ->helperText('Format: PDF, DOC, DOCX. Maksimal ukuran file: 10MB.')
                    ->live() // Cek langsung
                    ->validationMessages([
                        'accepted_file_types' => 'Pastikan format file benar (Hanya PDF atau Word)',
                        'mimetypes' => 'Pastikan format file benar (Hanya PDF atau Word)',
                        'max' => 'Ukuran file terlalu besar (Maksimal 10MB)',
                    ]),
                    // ---------------------------------

                Forms\Components\TextInput::make('title')
                    ->label('Judul Dokumen')
                    ->required()
                    ->maxLength(255),

                Forms\Components\DatePicker::make('tanggal_dokumen')
                    ->label('Tanggal Dokumen')
                    ->required()
                    ->maxDate(now()),
                
                Forms\Components\Select::make('kategori_dokumen_id')
                    ->label('Kategori Dokumen')
                    ->relationship('kategoriDokumen', 'nama_kategori') 
                    ->searchable() 
                    ->preload()   
                    ->required()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('nama_kategori')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('slug')
                            ->required(),
                    ]),

                Forms\Components\Select::make('rilis_kategori_id')
                    ->label('Kategori Rilis')
                    ->relationship('rilisKategori', 'nama')
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('nama')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('deskripsi')
                            ->nullable(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('file_link')
                    ->label('File')
                    ->default('Lihat')
                    ->icon('heroicon-o-document-arrow-down')
                    ->url(fn (Dokumen $record): string => Storage::disk('public')->url($record->file_path))
                    ->openUrlInNewTab()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),

                Tables\Columns\TextColumn::make('tanggal_dokumen')
                    ->label('Tanggal')
                    ->date('d F Y')
                    ->sortable(),    

                Tables\Columns\TextColumn::make('kategoriDokumen.nama_kategori')
                    ->label('Kategori')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info'),
                
                Tables\Columns\TextColumn::make('rilisKategori.nama')
                    ->label('Kategori Rilis')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('warning'),
                    
                // Tables\Columns\TextColumn::make('created_at')
                //     ->label('Tanggal Upload')
                //     ->dateTime('d M Y'),
            ])

            ->actions([
                Actions\EditAction::make()
                    ->iconButton()
                    ->color('primary'),

                Actions\DeleteAction::make()
                    ->iconButton(), 
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
            'index' => Pages\ListDokumens::route('/'),
            'create' => Pages\CreateDokumen::route('/create'),
            'edit' => Pages\EditDokumen::route('/{record}/edit'),
        ];
    }
}
