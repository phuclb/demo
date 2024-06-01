(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.document();
    },

    /**
     * Document
     */
    document: () => {
      const documentSlide = document.querySelector('.document-slide');
      if (documentSlide) {
        const dSplide = new Splide('.document-slide', {
          drag: false,
          arrows: false,
          mediaQuery: 'min',
          perPage: 1,
          perMove: 1,
          breakpoints: {
            640: {
              perPage: 2
            },
            768: {
              perPage: 3
            },
            1024: {
              perPage: 4
            }
          }
        });
        dSplide.on('ready resized', () => {
          documentSlide.matchHeight({
            property: 'min-height'
          });
        });
        dSplide.mount();
      }
    }

  };

  const ready = (callback) => {
    if (document.readyState != 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };

  ready(() => {
    App.init();
  });

})();
