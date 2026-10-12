# Hifzan Maulia Irfan

Portofolio personal berbahasa Indonesia dengan arah visual editorial hangat. Memuat profil, pengalaman PKL, proyek inventori, 3D Playground, kemampuan, pendidikan, dan kontak.

## Menjalankan proyek

Gunakan Node.js 22.12 atau lebih baru, sesuai kebutuhan Vite 8.

```bash
npm ci
npm run dev
```

Buka alamat lokal yang ditampilkan Vite. Untuk membuat dan memeriksa versi produksi:

```bash
npm run lint
npm run build
npm run preview
```

Hasil build berada di `dist/` dan dapat diunggah ke hosting statis. Tidak membutuhkan backend atau konfigurasi rahasia.

## Struktur

```text
src/
  components/
    layout/       Navbar.jsx, Footer.jsx
    sections/     Hero.jsx, About.jsx, Experience.jsx, Projects.jsx,
                  InventoryPreview.jsx, CreativeExplorations.jsx, ArtworkMedia.jsx, ModelArtwork.jsx,
                  Skills.jsx, Education.jsx, Contact.jsx
    ui/           Reveal.jsx, SectionHeading.jsx, ModelViewer.jsx, ViewerBoundary.jsx
  data/           portfolio.js
  hooks/          useActiveSection.js
  App.jsx
  main.jsx
  index.css
public/
  favicon.svg
  models/         bucket.glb, cargo.glb, hat.glb, whistle.glb
    previews/     Preview JPEG dari render GLB asli
index.html
DESIGN.md
QA.md
```

## Mengubah konten

Edit `src/data/portfolio.js` untuk informasi pribadi, navigasi, profil, pengalaman, proyek, kemampuan, dan pendidikan. Teks headline serta label bagian berada di komponen terkait. Metadata tetap berada di `index.html` agar tersedia sebelum JavaScript dimuat.

`liveUrl` dan `repositoryUrl` proyek hanya ditampilkan jika berisi URL HTTP atau HTTPS yang valid. Biarkan `technologies` kosong jika teknologinya belum diketahui. Untuk screenshot asli, isi `image` dan ubah `imageType` menjadi `screenshot`.

Preview inventori memakai data contoh lokal dengan pencarian dan filter. Label konseptual serta catatan di bawahnya membedakan preview ini dari aplikasi asli. Data contoh disimpan hanya di `InventoryPreview.jsx`; bukan data pengalaman atau hasil proyek.

## Implementasi

### Mengisi 3D Playground

Section Creative Explorations berada di antara Projects dan Skills. Empat GLB yang diberikan pemilik terdaftar di array `artworks` dalam `src/data/portfolio.js`: bucket.glb, cargo.glb, hat.glb, dan whistle.glb. Caption memakai nama file karena judul, tahun, kategori, dan software per karya belum diketahui.

Untuk setiap karya asli, tambahkan objek dengan struktur berikut:

| Field | Isi |
| --- | --- |
| `id` | ID unik dan stabil |
| `title` | Judul karya asli, atau `null` |
| `fileName` | Nama file GLB asli, digunakan sebagai label bila judul belum diketahui |
| `category` | Kategori asli, atau `null` jika belum diketahui |
| `year` | Tahun karya asli, atau `null` |
| `software` | Array software yang benar-benar digunakan, atau `[]` |
| `mediaType` | `image`, `video`, atau `model` |
| `modelSrc` | Path GLB asli untuk viewer interaktif |
| `previewSrc` | Path gambar atau animasi asli, misalnya di `public/artworks/` |
| `previewSrcSet` | Varian gambar beserta width descriptor jika tersedia |
| `posterSrc` | Poster video asli jika tersedia |
| `alt` | Deskripsi visual gambar |
| `width`, `height` | Dimensi media untuk menjaga proporsi dan mencegah layout shift |
| `captionsSrc` | Path WebVTT bila video berisi ucapan atau audio yang perlu ditranskripsikan |

Gunakan preview WebP/AVIF terkompresi untuk gambar dan MP4/WebM pendek untuk animasi. Media tidak dipotong agar seluruh karya terlihat. Galeri terisi akan memakai preview besar dengan posisi kiri dan kanan bergantian; pada ponsel setiap karya mendapat satu kolom penuh.

Gambar memakai lazy loading dan decoding async. Video tidak memiliki sumber sebelum mendekati viewport, memakai `preload="none"`, dan hanya diputar melalui kontrol pengguna. Video berhenti saat keluar layar atau tab disembunyikan. Error media menyediakan tombol Coba lagi; file atau tipe media yang belum tersedia menyediakan fallback teks.

### Viewer interaktif

Tombol Lihat model 3D memuat komponen viewer dan GLB yang dipilih. Galeri menampilkan preview JPEG terkompresi yang dibuat dari render model asli sebelum viewer diaktifkan. Tidak ada screenshot atau artwork konseptual yang digunakan untuk mewakili GLB.

Hanya satu viewer aktif. Viewer dilepas ketika melewati buffer 200px di luar viewport, ditutup, atau pengguna memilih model lain. Drag mouse atau satu jari memutar model; scroll mouse atau pinch dua jari mengatur zoom. Tombol rotasi, zoom, reset, dan tutup menyediakan alternatif keyboard. Saat stage memiliki fokus, panah memutar, +/− mengatur zoom, R mereset, dan Escape menutup. Fokus kembali ke tombol aktivasi setelah penutupan manual.

Komponen `ModelViewer.jsx` menggunakan React Three Fiber dan Drei. Center memusatkan geometri, sedangkan Bounds melakukan framing dan memperbarui clipping/camera setelah resize. Framing tidak dianimasikan. Lihat [dokumentasi Bounds](https://drei.docs.pmnd.rs/staging/bounds).

Canvas memakai `frameloop="demand"`, tanpa auto rotation, damping, shadow, HDR, atau postprocessing. DPR dibatasi menjadi 1 pada mobile/coarse pointer dan maksimum 1.5 pada desktop. Strategi ini mengikuti [panduan on-demand rendering React Three Fiber](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

Loading ditangani oleh Suspense. Error file atau WebGL ditangani oleh error boundary lokal dengan retry; kegagalan modul viewer menyediakan muat ulang halaman. Thumbnail dan tautan Unduh GLB tetap tersedia ketika viewer ditutup. Kehilangan konteks WebGL juga mengembalikan tampilan ke fallback lokal.

GLB saat ini tidak membutuhkan decoder Draco/Meshopt dan tidak memuat resource eksternal; decoder CDN dinonaktifkan. Model atau animasi tidak diputar otomatis, termasuk ketika reduced motion aktif.

Untuk menambah GLB, taruh file di `public/models/`, tambahkan nama file ke daftar `artworks`, dan sediakan render preview JPEG yang sesuai di `public/models/previews/`. Isi metadata hanya ketika informasi asli tersedia. Path model menggunakan base URL Vite untuk deployment di subdirectory.

### Stack dan perilaku halaman

React, Vite, dan Tailwind CSS 4 menggunakan konfigurasi Vite yang sudah ada. Dependensi UI adalah `lucide-react` dan `motion`; viewer memakai `three`, `@react-three/fiber`, dan `@react-three/drei` yang sudah dipasang pemilik. Tidak menambah dependensi dalam implementasi viewer. Tailwind menyediakan token tema, reset, dan utilitas; CSS komponen di `index.css` mengatur komposisi editorial serta breakpoint. Tidak memakai router atau pustaka komponen tambahan.

Menu seluler memakai dialog native untuk fokus modal dan Escape. IntersectionObserver mengatur indikator navigasi aktif. Motion menggunakan `LazyMotion` dengan fitur animasi DOM; pengguna reduced motion mendapatkan konten tanpa animasi dan scroll langsung. Konten section tidak menunggu IntersectionObserver untuk terlihat.

Font Inter dan Space Grotesk dimuat dari Google Fonts dengan preconnect, tiga bobot, dan `display=swap`. Font fallback tetap dapat digunakan jika layanan eksternal tidak tersedia.

## Batas yang diketahui

- Foto pribadi dari pemilik tersedia di `public/Hifzan.jpg` dan ditampilkan dalam bingkai lingkaran responsif pada hero. Screenshot aplikasi asli belum tersedia; preview proyek tetap konseptual.
- Metadata karya 3D belum diberikan; nama file menjadi label dan metadata yang tidak diketahui dihilangkan.
- Domain produksi belum diberikan. Canonical URL dan URL gambar Open Graph absolut belum ditambahkan.
- Metadata statis tersedia di HTML; isi halaman menggunakan rendering React di klien. Proyek tidak memakai SSR.
- Email dan WhatsApp menggunakan tautan langsung. Pembukaan aplikasi email atau percakapan WhatsApp bergantung pada perangkat pengunjung.
- Situs disiapkan untuk deployment statis; belum dipublikasikan ke hosting.

Alasan desain tercatat di `DESIGN.md`. Bukti verifikasi dan Delivery Gate AntiSlop tercatat di `QA.md`.
