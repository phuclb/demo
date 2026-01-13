'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.splide();
    App.toggle();
    App.reveal();
    App.accordion();
  },

  /**
   * Splide
   */
  splide() {
    let heroSplide = document.querySelector('.splide-hero');
    if (heroSplide) {
      new Splide(heroSplide, {
        type: 'slide',
        speed: 1e3,
        gap: 0,
        arrows: false,
        autoplay: true,
        interval: 5000,
        classes: {
          pagination: 'splide__pagination justify-center'
        }
      }).mount();
    }

    let brandSplide = document.querySelector('.splide-brand');
    if (brandSplide) {
      new Splide(brandSplide, {
        type: 'loop',
        speed: 1e3,
        gap: 16,
        autoWidth: true,
        focus: 'center',
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 3000
      }).mount();
    }

    let reviewSplide = document.querySelector('.splide-review');
    if (reviewSplide) {
      new Splide(reviewSplide, {
        type: 'fade',
        speed: 1e3,
        gap: 0,
        pagination: false
      }).mount();
    }

    let prioritySplide = document.querySelector('.splide-priority');
    if (prioritySplide) {
      new Splide(prioritySplide, {
        type: 'slide',
        speed: 1e3,
        gap: 16,
        autoWidth: true,
        arrows: false,
        autoplay: true,
        interval: 4000,
        classes: {
          pagination: 'splide__pagination justify-start'
        }
      }).mount();
    }

    let thumbSplide = document.querySelector('.splide-thumb');
    if (thumbSplide) {
      new Splide(thumbSplide, {
        type: 'slide',
        speed: 1e3,
        gap: 12,
        autoWidth: true,
        pagination: false
      }).mount();
    }

    let productSplides = document.querySelectorAll('.splide-product');
    if (productSplides.length) {
      productSplides.forEach(productSplide => {
        new Splide(productSplide, {
          type: 'slide',
          speed: 1e3,
          gap: 26,
          autoWidth: true,
          pagination: false
        }).mount();
      });
    }

    let presentationSplide = document.querySelector('.splide-presentation');
    if (presentationSplide) {
      new Splide(presentationSplide, {
        type: 'fade',
        speed: 1e3,
        pagination: false
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
   * Reveal
   */
  reveal() {
    const largeImage = document.querySelector('.large-image');
    let thumbImages = document.querySelectorAll('.thumb-image');
    if (thumbImages.length) {
      thumbImages.forEach(thumbImage => {
        thumbImage.addEventListener('click', (e) => {
          largeImage.setAttribute('src', thumbImage.getAttribute('href'));
          e.preventDefault();
        });
      });
    }
  },

  /**
   * Accordion
   */
  accordion() {
    const accordions = document.querySelectorAll('.accordion');
    if (accordions.length) {
      accordions.forEach(accordion => {
        const target = document.getElementById(accordion.getAttribute('aria-controls'));
        if (target) {
          accordion.addEventListener('click', (e) => {
            const isActive = accordion.classList.contains('active');
            target.classList.toggle('active');
            accordion.classList.toggle('active');
            accordion.setAttribute('aria-expanded', !isActive);
            e.preventDefault();
          });
        }
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