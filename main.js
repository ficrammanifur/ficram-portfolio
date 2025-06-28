// Global variables
let testimonials = []
let scene, camera, renderer, robotHead
let mouseX = 0,
  mouseY = 0
const THREE = window.THREE // Declare the THREE variable

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.setTheme(this.theme)
    this.bindEvents()
  }

  setTheme(theme) {
    this.theme = theme
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)

    const themeToggle = document.getElementById("theme-toggle")
    const icon = themeToggle.querySelector("i")

    if (theme === "dark") {
      icon.className = "fas fa-sun"
    } else {
      icon.className = "fas fa-moon"
    }
  }

  toggleTheme() {
    const newTheme = this.theme === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  bindEvents() {
    const themeToggle = document.getElementById("theme-toggle")
    themeToggle.addEventListener("click", () => this.toggleTheme())
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.hamburger = document.getElementById("hamburger")
    this.navMenu = document.getElementById("nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.init()
  }

  init() {
    this.bindEvents()
    this.handleScroll()
  }

  bindEvents() {
    this.hamburger.addEventListener("click", () => this.toggleMobileMenu())

    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu())
    })

    window.addEventListener("scroll", () => this.handleScroll())

    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.smoothScroll(e))
    })
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle("active")
    this.navMenu.classList.toggle("active")
    document.body.style.overflow = this.navMenu.classList.contains("active") ? "hidden" : ""
  }

  closeMobileMenu() {
    this.hamburger.classList.remove("active")
    this.navMenu.classList.remove("active")
    document.body.style.overflow = ""
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.style.background = "rgba(255, 255, 255, 0.98)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        this.navbar.style.background = "rgba(26, 32, 44, 0.98)"
      }
    } else {
      this.navbar.style.background = "rgba(255, 255, 255, 0.95)"
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        this.navbar.style.background = "rgba(26, 32, 44, 0.95)"
      }
    }
  }

  smoothScroll(e) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href")
    if (targetId.startsWith("#")) {
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
  }
}

// 3D Robot Head
class RobotHead3D {
  constructor() {
    this.init()
  }

  init() {
    const container = document.getElementById("robot-container")

    // Scene setup
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(200, 200)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Create robot head
    this.createRobotHead()

    // Camera position
    camera.position.z = 5

    // Mouse tracking
    document.addEventListener("mousemove", this.onMouseMove.bind(this))

    // Animation loop
    this.animate()
  }

  createRobotHead() {
    const group = new THREE.Group()

    // Head (main cube)
    const headGeometry = new THREE.BoxGeometry(2, 2, 2)
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      shininess: 100,
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    group.add(head)

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x004444 })

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.4, 0.3, 1.1)
    group.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.4, 0.3, 1.1)
    group.add(rightEye)

    // Mouth
    const mouthGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1)
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
    mouth.position.set(0, -0.3, 1.1)
    group.add(mouth)

    // Antennas
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5)
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x764ba2 })

    const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    leftAntenna.position.set(-0.5, 1.25, 0)
    group.add(leftAntenna)

    const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    rightAntenna.position.set(0.5, 1.25, 0)
    group.add(rightAntenna)

    // Antenna tips
    const tipGeometry = new THREE.SphereGeometry(0.08, 8, 8)
    const tipMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b6b, emissive: 0x441111 })

    const leftTip = new THREE.Mesh(tipGeometry, tipMaterial)
    leftTip.position.set(-0.5, 1.5, 0)
    group.add(leftTip)

    const rightTip = new THREE.Mesh(tipGeometry, tipMaterial)
    rightTip.position.set(0.5, 1.5, 0)
    group.add(rightTip)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    robotHead = group
    scene.add(robotHead)
  }

  onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    if (robotHead) {
      // Smooth rotation following mouse
      robotHead.rotation.y += (mouseX * 0.3 - robotHead.rotation.y) * 0.05
      robotHead.rotation.x += (mouseY * 0.2 - robotHead.rotation.x) * 0.05

      // Gentle floating animation
      robotHead.position.y = Math.sin(Date.now() * 0.001) * 0.1
    }

    renderer.render(scene, camera)
  }
}

// Testimonial Manager
class TestimonialManager {
  constructor() {
    this.form = document.getElementById("testimonial-form")
    this.testimonialsList = document.getElementById("testimonials-list")
    this.init()
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this))
    this.loadTestimonials()
  }

  handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const testimonial = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      position: formData.get("position"),
      message: formData.get("testimonialMessage"),
      timestamp: new Date().toISOString(),
    }

    // Validation
    if (!testimonial.fullName || !testimonial.email || !testimonial.position || !testimonial.message) {
      alert("Please fill in all fields before submitting.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(testimonial.email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Add to testimonials array
    testimonials.unshift(testimonial)

    // Save to localStorage
    localStorage.setItem("testimonials", JSON.stringify(testimonials))

    // Display testimonials
    this.displayTestimonials()

    // Reset form
    this.form.reset()

    // Show success message
    this.showNotification("Thank you for your testimonial!", "success")
  }

  loadTestimonials() {
    const saved = localStorage.getItem("testimonials")
    if (saved) {
      testimonials = JSON.parse(saved)
    }
    this.displayTestimonials()
  }

  displayTestimonials() {
    this.testimonialsList.innerHTML = ""

    if (testimonials.length === 0) {
      this.testimonialsList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 40px;">
          <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
          <p>No testimonials yet. Be the first to share your experience!</p>
        </div>
      `
      return
    }

    testimonials.forEach((testimonial) => {
      const card = document.createElement("div")
      card.className = "testimonial-card"

      const initials = testimonial.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()

      card.innerHTML = `
        <div class="testimonial-header">
          <div class="testimonial-avatar">${initials}</div>
          <div class="testimonial-info">
            <h4>${testimonial.fullName}</h4>
            <p>${testimonial.position}</p>
          </div>
        </div>
        <div class="testimonial-message">"${testimonial.message}"</div>
      `

      this.testimonialsList.appendChild(card)
    })
  }

  showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
      <span>${message}</span>
    `

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#48bb78" : "#f56565"};
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideIn 0.3s ease;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }
}

// Scroll Effects
class ScrollEffects {
  constructor() {
    this.init()
  }

  init() {
    this.initAOS()
    this.addScrollToTopButton()
    this.handleActiveNavigation()
  }

  initAOS() {
    const AOS = window.AOS
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        offset: 100,
      })
    }
  }

  addScrollToTopButton() {
    const scrollToTopBtn = document.createElement("button")
    scrollToTopBtn.innerHTML = '<i class="fas fa-rocket"></i>'
    scrollToTopBtn.className = "scroll-to-top rocket-btn"
    scrollToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
      z-index: 1000;
      transform: rotate(-45deg);
    `

    const rocketTrail = document.createElement("div")
    rocketTrail.className = "rocket-trail"
    rocketTrail.style.cssText = `
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 3px;
      height: 20px;
      background: linear-gradient(to bottom, #ff6b6b, transparent);
      border-radius: 2px;
      opacity: 0;
      transition: all 0.3s ease;
    `
    scrollToTopBtn.appendChild(rocketTrail)

    document.body.appendChild(scrollToTopBtn)

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = "1"
        scrollToTopBtn.style.visibility = "visible"
        rocketTrail.style.opacity = "0.8"
      } else {
        scrollToTopBtn.style.opacity = "0"
        scrollToTopBtn.style.visibility = "hidden"
        rocketTrail.style.opacity = "0"
      }
    })

    scrollToTopBtn.addEventListener("click", () => {
      this.launchRocket(scrollToTopBtn)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    scrollToTopBtn.addEventListener("mouseenter", () => {
      scrollToTopBtn.style.transform = "rotate(-45deg) translateY(-5px) scale(1.1)"
      scrollToTopBtn.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)"
      rocketTrail.style.height = "30px"
      rocketTrail.style.opacity = "1"
    })

    scrollToTopBtn.addEventListener("mouseleave", () => {
      scrollToTopBtn.style.transform = "rotate(-45deg) translateY(0) scale(1)"
      scrollToTopBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"
      rocketTrail.style.height = "20px"
      rocketTrail.style.opacity = "0.8"
    })
  }

  launchRocket(rocketBtn) {
    const launchEffect = document.createElement("div")
    launchEffect.className = "rocket-launch-effect"
    launchEffect.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      pointer-events: none;
      z-index: 1001;
    `

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div")
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${i % 2 === 0 ? "#ff6b6b" : "#ffa500"};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: rocketParticle 1s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `
      launchEffect.appendChild(particle)
    }

    document.body.appendChild(launchEffect)

    rocketBtn.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    rocketBtn.style.transform = "rotate(-45deg) translateY(-100vh) scale(0.5)"
    rocketBtn.style.opacity = "0"

    setTimeout(() => {
      rocketBtn.style.transition = "all 0.3s ease"
      rocketBtn.style.transform = "rotate(-45deg) translateY(0) scale(1)"
      rocketBtn.style.opacity = window.scrollY > 300 ? "1" : "0"
      document.body.removeChild(launchEffect)
    }, 1000)
  }

  handleActiveNavigation() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".nav-link")

    window.addEventListener("scroll", () => {
      let current = ""
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }
}

// Performance Optimizer
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    this.lazyLoadImages()
    this.preloadCriticalResources()
  }

  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  preloadCriticalResources() {
    const fontLink = document.createElement("link")
    fontLink.rel = "preload"
    fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
    fontLink.as = "style"
    document.head.appendChild(fontLink)
  }
}

// Main Application
class PortfolioApp {
  constructor() {
    this.init()
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeComponents())
    } else {
      this.initializeComponents()
    }
  }

  initializeComponents() {
    this.themeManager = new ThemeManager()
    this.navigationManager = new NavigationManager()
    this.robotHead3D = new RobotHead3D()
    this.testimonialManager = new TestimonialManager()
    this.scrollEffects = new ScrollEffects()
    this.performanceOptimizer = new PerformanceOptimizer()

    // Download resume button
    document.getElementById("download-resume").addEventListener("click", () => {
      alert("Not available yet. My resume is still in progress. Please check back later.")
    })

    document.body.classList.add("loading")

    console.log("Portfolio website initialized successfully!")
  }
}

// Initialize the application
new PortfolioApp()
