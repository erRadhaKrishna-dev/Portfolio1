// ================================================
// THEME TOGGLE & MANAGEMENT
// ================================================

class ThemeManager {
    constructor() {
        this.themeBtn = document.getElementById('themeToggle');
        this.htmlElement = document.documentElement;
        this.storageKey = 'portfolio-theme';
        this.darkTheme = 'dark-theme';
        this.lightTheme = 'light-theme';
        
        this.init();
    }

    init() {
        // Load saved theme or use system preference
        const savedTheme = this.getSavedTheme();
        const prefersDark = this.prefersColorScheme();
        const theme = savedTheme || (prefersDark ? this.darkTheme : this.lightTheme);
        
        this.setTheme(theme);
        this.attachEventListeners();
    }

    prefersColorScheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    getSavedTheme() {
        return localStorage.getItem(this.storageKey);
    }

    saveTheme(theme) {
        localStorage.setItem(this.storageKey, theme);
    }

    setTheme(theme) {
        const body = document.body;
        
        if (theme === this.lightTheme) {
            body.classList.remove(this.darkTheme);
            body.classList.add(this.lightTheme);
            this.updateThemeIcon(false);
        } else {
            body.classList.remove(this.lightTheme);
            body.classList.add(this.darkTheme);
            this.updateThemeIcon(true);
        }
        
        this.saveTheme(theme);
        this.updateMetaThemeColor(theme);
    }

    updateThemeIcon(isDark) {
        if (!this.themeBtn) return;
        
        const icon = this.themeBtn.querySelector('i');
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    }

    updateMetaThemeColor(theme) {
        let color = '#0a1428'; // dark theme color
        if (theme === this.lightTheme) {
            color = '#f8fafb'; // light theme color
        }
        
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', color);
        }
    }

    attachEventListeners() {
        if (this.themeBtn) {
            this.themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getSavedTheme()) {
                const newTheme = e.matches ? this.darkTheme : this.lightTheme;
                this.setTheme(newTheme);
            }
        });
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains(this.lightTheme) 
            ? this.lightTheme 
            : this.darkTheme;
        const newTheme = currentTheme === this.darkTheme ? this.lightTheme : this.darkTheme;
        this.setTheme(newTheme);
    }

    getCurrentTheme() {
        return document.body.classList.contains(this.lightTheme) 
            ? this.lightTheme 
            : this.darkTheme;
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// ================================================
// SCROLL ANIMATIONS & REVEAL ON SCROLL
// ================================================

class ScrollReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.revealElements.forEach(el => el.classList.add('active'));
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.revealElements.forEach(el => observer.observe(el));
    }
}

// Initialize scroll reveal
const scrollReveal = new ScrollReveal();

// ================================================
// SKILL BARS ANIMATION
// ================================================

class SkillBars {
    constructor() {
        this.skillBars = document.querySelectorAll('.progress-line');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            this.animateAllBars();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateAllBars() {
        this.skillBars.forEach(bar => bar.classList.add('visible'));
    }
}

// Initialize skill bars
const skillBars = new SkillBars();

// ================================================
// CIRCULAR PROGRESS CHARTS
// ================================================

function drawCircularProgress(canvasId, percentage, skillName) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    // Get theme colors
    const body = document.body;
    const isDarkTheme = !body.classList.contains('light-theme');
    const primaryColor = isDarkTheme ? '#06b6d4' : '#0891b2';
    const bgColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = isDarkTheme ? '#e4e6eb' : '#1a202c';

    canvas.width = 160;
    canvas.height = 160;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(80, 80, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw progress circle
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (circumference * percentage) / 100;

    ctx.beginPath();
    ctx.arc(80, 80, radius, startAngle, endAngle);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Update percentage text
    const percentElement = document.getElementById(canvasId.replace('Chart', 'Percent'));
    if (percentElement) {
        animatePercentage(percentElement, percentage);
    }
}

function animatePercentage(element, target) {
    let current = 0;
    const increment = target / 50;
    
    const animate = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.round(current) + '%';
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + '%';
        }
    };
    
    animate();
}

// Initialize circular charts when page loads
function initCircularCharts() {
    drawCircularProgress('creativityChart', 90, 'Creativity');
    drawCircularProgress('CommunicationChart', 85, 'Communication');
    drawCircularProgress('problemChart', 88, 'Problem Solving');
    drawCircularProgress('teamworkChart', 92, 'Teamwork');
}

// Redraw charts on theme change
const observer = new MutationObserver(() => {
    initCircularCharts();
});

observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

// Initial chart draw
document.addEventListener('DOMContentLoaded', initCircularCharts);

// ================================================
// TYPED TEXT ANIMATION
// ================================================

function initTypedText() {
    const typedElement = document.querySelector('.text-primary');
    if (!typedElement || typeof Typed === 'undefined') return;

    new Typed(typedElement, {
        strings: ['Developer', 'Designer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

document.addEventListener('DOMContentLoaded', initTypedText);

// ================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// SCROLL TO TOP BUTTON
// ================================================

class ScrollToTop {
    constructor() {
        this.topBtn = document.getElementById('topBtn');
        this.scrollThreshold = 300;
        this.init();
    }

    init() {
        if (!this.topBtn) return;

        window.addEventListener('scroll', () => this.handleScroll());
        this.topBtn.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        if (window.pageYOffset > this.scrollThreshold) {
            this.topBtn.style.display = 'flex';
        } else {
            this.topBtn.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize scroll to top
const scrollToTop = new ScrollToTop();

// ================================================
// COUNTER ANIMATION
// ================================================

class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const animate = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(animate);
            } else {
                element.textContent = target + '+';
            }
        };

        animate();
    }
}

// Initialize counter animation
const counterAnimation = new CounterAnimation();

// ================================================
// NAVBAR COLLAPSE ON MOBILE
// ================================================

function initMobileNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbarToggler || !navbarCollapse) return;

    // Close navbar when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const toggler = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            toggler.hide();
        });
    });
}

document.addEventListener('DOMContentLoaded', initMobileNavbar);

// ================================================
// FORM VALIDATION & SUBMISSION
// ================================================

function initFormValidation() {
    const contactForm = document.querySelector('#contact-form form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple client-side validation
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Form submission will be handled by Django
            contactForm.submit();
        }
    });

    // Clear error styling on input
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', initFormValidation);

// ================================================
// LAZY LOADING IMAGES
// ================================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

document.addEventListener('DOMContentLoaded', initLazyLoading);

// ================================================
// KEYBOARD NAVIGATION SUPPORT
// ================================================

function initKeyboardNavigation() {
    // Add keyboard support for theme toggle
    document.addEventListener('keydown', (e) => {
        // Alt + T to toggle theme
        if (e.altKey && e.key === 't') {
            themeManager.toggleTheme();
        }
        
        // Ctrl/Cmd + Home to scroll to top
        if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
            scrollToTop.scrollToTop();
        }
    });
}

initKeyboardNavigation();

// ================================================
// ACCESSIBILITY ENHANCEMENTS
// ================================================

function initAccessibility() {
    // Add ARIA labels where needed
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn && !themeBtn.getAttribute('aria-label')) {
        themeBtn.setAttribute('aria-label', 'Toggle theme between light and dark mode');
    }

    // Ensure all interactive elements are focusable
    document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
        if (!el.hasAttribute('tabindex') && el.tabIndex < 0) {
            el.setAttribute('tabindex', '0');
        }
    });
}

document.addEventListener('DOMContentLoaded', initAccessibility);

// ================================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ================================================

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth transition for element visibility
function showElement(element, delay = 0) {
    setTimeout(() => {
        element.style.display = 'block';
        element.classList.add('active');
    }, delay);
}

// ================================================
// INITIALIZATION ON DOM READY
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully');
    
    // All initializations should happen here
    // Theme manager is initialized globally
    // Scroll reveal is initialized globally
    // Skill bars are initialized globally
});

// ================================================
// WINDOW LOAD EVENT
// ================================================

window.addEventListener('load', () => {
    // Hide any loading spinners if you have them
    document.body.style.opacity = '1';
});

// ================================================
// ERROR HANDLING
// ================================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // Could log to error tracking service here
});

// ================================================
// PERFORMANCE MONITORING
// ================================================

if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 3000) {
                    console.warn('Slow entry:', entry.name, entry.duration);
                }
            }
        });
        
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Performance observer not supported
    }
}

// ================================================
// EXPORT FOR MODULES (if needed)
// ================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        ScrollReveal,
        SkillBars,
        ScrollToTop,
        CounterAnimation
    };
}