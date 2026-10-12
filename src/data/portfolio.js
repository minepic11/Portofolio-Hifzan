export const personal = {
  name: 'Hifzan Maulia Irfan',
  shortName: 'Hifzan',
  role: 'Web Development & Digital Operations',
  location: 'Bandung, West Java, Indonesia',
  email: 'hifzanirfan4@gmail.com',
  whatsapp: '+62 896-4697-5356',
  whatsappUrl: 'https://wa.me/6289646975356',
  introduction: 'Saya Hifzan, lulusan Rekayasa Perangkat Lunak yang tertarik pada pengembangan website, pengelolaan konten digital, dan solusi teknologi yang praktis.',
  contactDescription: 'Terbuka untuk kesempatan kerja, kolaborasi, dan diskusi seputar website maupun kebutuhan digital.',
}

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'playground', label: '3D Playground' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    'Saya merupakan lulusan SMK jurusan Rekayasa Perangkat Lunak yang memiliki pengalaman dalam pengelolaan website, administrasi digital, dan pembuatan konten kreatif.',
    'Melalui pengalaman praktik kerja lapangan dan proyek pelatihan, saya terbiasa bekerja secara teliti, mempelajari teknologi baru, serta mengembangkan solusi digital yang mudah digunakan.',
  ],
  details: [
    { label: 'Background', value: 'Software Engineering' },
    { label: 'Focus', value: 'Website & Digital Operations' },
    { label: 'Location', value: 'Bandung, Indonesia' },
  ],
}

export const experiences = [{
  id: 'fsi-digital-media',
  position: 'Content & Digital Operations Support',
  type: 'Praktik Kerja Lapangan',
  company: 'PT FSI Digital Media',
  startDate: '2025-07',
  endDate: '2025-10',
  period: 'Juli 2025 – Oktober 2025',
  responsibilities: [
    'Mengelola dan memperbarui konten website perusahaan menggunakan WordPress dan Blogger.',
    'Mendukung operasional gudang, termasuk pengemasan dan persiapan pengiriman.',
    'Menyusun laporan stok inventori secara berkala.',
    'Mengedit video promosi berdurasi pendek.',
    'Membuat poster promosi digital menggunakan Canva.',
  ],
}]

export const projects = [{
  id: 'inventory-management',
  title: 'Inventory Management Website',
  category: 'Web Application / Training Project',
  organization: 'LKP Pelatihan',
  year: '2026',
  date: 'April 2026',
  description: 'Website inventori sederhana yang dikembangkan untuk membantu pencatatan, pencarian, dan pengelolaan data barang masuk dan keluar secara terstruktur.',
  features: [
    'Pencatatan barang masuk',
    'Pencatatan barang keluar',
    'Pengelolaan data inventori terstruktur',
    'Antarmuka pencarian inventori',
    'Pengujian fungsi dasar',
  ],
  image: null,
  imageType: 'conceptual',
  technologies: [],
  liveUrl: null,
  repositoryUrl: null,
}]

export const creativeExplorations = {
  subtitle: '3D Playground',
  description: 'Eksplorasi visual melalui low-poly 3D modeling dan animasi sederhana menggunakan Prisma3D.',
  emptyTitle: 'Karya belum ditampilkan.',
  emptyDescription: 'Pratinjau karya 3D belum tersedia di portofolio ini.',
}

export const artworks = ['bucket.glb', 'cargo.glb', 'hat.glb', 'whistle.glb'].map((fileName) => ({
  id: `model-${fileName}`,
  fileName,
  title: null,
  category: null,
  year: null,
  software: [],
  mediaType: 'model',
  modelSrc: `${import.meta.env.BASE_URL}models/${fileName}`,
  previewSrc: `${import.meta.env.BASE_URL}models/previews/${fileName.replace('.glb', '.jpg')}`,
  width: 960,
  height: 720,
}))

export const capabilities = [
  { title: 'Website & Digital', skills: ['WordPress', 'Blogger', 'Website Content Management', 'Information Gathering'] },
  { title: 'Creative Tools', skills: ['Canva', 'Digital Content Design', 'Low Poly 3D Modeling', 'Basic Animation with Prisma3D'] },
  { title: 'Digital Operations', skills: ['Microsoft Excel', 'Basic Administration', 'Inventory Reporting'] },
  { title: 'Professional Skills', skills: ['Attention to Detail', 'Communication', 'Teamwork', 'Adaptability', 'Fast Learning'] },
]

export const education = {
  institution: 'SMK Angkasa Husen Sastra Negara',
  major: 'Rekayasa Perangkat Lunak',
  period: 'Juni 2023 – Juni 2026',
  startDate: '2023-06',
  endDate: '2026-06',
}
