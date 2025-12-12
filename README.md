# ProgramPKLRevisi

## Deskripsi
Program ini adalah aplikasi untuk pengelolaan data Praktik Kerja Lapangan (PKL).

## Prasyarat (Prerequisites)

Pastikan Anda telah menginstal software berikut di komputer Anda sebelum memulai:

*   **Bahasa Pemrograman/Runtime:** (Misal: PHP >= 8.0 / Node.js / Java JDK)
*   **Database:** (Misal: MySQL / PostgreSQL)
*   **Dependency Manager:** (Misal: Composer / NPM / Maven)

## Cara Setup (Instalasi)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/Axel-44/ProgramPKLRevisi.git
    cd ProgramPKLRevisi
    ```

2.  **Install Dependencies**
    Jalankan perintah berikut untuk mengunduh library yang dibutuhkan:
    ```bash
    # cd backend
    # composer install  (untuk PHP)
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
4. **Konfigurasi Database"
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