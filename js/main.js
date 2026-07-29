document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        root.style.setProperty('--mouse-x', `${x}%`);
        root.style.setProperty('--mouse-y', `${y}%`);
    });

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.card, .hero-text, section h2').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        revealObserver.observe(el);
    });

    function applyTheme(theme) {
        body.classList.toggle('light-theme', theme === 'light');
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '☀️' : '🌗';
            themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
        }
    }

    const savedTheme = localStorage.getItem('site-theme');
    applyTheme(savedTheme === 'light' ? 'light' : 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
            localStorage.setItem('site-theme', nextTheme);
            applyTheme(nextTheme);
        });
    }

    function toggleMenu(force) {
        if (!navMenu || !menuToggle) return;
        const shouldOpen = typeof force === 'boolean' ? force : !navMenu.classList.contains('active');
        navMenu.classList.toggle('active', shouldOpen);
        body.classList.toggle('menu-open', shouldOpen);
        menuToggle.classList.toggle('active', shouldOpen);
        menuToggle.innerHTML = shouldOpen ? '✕' : '☰';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    document.addEventListener('click', (e) => {
        if (!navMenu || !navMenu.classList.contains('active')) return;
        if (!navMenu.contains(e.target) && !menuToggle?.contains(e.target)) toggleMenu(false);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) toggleMenu(false);
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href === window.location.pathname.split('/').pop() || (href.includes('about.html') && window.location.pathname.includes('about.html'))) {
            link.classList.add('active');
        }
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

const style = document.createElement('style');
style.innerHTML = `
    .active { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(style);