document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HIGH-PERFORMANCE MOUSE TRACKING
    // This updates CSS variables for the background glow
    const root = document.documentElement;
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        root.style.setProperty('--mouse-x', `${x}%`);
        root.style.setProperty('--mouse-y', `${y}%`);
    });

    // 2. SMOOTH ENTRANCE ANIMATIONS
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    // Apply to all professional sections
    document.querySelectorAll('.card, .hero-text, section h2').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        revealObserver.observe(el);
    });
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('site-theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('site-theme', isLight ? 'light' : 'dark');
            themeToggle.textContent = isLight ? '☀️' : '🌗';
        });
    }

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Modal wiring
    const scheduleCtas = document.querySelectorAll('#schedule-cta, #nav-schedule');
    const modal = document.getElementById('schedule-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');

    function openModal() { modal.classList.remove('hidden'); modal.style.display = 'flex'; }
    function closeModal() { modal.classList.add('hidden'); modal.style.display = 'none'; }

    scheduleCtas.forEach(btn => btn && btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);

    // Form submission (placeholder - implement server endpoint)
    const auditForm = document.getElementById('audit-form');
    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Minimal UX feedback
            alert('Thanks — your audit request has been recorded. Our team will contact you.');
            closeModal();
            auditForm.reset();
        });
    }

    // Smooth scroll for 'Explore Our Sectors'
    const exploreBtn = document.getElementById('explore-sectors');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('services').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Mobile menu toggle (slide-in)
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-close');
    function openMobile() { if (mobileNav) mobileNav.classList.add('open'); }
    function closeMobile() { if (mobileNav) mobileNav.classList.remove('open'); }
    if (mobileToggle) mobileToggle.addEventListener('click', openMobile);
    if (mobileClose) mobileClose.addEventListener('click', closeMobile);
    // Close mobile nav when link clicked
    if (mobileNav) mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));
});

// Animation Activation
const style = document.createElement('style');
style.innerHTML = `
    .active { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);

/* Add this to your main.js */
function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("active");
    
    // Optional: Change the hamburger icon to an 'X'
    const btn = document.querySelector(".menu-toggle");
    btn.innerHTML = nav.classList.contains("active") ? "✕" : "☰";
}

// Close menu when a link is clicked (important for mobile UX)
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("navMenu").classList.remove("active");
        document.querySelector(".menu-toggle").innerHTML = "☰";
    });
});