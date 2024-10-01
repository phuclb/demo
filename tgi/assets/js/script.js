(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.fN();
    },

    /**
     * fN
     */
    fN: () => {
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
