'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.nav();
    App.form();
    App.misc();
    App.slide();
    App.toggle();
    App.reveal();
    App.counter();
    App.accordion();
  },

  /**
   * Nav
   */
  nav() {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
    const getTarget = el => document.getElementById(el.getAttribute('aria-controls'));

    const activate = (toggle, target) => {
      toggle.classList.add('active');
      target?.classList.add('active');
      toggle.setAttribute('aria-expanded', true);
    };
    const deactivate = (toggle, target) => {
      toggle.classList.remove('active');
      target?.classList.remove('active');
      toggle.setAttribute('aria-expanded', false);
    };

    const resetNav = () => {
      $$('.nav-block, .nav-section').forEach(el => el.classList.remove('active', 'inactive'));
      $$('.nav-toggle, .nav-subtoggle').forEach(toggle => deactivate(toggle, getTarget(toggle)));
    };
    const initNav = () => {
      const active = $('.nav-subtoggle.active');
      if (active) {
        return;
      }

      const first = $('.nav-subtoggle');
      const target = first && getTarget(first);

      if (!first || !target) {
        return;
      }

      if (mediaQuery.matches) {
        activate(first, target);
      } else {
        deactivate(first, target);
      }
    };

    // L1 toggle
    $$('.nav-toggle').forEach(toggle => {
      const target = getTarget(toggle);
      if (!target) {
        return;
      }

      toggle.addEventListener('click', e => {
        e.preventDefault();
        const isActive = toggle.classList.contains('active');
        $$('.nav-toggle.active').forEach(activeToggle => {
          const activeTarget = getTarget(activeToggle);
          if (!activeTarget.contains(toggle)) {
            deactivate(activeToggle, activeTarget);
          }
        });
        if (isActive) {
          deactivate(toggle, target);
          resetNav();
          initNav();
        } else {
          activate(toggle, target);
        }
      });
    });

    // Close
    $$('.nav-close').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        $$('.nav-toggle.active').forEach(toggle =>
          deactivate(toggle, getTarget(toggle))
        );
        resetNav();
        initNav();
      });
    });

    // L2 toggles
    const subtoggles = $$('.nav-subtoggle');
    const handleSubToggle = e => {
      if (e.type === 'click') {
        e.preventDefault();
      }
      const toggle = e.currentTarget;
      const target = getTarget(toggle);
      if (!target) {
        return;
      }
      const wrapper = toggle.closest('.nav-block');
      const siblings = [...wrapper.parentNode.children].filter(el => el !== wrapper);
      if (toggle.classList.contains('active')) {
        return;
      }
      $$('.nav-subtoggle.active').forEach(activeToggle =>
        deactivate(activeToggle, getTarget(activeToggle))
      );
      activate(toggle, target);
      wrapper.classList.add('active');
      siblings.forEach(el => el.classList.add('inactive'));
    };

    let currentEvent;
    const updateSubToggleEvents = e => {
      const newEvent = e.matches ? 'pointerenter' : 'click';
      if (currentEvent === newEvent) {
        return;
      }
      subtoggles.forEach(el => {
        if (currentEvent) {
          el.removeEventListener(currentEvent, handleSubToggle);
        }
        el.addEventListener(newEvent, handleSubToggle);
      });
      currentEvent = newEvent;
      resetNav();
      initNav();
    };

    updateSubToggleEvents(mediaQuery);
    mediaQuery.addEventListener('change', updateSubToggleEvents);

    // Back
    $$('.nav-back').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        $$('.nav-subtoggle.active').forEach(toggle => {
          const target = getTarget(toggle);
          const wrapper = toggle.closest('.nav-block');
          const siblings = [...wrapper.parentNode.children].filter(el => el !== wrapper);
          deactivate(toggle, target);
          wrapper.classList.remove('active');
          siblings.forEach(el => el.classList.remove('inactive'));
        });
      });
    });
  },

  /**
   * Slide
   */
  slide() {
    const createSplide = (selector, options) => {
      document.querySelectorAll(selector).forEach(el => {
        new Splide(el, options).mount();
      });
    };

    createSplide('.splide-hero', {
      type: 'slide',
      gap: 20,
      speed: 1000,
      arrows: false,
      autoplay: true,
      interval: 5000,
      classes: {
        pagination: 'splide__pagination i1 d-flex flex-wrap justify-center align-center'
      }
    });

    createSplide('.splide-brand', {
      type: 'loop',
      gap: 16,
      speed: 1000,
      autoWidth: true,
      focus: 'center',
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 3000
    });

    createSplide('.splide-mobile', {
      type: 'slide',
      gap: 20,
      speed: 1000,
      arrows: false,
      pagination: false,
      autoWidth: true
    });

    createSplide('.splide-support', {
      type: 'slide',
      gap: 20,
      speed: 1000,
      arrows: false,
      classes: {
        pagination: 'splide__pagination i2 d-flex flex-wrap justify-center align-center'
      }
    });

    createSplide('.splide-review', {
      type: 'fade',
      gap: 0,
      speed: 1000,
      pagination: false
    });

    createSplide('.splide-priority', {
      type: 'slide',
      gap: 16,
      speed: 1000,
      autoWidth: true,
      arrows: false,
      autoplay: true,
      interval: 4000,
      classes: {
        pagination: 'splide__pagination i1 d-flex flex-wrap justify-start align-center'
      }
    });

    createSplide('.splide-thumb', {
      type: 'slide',
      gap: 12,
      speed: 1000,
      focus: 0,
      autoWidth: true,
      pagination: false,
      omitEnd: true
    });

    createSplide('.splide-product', {
      type: 'slide',
      gap: 26,
      speed: 1000,
      focus: 0,
      autoWidth: true,
      pagination: false,
      omitEnd: true
    });

    createSplide('.splide-presentation', {
      type: 'fade',
      gap: 0,
      speed: 1000,
      pagination: false
    });
  },

  /**
   * Toggle
   */
  toggle() {
    const getTarget = toggle => document.getElementById(toggle.getAttribute('aria-controls'));

    const deactivate = toggle => {
      const target = getTarget(toggle);
      target?.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const activate = toggle => {
      const target = getTarget(toggle);
      target?.classList.add('active');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    };

    const toggleOff = () => {
      document.querySelectorAll('.toggle.active').forEach(deactivate);
    };

    document.addEventListener('click', e => {
      const toggle = e.target.closest('.toggle');
      const dismiss = e.target.closest('.dismiss');

      // Toggle
      if (toggle) {
        e.preventDefault();

        const isActive = toggle.classList.contains('active');

        document.querySelectorAll('.toggle.active').forEach(active => {
          const target = getTarget(active);
          if (!target?.contains(toggle)) {
            deactivate(active);
          }
        });

        if (isActive) {
          deactivate(toggle);
        } else {
          activate(toggle);
        }
        return;
      }

      // Dismiss
      if (dismiss) {
        e.preventDefault();
        toggleOff();
        return;
      }

      // Click
      if (!e.target.closest('.active')) {
        toggleOff();
      }
    });
  },

  /**
   * Reveal
   */
  reveal() {
    const largeImage = document.querySelector('.large-image');
    if (!largeImage) {
      return;
    }
    document.querySelectorAll('.thumb-image').forEach(thumb => {
      thumb.addEventListener('click', e => {
        e.preventDefault();
        largeImage.src = thumb.href;
      });
    });
  },

  /**
   * Accordion
   */
  accordion() {
    document.querySelectorAll('.accordion').forEach(accordion => {
      const targetId = accordion.getAttribute('aria-controls');
      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }
      accordion.addEventListener('click', e => {
        e.preventDefault();
        const isActive = accordion.classList.toggle('active');
        target.classList.toggle('active', isActive);
        accordion.setAttribute('aria-expanded', isActive);
      });
    });
  },

  /**
   * Counter
   */
  counter() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const number = counter.querySelector('.number');
      const decrease = counter.querySelector('.decrease');
      const increase = counter.querySelector('.increase');

      if (!number || !decrease || !increase) {
        return;
      }

      const update = (delta, limit) => {
        const current = parseInt(number.textContent, 10) || 0;
        const next = Math.min(Math.max(current + delta, limit.min), limit.max);
        number.textContent = next;
      };

      decrease.addEventListener('click', e => {
        e.preventDefault();
        const min = parseInt(decrease.dataset.limit, 10);
        update(-1, { min, max: Infinity });
      });

      increase.addEventListener('click', e => {
        e.preventDefault();
        const max = parseInt(increase.dataset.limit, 10);
        update(1, { min: -Infinity, max });
      });
    });
  },

  /**
   * Form
   */
  form() {
    let fConfig = {
      classTo: 'form-pristine',
      errorClass: 'error',
      successClass: 'success',
      errorTextParent: 'form-pristine',
      errorTextTag: 'div',
      errorTextClass: 'form-alert mt-4 text-14 c-red hidden'
    };

    // Search
    const fSearch = document.getElementById('fSearch');
    if (fSearch) {
      const pSearch = new Pristine(fSearch, fConfig);
      fSearch.addEventListener('submit', function(e) {
        const valid = pSearch.validate();
        console.log(valid);
        e.preventDefault();
      });
    }

    // Contact
    const fContact = document.getElementById('fContact');
    if (fContact) {
      const pContact = new Pristine(fContact, fConfig);
      fContact.addEventListener('submit', function(e) {
        const valid = pContact.validate();
        console.log(valid);
        e.preventDefault();
      });
    }

    // Account
    const fAccount = document.getElementById('fAccount');
    if (fAccount) {
      const pAccount = new Pristine(fAccount, fConfig);
      fAccount.addEventListener('submit', function(e) {
        const valid = pAccount.validate();
        console.log(valid);
        e.preventDefault();
      });
    }

    // Store
    const fStore = document.getElementById('fStore');
    if (fStore) {
      const pStore = new Pristine(fStore, fConfig);
      fStore.addEventListener('submit', function(e) {
        const valid = pStore.validate();
        console.log(valid);
        e.preventDefault();
      });
    }

    // Promo
    const fPromo = document.getElementById('fPromo');
    if (fPromo) {
      const pPromo = new Pristine(fPromo, fConfig);
      fPromo.addEventListener('submit', function(e) {
        const valid = pPromo.validate();
        console.log(valid);
        e.preventDefault();
      });
    }
  },

  /**
   * Misc
   */
  misc() {

    // modal
    MicroModal.init({
      disableScroll: true,
      disableFocus: true,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
      debugMode: false
    });

    // matchHeight
    document.body.matchHeight({
      elements: null,
      byRow: true,
      property: 'min-height',
      attributeName: 'data-mh',
      events: true,
      throttle: 80
    });

    // resetInput
    const resetBtn = document.querySelectorAll('button[type="reset"]');
    resetBtn.forEach(button => {
      const input = button.parentElement.querySelector('input');

      if (!input) {
        return;
      }

      button.addEventListener('click', e => {
        e.preventDefault();
        input.value = '';
      });
    });
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