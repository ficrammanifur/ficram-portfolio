# Personal Portfolio - Ficram Manifur Farissa

Website portofolio pribadi untuk menampilkan profil, keahlian, proyek, dan tujuan Ficram Manifur Farissa — mahasiswa Teknik Elektro yang fokus pada AI, IoT, Flutter, dan Flask backend.

## 🚀 Features

- **Modern Design**: Tampilan yang bersih dan profesional
- **Dark Mode**: Toggle antara light dan dark theme
- **Responsive**: Optimal di semua perangkat (desktop, tablet, mobile)
- **Smooth Animations**: Animasi scroll yang halus menggunakan AOS.js
- **IP Logger**: Sistem tracking pengunjung (opsional)
- **Contact Form**: Form kontak yang fungsional
- **SEO Optimized**: Meta tags dan struktur yang SEO-friendly

## 📱 Sections

- **Hero Section**: Perkenalan dan CTA utama
- **About Me (👨‍💻)**: Profil dan statistik personal
- **Current Focus (🎯)**: Area fokus saat ini (AI, IoT, Flutter, Backend)
- **Skills (🛠️)**: Keahlian teknis dan tools
- **Life Motto (🚀)**: Filosofi dan motivasi hidup
- **Projects Portfolio**: Showcase proyek-proyek utama
- **Contact**: Informasi kontak dan form

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Struktur semantic
- **CSS3**: Styling dengan CSS Variables untuk theming
- **Vanilla JavaScript**: Interaktivitas tanpa framework
- **AOS.js**: Scroll animations
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Poppins)

### Libraries & CDN
\`\`\`html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- AOS Animation -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
\`\`\`

## 🚀 Deployment ke GitHub Pages

### 1. Setup Repository
\`\`\`bash
# Clone atau download project
git clone <your-repo-url>
cd ficram-portfolio

# Initialize git (jika belum)
git init
git add .
git commit -m "Initial commit: Personal portfolio website"
git branch -M main
git remote add origin https://github.com/username/ficram-portfolio.git
git push -u origin main
\`\`\`

### 2. Enable GitHub Pages
1. Buka repository di GitHub
2. Go to **Settings** > **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **root**
5. Save

### 3. Custom Domain (Opsional)
Jika ingin menggunakan custom domain:
1. Buat file `CNAME` di root directory
2. Isi dengan domain Anda: `ficram-portfolio.com`
3. Commit dan push

## 🔧 Konfigurasi

### IP Logger Backend
Untuk mengaktifkan IP logger, update URL backend di `main.js`:
\`\`\`javascript
class IPLogger {
    constructor() {
        this.apiUrl = 'https://your-flask-backend-url.com'; // Ganti dengan URL backend Flask Anda
        this.init();
    }
\`\`\`

### Contact Form
Form kontak saat ini menggunakan simulasi. Untuk integrasi dengan backend:
\`\`\`javascript
// Di ContactFormHandler class, update handleSubmit method
async handleSubmit(e) {
    // Kirim ke backend Flask atau service email seperti EmailJS
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}
\`\`\`

## 📁 File Structure
\`\`\`
ficram-portfolio/
├── index.html          # Main HTML file
├── style.css           # Styling dan theming
├── main.js            # JavaScript functionality
├── README.md          # Documentation
└── CNAME             # Custom domain (opsional)
\`\`\`

## 🎨 Customization

### Colors & Theming
Edit CSS variables di `style.css`:
\`\`\`css
:root {
  --primary-color: #667eea;      /* Warna utama */
  --secondary-color: #764ba2;    /* Warna sekunder */
  --accent-color: #f093fb;       /* Warna aksen */
  /* ... */
}
\`\`\`

### Content
Update konten di `index.html`:
- Ganti nama dan informasi personal
- Update deskripsi proyek
- Tambah/hapus section sesuai kebutuhan
- Update link sosial media dan kontak

### Projects
Tambah proyek baru di section projects:
\`\`\`html
<div class="project-card" data-aos="fade-up">
    <div class="project-image">
        <i class="fas fa-your-icon"></i>
    </div>
    <div class="project-content">
        <h3>Nama Proyek</h3>
        <p>Deskripsi proyek...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    </div>
</div>
\`\`\`

## 🔍 SEO Optimization

Website sudah dioptimasi untuk SEO dengan:
- Meta tags yang relevan
- Semantic HTML structure
- Alt text untuk images
- Structured data (bisa ditambahkan)
- Fast loading performance

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚀 Performance

- Lazy loading untuk images
- CSS dan JS minification (untuk production)
- Font preloading
- Optimized animations
- Responsive images

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- Email: ficramm@email.com
- GitHub Issues: [Create Issue](https://github.com/username/ficram-portfolio/issues)

## 📄 License

MIT License - bebas digunakan dan dimodifikasi.

---

**Happy Coding! 🚀**

Dibuat oleh Ficram Manifur Farissa
