// #region ***  DOM references                           ***********
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const dropdowns = document.querySelectorAll('.has-dropdown');
const themeToggle = document.querySelector('.theme-toggle');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.js-search');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');
// #endregion

// (style injection omitted for brevity)

// #region ***  Callback-No Visualisation - callback___  ***********
// (performSearch and transformToTheme omitted for brevity)
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
const listenToEvents = () => {
    // Mobile menu toggle
    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('c-nav__active');
            document.body.style.overflow = navbar.classList.contains('c-nav__active')
                ? 'hidden'
                : '';
        });
    }

    // Close mobile menu when clicking outside
    if (navbar) {
        document.addEventListener('click', (e) => {
            if (
                !navbar.contains(e.target) &&
                navbar.classList.contains('c-nav__active')
            ) {
                navbar.classList.remove('c-nav__active');
                document.body.style.overflow = '';
            }
        });
    }

    // Handle dropdowns on mobile
    dropdowns.forEach((dropdown) => {
        const link = dropdown.querySelector('.c-nav__link');
        const menu = dropdown.querySelector('.dropdown');
        if (!link || !menu) return;

        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('active');

                // close other dropdowns
                dropdowns.forEach((other) => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                        const otherMenu = other.querySelector('.dropdown');
                        if (otherMenu) {
                            otherMenu.style.animation = 'slideUp 0.3s forwards';
                            setTimeout(() => { otherMenu.style.animation = ''; }, 300);
                        }
                    }
                });

                // animate current
                if (dropdown.classList.contains('active')) {
                    menu.style.animation = 'slideDown 0.3s forwards';
                } else {
                    menu.style.animation = 'slideUp 0.3s forwards';
                    setTimeout(() => { menu.style.animation = ''; }, 300);
                }
            }
        });
    });

    // Theme toggle
    let isDark = true;
    if (themeToggle && moonIcon && sunIcon) {
        themeToggle.addEventListener('click', () => {
            isDark = !isDark;
            if (isDark) {
                transformToTheme('#4a4a4a', '#ffffff', '#2c2f33', '#1a1c1e');
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            } else {
                transformToTheme('#ffffff', '#4a4a4a', '#f5e8d0', '#fdf6e3');
                moonIcon.classList.add('hidden');
                sunIcon.classList.remove('hidden');
            }
        });
    }

    // Search button
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const q = searchInput.value.trim();
            if (q) performSearch(q);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const q = searchInput.value.trim();
                if (q) {
                    e.preventDefault();
                    performSearch(q);
                }
            }
        });

        // focus/blur styling
        const container = searchInput.parentElement;
        searchInput.addEventListener('focus', () => {
            container.classList.add('c-search__input--focused');
        });
        searchInput.addEventListener('blur', () => {
            container.classList.remove('c-search__input--focused');
        });
    }

    // Resize & scroll
    window.addEventListener('resize', () => {
        if (navbar && window.innerWidth > 968) {
            navbar.classList.remove('c-nav__active');
            dropdowns.forEach((dd) => dd.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
};
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********
const init = () => {
    console.log('DOM fully loaded and parsed');
    listenToEvents();
};

document.addEventListener('DOMContentLoaded', init);
// #endregion
