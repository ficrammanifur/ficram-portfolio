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
