'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.form();
    App.match();
    App.media();
    App.modal();
    App.splide();
    App.toggle();
  },

  /**
   * Toggle
   */
  toggle() {
    const toggles = document.querySelectorAll('.toggle');
    if (toggles.length) {
      toggles.forEach(toggle => {
        const target = document.getElementById(toggle.getAttribute('aria-controls'));
        if (target) {
          toggle.addEventListener('click', (e) => {
            const isActive = toggle.classList.contains('active');
            const activeToggles = document.querySelectorAll('.toggle.active');
            if (!isActive && activeToggles.length) {
              activeToggles.forEach(activeToggle => {
                const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
                if (!activeTarget.contains(toggle)) {
                  activeTarget.classList.remove('active');
                  activeToggle.classList.remove('active');
                  activeToggle.setAttribute('aria-expanded', isActive);
                }
              });
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
          const activeToggles = document.querySelectorAll('.toggle.active');
          if (activeToggles.length) {
            activeToggles.forEach(activeToggle => {
              const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
              activeTarget.classList.remove('active');
              activeToggle.classList.remove('active');
              activeToggle.setAttribute('aria-expanded', false);
            });
          }
        }
      });
    }

    const closes = document.querySelectorAll('.toggle-close');
    if (closes.length) {
      closes.forEach(close => {
        close.addEventListener('click', (e) => {
          const activeToggles = document.querySelectorAll('.toggle.active');
          if (activeToggles.length) {
            activeToggles.forEach(activeToggle => {
              const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
              activeTarget.classList.remove('active');
              activeToggle.classList.remove('active');
              activeToggle.setAttribute('aria-expanded', false);
            });
          }
          e.preventDefault();
        });
      });
    }
  },

  /**
   * Splide
   */
  splide() {
    const gParams = {
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
    const cParams = {
      gap: 24,
      perPage: 1,
      perMove: 1,
      mediaQuery: 'min',
      start: 1,
      breakpoints: {
        768: {
          perPage: 2
        },
        1280: {
          perPage: 1,
          padding: '192px'
        }
      }
    };
    const aSplides = document.querySelectorAll('.splide');
    if (aSplides.length) {
      aSplides.forEach(iSplide => {
        const xParams = iSplide.classList.contains('splide__general') ? gParams : cParams;
        const xSplide = new Splide(iSplide, xParams).on('ready resized', () => {
          const isOverflow = xSplide.options.perPage === xSplide.length;
          iSplide.classList.toggle('is-overflow', !isOverflow);
        });
        xSplide.mount();
      });
    }
  },

  /**
   * Match
   */
  match() {
    document.body.matchHeight({
      property: 'min-height',
      attributeName: 'data-mh'
    });
  },

  /**
   * Form
   */
  form() {
    const frmOption = document.querySelectorAll('.frm_radio, .frm_checkbox');
    if (frmOption.length) {
      frmOption.forEach(option => {
        const label = option.querySelector('label');
        if (label) {
          label.insertAdjacentHTML('beforeend', '<span><svg width="17" height="11" aria-hidden="true" focusable="false"><use href="' + App.path() + '/sprites.svg#tick"></use></svg></span>');
        }
      });
    }

    const frmNux = document.querySelectorAll('.form-nux');
    if (frmNux.length) {
      frmNux.forEach(form => {
        const frmNuxField = form.querySelectorAll('.frm_form_field');
        if (frmNuxField.length) {
          frmNuxField.forEach((field, index) => {
            field.classList.add('frm_nth_' + index);
          });
        }
      });
    }

    const frmNewsletter = document.querySelector('.form-newsletter');
    if (frmNewsletter) {
      const frmNewsletterField = frmNewsletter.querySelectorAll('.frm_form_field');
      if (frmNewsletterField.length) {
        frmNewsletterField.forEach((field, index) => {
          field.classList.add('frm_nth_' + index);
        });
      }
    }
  },

  /**
   * Media
   */
  media() {
    const media = document.querySelectorAll('.media');
    if (media.length) {
      media.forEach(item => {
        const button = item.querySelector('.media-button');
        const iframe = item.querySelector('.media-embed iframe');
        if (button && iframe) {
          button.addEventListener('click', (e) => {
            iframe.setAttribute('src', iframe.getAttribute('data-src'));
            iframe.removeAttribute('data-src');
            item.classList.add('active');
            e.preventDefault();
          });
        }
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
   * Path
   */
  path() {
    let path = 'assets/img';
    const svg = document.querySelector('.header-svg');
    if (svg) {
      path = svg.getAttribute('src');
      path = path.substring(0, path.lastIndexOf('/'));
    }
    return path;
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