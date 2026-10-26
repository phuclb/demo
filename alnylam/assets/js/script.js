'use strict';

const App = {
  init() {
    App.form();
  },

  // Form
  form() {
    let fConfig = {
      classTo: 'form-pristine',
      errorClass: 'form-error',
      successClass: 'form-success',
      errorTextParent: 'form-pristine',
      errorTextTag: 'div',
      errorTextClass: 'form-alert'
    };

    const fConnect = document.getElementById('fConnect');
    if (fConnect) {
      const pConnect = new Pristine(fConnect, fConfig);
      fConnect.addEventListener('submit', function(e) {
        const valid = pConnect.validate();
        console.log(valid);
        e.preventDefault();
      });
    }
  }
};

// Initialize the app when the DOM is ready
const onReady = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};
onReady(() => App.init());