'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.match();
    App.toggle();
    App.filter();
    App.splide();
    App.masonry();
    App.datepicker();
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
   * Datepicker
   */
  datepicker() {
    new AirDatepicker('#adp', {
      inline: true
    });
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
          App.toggleOff();
        }
      });
    }
  },
  toggleOff() {
    const activeToggles = document.querySelectorAll('.toggle.active');
    if (activeToggles.length) {
      activeToggles.forEach(activeToggle => {
        const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
        activeTarget.classList.remove('active');
        activeToggle.classList.remove('active');
        activeToggle.setAttribute('aria-expanded', false);
      });
    }
  },

  /**
   * Filter
   */
  filter() {
    const dropdownA = document.querySelectorAll('.filter-dropdown');
    if (dropdownA.length) {
      dropdownA.forEach(dropdownB => {
        const valueB = dropdownB.querySelector('.filter-value');
        const optionB = dropdownB.querySelectorAll('.filter-option');
        if (optionB.length) {

          // Init
          const selectedOptionB = dropdownB.querySelector('.filter-option.selected');
          if (selectedOptionB) {
            const selectedOutputB = selectedOptionB.getAttribute('data-value');
            valueB.innerHTML = selectedOutputB;
            valueB.classList.add('selected');
          } else {
            valueB.value = '';
            valueB.classList.remove('selected');
          }

          // Handle
          optionB.forEach(optionX => {
            optionX.addEventListener('click', (e) => {
              const isSelected = optionX.classList.contains('selected');
              if (!isSelected) {
                valueB.innerHTML = optionX.getAttribute('data-value');
                optionB.forEach(optionY => {
                  if (optionY !== optionX) {
                    optionY.classList.toggle('selected', false);
                  }
                });
              } else {
                valueB.innerHTML = valueB.getAttribute('data-placeholder');
              }
              valueB.classList.toggle('selected', !isSelected);
              optionX.classList.toggle('selected', !isSelected);
              App.toggleOff();
              e.preventDefault();
            });
          });
        }
      });
    }
  },

  /**
   * Splide
   */
  splide() {
    const gParams = {
      gap: 20,
      perPage: 1,
      perMove: 1,
      pagination: false,
      mediaQuery: 'min',
      breakpoints: {
        768: {
          gap: 30,
          perPage: 2
        },
        1280: {
          perPage: 3
        }
      }
    };
    const sGeneral = document.querySelectorAll('.splide__general');
    if (sGeneral.length) {
      sGeneral.forEach(iSplide => {
        const xSplide = new Splide(iSplide, gParams).on('ready resized', () => {
          const isOverflow = xSplide.options.perPage === xSplide.length;
          iSplide.classList.toggle('is-overflow', !isOverflow);
        });
        xSplide.mount();
      });
    }
  },

  /**
   * Masonry
   */
  masonry() {
    const courseGrid = document.querySelector('.course-grid');
    if (courseGrid) {
      new Masonry(courseGrid, {
        itemSelector: '.course-item',
        percentPosition: true,
        horizontalOrder: false,
        transitionDuration: '0.25s'
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