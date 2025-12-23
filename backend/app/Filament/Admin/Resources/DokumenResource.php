<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\DokumenResource\Pages;
use App\Models\Dokumen;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions; 
use Filament\Tables\Actions\Action; 
use Illuminate\Support\Facades\Auth; 
use Filament\Forms\Components\Textarea;
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
                // Bagian Pesan Revisi
                Forms\Components\Section::make('Catatan Revisi / Penolakan')
                    ->description('Admin meminta Anda memperbaiki data berikut:')
                    ->icon('heroicon-o-exclamation-triangle') 
                    ->iconColor('warning') 
                    ->schema([
                        Forms\Components\Textarea::make('catatan_verifikasi')
                            ->hiddenLabel() 
                            ->disabled() 
                            ->dehydrated(false) 
                            ->rows(3)
                            ->columnSpanFull(),
                    ])
                    ->visible(fn ($record) => 
                        $record && ($record->status === 'revisi' || $record->status === 'ditolak')
                    )
                    ->columnSpanFull(),

                // Form Upload
                Forms\Components\FileUpload::make('file_path')
                    ->label('File Dokumen')
                    ->disk('public')
                    ->directory('dokumen') 
                    ->required()
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ])
                    ->maxSize(10240)
                    ->helperText('Format: PDF, DOC, DOCX. Maksimal 10MB.')
                    ->live()
                    ->validationMessages([
                        'accepted_file_types' => 'Hanya PDF atau Word',
                        'max' => 'Maksimal 10MB',
                    ]),

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
                        Forms\Components\TextInput::make('nama_kategori')->required(),
                        Forms\Components\TextInput::make('slug')->required(),
                    ]),

                Forms\Components\Select::make('rilis_kategori_id')
                    ->label('Kategori Rilis')
                    ->relationship('rilisKategori', 'nama')
                    ->searchable()
                    ->preload()
                    ->createOptionForm([
                        Forms\Components\TextInput::make('nama')->required(),
                        Forms\Components\Textarea::make('deskripsi')->nullable(),
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
                    ->searchable()
                    ->weight('bold')
                    ->description(fn (Dokumen $record) => 
                        $record->status === 'revisi' || $record->status === 'ditolak' 
                        ? 'Catatan: ' . $record->catatan_verifikasi 
                        : null
                    ),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->label('Status')
                    ->color(fn (string $state): string => match ($state) {
                        'menunggu' => 'gray',
                        'disetujui' => 'success', 
                        'ditolak' => 'danger',   
                        'revisi' => 'warning',   
                    })
                    ->icon(fn (string $state): string => match ($state) {
                        'menunggu' => 'heroicon-m-clock',
                        'disetujui' => 'heroicon-m-check-circle',
                        'ditolak' => 'heroicon-m-x-circle',
                        'revisi' => 'heroicon-m-pencil-square',
                    })
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),

                Tables\Columns\TextColumn::make('user.name')
                    ->label('Uploader')
                    ->sortable()
                    ->description(fn ($record) => $record->created_at->diffForHumans()),

                Tables\Columns\TextColumn::make('tanggal_dokumen')
                    ->label('Tanggal')
                    ->date('d F Y')
                    ->sortable(),    

                Tables\Columns\TextColumn::make('kategoriDokumen.nama_kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color('info'),
                
                Tables\Columns\TextColumn::make('rilisKategori.nama')
                    ->label('Rilis')
                    ->badge()
                    ->color('warning'),

                Tables\Columns\TextColumn::make('verifikator.name')
                    ->label('Diverifikasi Oleh')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->actions([
                // 1. TOMBOL SETUJUI (Muncul saat Menunggu / Revisi)
                Action::make('verifikasi')
                    ->label('Setujui')
                    ->icon('heroicon-o-check-badge')
                    ->color('success')
                    ->visible(fn ($record) => 
                        ($record->status === 'menunggu' || $record->status === 'revisi') 
                        && Auth::user()->hasRole('super_admin')
                    ) 
                    ->requiresConfirmation()
                    ->modalHeading('Setujui Dokumen?')
                    ->action(function ($record) {
                        $record->update([
                            'status' => 'disetujui',
                            'verified_by' => Auth::id(),
                            'verified_at' => now(),
                        ]);
                    }),

                // 2. TOMBOL MINTA REVISI (UPDATE DI SINI)
                Action::make('revisi')
                    ->label('Minta Revisi')
                    ->icon('heroicon-o-pencil-square')
                    ->color('warning')
                    // --- UPDATE VISIBILITY ---
                    // Muncul jika status: Menunggu ATAU Disetujui
                    ->visible(fn ($record) => 
                        ($record->status === 'menunggu' || $record->status === 'disetujui') 
                        && Auth::user()->hasRole('super_admin')
                    )
                    // -------------------------
                    ->form([
                        Textarea::make('catatan_verifikasi')
                            ->label('Catatan Revisi')
                            ->required()
                            ->placeholder('Jelaskan apa yang perlu diperbaiki...'),
                    ])
                    ->action(function ($record, array $data) {
                        $record->update([
                            'status' => 'revisi',
                            'verified_by' => Auth::id(),
                            'verified_at' => now(),
                            'catatan_verifikasi' => $data['catatan_verifikasi'],
                        ]);
                    }),

                // 3. TOMBOL TOLAK (Muncul saat Menunggu / Revisi / Disetujui juga boleh untuk take-down)
                Action::make('tolak')
                    ->label('Tolak Permanen')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->visible(fn ($record) => 
                        // Saya tambahkan 'disetujui' juga, jaga-jaga kalau mau hapus permanen dokumen yg sudah tayang
                        ($record->status === 'menunggu' || $record->status === 'revisi' || $record->status === 'disetujui') 
                        && Auth::user()->hasRole('super_admin')
                    )
                    ->form([
                        Textarea::make('catatan_verifikasi')
                            ->label('Alasan Penolakan')
                            ->required(),
                    ])
                    ->action(function ($record, array $data) {
                        $record->update([
                            'status' => 'ditolak',
                            'verified_by' => Auth::id(),
                            'verified_at' => now(),
                            'catatan_verifikasi' => $data['catatan_verifikasi'],
                        ]);
                    }),

                Tables\Actions\EditAction::make()->iconButton(),
                Tables\Actions\DeleteAction::make()->iconButton(), 
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array { return []; }
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListDokumens::route('/'),
            'create' => Pages\CreateDokumen::route('/create'),
            'edit' => Pages\EditDokumen::route('/{record}/edit'),
        ];
    }
}