// Particle Animation Background
// Optimized for performance and mobile devices
// Respects prefers-reduced-motion setting

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById("particleCanvas")
    this.ctx = this.canvas.getContext("2d", { alpha: true })
    this.particles = []
    this.mouse = { x: 0, y: 0 }
    this.lastTime = Date.now()
    this.fps = 30
    this.fpsInterval = 1000 / this.fps
    this.animationId = null

    // Check if animations should be reduced
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    this.isMobile = this.detectMobile()

    // Only run on hero section
    this.heroSection = document.getElementById("heroSection")

    if (!this.canvas || !this.ctx) return

    // Don't run animations on mobile with reduced motion or small screens
    if (this.isMobile || this.prefersReducedMotion) {
      return
    }

    this.init()
    this.setupEventListeners()
    this.animate()
  }

  detectMobile() {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
    const isSmallScreen = window.innerWidth < 768
    return isMobileDevice || isSmallScreen
  }

  init() {
    this.resizeCanvas()
    this.createParticles()
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createParticles() {
    const particleCount = this.isMobile ? 30 : 60
    this.particles = []

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      })
    }
  }

  setupEventListeners() {
    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX
      this.mouse.y = e.clientY
    })

    window.addEventListener("resize", () => {
      this.resizeCanvas()
    })

    // Pause animation when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animationId)
      } else {
        this.animate()
      }
    })
  }

  update() {
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off walls
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.vx *= -1
        particle.x = Math.max(0, Math.min(this.canvas.width, particle.x))
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.vy *= -1
        particle.y = Math.max(0, Math.min(this.canvas.height, particle.y))
      }

      // Mouse interaction (attraction)
      const dx = this.mouse.x - particle.x
      const dy = this.mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        const angle = Math.atan2(dy, dx)
        const force = ((150 - distance) / 150) * 0.3
        particle.vx += Math.cos(angle) * force
        particle.vy += Math.sin(angle) * force
      }

      // Friction
      particle.vx *= 0.98
      particle.vy *= 0.98
    })
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = "rgba(15, 15, 30, 0.1)"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw particles
    this.particles.forEach((particle) => {
      this.ctx.beginPath()
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`
      this.ctx.fill()
    })

    // Draw connections
    this.drawConnections()
  }

  drawConnections() {
    const connectionDistance = 150

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x
        const dy = this.particles[i].y - this.particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3
          this.ctx.strokeStyle = `rgba(147, 51, 234, ${opacity})`
          this.ctx.lineWidth = 1
          this.ctx.beginPath()
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y)
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y)
          this.ctx.stroke()
        }
      }
    }
  }

  animate() {
    const now = Date.now()
    const elapsed = now - this.lastTime

    if (elapsed > this.fpsInterval) {
      this.update()
      this.draw()
      this.lastTime = now - (elapsed % this.fpsInterval)
    }

    this.animationId = requestAnimationFrame(() => this.animate())
  }
}

// Initialize particle system when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ParticleSystem()
  })
} else {
  new ParticleSystem()
}
