document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');

    // Custom cursor effect (only on desktop)
    const cursor = document.querySelector('.cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        });
    }

    // Initialize the page (header, footer, nav, theme, content)
    initializePage();
});

function initializePage() {
    const headerPromise = fetch('header.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setupThemeToggle();
            setupNavigation();
            setupScrollEffects();
        })
        .catch(error => console.error('Error loading header:', error));

    const footerPromise = fetch('footer.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
            if (typeof animateSections === 'function') animateSections();
        })
        .catch(error => console.error('Error loading footer:', error));

    Promise.all([headerPromise, footerPromise]).then(() => {
        initializePageSpecificContent();
    });
}

// Navbar scroll effects
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
        const currentScrollY = window.scrollY;

        // Add scrolled class for background
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction (optional - uncomment to enable)
        // if (currentScrollY > lastScrollY && currentScrollY > 100) {
        //     navbar.classList.add('hidden');
        // } else {
        //     navbar.classList.remove('hidden');
        // }

        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

function setupNavigation() {
    const links = document.querySelectorAll('.nav-links a');
    const menuToggle = document.getElementById('menu-toggle');
    let currentPath = window.location.pathname;

    // Normalize the current path
    currentPath = currentPath.replace(/^\/|\/$/g, '').replace(/\.html$/, '');
    if (currentPath === '' || currentPath.endsWith('/')) currentPath = 'index';
    // Handle paths like "portfolio_official/index"
    if (currentPath.includes('/')) {
        currentPath = currentPath.split('/').pop();
    }

    links.forEach(link => {
        const href = link.getAttribute('href');
        let linkPath = href.replace(/\.html$/, '').replace(/^\/|\/$/g, '');
        if (linkPath === '') linkPath = 'index';

        // Set active class
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Add smooth page transition
        link.addEventListener('click', e => {
            e.preventDefault();

            // Close mobile menu
            if (menuToggle) {
                menuToggle.checked = false;
            }

            // Skip transition if same page
            if (linkPath === currentPath) return;

            document.body.classList.remove('fade-in');
            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });

    // Keyboard accessibility for hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger && menuToggle) {
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.checked = !menuToggle.checked;
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuToggle.checked && !e.target.closest('.nav-links') && !e.target.closest('.hamburger')) {
                menuToggle.checked = false;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', setupNavigation);



function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

        document.body.classList.toggle('dark', isDark);
        if (icon) {
            icon.classList.toggle('fa-sun', isDark);
            icon.classList.toggle('fa-moon', !isDark);
        }

        themeToggle.addEventListener('click', () => {
            const willBeDark = !document.body.classList.contains('dark');
            document.body.classList.toggle('dark');

            if (icon) {
                icon.classList.toggle('fa-sun');
                icon.classList.toggle('fa-moon');
            }

            localStorage.setItem('theme', willBeDark ? 'dark' : 'light');

            // Dispatch custom event for other components to listen
            window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: willBeDark } }));
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.body.classList.toggle('dark', e.matches);
                if (icon) {
                    icon.classList.toggle('fa-sun', e.matches);
                    icon.classList.toggle('fa-moon', !e.matches);
                }
            }
        });
    }
}

function initializePageSpecificContent() {
    const currentPath = window.location.pathname.split('/').pop();

    if (!currentPath || currentPath === '/' || currentPath === 'index.html') {
        initializeHomePage();
    }

    // Initialize intersection observer for all fade elements
    observeFadeElements();
}
    //     initializeAboutPage();
    // }
}

function initializeHomePage() {
    const titleEl = document.getElementById('hero-title');
    const subtitleEl = document.getElementById('hero-subtitle');
    const descEl = document.getElementById('hero-description');
    const paragraphEl = document.getElementById('hero-paragraph');
    const exploreEl = document.getElementById('hero-explore');

    const titleText = "Welcome,";
    const subtitleText = "I'm Eya Ahmadi, a junior software developer specializing in AI-driven solutions. I developed this interactive personal portfolio website to showcase my projects and skills.";

    const descHTML = `
        <i class="fa-solid fa-brain highlight-icon" aria-hidden="true"></i> I have a passion for applying AI to solve real-world problems.<br />
        <i class="fa-solid fa-laptop-code highlight-icon" aria-hidden="true"></i> I design and build complete solutions from front-end to back-end.<br />
        <i class="fa-solid fa-lightbulb highlight-icon" aria-hidden="true"></i> I create smart, adaptive features that provide a seamless user experience.
    `;

    const exploreHTML = "Explore my work to see how I merge development with innovation!";

    // Hide elements before animation
    [titleEl, subtitleEl, descEl, paragraphEl, exploreEl].forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });

    if (titleEl && subtitleEl && descEl && paragraphEl && exploreEl) {
        // Staggered animation sequence
        setTimeout(() => {
            injectAnimistaTitle(titleText, titleEl);
            titleEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            titleEl.style.opacity = '1';
            titleEl.style.transform = 'translateY(0)';
        }, 200);

        setTimeout(() => {
            subtitleEl.textContent = subtitleText;
            subtitleEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            subtitleEl.style.opacity = '1';
            subtitleEl.style.transform = 'translateY(0)';
            subtitleEl.classList.add('text-focus-in');
        }, 700);

        setTimeout(() => {
            descEl.innerHTML = descHTML;
            descEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            descEl.style.opacity = '1';
            descEl.style.transform = 'translateY(0)';
        }, 1300);

        setTimeout(() => {
            paragraphEl.innerHTML = exploreHTML;
            paragraphEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            paragraphEl.style.opacity = '1';
            paragraphEl.style.transform = 'translateY(0)';
        }, 1900);
    }

    setTimeout(() => {
        animateSections();
    }, 2500);
}

// Intersection Observer for fade-in animations
function observeFadeElements() {
    const fadeElements = document.querySelectorAll('.fade');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

function animateSections() {
    if (typeof gsap !== 'undefined') {
        gsap.utils.toArray('.fade').forEach((el, index) => {
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.15,
                ease: "power3.out"
            });
        });
    } else {
        document.querySelectorAll('.fade').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }
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
