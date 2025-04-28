'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.form();
    App.modal();
    App.slider();
    App.matcher();
    App.toggler();
  },

  /**
   * Toggler
   */
  toggler() {
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
   * Slider
   */
  slider() {
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
      type: 'loop',
      gap: 24,
      perPage: 1,
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
   * Matcher
   */
  matcher() {
    document.body.matchHeight({
      property: 'min-height',
      attributeName: 'data-mh'
    });
  },

  /**
   * Form
   */
  form() {
    const fileInput = document.querySelectorAll('input[type="file"]');
    if (fileInput.length) {
      fileInput.forEach(input => {
        input.addEventListener('change', () => {
          console.log(input.value);
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
  },

  /**
   * Scroller
   */
  scroller: () => {
    const scroller = document.querySelectorAll('.scroller');
    if (scroller.length) {
      scroller.forEach(button => {
        const id = button.getAttribute('href');
        const target = document.querySelector(id);
        button.addEventListener('click', e => {
          if (target) {
            const scrollPos = target.getBoundingClientRect().top;
            App.scrollTo(scrollPos);
          }
          e.preventDefault();
        });
      });
    }
  },

  /**
   * ScrollTo
   */
  scrollTo: (scrollPos) => {
    const headerH = document.querySelector('.header').getBoundingClientRect().height;
    const wScrollY = window.scrollY;
    window.scrollTo({
      top: scrollPos + wScrollY - headerH,
      behavior: 'auto'
    });
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