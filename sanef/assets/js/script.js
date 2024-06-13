(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.fN();
    },

    /**
     * fN
     */
    fN: () => {

      // Splide
      const splide = new Splide('.splide', {
        drag: 'free',
        perPage: 1,
        perMove: 1,
        gap: 30,
        arrows: false,
        pagination: false,
        mediaQuery: 'min',
        breakpoints: {
          560: {
            perPage: 2
          },
          960: {
            perPage: 3
          }
        }
      });
      const splideX = document.querySelector('.splideX');
      const splideList = document.querySelector('.splide__list');
      const splideSlide = document.querySelector('.splide__slide');
      const splideGap = 30;
      const splideInTotal = 9;
      let splideXStart, splideXEnd, splideSlideW, splidePerPage;
      splide.on('mounted resized', () => {
        let splideXMT = 0;
        splideX.style.marginTop = splideXMT + 'px';
        splideList.style.transform = 'translateX(' + -splideXMT + 'px)';

        splidePerPage = splide.options.perPage;
        splideSlideW = Math.floor(splideSlide.getBoundingClientRect().width);
        splideXStart = Math.floor(splideX.offsetTop);
        splideXEnd = (splideSlideW + splideGap) * (splideInTotal - splidePerPage);
      }).mount();
      const splideControl = (scrollPos) => {
        let splideXMT = 0;
        if (scrollPos >= splideXStart) {
          if (scrollPos <= (splideXEnd + splideXStart)) {
            splideXMT = scrollPos - splideXStart;
          } else {
            splideXMT = splideXEnd;
          }
        }
        splideX.style.marginTop = splideXMT + 'px';
        splideList.style.transform = 'translateX(' + -splideXMT + 'px)';
      };

      // IntersectionObserver
      const blocks = document.querySelectorAll('.block');
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      };
      const observerCallback = (entries) => {
        entries.forEach((entry, index) => {
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          //   entry.isIntersecting
          //   entry.rootBounds
          //   entry.target
          //   entry.time
          console.log(index + ': ' + entry.isIntersecting);
        });
      };
      const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
      );
      blocks.forEach(block => {
        observer.observe(block);
      });

      // Scroll
      let ticking = false;
      let lastKnownScrollPos = 0;
      document.addEventListener('scroll', () => {
        lastKnownScrollPos = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            splideControl(lastKnownScrollPos);
            ticking = false;
          });
          ticking = true;
        }
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
