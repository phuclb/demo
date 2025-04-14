'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.slide();
    App.toggle();
  },

  /**
   * Toggle
   */
  toggle() {
    const allToggles = document.querySelectorAll('.toggle');
    if (allToggles.length) {
      allToggles.forEach(toggle => {
        const target = document.getElementById(toggle.getAttribute('aria-controls'));
        if (target) {
          toggle.addEventListener('click', (e) => {
            const isActive = toggle.classList.contains('active');
            const activeToggle = document.querySelector('.toggle.active');
            if (!isActive && activeToggle) {
              const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
              activeTarget.classList.remove('active');
              activeToggle.classList.remove('active');
              activeToggle.setAttribute('aria-expanded', isActive);
            }
            target.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', !isActive);
            e.preventDefault();
          });
        }
      });
    }
  },

  /**
   * Slide
   */
  slide() {
    const articleSlider = document.querySelector('.article-slider');
    if (articleSlider) {
      const articleSplide = new Splide('.article-slider.splide', {
        gap: 18,
        perPage: 1,
        mediaQuery: 'min',
        breakpoints: {
          768: {
            perPage: 2,
          },
          1024: {
            perPage: 3,
          }
        }
      });
      articleSplide.mount();
    }
  },

  /**
   * Placeholder for a function
   */
  fN() {
  }
};

// Helper to execute code when the DOM is ready
const onReady = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

// Initialize the app when the DOM is ready
onReady(() => App.init());