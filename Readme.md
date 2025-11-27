# NOTES

Inisialisasi Repositori Git

1. Navigasi ke Direktori Proyek
   cd /path/ke/folder/proyek-express-anda

2. Inisialisasi Git
   git init

3. Buat File .gitignore dan cek isinya

# Dependencies

/node_modules

# Environment Variables

.env

4. Commit Awal

# Staging

git add .

# Commit

git commit -m "Initial commit: Setup Express project structure"

5. Hubungkan ke GitHub (Remote Repository)
   git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git

get remote set-url origin ttps://github.com/USERNAME_ANDA/NAMA_REPO_ANDA.git

## contoh git remote add origin https://github.com/leindraw/api-film.git

6. Ganti Nama Branch
   git branch -M main

7. Push Kode ke GitHub
   git push -u origin main

# Penting: Jika ini pertama kalinya Anda menggunakan Git/GitHub di komputer ini, Anda akan diminta untuk masuk. Anda harus menggunakan Personal Access Token (PAT) Anda, bukan password akun GitHub biasa.

### Personal Access Token (PAT)

1. Masuk ke GitHub dan klik foto profil Anda di pojok kanan atas, lalu pilih Settings.
2. Di bilah sisi kiri, gulir ke bawah dan klik Developer settings.
3. Klik Personal access tokens, lalu pilih Tokens (classic).
4. Klik tombol Generate new token (classic).
5. Beri nama yang deskriptif untuk token ini (misalnya, Token-api-film).
6. Pilih masa berlaku. Untuk keamanan, pilih jangka waktu yang pendek (misalnya, 30 hari), atau pilih No expiration jika Anda benar-benar membutuhkan akses jangka panjang (namun ini tidak disarankan).
7. Setelah selesai, klik tombol Generate token di bagian bawah
8. Simpan Token!

# GitHub hanya akan menampilkan token ini sekali saja. Salin token tersebut (berupa string panjang huruf dan angka) dan simpan di tempat yang aman (seperti password manager atau catatan terenkripsi). Jika Anda lupa atau hilang, Anda harus membuatnya lagi.

# Alternatif

git push -f origin main

# jika anda mengalami error "Updates were rejected because the tip of your current branch is behind", opsi ini dapat digunakan.
