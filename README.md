# 🚀 Personal Portfolio - Ficram Manifur Farissa

Website portfolio pribadi yang menampilkan profil, keahlian, proyek, dan pendekatan kerja Ficram Manifur Farissa — mahasiswa Teknik Elektro yang fokus pada AI, IoT, Flutter, dan Flask backend.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-2.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Fitur Terbaru (v2.0)

### 🤖 **3D Interactive Robot Head**
- Robot head 3D yang dibuat dengan Three.js
- Mengikuti pergerakan mouse cursor secara real-time
- Animasi floating yang halus dan natural
- Desain futuristik dengan material metalik dan lighting effects

### 🛠️ **My Approach Section**
- Section baru yang menjelaskan filosofi dan metodologi kerja
- Pendekatan eksperimen cepat dan pembelajaran berkelanjutan
- Fokus pada implementasi praktis dari teori

### 🎯 **Updated Focus Section**
- Konten yang lebih spesifik dan personal
- Fokus pada pengembangan prototipe robot dan IoT
- Detail teknologi yang sedang dipelajari (MQTT, Cloud deployment, dll)

### 💬 **Interactive Testimonial System**
- Menggantikan contact form dengan sistem testimonial
- Form validasi lengkap (nama, email, posisi, pesan)
- Penyimpanan lokal dengan localStorage
- Tampilan kartu testimonial dengan avatar inisial
- Notifikasi sukses setelah submit

### 📄 **Download Resume Feature**
- Tombol download resume dengan styling konsisten
- Alert message untuk status development

## 🎨 Fitur Utama

### 🌓 **Dark/Light Mode**
- Toggle theme dengan animasi smooth
- Persistent theme selection (localStorage)
- Automatic icon switching

### 🚀 **Rocket Scroll-to-Top**
- Tombol rocket dengan animasi launch
- Particle effects saat diklik
- Hover effects dengan trail animation
- Responsive design untuk mobile

### 📱 **Responsive Design**
- Optimal di semua perangkat (desktop, tablet, mobile)
- Hamburger menu untuk mobile navigation
- Adaptive grid layouts

### ✨ **Smooth Animations**
- AOS (Animate On Scroll) integration
- Hover effects pada cards dan buttons
- Smooth scrolling navigation
- Loading animations

## 📋 Sections

1. **🏠 Hero Section**
   - Interactive 3D robot head
   - Personal introduction
   - Call-to-action buttons
   - Floating tech icons

2. **👨‍💻 About Me**
   - Personal background
   - Statistics (projects, experience, technologies)
   - Educational focus

3. **🛠️ My Approach**
   - Work philosophy
   - Methodology explanation
   - Learning approach

4. **🎯 Focus Saat Ini**
   - Current learning areas
   - Specific technologies being explored
   - Project types being developed

5. **🔧 Skills**
   - Programming languages
   - Frameworks & libraries
   - Tools & technologies

6. **🚀 Life Motto**
   - Personal philosophy
   - Motivational quote
   - Gradient background design

7. **📁 Projects Portfolio**
   - Featured projects showcase
   - Technology tags
   - Live demo links

8. **💬 Testimonials**
   - Interactive testimonial form
   - Real-time testimonial display
   - Local storage persistence

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Variables
- **Vanilla JavaScript**: ES6+ classes and modules
- **Three.js**: 3D graphics for robot head
- **AOS.js**: Scroll animations
- **Font Awesome**: Icon library
- **Google Fonts**: Poppins typography

### Libraries & CDN
\`\`\`html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Font Awesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- AOS Animation -->
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
\`\`\`

## 🚀 Quick Start

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/ficrammanifur/ficram-portfolio.git
cd ficram-portfolio
\`\`\`

### 2. File Structure
\`\`\`
ficram-portfolio/
├── index.html          # Main HTML file
├── style.css           # Styling dan theming
├── main.js            # JavaScript functionality
├── README.md          # Documentation
└── assets/            # Images and media (optional)
\`\`\`

### 3. Local Development
\`\`\`bash
# Using Live Server (VS Code extension)
# Or any local server
python -m http.server 8000
# Then open http://localhost:8000
\`\`\`

### 4. Deploy to GitHub Pages
1. Push code to GitHub repository
2. Go to **Settings** > **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **root**
5. Save and wait for deployment

## 🎨 Customization

### Colors & Theming
Edit CSS variables in `style.css`:
\`\`\`css
:root {
  --primary-color: #667eea;      /* Main brand color */
  --secondary-color: #764ba2;    /* Secondary brand color */
  --accent-color: #f093fb;       /* Accent color */
  /* ... */
}
\`\`\`

### Content Updates
1. **Personal Information**: Update name, description, and contact details
2. **Projects**: Add/modify projects in the projects section
3. **Skills**: Update technology skills and tools
4. **Social Links**: Update footer social media links

### 3D Robot Customization
Modify robot appearance in `main.js`:
\`\`\`javascript
// In RobotHead3D class, createRobotHead method
const headMaterial = new THREE.MeshPhongMaterial({ 
  color: 0x667eea,  // Change robot color
  shininess: 100
})
\`\`\`

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Performance Features

- **Lazy Loading**: Images load when needed
- **Font Preloading**: Critical fonts preloaded
- **Optimized Animations**: Hardware-accelerated CSS animations
- **Responsive Images**: Adaptive image sizing
- **Minimal Dependencies**: Lightweight external libraries

## 📊 SEO Optimization

- ✅ Semantic HTML structure
- ✅ Meta tags for social sharing
- ✅ Alt text for images
- ✅ Fast loading performance
- ✅ Mobile-friendly design
- ✅ Structured data ready

## 🔄 Version History

### v2.0 (Current)
- ✨ Added 3D interactive robot head
- ✨ New "My Approach" section
- ✨ Updated "Focus Saat Ini" content
- ✨ Testimonial system replacing contact form
- ✨ Download resume button
- 🐛 Fixed CSS class naming bugs

### v1.0
- 🎉 Initial release
- 🌓 Dark/light mode toggle
- 🚀 Rocket scroll-to-top button
- 📱 Responsive design
- ✨ AOS animations

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Email**: ficramm@gmail.com
- **LinkedIn**: [linkedin.com/in/ficram-manifur](https://linkedin.com/in/ficram-manifur)
- **GitHub**: [github.com/ficrammanifur](https://github.com/ficrammanifur)
- **Instagram**: [@ficrammanifur](https://instagram.com/ficrammanifur)
- **WhatsApp**: [+62 823-1136-3925](https://wa.me/6282311363925)

## 🙏 Acknowledgments

- **Three.js** for 3D graphics capabilities
- **AOS.js** for smooth scroll animations
- **Font Awesome** for beautiful icons
- **Google Fonts** for typography
- **GitHub Pages** for free hosting

---

**Made with ❤️ by Ficram Manifur Farissa**

*"I always tell myself — it's not hard, it's just new."*

---

### 🚀 Live Demo
Visit the live website: [https://ficrammanifur.github.io/ficram-portfolio/](https://ficrammanifur.github.io/ficram-portfolio/)

### ⭐ Star this repo if you found it helpful!
\`\`\`bash
# Clone and customize for your own portfolio
git clone https://github.com/ficrammanifur/ficram-portfolio.git
