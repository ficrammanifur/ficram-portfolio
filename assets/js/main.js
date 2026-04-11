// Reveal Animation
const revealElements = () => {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Typing Effect (hanya di index.html)
if (document.getElementById('typing-motto')) {
    gsap.registerPlugin(TextPlugin);
    gsap.to("#typing-motto", {
        duration: 3,
        text: "Engineering the Future from the Field to the Cloud",
        delay: 1,
        ease: "none"
    });
}

// Project Loader (dipakai di index.html dan projects.html)
async function loadProjects(containerId) {
    try {
        const res = await fetch('data/projects.json');
        const projects = await res.json();
        const grid = document.getElementById(containerId);
        grid.innerHTML = '';

        projects.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'glass-panel p-8 reveal';
            card.style.transitionDelay = `${index * 100}ms`;
            card.innerHTML = `
                <div class="text-[8px] text-primary tracking-widest uppercase mb-4 opacity-50 font-bold">Project Module 0${index+1}</div>
                <h4 class="text-xl font-bold mb-4">${p.title}</h4>
                <p class="text-xs opacity-50 mb-8 leading-relaxed h-12 line-clamp-2">${p.desc}</p>
                <div class="flex flex-wrap gap-2 mb-8">
                    ${p.tags.map(t => `<span class="px-2 py-0.5 border border-white/10 text-[8px] uppercase opacity-40">${t}</span>`).join('')}
                </div>
                <a href="${p.link}" target="_blank" class="text-[9px] font-bold uppercase tracking-widest text-primary hover:underline flex items-center">
                    Review Code 
                    <svg class="w-2 h-2 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                </a>
            `;
            grid.appendChild(card);
        });
    } catch (e) {
        console.error("Gagal load projects.json", e);
    }
}
