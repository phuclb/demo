(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.toggler();
      App.scroller();
      App.article();
      App.accordion();
    },

    active: 'active',
    expanded: 'expanded',
    collapsed: 'collapsed',

    /**
     * Header
     */
    header: () => {
      const header = document.querySelector('.header');
      document.addEventListener('scroll', () => {
        let wScrollY = window.scrollY;
        header.classList.toggle('header-shrank', wScrollY > 70);
      });
    },

    /**
     * Toggler
     */
    toggler: () => {
      const toggleModal = document.querySelectorAll('.toggle-modal');
      const toggleButton = document.querySelectorAll('.toggle-button');
      if (toggleButton.length) {
        toggleButton.forEach(button => {
          const id = button.getAttribute('href');
          const modal = document.querySelector(id);
          button.addEventListener('click', e => {
            if (modal) {
              if (!modal.classList.contains(App.active)) {
                toggleModal.forEach(modal => modal.classList.remove(App.active));
                toggleButton.forEach(button => {
                  button.classList.remove(App.active);
                  button.setAttribute('aria-expanded', false);
                });
                modal.classList.add(App.active);
                button.classList.add(App.active);
                button.setAttribute('aria-expanded', true);
              } else {
                modal.classList.remove(App.active);
                button.classList.remove(App.active);
                button.setAttribute('aria-expanded', false);
              }
            }
            e.preventDefault();
          });
        });
      }
    },

    /**
     * Article
     */
    article: () => {
      const articleList = document.querySelectorAll(".article-list");
      if (articleList.length) {
        articleList.forEach(list => {
          list.matchHeight({
            property: 'min-height',
            attributeName: 'article-body'
          });
        });
      }

      const articleMax = 6;
      const articleMore = document.querySelectorAll(".article-more");
      if (articleMore.length) {
        articleMore.forEach(button => {
          const id = button.getAttribute('href');
          const target = document.querySelector(id);
          button.addEventListener('click', e => {
            if (target) {
              let articleHiddenItems = target.querySelectorAll('.article-item.m-d-hidden');
              if (articleHiddenItems) {
                if (articleHiddenItems.length > articleMax) {
                  articleHiddenItems.forEach((item, index) => {
                    if (index < articleMax) {
                      item.classList.remove('m-d-hidden');
                    }
                  });
                } else {
                  articleHiddenItems.forEach(item => {
                    item.classList.remove('m-d-hidden');
                  });
                  button.classList.add('m-d-hidden');
                }

                // matchHeight
                window.dispatchEvent(new Event('resize'));
              }
            }
            e.preventDefault();
          });
        });
      }
    },

    /**
     * Accordion
     */
    accordion: () => {
      const accordionModal = document.querySelectorAll('.accordion-modal');
      const accordionButton = document.querySelectorAll('.accordion-button');
      if (accordionButton.length) {
        accordionButton.forEach(button => {
          const id = button.getAttribute('href');
          const modal = document.querySelector(id);
          button.addEventListener('click', e => {
            if (modal) {
              if (!modal.classList.contains(App.expanded)) {

                // Reset
                accordionModal.forEach(modal => modal.classList.remove(App.expanded));
                accordionButton.forEach(button => {
                  button.classList.remove(App.expanded);
                  button.setAttribute('aria-expanded', false);
                });

                // Set
                modal.classList.add(App.expanded);
                button.classList.add(App.expanded);
                button.setAttribute('aria-expanded', true);

                // Scroll
                const modalPos = modal.getBoundingClientRect().top;
                const buttonPos = button.getBoundingClientRect().top;
                const scrollPos = modalPos > buttonPos ? buttonPos : modalPos;
                App.scrollTo(scrollPos);
              } else {
                // Keep at least ONE item expanded
                /*
                modal.classList.remove(App.expanded);
                button.classList.remove(App.expanded);
                button.setAttribute('aria-expanded', false);
                */
              }
            }
            e.preventDefault();
          });
        });
      }
    },

    /**
     * Scroller
     */
    scroller: () => {
      const scroller = document.querySelectorAll('.scroller');
      if (scroller.length) {
        scroller.forEach(button => {
          const id = button.getAttribute('href');
          const target = document.querySelector(id);
          button.addEventListener('click', e => {
            if (target) {
              const scrollPos = target.getBoundingClientRect().top;
              App.scrollTo(scrollPos);
            }
            e.preventDefault();
          });
        });
      }
    },

    /**
     * ScrollTo
     */
    scrollTo: (scrollPos) => {
      const headerH = document.querySelector('.header').getBoundingClientRect().height;
      const wScrollY = window.scrollY;
      window.scrollTo({
        top: scrollPos + wScrollY - headerH,
        behavior: 'auto'
      });
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
