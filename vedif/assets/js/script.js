(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.formSelect();
      App.formExtra();
      App.formValidation();
    },

    /**
     * Form Select
     */
    formSelect: () => {
      const fSelect = document.querySelectorAll('.form-select');
      if (fSelect) {
        fSelect.forEach((select) => {
          const fLabel = App.prevEl(select, '.form-label');
          const fSpan = document.createElement('span');
          fLabel.append(fSpan);
          App.formSelectControl(select, fSpan);
          select.addEventListener('change', () => App.formSelectControl(select, fSpan));
        });
      }
    },
    formSelectControl: (select, span) => {
      if (select.selectedIndex) {
        const value = select.options[select.selectedIndex].text;
        span.innerHTML = ' - ' + value;
      }
    },

    /**
     * Form Extra
     */
    formExtra: () => {
      const fSelect = document.querySelector('.form-extra--select');
      const fContainer = document.querySelector('.form-extra--container');
      const fExtra = fContainer.querySelectorAll('[disabled]');
      if (fSelect && fContainer) {
        App.formExtraControl(fSelect, fContainer, fExtra);
        fSelect.addEventListener('change', () => App.formExtraControl(fSelect, fContainer, fExtra));
      }
    },
    formExtraControl: (select, container, extra) => {
      if (select.selectedIndex) {
        const value = select.options[select.selectedIndex].text;
        if (value.toLowerCase() === 'oui') {
          container.classList.remove('hidden');
          extra.forEach(element => element.removeAttribute('disabled'));
        } else {
          container.classList.add('hidden');
          extra.forEach(element => element.setAttribute('disabled', true));
        }
      }
    },

    /**
     * Form Validation
     */
    formValidation: () => {
      const form = document.getElementById('form');
      if (form) {
        const fConfirm = form.querySelector('.form-confirm');
        const fContainer = form.querySelector('.form-container');
        const fPristine = new Pristine(form, {
          classTo: 'form-pristine',
          errorClass: 'error',
          successClass: 'success',
          errorTextParent: 'form-pristine',
          errorTextTag: 'div',
          errorTextClass: 'form-alert'
        });
        form.addEventListener('submit', (e) => {
          const activeInputs = (form) => [...form.elements].filter(input => !input.disabled);
          const isValid = fPristine.validate(activeInputs(form));
          if (isValid) {
            fConfirm.classList.remove('hidden');
            fContainer.classList.add('hidden');
            console.log('Success');
          } else {
            console.log('Error');
          }
          e.preventDefault();
        });
      }
    },

    /**
     * Misc
     */
    prevEl: (el, selector) => {
      const prevEl = el.previousElementSibling;
      if (!selector || (prevEl && prevEl.matches(selector))) {
        return prevEl;
      }
      return null;
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
