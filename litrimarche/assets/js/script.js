'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.splide();
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
        reducedMotion: {
          speed: 0,
          autoplay: false
        }
      }).mount();
    }

    let reviewClass = '.splide-review', reviewSplide = document.querySelector(reviewClass);
    if (reviewSplide) {
      reviewSplide = new Splide(reviewClass, {
        type: 'fade',
        speed: 750,
        gap: 0,
        pagination: false,
        autoplay: true,
        interval: 5000,
        reducedMotion: {
          speed: 0,
          autoplay: false
        }
      }).mount();
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