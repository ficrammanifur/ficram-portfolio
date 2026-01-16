// Navigation Mobile Menu Toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")

navToggle?.addEventListener("click", () => {
  navMenu?.classList.toggle("active")
  navToggle?.classList.toggle("active")
})

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("active")
    navToggle?.classList.remove("active")
  })
})

// Update active nav link
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

updateActiveNavLink()

// Typing Animation
const typingTexts = [
  "Welcome To My Portfolio 👨‍💻",
  "Embedded Systems Enthusiast 🔧",
  "AI & Robotics Developer 🤖",
  "Full Stack Innovator 💡",
]

let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false

function typeAnimation() {
  const typingElement = document.getElementById("typingText")
  if (!typingElement) return

  const currentText = typingTexts[currentTextIndex]

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, currentCharIndex - 1)
    currentCharIndex--

    if (currentCharIndex === 0) {
      isDeleting = false
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length
      setTimeout(typeAnimation, 300)
      return
    }
  } else {
    typingElement.textContent = currentText.substring(0, currentCharIndex + 1)
    currentCharIndex++

    if (currentCharIndex === currentText.length) {
      isDeleting = true
      setTimeout(typeAnimation, 2000)
      return
    }
  }

  setTimeout(typeAnimation, isDeleting ? 50 : 80)
}

// Start typing animation on hero section
if (document.getElementById("typingText")) {
  setTimeout(typeAnimation, 500)
}

// Scroll Indicator Animation
const scrollIndicator = document.getElementById("scrollIndicator")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100 && scrollIndicator) {
    scrollIndicator.style.opacity = "0"
    scrollIndicator.style.pointerEvents = "none"
  } else if (scrollIndicator) {
    scrollIndicator.style.opacity = "1"
    scrollIndicator.style.pointerEvents = "auto"
  }
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Apply observer to elements
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(20px)"
  section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  observer.observe(section)
})

// Disable animations if user prefers reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.scrollBehavior = "auto"
  document.querySelectorAll("*").forEach((el) => {
    el.style.animationDuration = "0.01ms !important"
    el.style.transitionDuration = "0.01ms !important"
  })
}

// Log support info
console.log("Portfolio loaded - prefers-reduced-motion:", window.matchMedia("(prefers-reduced-motion: reduce)").matches)
