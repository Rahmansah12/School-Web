document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            const isOpen = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (menu.classList.contains('open')) {
                    menu.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('click', (event) => {
            const clickInsideMenu = event.target.closest('.nav-menu');
            const clickOnToggle = event.target.closest('.nav-toggle');
            if (menu.classList.contains('open') && !clickInsideMenu && !clickOnToggle) {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.body.classList.toggle('theme-dark', isDark);
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
        localStorage.setItem('school-theme', theme);
    }

    const savedTheme = localStorage.getItem('school-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.contains('theme-dark');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    const revealItems = document.querySelectorAll('.reveal, .animate-section');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('visible'));
    }

    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('galleryImage');
    const closeModalBtn = document.querySelector('.modal-close');

    document.querySelectorAll('.gallery-trigger').forEach((button) => {
        button.addEventListener('click', () => {
            if (!modal || !modalImage) return;
            const image = button.querySelector('img');
            if (image) {
                modalImage.src = image.src;
                modalImage.alt = image.alt || 'Gallery image';
            }
            modal.classList.add('open');
            document.body.classList.add('modal-open');
        });
    });

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });
    }
});
