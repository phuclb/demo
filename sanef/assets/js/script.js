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
      const wrapper = document.querySelector('.wrapper');
      const itemX = document.querySelectorAll('.itemX');
      const itemXTotal = itemX.length;
      if (itemXTotal) {
        const itemXDelay = 650;
        const itemXTemp = new Array(itemXTotal).fill(0);

        // Scrollbar
        const scrollbarToggle = (isScrollable) => {
          const viewport = document.querySelector('html');
          viewport.classList.toggle('of--hidden', isScrollable);
        };

        // Result
        const itemXResult = (itemId) => {
          if (itemId === itemXTotal - 1) {
            let wrapperH = 0;
            itemXTemp.forEach(itemH => wrapperH += itemH);
            wrapper.style.removeProperty('height');
            wrapperH += wrapper.getBoundingClientRect().height;
            wrapper.style.height = wrapperH + 'px';
          }
        };

        // Item
        itemX.forEach((itemY, itemYId) => {
          const isSplide = itemY.classList.contains('splideX');
          const isFigure = itemY.classList.contains('figureX');
          const stickyX = itemY.querySelector('.stickyX');

          // Splide
          if (isSplide) {
            const splideY = itemY;
            const splideYId = itemYId;
            const splideDiv = splideY.querySelector('.splide');
            const splideList = splideY.querySelector('.splide__list');
            const splideSlide = splideY.querySelector('.splide__slide');
            let splideGap, splidePerPage, splideInTotal, splideSlideW;
            let splideYEnd, splideYStart, splideYTop;
            let splideTimer = false;

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
            splide.mount();

            // Handle
            const splideHandle = () => {
              let splideMT = 0;
              let splideHeight, splideTransform;
              splideHeight = Math.floor(stickyX.getBoundingClientRect().height) + splideMT;
              splideTransform = -splideMT;
              splideY.style.height = splideHeight + 'px';
              splideList.style.transform = 'translateX(' + splideTransform + 'px)';
              splide.go(0);
              window.scrollTo(0, 0);
              scrollbarToggle(true);

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
                scrollbarToggle(false);
              }

              console.log(`Splide ${splideYId}: Start ${splideYStart} / End ${splideYEnd}`);
            };

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
              splideHeight = Math.floor(stickyX.getBoundingClientRect().height) + splideMT;
              splideTransform = -splideMT;
              splideY.style.height = splideHeight + 'px';
              splideList.style.transform = 'translateX(' + splideTransform + 'px)';
            };

            // Init
            splideHandle();
            itemXResult(itemYId);

            // Resize
            window.addEventListener('resize', () => {
              clearTimeout(splideTimer);
              splideTimer = setTimeout(() => {
                splideHandle();
                itemXResult(splideYId);
              }, itemXDelay);
            });
  
            // Scroll
            let scrollPos = 0;
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
            let figureYEnd, figureYStart;
            let figureTimer = false;

            // Handle
            const figureHandle = () => {
              let figureMT = 0;
              let figureHeight;
              figureHeight = Math.floor(stickyX.getBoundingClientRect().height) + figureMT;
              figureY.style.height = figureHeight + 'px';
              window.scrollTo(0, 0);
              scrollbarToggle(true);

              let figureXTemp = 0;
              itemXTemp.forEach((item, index) => {
                if (index < figureYId) {
                  figureXTemp += item;
                }
              });

              const figureYT = Math.floor(figureY.offsetTop);
              const stickyXH = Math.floor(figureY.getBoundingClientRect().height);
  
              if (figureYId === 0) {
                itemXTemp[figureYId] = 0;
              }
              figureYEnd = stickyXH * figureTotal;
              figureYStart = figureXTemp + figureYT;
              itemXTemp[figureYId] = figureYEnd;
              if (figureYId === itemXTotal - 1) {
                scrollbarToggle(false);
              }

              console.log(`Figure ${figureYId}: Start ${figureYStart} / End ${figureYEnd}`);
            };
  
            // Control
            const figureControl = (scrollPos) => {
              let figureMT = 0;
              let figureId = 0;
              let figureHeight;
              const stickyXH = Math.floor(stickyX.getBoundingClientRect().height);
              if (scrollPos >= figureYStart) {
                if (scrollPos < (figureYEnd + figureYStart)) {
                  figureMT = scrollPos - figureYStart;
                } else {
                  figureMT = figureYEnd;
                }
                figureId = Math.floor((figureMT + stickyXH) / stickyXH);
              }
              figureHeight = stickyXH + figureMT;
              figureY.style.height = figureHeight + 'px';
              figureMedia.forEach((media, index) => {
                let opaque = 1;
                if (index > 0) {
                  if (index === figureId) {
                    opaque = (figureMT / stickyXH) - Math.floor(figureMT / stickyXH);
                  } else {
                    opaque = index < figureId ? 1 : 0;
                  }
                }
                media.style.opacity = opaque;
              });
            };
  
            // Init
            figureHandle();
            itemXResult(itemYId);

            // Resize
            window.addEventListener('resize', () => {
              clearTimeout(figureTimer);
              figureTimer = setTimeout(() => {
                figureHandle();
                itemXResult(figureYId);
              }, itemXDelay);
            });
  
            // Scroll
            let scrollPos = 0;
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
