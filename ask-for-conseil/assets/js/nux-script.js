'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.card();
    App.slide();
    App.misc();
  },

  /**
   * Card
   */
  card() {
  },

  /**
   * Slide
   */
  slide() {
    const createSplide = (selector, options) => {
      document.querySelectorAll(selector).forEach(el => {
        let splide = new Splide(el, options);

        // element
        const index = el.querySelector('.splide__index');
        const total = el.querySelector('.splide__total');

        // event
        splide.on('ready', () => {
          index.textContent = splide.index + 1;
          total.textContent = splide.length;
        }).on('moved', () => {
          index.textContent = splide.index + 1;
        });

        // mount
        splide.mount();
      });
    };

    createSplide('.splide-card', {
      type: 'slide',
      gap: 20,
      speed: 1000,
      focus: 0,
      autoWidth: true,
      pagination: false,
      omitEnd: true
    });
  },

  /**
   * Misc
   */
  misc() {
    document.body.matchHeight({
      elements: null,
      byRow: true,
      property: 'min-height',
      attributeName: 'data-mh',
      events: true,
      throttle: 80
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