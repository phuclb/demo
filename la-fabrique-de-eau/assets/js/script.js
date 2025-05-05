'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.form();
    App.match();
    App.media();
    App.modal();
    App.splide();
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

    const allCloses = document.querySelectorAll('.toggle-close');
    if (allCloses.length) {
      allCloses.forEach(close => {
        close.addEventListener('click', (e) => {
          const activeToggle = document.querySelector('.toggle.active');
          if (activeToggle) {
            const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
            activeTarget.classList.remove('active');
            activeToggle.classList.remove('active');
            activeToggle.setAttribute('aria-expanded', false);
          }
          e.preventDefault();
        });
      });
    }
  },

  /**
   * Splide
   */
  splide() {
    const generalParams = {
      gap: 24,
      perPage: 1,
      perMove: 1,
      mediaQuery: 'min',
      breakpoints: {
        768: {
          perPage: 2,
        },
        1280: {
          perPage: 3
        }
      }
    };
    const generalSplide = document.querySelectorAll('.splide__general');
    if (generalSplide.length) {
      generalSplide.forEach(slider => {
        new Splide(slider, generalParams).mount();
      });
    }

    const carouselParams = {
      gap: 24,
      perPage: 1,
      perMove: 1,
      start: 1,
      mediaQuery: 'min',
      breakpoints: {
        768: {
          perPage: 2
        },
        1280: {
          gap: 48,
          perPage: 1,
          padding: '216px'
        }
      }
    };
    const carouselSplide = document.querySelectorAll('.splide__carousel');
    if (carouselSplide.length) {
      carouselSplide.forEach(slider => {
        new Splide(slider, carouselParams).mount();
      });
    }
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
   * Form
   */
  form() {
  },

  /**
   * Media
   */
  media() {
    const media = document.querySelectorAll('.media');
    if (media.length) {
      media.forEach(item => {
        const button = item.querySelector('.media-button');
        const iframe = item.querySelector('.media-embed iframe');
        button.addEventListener('click', (e) => {
          iframe.setAttribute('src', iframe.getAttribute('data-src'));
          iframe.removeAttribute('data-src');
          item.classList.add('active');
          e.preventDefault();
        });
      });
    }
  },

  /**
   * Modal
   */
  modal() {
    MicroModal.init({
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true
    });
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