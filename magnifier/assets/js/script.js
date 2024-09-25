(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.demo();
    },

    /**
     * fN
     */
    demo: () => {
      const wrapper = document.querySelector('.demo-wrapper');
      const button = document.querySelectorAll('.demo-button');
      if (button.length) {
        button.forEach(btn => {
          const dts = btn.dataset;
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            wrapper.setAttribute(
              'style',
              `--clip-x: ${dts.clipX + "%"}; --clip-y: ${dts.clipY + "%"}; --clip-r: ${dts.clipR}; --magnify: ${dts.magnify};`
            );
          });
        });
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
