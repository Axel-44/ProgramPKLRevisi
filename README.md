# ProgramPKLRevisi

## Deskripsi
Program ini adalah aplikasi untuk pengelolaan data Praktik Kerja Lapangan (PKL).

## Prasyarat (Prerequisites)

Pastikan Anda telah menginstal software berikut di komputer Anda sebelum memulai:

*   **Bahasa Pemrograman/Runtime:** (PHP >= 8.0 )
*   **Database:** (MySQL )
*   **Dependency Manager:** (Composer)

## Cara Setup (Instalasi)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/Axel-44/ProgramPKLRevisi.git
    cd ProgramPKLRevisi
    ```

2.  **Install Dependencies**
    Jalankan perintah berikut untuk mengunduh library yang dibutuhkan:
    ```bash
    cd backend
    composer install
    ```

3.  **Konfigurasi Environment**
    Salin file konfigurasi dan sesuaikan dengan database lokal Anda:
    ```bash
    cp .env.example .env
    ```
    Buka file `.env` lalu atur konfigurasi database (DB_DATABASE, DB_USERNAME, DB_PASSWORD).
    ```bash
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=bkad
    DB_USERNAME=root
    DB_PASSWORD=
    ```
4. **Konfigurasi Database**
    Buat Database baru jika belum ada dengan nama:
    ```bash
    bkad
    ```
    kemudian import bkad.sql

## Cara Menjalankan Program

Untuk menjalankan aplikasi di server lokal (localhost), gunakan perintah:

```bash
php artisan serve
```

Login Backend/Admin:
- Email: admin@gmail.com / Password: 12345678
- Email: operator@gmail.com / Password: operator1
- Email: superadmin@gmail.com / Passwrod: 12345678

Running Backend:
- "cd backend" -> "php artisan serve"

Running Frontend:
- "cd frontend" -> "npm run dev"

Bila terjadi error seperti dokumen yang tidak tampil atau gambar dan video tidak tampil, lakukan Langkah ini:
- Buka Folder Program
- Buka Folder Backend
- Buka Folder Public 
- Hapus Folder Storage yang berada di Folder Public
- Masuk Ke Terminal Program
- Ketik "cd backend" lalu enter
- Setelah itu Ketik "php artisan storage:link"
- Setelah itu seharusnya folder storage yang sudah terhubung berhasil dibuat dan program sudah berjalan normal.

Bila Frontend Tidak Bisa Dijalankan, lakukan hal ini:
- Buka Terminal Program
- Ketik "cd frontend" lalu enter
- Setelah itu Ketik "npm install --legacy-peer-deps"
- Setelah Proses Instalisasi Selesai, Ketik "npm run dev" di Terminal
- Setelah itu seharusnya Frontend sudah dapat dijalankan dan program sudah berjalan normal.
