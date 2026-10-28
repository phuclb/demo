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

    const fConnect = document.getElementById('fConnect'), fMessage = fConnect.querySelector('.form-message');
    if (fConnect) {
      const pConnect = new Pristine(fConnect, fConfig);
      fConnect.addEventListener('submit', function(e) {
        const isFormValid = pConnect.validate();
        fMessage.classList.toggle('hidden', !isFormValid);
        e.preventDefault();
      });
      fConnect.addEventListener('input', function() {
        const isFormValid = pConnect.validate();
        if (!isFormValid) {
          fMessage.classList.add('hidden');
        }
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