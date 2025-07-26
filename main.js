// Global variables
const testimonials = []
let scene, camera, renderer, robotHead
let mouseX = 0,
  mouseY = 0
const THREE = window.THREE

// Backend API Configuration - Update dengan URL Railway yang benar
const API_BASE_URL = "https://railwayyweb-production-ac1c.up.railway.app"

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

// Enhanced 3D Robot Head with Ball Shape and Eye Tracking
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

    // Head (sphere instead of cube)
    const headGeometry = new THREE.SphereGeometry(1.2, 32, 32)
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0x667eea,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    group.add(head)

    // Eye sockets (darker areas)
    const eyeSocketGeometry = new THREE.SphereGeometry(0.25, 16, 16)
    const eyeSocketMaterial = new THREE.MeshPhongMaterial({
      color: 0x2d3748,
      transparent: true,
      opacity: 0.8,
    })

    const leftEyeSocket = new THREE.Mesh(eyeSocketGeometry, eyeSocketMaterial)
    leftEyeSocket.position.set(-0.4, 0.2, 1.0)
    group.add(leftEyeSocket)

    const rightEyeSocket = new THREE.Mesh(eyeSocketGeometry, eyeSocketMaterial)
    rightEyeSocket.position.set(0.4, 0.2, 1.0)
    group.add(rightEyeSocket)

    // Eyes (white spheres)
    const eyeGeometry = new THREE.SphereGeometry(0.2, 16, 16)
    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 50,
    })

    this.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    this.leftEye.position.set(-0.4, 0.2, 1.1)
    group.add(this.leftEye)

    this.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    this.rightEye.position.set(0.4, 0.2, 1.1)
    group.add(this.rightEye)

    // Pupils (small black spheres that will follow cursor)
    const pupilGeometry = new THREE.SphereGeometry(0.08, 8, 8)
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 })

    this.leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
    this.leftPupil.position.set(-0.4, 0.2, 1.2)
    group.add(this.leftPupil)

    this.rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial)
    this.rightPupil.position.set(0.4, 0.2, 1.2)
    group.add(this.rightPupil)

    // Mouth (curved line)
    const mouthGeometry = new THREE.TorusGeometry(0.3, 0.03, 8, 16, Math.PI)
    const mouthMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
    mouth.position.set(0, -0.3, 1.1)
    mouth.rotation.z = Math.PI
    group.add(mouth)

    // Antennas
    const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5)
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x764ba2 })

    const leftAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    leftAntenna.position.set(-0.5, 1.5, 0)
    group.add(leftAntenna)

    const rightAntenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    rightAntenna.position.set(0.5, 1.5, 0)
    group.add(rightAntenna)

    // Antenna tips (glowing spheres)
    const tipGeometry = new THREE.SphereGeometry(0.08, 8, 8)
    const tipMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b6b,
      emissive: 0x441111,
      transparent: true,
      opacity: 0.9,
    })

    this.leftTip = new THREE.Mesh(tipGeometry, tipMaterial)
    this.leftTip.position.set(-0.5, 1.75, 0)
    group.add(this.leftTip)

    this.rightTip = new THREE.Mesh(tipGeometry, tipMaterial)
    this.rightTip.position.set(0.5, 1.75, 0)
    group.add(this.rightTip)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Point light for glow effect
    const pointLight = new THREE.PointLight(0x667eea, 0.5, 10)
    pointLight.position.set(0, 0, 2)
    scene.add(pointLight)

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
      // Gentle head rotation following mouse
      robotHead.rotation.y += (mouseX * 0.2 - robotHead.rotation.y) * 0.05
      robotHead.rotation.x += (-mouseY * 0.1 - robotHead.rotation.x) * 0.05

      // Eye tracking - pupils follow cursor
      if (this.leftPupil && this.rightPupil) {
        // Calculate pupil movement within eye bounds
        const pupilRange = 0.1

        this.leftPupil.position.x = -0.4 + mouseX * pupilRange
        this.leftPupil.position.y = 0.2 + mouseY * pupilRange // Hapus tanda minus

        this.rightPupil.position.x = 0.4 + mouseX * pupilRange
        this.rightPupil.position.y = 0.2 + mouseY * pupilRange // Hapus tanda minus
      }

      // Gentle floating animation
      robotHead.position.y = Math.sin(Date.now() * 0.001) * 0.1

      // Antenna tip glow animation
      if (this.leftTip && this.rightTip) {
        const glowIntensity = (Math.sin(Date.now() * 0.003) + 1) * 0.5
        this.leftTip.material.opacity = 0.7 + glowIntensity * 0.3
        this.rightTip.material.opacity = 0.7 + glowIntensity * 0.3
      }
    }

    renderer.render(scene, camera)
  }
}

// Enhanced Testimonial Manager with Backend Integration
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

  async handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(this.form)
    const testimonial = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      position: formData.get("position"),
      message: formData.get("testimonialMessage"),
    }

    // Validation
    if (!testimonial.fullName || !testimonial.email || !testimonial.position || !testimonial.message) {
      this.showNotification("Please fill in all fields before submitting.", "error")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(testimonial.email)) {
      this.showNotification("Please enter a valid email address.", "error")
      return
    }

    try {
      // Show loading state
      const submitBtn = this.form.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      // Send to backend
      const response = await fetch(`${API_BASE_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonial),
      })

      const result = await response.json()

      if (result.success) {
        // Reset form
        this.form.reset()

        // Reload testimonials
        await this.loadTestimonials()

        // Show success message
        this.showNotification("Thank you for your message!", "success")
      } else {
        throw new Error(result.error || "Failed to submit message")
      }

      // Reset button
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    } catch (error) {
      console.error("Error submitting testimonial:", error)

      // Fallback to localStorage if backend fails
      this.handleLocalSubmit(testimonial)

      // Reset button
      const submitBtn = this.form.querySelector('button[type="submit"]')
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit'
      submitBtn.disabled = false

      this.showNotification("Message saved locally. Backend connection failed.", "warning")
    }
  }

  handleLocalSubmit(testimonial) {
    // Fallback to local storage
    const localTestimonials = JSON.parse(localStorage.getItem("testimonials") || "[]")

    const newTestimonial = {
      ...testimonial,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      created_at: new Date().toLocaleString(),
    }

    localTestimonials.unshift(newTestimonial)

    // Keep only latest 10
    if (localTestimonials.length > 10) {
      localTestimonials.splice(10)
    }

    localStorage.setItem("testimonials", JSON.stringify(localTestimonials))
    this.form.reset()
    this.displayTestimonials(localTestimonials)
  }

  async loadTestimonials() {
    try {
      console.log("Loading testimonials from:", `${API_BASE_URL}/api/messages`)
      const response = await fetch(`${API_BASE_URL}/api/messages`)
      const result = await response.json()

      if (result.success) {
        this.displayTestimonials(result.messages)
        console.log("Testimonials loaded successfully:", result.messages.length)
      } else {
        throw new Error("Failed to load messages")
      }
    } catch (error) {
      console.error("Error loading testimonials:", error)

      // Fallback to localStorage
      const localTestimonials = JSON.parse(localStorage.getItem("testimonials") || "[]")
      this.displayTestimonials(localTestimonials)
    }
  }

  displayTestimonials(testimonialsList) {
    this.testimonialsList.innerHTML = ""

    if (testimonialsList.length === 0) {
      this.testimonialsList.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 40px;">
          <i class="fas fa-comments" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
          <p>No messages yet. Be the first to share your experience!</p>
        </div>
      `
      return
    }

    testimonialsList.forEach((testimonial) => {
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
      <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-exclamation-triangle"}"></i>
      <span>${message}</span>
    `
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#48bb78" : type === "error" ? "#f56565" : "#ed8936"};
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
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
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
      background: none;
      border: none;
      cursor: pointer;
      font-size: 24px;
      transition: all 0.3s ease;
      opacity: 0;
      visibility: hidden;
      z-index: 1000;
      filter: grayscale(100%);
      transform: rotate(-45deg);
    `

    const rocketTrail = document.createElement("div")
    rocketTrail.className = "rocket-trail"
    rocketTrail.style.cssText = `
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 0px;
      background: linear-gradient(to bottom, #ff0000, transparent);
      border-radius: 3px;
      opacity: 0;
      transition: all 0.3s ease;
    `

    scrollToTopBtn.appendChild(rocketTrail)
    document.body.appendChild(scrollToTopBtn)

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = "1"
        scrollToTopBtn.style.visibility = "visible"
      } else {
        scrollToTopBtn.style.opacity = "0"
        scrollToTopBtn.style.visibility = "hidden"
        rocketTrail.style.height = "0px"
        rocketTrail.style.opacity = "0"
        scrollToTopBtn.classList.remove("active")
      }
    })

    scrollToTopBtn.addEventListener("click", () => {
      scrollToTopBtn.classList.add("active")
      rocketTrail.style.height = "30px"
      rocketTrail.style.opacity = "1"
      this.launchRocket(scrollToTopBtn)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    scrollToTopBtn.addEventListener("mouseenter", () => {
      scrollToTopBtn.style.transform = "translateY(-5px) rotate(-45deg)"
      scrollToTopBtn.style.filter = "grayscale(0%)"
      scrollToTopBtn.querySelector("i").style.color = "#ff6b6b"
    })

    scrollToTopBtn.addEventListener("mouseleave", () => {
      if (!scrollToTopBtn.classList.contains("active")) {
        scrollToTopBtn.style.transform = "translateY(0) rotate(-45deg)"
        scrollToTopBtn.style.filter = "grayscale(100%)"
        scrollToTopBtn.querySelector("i").style.color = "#333"
        rocketTrail.style.height = "0px"
        rocketTrail.style.opacity = "0"
      }
    })

    // Reset active state after scroll completes
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        scrollToTopBtn.classList.remove("active")
        scrollToTopBtn.style.filter = "grayscale(100%)"
        scrollToTopBtn.querySelector("i").style.color = "#333"
        rocketTrail.style.height = "0px"
        rocketTrail.style.opacity = "0"
      }
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
        background: ${i % 2 === 0 ? "#ff0000" : "#ffa500"};
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: rocketParticleFixed 1s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `
      launchEffect.appendChild(particle)
    }

    document.body.appendChild(launchEffect)
    rocketBtn.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    rocketBtn.style.transform = "translateY(-100vh) rotate(-45deg)"
    rocketBtn.style.opacity = "0"

    setTimeout(() => {
      rocketBtn.style.transition = "all 0.3s ease"
      rocketBtn.style.transform = "translateY(0) rotate(-45deg)"
      rocketBtn.style.opacity = window.scrollY > 300 ? "1" : "0"
      rocketBtn.style.filter = "grayscale(100%)"
      rocketBtn.querySelector("i").style.color = "#333"
      rocketBtn.classList.remove("active")
      if (document.body.contains(launchEffect)) {
        document.body.removeChild(launchEffect)
      }
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
