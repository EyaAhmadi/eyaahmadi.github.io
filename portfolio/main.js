
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');

    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', e => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    }

    // ===== Inject Header then Setup Theme & Active Nav =====
    fetch('header.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            setupThemeToggle();

            const links = document.querySelectorAll('.nav-links a');
            let currentPath = window.location.pathname.split('/').pop();
            if (!currentPath || currentPath === '/') currentPath = 'index.html';

            links.forEach(link => {
                const linkPath = link.getAttribute('href').replace('./', '');
                if (linkPath === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // ===== Fade-out on nav link click =====
            links.forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    const href = link.getAttribute('href');

                    document.body.classList.remove('fade-in');
                    document.body.classList.add('fade-out');

                    setTimeout(() => {
                        window.location.href = href;
                    }, 300); // Must match fade-out duration
                });
            });
        });

    // ===== Inject Footer (optional animation) =====
    fetch('footer.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            if (typeof animateSections === 'function') animateSections();
        });

    // ===== Hero Text Animation =====
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');
    const descEl = document.getElementById('hero-description');

    const titleText = "Welcome.";
    const subtitleText = "I'm Eya Ahmadi, a junior software developer specializing in AI-driven solutions.";
    const descHTML = `
        <i class="fa-solid fa-brain highlight-icon"></i> I have a passion for applying AI to solve real-world problems.
        <br />
        <i class="fa-solid fa-laptop-code highlight-icon"></i> I design and build complete solutions from front to back.
        <br />
        <i class="fa-solid fa-lightbulb highlight-icon"></i> I design smart, adaptive features and seamlessly integrate them.
        <br />
        <i class="fa-solid fa-folder-open highlight-icon"></i> Explore my work to see how I merge development with innovation!
    `;

    if (titleEl && subtitleEl && descEl) {
        injectAnimistaTitle(titleText, titleEl);

        setTimeout(() => {
            subtitleEl.textContent = subtitleText;
            subtitleEl.classList.add('text-focus-in');

            setTimeout(() => {
                descEl.innerHTML = descHTML;
                descEl.style.opacity = 0;
                requestAnimationFrame(() => {
                    descEl.style.transition = "opacity 0.8s ease";
                    descEl.style.opacity = 1;
                });
            }, 700);
        }, 700);
    }

    animateSections();
});

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const isDark = localStorage.getItem('theme') === 'dark';
        document.body.classList.toggle('dark', isDark);
        icon.classList.toggle('fa-sun', isDark);
        icon.classList.toggle('fa-moon', !isDark);

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
    }
}

function animateSections() {
    gsap.utils.toArray('.fade').forEach((el, index) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "power3.out"
        });
    });
}

function injectAnimistaTitle(text, container) {
    container.innerHTML = '<span aria-hidden="true"></span>';
    const spanWrapper = container.querySelector('span');
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = 'animista-letter';
        span.style.animationDelay = `${i * 0.05}s`;
        spanWrapper.appendChild(span);
    });
    container.setAttribute('aria-label', text);
}
