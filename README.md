<div align="center">
# 🎨 FMN.SYS | Personal Portfolio
**FICRAM MANIFUR FARISSA**  
*Field Engineer & IoT Developer*

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge)](https://ficrammanifur.github.io)
[![Last Commit](https://img.shields.io/badge/last_update-April_2026-brightgreen?style=for-the-badge)](https://github.com/ficrammanifur)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML_|_Tailwind_|_Three.js-00599C?style=for-the-badge)](https://github.com/ficrammanifur)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

**Electrical Field Engineer** specialized in **IoT**, **Industrial Power Systems**, and **Computer Vision**.  
Integrating high-voltage reliability with cloud-scale intelligence.

**Live Website**  
https://ficrammanifur.github.io/Portfolio-Ficrammanifur/

</div>


**📍 Tangerang, Banten, Indonesia** | **🗓️ Updated April 2026**
</div>

---

## 📑 Daftar Isi
- [✨ Features](#-features)
- [🛠️ Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [📁 Struktur Project](#-struktur-project)
- [🚀 Quick Start](#-quick-start)
- [📖 Cara Deploy](#-cara-deploy)
- [🎨 Desain & Animasi](#-desain--animasi)
- [📬 Kontak](#-kontak)
- [📄 License](#-license)

---

## ✨ Features

- **🌌 3D Particle Background** dengan Three.js
- **⌨️ Typing Effect** dengan GSAP
- **🔍 Reveal Animation** saat scroll
- **🪟 Glassmorphism UI** dengan efek hover glow
- **📱 Fully Responsive** (Mobile & Desktop)
- **🎨 CRT Overlay** + Scanline effect (retro cyberpunk vibe)
- **📂 Dynamic Project Grid** dari `projects.json` (mudah ditambah)
- **⚡ Smooth Navigation** antar halaman
- **🔗 Social Links** terintegrasi
- **📊 Meta Verification** (Google & Bing)

---

## 🛠️ Teknologi yang Digunakan

| Layer          | Teknologi                          | Keterangan                     |
|----------------|------------------------------------|--------------------------------|
| **Frontend**   | HTML5, Tailwind CSS                | Styling utama                  |
| **Animation**  | GSAP + TextPlugin                  | Typing & reveal animation      |
| **3D Background** | Three.js                        | Particle system + wireframe    |
| **Interactivity** | Vanilla JavaScript              | No framework                   |
| **Data**       | JSON                               | Projects mudah di-maintain     |
| **Deployment** | GitHub Pages / Vercel / Netlify    | Static hosting                 |

---

## 📁 Struktur Project

```bash
portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── assets/
│   ├── css/
│   │   └── style.css              # Semua custom styling + glass effect
│   └── js/
│       ├── main.js                # Reveal, typing, project loader
│       └── particles.js           # Three.js background
├── data/
│   └── projects.json              # Tambah project di sini
├── README.md
├── DEPLOYMENT.md
└── LICENSE
```

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/ficrammanifur/portfolio.git
cd portfolio
```

### 2. Jalankan Lokal
Cukup buka file `index.html` di browser, atau gunakan Live Server (VS Code):

```bash
# Jika pakai Python
python -m http.server 8000

# Jika pakai Node.js (http-server)
npx http-server
```

Buka di browser: `http://localhost:8000`

### 3. Tambah Project Baru
Edit file `data/projects.json`, tambahkan object baru sesuai format:

```json
{
  "title": "Nama Project",
  "desc": "Deskripsi singkat project",
  "tags": ["ESP32", "Python", "IoT"],
  "link": "https://github.com/ficrammanifur/..."
}
```

---

## 📖 Cara Deploy

Lihat file **[DEPLOYMENT.md](DEPLOYMENT.md)** untuk panduan lengkap deploy ke:

- GitHub Pages (gratis & recommended)
- Vercel
- Netlify
- Cloudflare Pages

---

## 🎨 Desain & Animasi

- Tema cyberpunk + glassmorphism
- Efek CRT overlay & scanline
- Particle system interaktif (gerak mengikuti mouse)
- Smooth scroll & reveal animation
- Responsive di semua device

---

## 📬 Kontak

- **Email**: ficramm@gmail.com
- **GitHub**: [@ficrammanifur](https://github.com/ficrammanifur)
- **LinkedIn**: [Ficram Manifur Farissa](https://www.linkedin.com/in/ficram-manifur-farissa-418280376)
- **Instagram**: [@ficrammanifur](https://instagram.com/ficrammanifur)

---

## 📄 License

Project ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](LICENSE) untuk detail.

---

<div align="center">
Made with ❤️ by Ficram Manifur Farissa  
**Engineering the Future from the Field to the Cloud**
</div>
```

---

### 2. `DEPLOYMENT.md`

```markdown
<div align="center">
# 🚀 Deployment Guide - FMN.SYS Portfolio
</div>

---

## 📋 Daftar Isi
- [GitHub Pages (Rekomendasi)](#github-pages)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [Cloudflare Pages](#cloudflare-pages)
- [Custom Domain](#custom-domain)

---

## GitHub Pages (Paling Mudah & Gratis)

### Langkah-langkah:

1. **Push kode ke GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Aktifkan GitHub Pages**
   - Buka repository kamu di GitHub
   - Pergi ke **Settings** → **Pages**
   - Di bagian **Source**, pilih:
     - **Branch**: `main`
     - **Folder**: `/ (root)`
   - Klik **Save**

3. **Tunggu 1-2 menit**, website akan live di:
   ```
   https://ficrammanifur.github.io
   ```

> **Catatan**: Setiap push ke branch `main` akan otomatis update website.

---

## Vercel (Super Cepat & Modern)

1. Daftar / Login di [vercel.com](https://vercel.com)
2. Klik **New Project**
3. Import repository portfolio kamu
4. Di **Framework Preset** pilih **Other**
5. Klik **Deploy**

Vercel akan otomatis detect static site dan deploy dalam hitungan detik.

**Keunggulan Vercel**:
- Preview URL untuk setiap branch
- Custom domain mudah
- HTTPS otomatis

---

## Netlify

1. Login ke [netlify.com](https://netlify.com)
2. Klik **New site from Git**
3. Pilih repository
4. Set **Build command** kosongkan (` `)
5. Set **Publish directory** kosongkan (` `)
6. Deploy

---

## Custom Domain (Opsional)

1. Beli domain (contoh: ficram.my.id)
2. Di GitHub Pages / Vercel / Netlify, tambahkan custom domain
3. Tambahkan record DNS (CNAME atau A record) sesuai petunjuk platform

---

## Tips Tambahan

- Pastikan semua path file menggunakan **relative path** (sudah dilakukan)
- `favicon.ico` taruh di root folder jika ada
- Untuk update project, cukup edit `data/projects.json` lalu push

---

**Selamat!** Portfolio kamu sudah siap dilihat dunia.

---

<div align="center">
Made with passion by **Ficram Manifur**
</div>
