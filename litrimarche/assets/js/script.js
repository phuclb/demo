'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.nav();
    App.misc();
    App.slide();
    App.toggle();
    App.reveal();
    App.accordion();
    App.counter();
  },

  /**
   * Nav
   */
  nav() {
    let isDesktop = null;
    let currentEvent = null;
    const mediaQuery = window.matchMedia('(min-width: 1280px)');

    // init
    const navInit = (isDesktop) => {
      const activeToggleL2 = document.querySelector('.nav-subtoggle.active');
      if (!activeToggleL2) {
        const firstToggleL2 = document.querySelector('.nav-subtoggle');
        if (firstToggleL2) {
          const firstTarget = document.getElementById(firstToggleL2.getAttribute('aria-controls'));
          if (firstTarget) {
            if (isDesktop) {
              firstToggleL2.classList.add('active');
              firstTarget.classList.add('active');
            } else {
              firstToggleL2.classList.remove('active');
              firstTarget.classList.remove('active');
            }
          }
        }
      }
    };

    // reset
    const navReset = () => {
      const blocks = document.querySelectorAll('.nav-block, .nav-section');
      if (blocks.length) {
        blocks.forEach(block => block.classList.remove('active', 'inactive'));
      }
      const toggles = document.querySelectorAll('.nav-toggle, .nav-subtoggle');
      if (toggles.length) {
        toggles.forEach(toggle => {
          const target = document.getElementById(toggle.getAttribute('aria-controls'));
          if (target) {
            target.classList.remove('active');
            toggle.classList.remove('active');
          }
        });
      }
    };

    // toggle
    const toggleL1 = document.querySelectorAll('.nav-toggle');
    if (toggleL1.length) {
      toggleL1.forEach(toggle => {
        const target = document.getElementById(toggle.getAttribute('aria-controls'));
        if (target) {
          toggle.addEventListener('click', (e) => {
            const isActive = toggle.classList.contains('active');
            const activeToggles = document.querySelectorAll('.nav-toggle.active');
            if (!isActive) {
              if (activeToggles.length) {
                activeToggles.forEach(activeToggle => {
                  const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
                  if (!activeTarget.contains(toggle)) {
                    activeTarget.classList.remove('active');
                    activeToggle.classList.remove('active');
                    activeToggle.setAttribute('aria-expanded', isActive);
                  }
                });
              }
              target.classList.add('active');
              toggle.classList.add('active');
              toggle.setAttribute('aria-expanded', true);
            } else {
              target.classList.remove('active');
              toggle.classList.remove('active');
              toggle.setAttribute('aria-expanded', false);
              navReset();
              navInit(isDesktop);
            }
            e.preventDefault();
          });
        }
      });
    }
    const close = document.querySelectorAll('.nav-close');
    if (close.length) {
      close.forEach(close => {
        close.addEventListener('click', (e) => {
          const activeToggleL1 = document.querySelectorAll('.nav-toggle.active');
          if (activeToggleL1.length) {
            activeToggleL1.forEach(activeToggle => {
              const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
              activeTarget.classList.remove('active');
              activeToggle.classList.remove('active');
              activeToggle.setAttribute('aria-expanded', false);
              navReset();
              navInit(isDesktop);
            });
          }
          e.preventDefault();
        });
      });
    }

    // subtoggle
    const toggleL2 = document.querySelectorAll('.nav-subtoggle');
    if (toggleL2.length) {
      const handleEvent = (e) => {
        const newEvent = e.matches ? 'pointerenter' : 'click';
        if (currentEvent === newEvent) {
          return;
        }
        toggleL2.forEach(el => {
          if (currentEvent) {
            el.removeEventListener(currentEvent, handleSubToggle);
          }
          el.addEventListener(newEvent, handleSubToggle);
        });
        currentEvent = newEvent;

        isDesktop = e.matches ? true : false;
        navReset();
        navInit(isDesktop);
      };
      const handleSubToggle = (e) => {
        const toggle = e.currentTarget;
        const wrapper = toggle.closest('.nav-block');
        const wrapperSiblings = [...wrapper.parentNode.children].filter((child) => child !== wrapper);
        const target = document.getElementById(toggle.getAttribute('aria-controls'));
        if (target) {
          const isActive = toggle.classList.contains('active');
          if (!isActive) {
            const activeToggles = document.querySelectorAll('.nav-subtoggle.active');
            if (activeToggles.length) {
              activeToggles.forEach(activeToggle => {
                const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
                if (!activeTarget.contains(toggle)) {
                  activeTarget.classList.remove('active');
                  activeToggle.classList.remove('active');
                  activeToggle.setAttribute('aria-expanded', false);
                }
              });
            }
            target.classList.add('active');
            toggle.classList.add('active');
            wrapper.classList.add('active');
            if (wrapperSiblings.length) {
              wrapperSiblings.forEach(block => block.classList.add('inactive'));
            }
            toggle.setAttribute('aria-expanded', true);
          }
        }
      };

      handleEvent(mediaQuery);
      mediaQuery.addEventListener('change', handleEvent);
    }
    const back = document.querySelectorAll('.nav-back');
    if (back.length) {
      back.forEach(back => {
        back.addEventListener('click', (e) => {
          const activeToggleL2 = document.querySelectorAll('.nav-subtoggle.active');
          if (activeToggleL2.length) {
            activeToggleL2.forEach(activeToggle => {
              const activeWrapper = activeToggle.closest('.nav-block');
              const activeWrapperSiblings = [...activeWrapper.parentNode.children].filter((child) => child !== activeWrapper);
              const activeTarget = document.getElementById(activeToggle.getAttribute('aria-controls'));
              activeTarget.classList.remove('active');
              activeToggle.classList.remove('active');
              activeToggle.setAttribute('aria-expanded', false);
              activeWrapper.classList.toggle('active');
              if (activeWrapperSiblings.length) {
                activeWrapperSiblings.forEach(block => block.classList.remove('inactive'));
              }
            });
          }
          e.preventDefault();
        });
      });
    }
  },

  /**
   * Slide
   */
  slide() {
    let heroSplide = document.querySelector('.splide-hero');
    if (heroSplide) {
      new Splide(heroSplide, {
        type: 'slide',
        speed: 1e3,
        gap: 0,
        arrows: false,
        autoplay: true,
        interval: 5000,
        classes: {
          pagination: 'splide__pagination justify-center'
        }
      }).mount();
    }

    let brandSplide = document.querySelector('.splide-brand');
    if (brandSplide) {
      new Splide(brandSplide, {
        type: 'loop',
        speed: 1e3,
        gap: 16,
        autoWidth: true,
        focus: 'center',
        arrows: false,
        pagination: false,
        autoplay: true,
        interval: 3000
      }).mount();
    }

    let reviewSplide = document.querySelector('.splide-review');
    if (reviewSplide) {
      new Splide(reviewSplide, {
        type: 'fade',
        speed: 1e3,
        gap: 0,
        pagination: false
      }).mount();
    }

    let prioritySplide = document.querySelector('.splide-priority');
    if (prioritySplide) {
      new Splide(prioritySplide, {
        type: 'slide',
        speed: 1e3,
        gap: 16,
        autoWidth: true,
        arrows: false,
        autoplay: true,
        interval: 4000,
        classes: {
          pagination: 'splide__pagination justify-start'
        }
      }).mount();
    }

    let thumbSplide = document.querySelector('.splide-thumb');
    if (thumbSplide) {
      new Splide(thumbSplide, {
        type: 'slide',
        speed: 1e3,
        gap: 12,
        focus: 0,
        autoWidth: true,
        pagination: false,
        omitEnd: true
      }).mount();
    }

    let productSplides = document.querySelectorAll('.splide-product');
    if (productSplides.length) {
      productSplides.forEach(productSplide => {
        new Splide(productSplide, {
          type: 'slide',
          speed: 1e3,
          gap: 26,
          focus: 0,
          autoWidth: true,
          pagination: false,
          omitEnd: true
        }).mount();
      });
    }

    let presentationSplide = document.querySelector('.splide-presentation');
    if (presentationSplide) {
      new Splide(presentationSplide, {
        type: 'fade',
        speed: 1e3,
        pagination: false
      }).mount();
    }
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

    const dismisses = document.querySelectorAll('.dismiss');
    if (dismisses.length) {
      dismisses.forEach(dismiss => {
        dismiss.addEventListener('click', (e) => {
          App.toggleOff();
          e.preventDefault();
        });
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
   * Reveal
   */
  reveal() {
    const largeImage = document.querySelector('.large-image');
    let thumbImages = document.querySelectorAll('.thumb-image');
    if (thumbImages.length) {
      thumbImages.forEach(thumbImage => {
        thumbImage.addEventListener('click', (e) => {
          largeImage.setAttribute('src', thumbImage.getAttribute('href'));
          e.preventDefault();
        });
      });
    }
  },

  /**
   * Accordion
   */
  accordion() {
    const accordions = document.querySelectorAll('.accordion');
    if (accordions.length) {
      accordions.forEach(accordion => {
        const target = document.getElementById(accordion.getAttribute('aria-controls'));
        if (target) {
          accordion.addEventListener('click', (e) => {
            const isActive = accordion.classList.contains('active');
            target.classList.toggle('active');
            accordion.classList.toggle('active');
            accordion.setAttribute('aria-expanded', !isActive);
            e.preventDefault();
          });
        }
      });
    }
  },

  /**
   * Counter
   */
  counter() {
    let counter = document.querySelectorAll('.counter');
    if (counter.length) {
      counter.forEach(counter => {
        const number = counter.querySelector('.number');
        const decrease = counter.querySelector('.decrease');
        const increase = counter.querySelector('.increase');
        decrease.addEventListener('click', (e) => {
          const limit = parseInt(decrease.getAttribute('data-limit'));
          let value = parseInt(number.innerHTML);
          value = (value > limit) ? (value - 1) : limit;
          number.innerHTML = value;
          e.preventDefault();
        });
        increase.addEventListener('click', (e) => {
          const limit = parseInt(increase.getAttribute('data-limit'));
          let value = parseInt(number.innerHTML);
          value = (value < limit) ? (value + 1) : limit;
          number.innerHTML = value;
          e.preventDefault();
        });
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