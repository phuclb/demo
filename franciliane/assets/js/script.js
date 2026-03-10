'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.form();
  },

  /**
   * Form
   */
  form() {
    const mForm = document.getElementById('mForm');
    if (mForm) {
      const confirm = mForm.querySelector('.form-confirm');
      const pristine = new Pristine(mForm, {
        classTo: 'form-pristine',
        errorClass: 'error',
        successClass: 'success',
        errorTextParent: 'form-pristine',
        errorTextTag: 'div',
        errorTextClass: 'form-alert'
      });
      mForm.addEventListener('submit', function(e) {
        confirm.classList.toggle('active', pristine.validate());
        e.preventDefault();
      });
    }
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