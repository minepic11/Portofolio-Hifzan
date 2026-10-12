# Arah desain

Sumber: brief pemilik portofolio, Warm Editorial Minimalism × Digital Craft.

Reading this as: portofolio personal untuk perekrut dan calon kolaborator, dalam bahasa visual editorial hangat, dial ENERGY 2 / RHYTHM 3 / MOTION 2.

AntiSlop: during, pilihan eksplisit sesi ini.

## Alasan keputusan

- Canvas `#F7F6F2` mengurangi kerasnya putih murni dan mengikuti identitas hangat dalam brief.
- Surface `#EEEDE7` membedakan pengalaman kerja dan bidang preview dari konten utama tanpa menambah warna baru.
- Charcoal `#20211F` menjaga keterbacaan dan memberi kontak penekanan sebagai tindakan akhir.
- Orange `#E66B3D` menjadi aksen pada penutup; varian `#D55E32` untuk headline terang dan `#B44B27` untuk tanda kecil memenuhi kontras teks.
- Teks pendukung memakai `#666760`, sedikit lebih gelap dari warna awal, untuk memenuhi kontras pada kedua surface terang.
- Space Grotesk membawa karakter geometris pada headline; Inter menjaga keterbacaan paragraf dan informasi kecil.
- Headline tiga baris membuat identitas segera terbaca dan memberi ruang untuk potret pribadi yang diberikan pemilik.
- Foto asli memakai crop persegi dengan object-fit cover dan object-position center 60% untuk memusatkan wajah tanpa mendistorsi proporsi.
- Bingkai lingkaran dengan inset tipis mengikat potret ke komposisi editorial; foto kecil disusun di bawah headline pada ponsel dan di kolom kanan mulai tablet.
- Penomoran bagian memudahkan pemindaian isi tanpa menambah ikon kategori.
- About memakai dua kolom untuk memisahkan pengenalan dari informasi pendukung.
- Experience memakai tiga kolom karena satu pengalaman membutuhkan tanggal, peran, dan rincian tanggung jawab.
- Projects memberi sekitar 60% lebar pada konsep antarmuka untuk menunjukkan konteks proyek yang telah diberikan.
- Preview berlabel konseptual, data contoh, dan catatan eksplisit mencegah antarmuka ilustratif dianggap screenshot asli.
- Pencarian dan filter lokal memberi preview fungsi nyata; tidak ada tombol yang sekadar tampak aktif.
- Matriks kemampuan menggunakan daftar agar tidak menyiratkan persentase keahlian atau memenuhi halaman dengan kartu.
- Pendidikan menggunakan blok pendek sesuai jumlah informasi nyata yang tersedia.
- Spacing section mengikuti 64–120px dengan penutup lebih padat agar pergantian isi memberi ritme dan tidak menciptakan ruang kosong berlebih.
- Tombol persegi dengan radius 2px membedakan tindakan dari teks tanpa membuat seluruh halaman berbentuk pill.
- Ikon Lucide hanya menunjukkan navigasi arah, menu, pencarian, dan arus barang, sesuai makna kontrol.
- Panah bawah menyatakan perpindahan halaman; panah diagonal menyatakan kontak atau tujuan eksternal.
- Reveal singkat mengantar mata ke headline dan bagian berikutnya; tidak ada animasi yang berjalan terus-menerus.
- Native dialog memberi trap fokus, Escape, dan backdrop untuk menu seluler tanpa dependensi tambahan.
- Tidak ada toggle tema karena brief memilih canvas hangat serta kontak gelap sebagai komposisi tetap.
- Footer singkat memuat identitas, copyright aktual, dan satu tindakan kembali ke awal.
- Creative Explorations menggunakan surface hangat dan komposisi heading bersebelahan dengan pengantar agar terasa sebagai jeda visual sebelum matriks kemampuan.
- Empty state dua separator mengomunikasikan belum tersedianya aset tanpa membuat bingkai besar berisi artwork palsu.
- Ketika karya tersedia, preview besar bergantian kiri dan kanan mengikuti proporsi media asli agar galeri terasa terkurasi.
- Caption minimal hanya menampilkan metadata yang tersedia; tahun dan software yang tidak diketahui dihilangkan.
- Hover hanya mengubah opacity gambar sedikit; media tidak diputar otomatis atau digerakkan dengan parallax.
- Video dimuat mendekati viewport dan diputar atas tindakan pengguna untuk membatasi bandwidth serta menghormati reduced motion.
- Empat preview model dibuat dari GLB asli agar karya tetap menjadi fokus tanpa meminta browser memuat WebGL pada kunjungan awal.
- Caption memakai nama file asli sampai judul dan metadata karya diberikan, sehingga tidak menambah klaim atau identitas rekaan.
- Viewer terbuka atas tindakan pengguna dan hanya satu yang aktif agar scroll galeri tetap ringan di ponsel.
- Frame off-white dan lighting sederhana mempertahankan warna material asli; tidak menambahkan glow, HDR background, atau efek berat.
- Margin framing meliputi keseluruhan bounding box agar model tetap utuh di dalam canvas saat pertama dibuka.
- Kontrol teks dan shortcut keyboard memberikan alternatif drag/pinch tanpa menambahkan kumpulan ikon dekoratif.
- Render demand, DPR terbatas, dan pelepasan viewer offscreen mengurangi kerja GPU ketika pengguna tidak berinteraksi.

Judul dokumen dan Open Graph mempertahankan tanda pemisah pada judul yang disediakan pemilik dalam brief; penulisan UI lainnya memakai kalimat dan tanda baca biasa.
