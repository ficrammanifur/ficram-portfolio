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
    // Hamburger menu toggle
    this.hamburger.addEventListener("click", () => this.toggleMobileMenu())

    // Close mobile menu when clicking nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu())
    })

    // Handle scroll for navbar background
    window.addEventListener("scroll", () => this.handleScroll())

    // Smooth scroll for navigation links
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

// IP Logger
class IPLogger {
  constructor() {
    this.apiUrl = "https://your-flask-backend-url.com" // Replace with your actual backend URL
    this.init()
  }

  init() {
    this.logVisitor()
  }

  async logVisitor() {
    try {
      // Get visitor's IP and basic info
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()

      const visitorInfo = {
        ip: data.ip,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "Direct",
        page: window.location.pathname,
      }

      // Send to backend (only if backend URL is configured)
      if (this.apiUrl !== "https://your-flask-backend-url.com") {
        await this.sendToBackend(visitorInfo)
      } else {
        console.log("Visitor info (backend not configured):", visitorInfo)
      }
    } catch (error) {
      console.log("IP logging failed:", error)
    }
  }

  async sendToBackend(visitorInfo) {
    try {
      const response = await fetch(`${this.apiUrl}/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitorInfo),
      })

      if (response.ok) {
        console.log("Visitor logged successfully")
      }
    } catch (error) {
      console.log("Failed to send visitor info to backend:", error)
    }
  }
}

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById("contact-form")
    this.init()
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => this.handleSubmit(e))
    }
  }

  async handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(this.form)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    // Show loading state
    const submitBtn = this.form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...'
    submitBtn.disabled = true

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      this.showSuccess()
      this.form.reset()
    } catch (error) {
      this.showError()
    } finally {
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }

  showSuccess() {
    this.showNotification("Pesan berhasil dikirim! Terima kasih atas pesan Anda.", "success")
  }

  showError() {
    this.showNotification("Terjadi kesalahan. Silakan coba lagi nanti.", "error")
  }

  showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
            <span>${message}</span>
        `

    // Add notification styles
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

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }
}

// Scroll Animations and Effects
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
    // Initialize AOS (Animate On Scroll)
    const AOS = window.AOS // Declare the AOS variable
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

    // Add rocket trail effect
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

    // Show/hide button based on scroll position
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

    // Rocket launch animation when clicked
    scrollToTopBtn.addEventListener("click", () => {
      // Create rocket launch animation
      this.launchRocket(scrollToTopBtn)

      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })

    // Hover effects
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

  // Add this new method to the ScrollEffects class
  launchRocket(rocketBtn) {
    // Create launch effect
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

    // Create multiple particles for exhaust effect
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

    // Animate the rocket button
    rocketBtn.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    rocketBtn.style.transform = "rotate(-45deg) translateY(-100vh) scale(0.5)"
    rocketBtn.style.opacity = "0"

    // Reset rocket position after animation
    setTimeout(() => {
      rocketBtn.style.transition = "all 0.3s ease"
      rocketBtn.style.transform = "rotate(-45deg) translateY(0) scale(1)"
      rocketBtn.style.opacity = window.scrollY > 300 ? "1" : "0"

      // Remove launch effect
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
        const sectionHeight = section.clientHeight
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

// Performance Optimization
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
    // Preload critical fonts
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
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.initializeComponents())
    } else {
      this.initializeComponents()
    }
  }

  initializeComponents() {
    // Initialize all components
    this.themeManager = new ThemeManager()
    this.navigationManager = new NavigationManager()
    this.ipLogger = new IPLogger()
    this.contactFormHandler = new ContactFormHandler()
    this.scrollEffects = new ScrollEffects()
    this.performanceOptimizer = new PerformanceOptimizer()

    // Add loading animation
    document.body.classList.add("loading")

    // Add custom CSS for notifications and animations
    this.addCustomStyles()

    console.log("Portfolio website initialized successfully!")
  }

  addCustomStyles() {
    const style = document.createElement("style")
    style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }

            .nav-link.active {
                color: var(--primary-color) !important;
            }

            .nav-link.active::after {
                width: 100% !important;
            }

            .lazy {
                opacity: 0;
                transition: opacity 0.3s;
            }

            .lazy.loaded {
                opacity: 1;
            }

            /* Custom scrollbar */
            ::-webkit-scrollbar {
                width: 8px;
            }

            ::-webkit-scrollbar-track {
                background: var(--bg-secondary);
            }

            ::-webkit-scrollbar-thumb {
                background: var(--primary-color);
                border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: var(--secondary-color);
            }
        `
    document.head.appendChild(style)
  }
}

// Initialize the application
new PortfolioApp()
