// Reveal Animation
function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', initReveal);
window.addEventListener('load', initReveal);

// Typing Effect (hanya di index.html)
function initTyping() {
    const typingEl = document.getElementById('typing-motto');
    if (typingEl && typeof gsap !== 'undefined') {
        gsap.registerPlugin(TextPlugin);
        gsap.to("#typing-motto", {
            duration: 3,
            text: "Engineering the Future from the Field to the Cloud",
            delay: 1,
            ease: "none"
        });
    }
}

// Load Projects
async function loadProjects(containerId = 'project-grid') {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    try {
        const res = await fetch('data/projects.json');
        const projects = await res.json();

        grid.innerHTML = '';

        projects.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'glass-panel p-8 reveal';
            card.style.transitionDelay = `${index * 80}ms`;

            card.innerHTML = `
                <div class="text-[8px] text-primary tracking-widest uppercase mb-4 opacity-50 font-bold">PROJECT 0${index+1}</div>
                <h4 class="text-xl font-bold mb-4">${p.title}</h4>
                <p class="text-xs opacity-50 mb-8 leading-relaxed line-clamp-3">${p.desc}</p>
                <div class="flex flex-wrap gap-2 mb-8">
                    ${p.tags.map(t => `<span class="px-2 py-0.5 border border-white/10 text-[8px] uppercase opacity-40">${t}</span>`).join('')}
                </div>
                <a href="${p.link}" target="_blank" class="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline flex items-center">
                    REVIEW CODE →
                </a>
            `;
            grid.appendChild(card);
        });
    } catch (err) {
        console.error("Failed to load projects:", err);
        grid.innerHTML = '<p class="text-red-400">Failed to load projects.</p>';
    }
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initTyping();
});
