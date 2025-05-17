'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.match();
    App.toggle();
    App.splide();
  },

  /**
   * Match
   */
  match() {
    document.body.matchHeight({
      property: 'min-height',
      attributeName: 'data-mh'
    });
  },

  /**
   * Toggle
   */
  toggle() {
    const toggles = document.querySelectorAll('.toggle');
    if (toggles.length) {
      toggles.forEach(toggle => {
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

      document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.active')) {
          const activeToggle = document.querySelector('.toggle.active');
          if (activeToggle) {
            const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
            activeTarget.classList.remove('active');
            activeToggle.classList.remove('active');
            activeToggle.setAttribute('aria-expanded', false);
          }
        }
      });
    }
  },

  /**
   * Splide
   */
  splide() {
    const gParams = {
      gap: 20,
      perPage: 1,
      perMove: 1,
      pagination: false,
      mediaQuery: 'min',
      breakpoints: {
        768: {
          gap: 30,
          perPage: 2
        },
        1280: {
          perPage: 3
        }
      }
    };
    const sGeneral = document.querySelectorAll('.splide__general');
    if (sGeneral.length) {
      sGeneral.forEach(iSplide => {
        const xSplide = new Splide(iSplide, gParams).on('ready resized', () => {
          const isOverflow = xSplide.options.perPage === xSplide.length;
          iSplide.classList.toggle('is-overflow', !isOverflow);
        });
        xSplide.mount();
      });
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