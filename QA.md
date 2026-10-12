# Verifikasi dan Delivery Gate AntiSlop

Pemeriksaan dilakukan dengan Google Chrome headless melalui Playwright pada implementasi lokal. Tidak memasang dependensi pengujian tambahan ke proyek. Bukti awal portofolio dipertahankan; hasil penambahan 3D Playground dicatat terpisah di bagian berikut.

## Viewer GLB interaktif

Bukti terbaru: [docs/model-checks.json](docs/model-checks.json). Renderer memakai Chrome headless dengan SwiftShader; gesture sentuh disimulasikan melalui protokol Chrome.

- PASS: bucket.glb, cargo.glb, hat.glb, dan whistle.glb dimuat dari file asli; nama file menjadi label tanpa metadata rekaan.
- PASS: kamera menargetkan pusat geometri dan delapan sudut bounding box berada di dalam frustum pada framing awal.
- PASS: keempat model mendukung drag mouse, wheel zoom, Putar kiri/kanan, Perbesar/Perkecil, Reset tampilan, dan Tutup viewer.
- PASS: keyboard panah, +/−, R, dan Escape diuji; penutupan memulihkan fokus ke tombol Lihat model 3D.
- Tombol Unduh GLB telah dihapus dari seluruh model sesuai permintaan terbaru; kontrol viewer tetap tersedia.
- PASS: sebelum aktivasi tidak ada permintaan GLB atau modul Three/Fiber/Drei/ModelViewer.
- PASS: hanya satu canvas aktif; viewer dilepas di luar buffer viewport 200px; buka/tutup cepat mempertahankan kontrol yang berfungsi.
- PASS: counter render berhenti bertambah selama 400ms setelah startup dan layout stabil.
- PASS: keenam lebar 320, 375, 430, 768, 1024, dan 1440px serta teks 200% pada 320px tidak mengalami overflow.
- PASS: satu jari memutar dan pinch dua jari mengatur zoom; pada simulasi ponsel DPR 3, canvas memakai DPR 1.
- PASS: reduced motion tetap mendukung interaksi manual tanpa auto rotation, damping, atau transisi framing.
- PASS: kegagalan request GLB 503 menampilkan fallback; Coba lagi berhasil memulihkan viewer.
- PASS: WEBGL_lose_context menampilkan fallback tanpa menghilangkan bagian lain.
- PASS: kegagalan modul lazy menyediakan Muat ulang halaman; viewer berhasil diaktifkan setelah reload, termasuk pada 1280 × 720px.
- PASS: browser tanpa WebGL menampilkan fallback dan Tutup viewer tetap berfungsi.
- PASS: fallback error dan Coba lagi tetap dapat digunakan pada 320px dengan teks 200%; overflow pesan ditangani di dalam frame.
- PASS: alur normal tanpa error console/JavaScript; kasus negatif sengaja memicu log error tetapi ditangani oleh UI.
- PASS: preview JPEG terkompresi dibuat dari render empat GLB asli.

Bagian lain pada portofolio tidak diubah. Metadata generator GLB tidak dianggap sebagai bukti software pembuatan karya. Catatan placeholder di bawah merekam pemeriksaan sebelumnya, ketika GLB belum diberikan.

## Perapihan foto hero

Bukti: [docs/portrait-checks.json](docs/portrait-checks.json).

- PASS R-03: foto terlihat pada 320, 375, 430, 768, 1024, dan 1440px; foto dan bingkai tetap persegi, tidak saling meluber, serta tidak menyebabkan overflow halaman.
- PASS R-23/R-38: menggunakan foto asli yang ditambahkan pemilik di `public/Hifzan.jpg`; tidak membuat atau memodifikasi foto orang.
- PASS R-25/R-32: caption memakai teks pendukung yang terukur; alt foto berisi nama pemilik dan tidak lagi disembunyikan dari pembaca layar.
- PASS R-26/R-35: Lihat Proyek menuju `#projects`, Hubungi Saya menuju `#contact`, dan panah hero menuju `#about`; tidak ada error console; build dan lint lolos.
- PASS R-06/R-07/R-11/R-22: crop proporsional, inset bingkai tipis, dan caption nama mempertahankan arah editorial; alasan tertulis di DESIGN.md.
- PASS C-4: pada 320px dengan teks 200% tetap tidak ada overflow; screenshot hero desktop dan ponsel ditinjau.

## Verifikasi awal Playground sebelum GLB diberikan

Bukti: [docs/playground-checks.json](docs/playground-checks.json).

- PASS: Creative Explorations berada setelah Projects dan sebelum Skills. Label bagian menjadi 04, 05, 06, dan 07 untuk Playground, Skills, Education, dan Contact.
- PASS: navbar desktop menuju `#playground` dan menampilkan indikator aktif.
- PASS: tautan Playground di menu seluler dapat diaktifkan dengan Enter, menutup dialog, dan memindahkan fokus ke section; Escape tetap berfungsi.
- PASS: empty state jelas, tanpa gambar/video/canvas atau karya rekaan dalam data produksi.
- PASS: keenam lebar 320, 375, 430, 768, 1024, dan 1440px tanpa overflow; teks 200% pada 320px tetap tanpa overflow.
- PASS: teks baru memenuhi kontras, dengan rasio 4.87:1 untuk teks pendukung dan 13.78:1 untuk teks utama pada surface hangat.
- PASS: screenshot section pada 375px dan 1440px ditinjau secara visual.
- PASS: fixture gambar yang sengaja gagal menyediakan pesan error dan Coba lagi; retry berhasil memuat gambar dengan `loading="lazy"` dan `decoding="async"`.
- PASS: media tanpa sumber menyediakan fallback teks yang jujur.
- PASS: video offscreen belum memiliki `src`, memakai `preload="none"`, dan tidak memiliki autoplay.
- PASS: video dapat diputar melalui tindakan eksplisit ketika reduced motion aktif; video berhenti saat keluar viewport dan saat menerima event visibility dengan tab disimulasikan tersembunyi.
- PASS: galeri terisi diuji memakai dua fixture khusus QA, dengan proporsi 4:3 dan 3:4 dipertahankan, susunan kiri/kanan bergantian mulai tablet, dan satu kolom pada mobile.
- PASS: year/software yang belum diketahui tidak menghasilkan metadata rekaan.
- PASS: tidak ada exception JavaScript dalam uji fixture atau error console pada halaman produksi. Error resource 404 hanya disengaja pada fixture pengujian retry.
- PASS: tidak menambah dependensi atau viewer model karena GLB/GLTF belum diberikan.

Fixture hanya dibuat dalam halaman browser sementara dan dihapus setelah pengujian awal. Saat pemeriksaan awal ini dilakukan, array `artworks` masih kosong. Empat GLB kini terdaftar dan bukti viewer aktual berada pada bagian terbaru di atas.

## Bukti eksekusi

- `npm run build`: PASS, Vite 8.3.4 menghasilkan `dist/` tanpa error.
- `npm run lint`: PASS, ESLint selesai dengan exit code 0.
- Bundle produksi viewer: entry 327.86 kB (gzip 104.99 kB), CSS 31.91 kB (gzip 7.15 kB), chunk ModelViewer 1,006.15 kB (gzip 269.54 kB). Ini ukuran aset, bukan skor Lighthouse. Vite memberi warning chunk 3D di atas 500 kB; build tetap berhasil dan chunk tersebut dimuat hanya saat aktivasi.
- Console: tidak ada error JavaScript atau console pada pengujian halaman.
- Font: Inter dan Space Grotesk tersedia dalam browser yang diuji.
- Layar: 320, 375, 430, 768, 1024, dan 1440px, semuanya tanpa overflow horizontal.
- Target interaktif: setiap kontrol yang terlihat pada keenam ukuran memiliki area sekurangnya 44 × 44px.
- Teks 200% pada 320px: lebar halaman tetap 320px dan tidak ada konten yang meluber.
- Reduced motion: `scroll-behavior: auto`, headline terlihat, dan tidak ada animasi aktif.
- Screenshot seluruh halaman ditinjau secara visual pada 375px dan 1440px setelah semua bagian ditampilkan.

Catatan pengujian kontrol terdapat di [docs/navigation-checks.json](docs/navigation-checks.json). Hasil akhir ukuran layar, keyboard, warna teks, kontak, font, dan reduced motion terdapat di [docs/browser-checks.json](docs/browser-checks.json).

## Pengujian interaksi

| Elemen | Hasil aktual |
| --- | --- |
| Home, About, Experience, Projects, Skills, Contact desktop | Klik mengubah anchor ke section yang sesuai; indikator `aria-current` mengikuti tujuan |
| Wordmark Hifzan | Mengarah ke `#home` |
| Lihat Proyek | Mengarah ke `#projects` |
| Hubungi Saya | Mengarah ke `#contact` |
| Panah scroll hero | Mengarah ke `#about` |
| Mari bicara di navbar | Mengarah ke `#contact` |
| Kembali ke atas | Mengarah ke `#home` |
| Menu | Membuka dialog, memfokuskan Tutup, dan mengunci scroll body |
| Shift+Tab pada dialog | Fokus tetap berada di dalam dialog |
| Escape | Menutup dialog, memulihkan fokus ke tombol Menu, dan membuka scroll body |
| Tutup | Menutup dialog |
| Backdrop | Klik di luar panel menutup dialog |
| Enam tautan seluler | Menu menutup, anchor berubah, dan fokus berpindah ke section tujuan |
| Resize ke desktop | Menu seluler menutup |
| Skip link | Tab dan Enter memfokuskan konten utama |
| Barang masuk | Menampilkan dua baris data contoh |
| Barang keluar | Menampilkan dua baris data contoh |
| Semua barang | Menampilkan empat baris data contoh |
| Filter dengan Space/Enter | Mengubah daftar sebagaimana saat diklik |
| Pencarian `kabel` | Menampilkan satu baris Kabel USB |
| Pencarian tanpa kecocokan | Menampilkan pesan kosong dan tombol reset |
| Reset pencarian dan filter | Mengembalikan empat baris data contoh |
| Say Hello | Klik memberikan tujuan `mailto:hifzanirfan4@gmail.com` |
| Chat via WhatsApp | Klik membuka tab baru dengan tujuan `https://wa.me/6289646975356` |

Tindakan email dicegat sebelum handoff ke sistem operasi. Tujuan WhatsApp ditangani oleh respons lokal dalam pemeriksa browser agar pengujian tidak bergantung pada situs eksternal. Pengujian memverifikasi aktivasi, target, dan pembukaan tab; tidak menguji aplikasi email atau isi percakapan WhatsApp.

## Kontras

Warna teks yang dirender dibandingkan dengan background aktual memakai rumus luminansi WCAG. Semua pasangan memenuhi 4.5:1 untuk teks biasa atau 3:1 untuk teks besar.

| Pasangan | Rasio |
| --- | --- |
| Charcoal / canvas | 14.95:1 |
| Teks pendukung / canvas | 5.29:1 |
| Teks pendukung / surface | 4.87:1 |
| Orange headline terang / canvas | 3.55:1, hanya teks besar |
| Orange tanda kecil / canvas | 4.88:1 |
| Orange asli / charcoal | 5.03:1 |
| Teks pendukung inverse / charcoal | 7.79:1 |

Batas input `#85877D` pada canvas memiliki rasio 3.37:1. Focus ring charcoal pada canvas dan orange pada charcoal masing-masing lebih dari 3:1. Separator yang tidak interaktif bukan batas kontrol.

## Delivery Gate

Mode: during, pilihan sesi. Direction berasal dari brief pemilik. ENERGY 2 / RHYTHM 3 / MOTION 2. Alasan setiap keputusan besar terdapat di [DESIGN.md](DESIGN.md).

### Hard Gate

- R-02 PASS: copy UI menggunakan tanda baca biasa; judul HTML dan OG mempertahankan judul yang disediakan pemilik sebagai pengecualian dari instruksi pengguna.
- R-03 PASS: enam ukuran layar lolos pemeriksaan overflow dan target sentuh; teks 200% pada 320px juga lolos.
- R-17 PASS: tidak ada statistik portofolio; jumlah dan stok dalam preview eksplisit merupakan data contoh.
- R-18 PASS: tidak ada testimonial atau avatar rekaan.
- R-23 PASS: favicon, struktur navigasi, dan konsep preview mengikuti izin eksplisit brief; foto pribadi asli diberikan pemilik.
- R-24 PASS: seluruh nav menunjuk ID section yang tersedia dan diuji.
- R-25 PASS: pasangan teks yang dirender lolos perhitungan kontras, termasuk varian orange di canvas terang.
- R-26 PASS: seluruh kontrol memiliki perilaku nyata; rotasi, zoom, reset, tutup, retry, dan reload diuji.
- R-27 PASS: pencarian memiliki empty state dan reset; media serta viewer memiliki loading, error, fallback, dan retry yang diuji; galeri mempertahankan empty state jika daftar dikosongkan.
- R-28 PASS: tidak ada FAQ template.
- R-32 PASS: Tab, Shift+Tab, Enter, Space, Escape, focus trap, dan skip link diuji; kontrol memiliki `:focus-visible`.
- R-33 PASS: fitur ditulis langsung di JSX/CSS; tidak ada skrip yang mengubah source untuk menambahkan fitur.
- R-34 PASS: komposisi terang dengan kontak gelap mengikuti brief; tidak ada toggle atau tema alternatif yang belum selesai.
- R-35 PASS: build, lint, console, screenshot, interaksi, media, dan GLB diuji; bukti tercatat di atas dan docs/model-checks.json.
- R-36 PASS: tidak ada klaim keamanan, compliance, jumlah klien, atau peningkatan kinerja rekaan.
- R-37 PASS: direction dan dials ditetapkan sebelum implementasi, berasal dari brief Warm Editorial Minimalism × Digital Craft.
- R-38 PASS: pengalaman, proyek, dan pendidikan berasal dari brief; konsep inventori berlabel; galeri menggunakan empat GLB asli tanpa metadata rekaan.

### Purpose-Gate

- R-01 PASS: warna mengikuti brief dengan varian terukur untuk kontras; tidak memakai gradient.
- R-04 PASS: ikon terbatas pada arah navigasi, menu, pencarian, dan arus barang; relevansi tercatat di DESIGN.md.
- R-06 PASS: Space Grotesk untuk karakter geometris headline dan Inter untuk paragraf; tidak ada heading monospace.
- R-07 PASS: tidak ada background grid atau pola titik; satu garis lingkaran membingkai foto pribadi sesuai konsep editorial.
- R-08 PASS: panah dipakai pada navigasi arah dan tujuan kontak; tidak ditempelkan pada setiap kontrol.
- R-09 PASS: label kecil berisi informasi nyata, tanpa capsule, glow, atau status availability rekaan.
- R-10 PASS: tidak menggunakan glassmorphism atau backdrop blur.
- R-12 PASS: tidak memakai shadow pada komponen.
- R-13 PASS: tidak ada glow atau status light dekoratif.
- R-14 PASS: proyek menggunakan satu showcase, kemampuan berupa daftar; tidak ada grid kartu berulang.
- R-19 PASS: reveal serta kontrol memiliki tujuan; model memakai render demand tanpa auto rotation/damping; reduced motion diuji.
- R-22 PASS: potret asli berhubungan dengan pemilik; konsep inventori berhubungan dengan proyek nyata dan dilabeli konseptual.

### Liveliness

- Dials PASS: ENERGY 2 / RHYTHM 3 / MOTION 2 dinyatakan sebelum generation dan dicatat di DESIGN.md.
- Konsistensi dials PASS: headline dominan, section dengan variasi komposisi, serta gerak singkat tanpa loop.
- Focal point PASS: hero headline, heading profil, peran pengalaman, preview proyek, kelompok kemampuan, institusi pendidikan, dan ajakan kontak memiliki hierarki jelas dalam screenshot.
- Whitespace PASS: jarak mengikuti susunan dan kedalaman konten; mobile menggunakan register lebih rapat.
- Accent PASS: orange mengikat kata useful dan ajakan kontak; isi dan daftar memakai warna netral; warna foto berasal dari aset pemilik.
- Motif identitas PASS: inisial H/M/I, wordmark bertitik, penomoran editorial, dan suara tipografi konsisten.
- Design Read PASS: deklarasi arah dibuat sebelum implementasi dan tersimpan di DESIGN.md.

### Craftsmanship dan Quality Locks

- C-1 PASS: setiap keputusan besar memiliki alasan tertulis di DESIGN.md.
- C-2 PASS: seluruh kontrol terlihat memiliki perilaku yang diuji; tidak ada tombol demo kosong.
- C-3 PASS: setiap section berisi informasi yang diminta pemilik, tanpa pengisi testimonial, statistik, atau FAQ.
- C-4 PASS: breakpoint, keyboard, teks 200%, reduced motion, retry model, kehilangan konteks, browser tanpa WebGL, dan kegagalan modul lazy diuji.
- C-5 PASS: tidak ada klaim tambahan di luar brief; data contoh tidak disajikan sebagai data proyek asli.
- R-05 PASS: hero asimetris, profil dua kolom, pengalaman terstruktur, showcase besar, Creative Explorations, matriks kemampuan, pendidikan ringkas, dan kontak gelap memakai komposisi berbeda; galeri terisi memiliki posisi preview bergantian.
- R-11 PASS: radius 2–3px hanya pada kontrol dan antarmuka; bingkai potret lingkaran memiliki fungsi identitas tersendiri.
- R-15 PASS: CTA menyatakan tujuan proyek, kontak, email, WhatsApp, dan kembali ke awal sesuai brief.
- R-16 PASS: tidak menambahkan slogan atau klaim marketing generik.
- R-20 PASS: potret asli, komposisi headline useful digital, dan ritme editorial mengikat identitas personal.
- R-21 PASS: tema tetap mengikuti arahan eksplisit canvas hangat dan penutup charcoal.
- R-29 PASS: warna inti netral hangat dan satu keluarga aksen orange; tidak ada logo teknologi warna-warni.
- R-30 PASS: tidak menyalin layout atau identitas produk tertentu.
- R-31 PASS: warna, layout, font, spacing, bentuk kontrol, ikon, preview, dan motion memiliki alasan satu baris di DESIGN.md.

## Batas verifikasi

Pengujian memakai Chrome headless, SwiftShader, dan emulasi sentuh; bukan perangkat fisik atau browser lain. Tidak menjalankan Lighthouse atau pembaca layar. Aplikasi kontak eksternal, domain produksi, dan screenshot aplikasi inventori asli belum tersedia untuk pengujian end-to-end.
