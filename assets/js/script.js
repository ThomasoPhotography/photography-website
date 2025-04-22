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

// #region ***  Callback-Visualisation - show___         ***********
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    .search-focused {
        box-shadow: 0 0 0 3px var(--primary-glow) !important;
    }
    
    .search-active {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .theme-transition {
        transition: background 0.5s ease, color 0.5s ease;
    }
    
    .scrolled {
        padding: 0.7rem 2rem;
        background: var(--nav-bg);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    }
    
    @media (max-width: 576px) {
        .scrolled {
            padding: 0.7rem 1rem;
        }
    }
`;
document.head.appendChild(style);
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
const performSearch = (query) => {
    console.log('Searching for:', query);
    searchBtn.classList.add('search-active');
    setTimeout(() => {
        searchBtn.classList.remove('search-active');
    }, 300);
};

const transformToTheme = (bgColor, textColor, navBg, dropdownBg) => {
    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--nav-bg', navBg);
    document.documentElement.style.setProperty('--dropdown-bg', dropdownBg);

    if (isDark) {
        document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #0a0a12, #151530)');
        document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
        document.documentElement.style.setProperty('--text-description', 'rgba(255, 255, 255, 0.7)');
    } else {
        document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #ffffff, #f0f4ff)');
        document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
        document.documentElement.style.setProperty('--text-description', 'rgba(0, 0, 0, 0.7)');
    }

    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
};
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
const listenToEvents = () => {
    // Mobile menu toggle with animation
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('c-nav__active');
        document.body.style.overflow = navbar.classList.contains('c-nav__active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbar.classList.contains('c-nav__active')) {
            navbar.classList.remove('c-nav__active');
            document.body.style.overflow = '';
        }
    });

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.c-nav__link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                        const otherDropdown = other.querySelector('.dropdown');
                        otherDropdown.style.animation = 'slideUp 0.3s forwards';
                        setTimeout(() => {
                            otherDropdown.style.animation = '';
                        }, 300);
                    }
                });
                const currentDropdown = dropdown.querySelector('.dropdown');
                if (dropdown.classList.contains('active')) {
                    currentDropdown.style.animation = 'slideDown 0.3s forwards';
                } else {
                    currentDropdown.style.animation = 'slideUp 0.3s forwards';
                    setTimeout(() => {
                        currentDropdown.style.animation = '';
                    }, 300);
                }
            }
        });
    });

    // Theme toggle with enhanced transitions
    let isDark = true; // Default dark theme
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

    // Enhanced search functionality
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });

    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('.c-search__input--focused');
    });

    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('.c-search__input--focused');
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            navbar.classList.remove('c-nav__active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });

    // Add scroll effect for navbar
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
};
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********
const init = () => {
    console.log('DOM fully loaded and parsed');
    listenToEvents();
}

document.addEventListener('DOMContentLoaded', init);
// #endregion