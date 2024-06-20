(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.fNItem();
    },

    /**
     * Item
     */
    fNItem: () => {
      const itemX = document.querySelectorAll('.itemX');
      const itemXTotal = itemX.length;
      const itemXTemp = new Array(itemXTotal).fill(0);
      const scrollbarToggle = (isScrollable) => {
        const viewport = document.querySelector('html');
        viewport.classList.toggle('of--hidden', isScrollable);
      };
      if (itemXTotal) {
        itemX.forEach((itemY, itemYId) => {
          const isSplide = itemY.classList.contains('splideX');
          const isFigure = itemY.classList.contains('figureX');

          // Splide
          if (isSplide) {
            const splideY = itemY;
            const splideYId = itemYId;
            const splideDiv = splideY.querySelector('.splide');
            const splideList = splideY.querySelector('.splide__list');
            const splideSlide = splideY.querySelector('.splide__slide');
            let splideGap, splidePerPage, splideInTotal, splideSlideW;
            let splideYEnd, splideYStart, splideYTop;
            let scrollPos = 0;

            // Handle
            const splideHandle = () => {
              let splideMT = 0;
              let splideHeight, splideTransform;
              splideHeight = Math.floor(splideDiv.getBoundingClientRect().height) + splideMT;
              splideTransform = -splideMT;
              splideY.style.height = splideHeight + 'px';
              splideList.style.transform = 'translateX(' + splideTransform + 'px)';
              splide.go(0);
              scrollbarToggle(true);
              window.scrollTo(0, 0);

              splideGap = splide.options.gap;
              splidePerPage = splide.options.perPage;
              splideInTotal = splide.length;
              splideSlideW = Math.floor(splideSlide.getBoundingClientRect().width);
              splideYTop = Math.floor(splideY.offsetTop);

              let splideXTemp = 0;
              itemXTemp.forEach((item, index) => {
                if (index < splideYId) {
                  splideXTemp += item;
                }
              });
              if (splideYId === 0) {
                itemXTemp[splideYId] = 0;
              }
              splideYEnd = 0;
              if (window.innerWidth >= 768) {
                splideYEnd = (splideSlideW + splideGap) * (splideInTotal - splidePerPage);
              }
              splideYStart = splideXTemp + splideYTop;
              itemXTemp[splideYId] = splideYEnd;
              if (splideYId === itemXTotal - 1) {
                itemXTemp[splideYId] = 0;
                scrollbarToggle(false);
              }

              console.log('Splide ' + splideYId + ': ' + splideYStart);
            };

            // Splide
            const splide = new Splide(splideDiv, {
              drag: true,
              perPage: 1,
              perMove: 1,
              gap: 30,
              arrows: true,
              pagination: true,
              mediaQuery: 'min',
              breakpoints: {
                560: {
                  perPage: 2
                },
                768: {
                  drag: false,
                  arrows: false,
                  pagination: false
                },
                960: {
                  perPage: 3
                }
              }
            });
            splide.on('ready resized', () => {
              splideHandle();
            });
            splide.mount();

            // Control
            const splideControl = (scrollPos) => {
              let splideMT = 0;
              let splideHeight, splideTransform;
              if (scrollPos >= splideYStart) {
                if (scrollPos <= (splideYEnd + splideYStart)) {
                  splideMT = scrollPos - splideYStart;
                } else {
                  splideMT = splideYEnd;
                }
              }
              splideHeight = Math.floor(splideDiv.getBoundingClientRect().height) + splideMT;
              splideTransform = -splideMT;
              splideY.style.height = splideHeight + 'px';
              splideList.style.transform = 'translateX(' + splideTransform + 'px)';
            };
  
            // Scroll
            window.addEventListener('scroll', () => {
              scrollPos = window.scrollY;
              window.requestAnimationFrame(() => {
                splideControl(scrollPos);
              });
            });
          }

          // Figure
          if (isFigure) {
            const figureY = itemY;
            const figureYId = itemYId;
            const figureMedia = figureY.querySelectorAll('.block-media');
            const figureTotal = figureMedia.length - 1;
            const figureDelay = 750;
            let figureYEnd, figureYStart;
            let figureTimer = false;
            let scrollPos = 0;

            // Handle
            const figureHandle = () => {
              let figureMT = 0;
              figureY.style.marginTop = figureMT + 'px';
              scrollbarToggle(true);
              window.scrollTo(0, 0);

              let figureXTemp = 0;
              itemXTemp.forEach((item, index) => {
                if (index < figureYId) {
                  figureXTemp += item;
                }
              });

              const figureYT = Math.floor(figureY.offsetTop);
              const figureYH = Math.floor(figureY.getBoundingClientRect().height);
  
              if (figureYId === 0) {
                itemXTemp[figureYId] = 0;
              }
              figureYEnd = figureYH * figureTotal;
              figureYStart = figureXTemp + figureYT;
              itemXTemp[figureYId] = figureYEnd;
              if (figureYId === itemXTotal - 1) {
                itemXTemp[figureYId] = 0;
                scrollbarToggle(false);
              }

              console.log('Figure ' + figureYId + ': ' + figureYStart);
            };
  
            // Control
            const figureControl = (scrollPos) => {
              let figureMT = 0;
              let figureId = 0;
              const figureYH = Math.floor(figureY.getBoundingClientRect().height);
              if (scrollPos >= figureYStart) {
                if (scrollPos < (figureYEnd + figureYStart)) {
                  figureMT = scrollPos - figureYStart;
                } else {
                  figureMT = figureYEnd - 1;
                }
                figureId = Math.floor((figureMT + figureYH) / figureYH);
              }
              figureY.style.marginTop = figureMT + 'px';
              figureMedia.forEach((media, index) => {
                let opaque = 1;
                if (index > 0) {
                  if (index === figureId) {
                    opaque = (figureMT / figureYH) - Math.floor(figureMT / figureYH);
                  } else {
                    opaque = index < figureId ? 1 : 0;
                  }
                }
                media.style.opacity = opaque;
              });
            };

            // Resize
            figureHandle();
            window.addEventListener('resize', () => {
              clearTimeout(figureTimer);
              figureTimer = setTimeout(figureHandle, figureDelay);
            });
  
            // Scroll
            window.addEventListener('scroll', () => {
              scrollPos = window.scrollY;
              window.requestAnimationFrame(() => {
                figureControl(scrollPos);
              });
            });
          }
        });
      }
    },

    /**
     * Event ON/OFF
     */
    fNEvent: () => {
      const evtON = (el, evt, fn, opts = {}) => {
        const delegatorFn = e =>
          e.target.matches(opts.target) && fn.call(e.target, e);
        el.addEventListener(
          evt,
          opts.target ? delegatorFn : fn,
          opts.options || false
        );
        if (opts.target) {
          return delegatorFn;
        }
      };
      const evtOFF = (el, evt, fn, opts = false) => {
        el.removeEventListener(evt, fn, opts);
      };
      const evtFN = () => {
        console.log('!');
      };
    },

    /**
     * Intersection Observer
     */
    fNObserver: () => {
      const blockX = document.querySelectorAll('.blockX');
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      };
      const observerCallback = (entries) => {
        entries.forEach((entry, index) => {
          // entry.boundingClientRect
          // entry.intersectionRatio
          // entry.intersectionRect
          // entry.isIntersecting
          // entry.rootBounds
          // entry.target
          // entry.time
          console.log(index + ': ' + entry.isIntersecting);
        });
      };
      const observer = new IntersectionObserver(observerCallback, observerOptions);
      blockX.forEach(block => observer.observe(block));
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
