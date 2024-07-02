(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.slider();
      App.toggle();
      App.dropdown();
      App.matchHeight();
    },

    /**
     * Settings
     */
    active: 'active',
    expanded: 'expanded',
    selected: 'selected',
    ariaLabel: 'aria-label',
    ariaControls: 'aria-controls',
    ariaExpanded: 'aria-expanded',

    /**
     * Toggle
     */
    toggle: () => {
      const toggleA = document.querySelectorAll('.toggle');
      if (toggleA.length) {
        toggleA.forEach(toggleB => {
          toggleB.addEventListener('click', (e) => {
            let isExpanded = toggleB.getAttribute(App.ariaExpanded) === 'true';
            isExpanded = isExpanded ? true : false;
            App.toggleControl(toggleB, !isExpanded);
            if (!isExpanded) {
              toggleA.forEach(toggleC => {
                if (toggleC !== toggleB) {
                  App.toggleControl(toggleC, false);
                }
              });
            }
            e.preventDefault();
          });
        });
      }
    },
    toggleControl: (toggle, isExpanded) => {
      const control = document.querySelector('#' + toggle.getAttribute(App.ariaControls));
      if (control) {
        toggle.setAttribute(App.ariaExpanded, isExpanded);
        control.classList.toggle(App.expanded, isExpanded);
      }
    },

    /**
     * Dropdown
     */
    dropdown: () => {
      const dropdownA = document.querySelectorAll('.dropdown');
      if (dropdownA.length) {
        dropdownA.forEach(dropdownB => {
          const inputB = dropdownB.querySelector('.dropdown-input');
          const labelB = dropdownB.querySelector('.dropdown-label');
          const toggleB = dropdownB.querySelector('.dropdown-toggle');
          const optionB = dropdownB.querySelectorAll('.dropdown-option');
          if (optionB.length) {
            optionB.forEach(optionX => {
              optionX.addEventListener('click', () => {
                const isSelected = optionX.classList.contains(App.selected);
                if (!isSelected) {
                  inputB.value = optionX.innerHTML;
                  labelB.innerHTML = optionX.innerHTML;
                  optionB.forEach(optionY => {
                    if (optionY !== optionX) {
                      optionY.classList.toggle(App.selected, false);
                    }
                  });
                } else {
                  inputB.value = '';
                  labelB.innerHTML = inputB.getAttribute(App.ariaLabel);
                }
                optionX.classList.toggle(App.selected, !isSelected);
                App.toggleControl(toggleB, false);
              });
            });
          }
        });
      }
    },

    /**
     * Slider
     */
    slider: () => {
      var information = document.querySelector('.splide-information');
      if (information) {
        new Splide(information, {
          perPage: 1,
          perMove: 1,
          gap: 25,
          pagination: false,
          mediaQuery: 'min',
          breakpoints: {
            768: {
              perPage: 2,
              gap: 50
            }
          }
        }).on('ready resize', () => {
          window.dispatchEvent(new Event('resize'));
        }).mount();
      }
    },

    /**
     * MatchHeight
     */
    matchHeight: () => {
      document.body.matchHeight({
        byRow: true,
        property: 'min-height',
        attributeName: 'data-mh'
      });
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
