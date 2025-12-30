'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.splide();
    App.toggle();
  },

  /**
   * Splide
   */
  splide() {
    let heroClass = '.splide-hero', heroSplide = document.querySelector(heroClass);
    if (heroSplide) {
      heroSplide = new Splide(heroClass, {
        type: 'slide',
        speed: 750,
        gap: 0,
        arrows: false,
        autoplay: true,
        interval: 5000,
        classes: {
          pagination: 'splide__pagination justify-center'
        }
      }).mount();
    }

    let reviewClass = '.splide-review', reviewSplide = document.querySelector(reviewClass);
    if (reviewSplide) {
      reviewSplide = new Splide(reviewClass, {
        type: 'fade',
        speed: 750,
        gap: 0,
        pagination: false
      }).mount();
    }

    let productClass = '.splide-product', productSplide = document.querySelector(productClass);
    if (productSplide) {
      productSplide = new Splide(productClass, {
        type: 'slide',
        speed: 750,
        gap: 26,
        perPage: 4,
        perMove: 1,
        pagination: false
      }).mount();
    }

    let priorityClass = '.splide-priority', prioritySplide = document.querySelector(priorityClass);
    if (prioritySplide) {
      prioritySplide = new Splide(priorityClass, {
        type: 'slide',
        speed: 750,
        gap: 16,
        autoWidth: true,
        arrows: false,
        autoplay: true,
        interval: 5000,
        classes: {
          pagination: 'splide__pagination justify-start'
        }
      }).mount();
    }
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
            const activeToggles = document.querySelectorAll('.toggle.active');
            if (!isActive && activeToggles.length) {
              activeToggles.forEach(activeToggle => {
                const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
                if (!activeTarget.contains(toggle)) {
                  activeTarget.classList.remove('active');
                  activeToggle.classList.remove('active');
                  activeToggle.setAttribute('aria-expanded', isActive);
                }
              });
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
          App.toggleOff();
        }
      });
    }
  },
  toggleOff() {
    const activeToggles = document.querySelectorAll('.toggle.active');
    if (activeToggles.length) {
      activeToggles.forEach(activeToggle => {
        const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
        activeTarget.classList.remove('active');
        activeToggle.classList.remove('active');
        activeToggle.setAttribute('aria-expanded', false);
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