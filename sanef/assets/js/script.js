(() => {

  'use strict';

  const App = {

    /**
     * Init
     */
    init: () => {
      App.router();
      App.editor();
      App.inview();
      App.scroller();
    },

    /**
     * Router
     */
    router: () => {
      const router = document.querySelector('.router');
      if (router) {
        const routerGap = router.querySelector('.router-gap');
        const routerMap = router.querySelector('.router-map');
        const routerMapTransX = 'translateX(-50%)';

        // Handle
        const routerHandle = (scrollPos) => {
          let gapPTop = parseInt(getComputedStyle(routerGap).paddingTop);
          let gapRect = routerGap.getBoundingClientRect();
          let gapTop = gapRect.top + gapPTop + window.scrollY;
          let gapBottom = gapTop + (gapRect.height / 2);
          let mapOpaque = 1, mapTransY = 0;

          // Handle
          if (scrollPos >= gapTop) {
            if (scrollPos <= gapBottom) {
              mapOpaque = 1 - (scrollPos - gapTop) / (gapBottom - gapTop);
            } else {
              mapOpaque = 0;
            }
          }
          mapTransY = Math.floor(100 - (mapOpaque * 100));

          // Control
          Object.assign(routerMap.style, {
            opacity: mapOpaque,
            transform: routerMapTransX + " translateY(" + mapTransY + "px)"
          });
        };
        routerHandle(window.scrollY);

        // Event
        ['load', 'resize', 'scroll'].forEach(event => {
          window.addEventListener(event, () => {
            routerHandle(window.scrollY);
          });
        });
      }
    },

    /**
     * Editor
     */
    editor: () => {
      const itemX = document.querySelectorAll('.xItem');
      const itemXTotal = itemX.length;
      if (itemXTotal) {
        const itemXDelay = 250;
        const itemXTablet = 768;
        const mFadeIn = 'ani--fadeIn';
        const mFadeOut = 'ani--fadeOut';
        const mVisible = 'visible';
        const mInView = 'inView';
        const itemXEnd = new Array(itemXTotal).fill(0);
        const itemXStart = new Array(itemXTotal).fill(0);
        const itemXMaster = document.querySelector('.master');
        const itemXWrapper = document.querySelector('.wrapper');
        let itemXWrapperH;

        // Scroll
        window.addEventListener('scroll', () => {
          let itemIndex = -1, itemStatus = 'off', itemPos, itemTop;
          const scrollPos = window.scrollY;

          // Handle
          for (let i = 0; i < itemXStart.length; i++) {
            if (scrollPos >= itemXStart[i]) {
              itemIndex = i;
              if (scrollPos <= (itemXStart[i] + itemXEnd[i])) {
                itemStatus = 'in';
              } else {
                itemStatus = 'out';
              }
            }
          }

          // Control
          if (itemStatus === 'off') {
            itemXWrapper.removeAttribute('style');
          } else {
            if (itemStatus === 'in') {
              itemPos = 'sticky';
              itemTop = -itemXStart[itemIndex];
            } else {
              itemPos = 'absolute';
              itemTop = itemXEnd[itemIndex];
            }
            if (itemIndex > 0) {
              for (let i = 0; i < itemIndex; i++) {
                itemTop += itemXEnd[i];
              }
            }
            Object.assign(itemXWrapper.style, {
              position: itemPos,
              top: itemTop + 'px'
            });
          }
        });

        // Handle
        const itemXHandle = (itemId) => {
          if (itemId === itemXTotal - 1) {
            let wrapperG = 0;
            const wrapperH = itemXWrapper.getBoundingClientRect().height;
            itemXEnd.forEach(itemH => wrapperG += itemH);
            itemXWrapperH = Math.ceil(wrapperG + wrapperH);
            itemXMaster.style.height = itemXWrapperH + 'px';
          }
        };

        // Control
        const itemXControl = (sticky, itemId, itemHandle, itemControl) => {

          // Init
          itemHandle();
          itemXHandle(itemId);

          // ReInit
          window.addEventListener('load', () => {
            itemHandle();
            itemXHandle(itemId);
          });

          // Resize
          window.addEventListener('resize', () => {
            setTimeout(() => {
              itemHandle();
              itemXHandle(itemId);
            }, itemXDelay);
          });

          // Scroll
          window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const viewportH = window.innerHeight;
            const stickyH = sticky.getBoundingClientRect().height;
            let itemStart = itemXStart[itemId],
                itemStartDelay = Math.ceil(itemStart - (viewportH + stickyH)),
                itemEnd = itemXEnd[itemId],
                itemEndDelay = Math.ceil(itemEnd + itemStart + stickyH);
            if ((scrollPos >= itemStartDelay) && (scrollPos <= itemEndDelay)){
              itemControl(scrollPos, itemEnd, itemStart);
            }
          });
        };

        // Item
        itemX.forEach((itemY, itemYId) => {
          const itemYClass = itemY.classList;
          const isBanner = itemYClass.contains('xBanner');
          const isFigure = itemYClass.contains('xFigure');
          const isSplide = itemYClass.contains('xSplide');
          const stickyX = itemY.querySelector('.xSticky');
          const stickyXClass = stickyX.classList;

          // Banner
          if (isBanner) {
            const bannerY = itemY;
            const bannerYId = itemYId;
            const bannerList = bannerY.querySelector('.xList');
            const bannerMedia = bannerY.querySelectorAll('.xMedia');
            const bannerTotal = bannerMedia.length;

            // Handle
            const bannerHandle = () => {
              const bannerYTop = bannerY.offsetTop;
              const stickyXHeight = stickyX.getBoundingClientRect().height;

              stickyXClass.remove(mInView);

              let bannerXTemp = 0;
              itemXEnd.forEach((item, index) => {
                if (index < bannerYId) {
                  bannerXTemp += item;
                }
              });
  
              if (bannerYId === 0) {
                itemXEnd[bannerYId] = 0;
              }

              let bannerYEnd = Math.ceil(stickyXHeight * bannerTotal);
              let bannerYStart = Math.ceil(bannerXTemp + bannerYTop);
              itemXEnd[bannerYId] = bannerYEnd;
              itemXStart[bannerYId] = bannerYStart;
            };

            // Control
            const bannerControl = (scrollPos, bannerYEnd, bannerYStart) => {
              const stickyXHeight = stickyX.getBoundingClientRect().height;
              let bannerNumber = 0, bannerTransY;

              stickyXClass.remove(mInView);
              if (scrollPos >= bannerYStart) {
                if (scrollPos < (bannerYEnd + bannerYStart)) {
                  bannerNumber = scrollPos - bannerYStart;
                  stickyXClass.add(mInView);
                } else {
                  bannerNumber = bannerYEnd;
                }
              }

              bannerTransY = -1 * bannerNumber;
              bannerList.style.transform = 'translateY(' + bannerTransY + 'px)';

              bannerMedia.forEach((media, index) => {
                let xNth = 0, xGap = stickyXHeight;
                const xVideo = media.querySelector('.xVideo');
                const xMediaClass = media.classList;
                if (bannerNumber >= xGap) {
                  xNth = Math.floor((bannerNumber - xGap) / stickyXHeight) + 1;
                  if (xNth >= bannerTotal) {
                    xNth = bannerTotal - 1;
                  }
                }
                if (stickyXClass.contains(mInView)) {
                  xMediaClass.remove(mVisible);
                  if (index === xNth) {
                    if (!xMediaClass.contains(mFadeIn)) {
                      xMediaClass.add(mFadeIn);
                      xMediaClass.remove(mFadeOut);
                      xVideo.play();
                    }
                  } else {
                    if (!xMediaClass.contains(mFadeOut)) {
                      xMediaClass.add(mFadeOut);
                      xMediaClass.remove(mFadeIn);
                      xVideo.currentTime = 0;
                    }
                  }
                } else {
                  xMediaClass.remove(mFadeIn);
                  xMediaClass.remove(mFadeOut);
                  if (index === xNth) {
                    xMediaClass.add(mVisible);
                  } else {
                    xMediaClass.remove(mVisible);
                  }
                }
              });
            };

            // Init
            itemXControl(stickyX, bannerYId, bannerHandle, bannerControl);
          }

          // Figure
          if (isFigure) {
            const figureY = itemY;
            const figureYId = itemYId;
            const figureMedia = figureY.querySelectorAll('.xMedia');
            const figureTotal = figureMedia.length - 1;

            // Handle
            const figureHandle = () => {
              const figureYTop = figureY.offsetTop;
              const stickyXHeight = stickyX.getBoundingClientRect().height;

              stickyXClass.remove(mInView);

              let figureXTemp = 0;
              itemXEnd.forEach((item, index) => {
                if (index < figureYId) {
                  figureXTemp += item;
                }
              });
  
              if (figureYId === 0) {
                itemXEnd[figureYId] = 0;
              }

              let figureYEnd = Math.ceil(stickyXHeight * figureTotal);
              let figureYStart = Math.ceil(figureXTemp + figureYTop);
              itemXEnd[figureYId] = figureYEnd;
              itemXStart[figureYId] = figureYStart;
            };

            // Control
            const figureControl = (scrollPos, figureYEnd, figureYStart) => {
              let figureNumber = 0, figureId = 0;
              const stickyXHeight = stickyX.getBoundingClientRect().height;

              stickyXClass.remove(mInView);
              if (scrollPos >= figureYStart) {
                if (scrollPos < (figureYEnd + figureYStart)) {
                  figureNumber = scrollPos - figureYStart;
                  stickyXClass.add(mInView);
                } else {
                  figureNumber = figureYEnd;
                }
                figureId = Math.floor((figureNumber + stickyXHeight) / stickyXHeight);
              }

              figureMedia.forEach((media, index) => {
                let opaque = 1;
                if (index > 0) {
                  if (index === figureId) {
                    opaque = (figureNumber / stickyXHeight) - Math.floor(figureNumber / stickyXHeight);
                  } else {
                    opaque = index < figureId ? 1 : 0;
                  }
                }
                media.style.opacity = opaque;
              });
            };

            // Init
            itemXControl(stickyX, figureYId, figureHandle, figureControl);
          }

          // Splide
          if (isSplide) {
            const splideY = itemY;
            const splideYId = itemYId;
            const splideDiv = splideY.querySelector('.splide');
            const splideList = splideY.querySelector('.splide__list');
            const splideSlide = splideY.querySelector('.splide__slide');

            // Splide
            const splide = new Splide(splideDiv, {
              perPage: 1,
              perMove: 1,
              gap: 20,
              drag: true,
              arrows: true,
              pagination: false,
              mediaQuery: 'min',
              breakpoints: {
                768: {
                  gap: 40,
                  drag: false,
                  arrows: false
                }
              }
            }).mount();

            // Handle
            const splideHandle = () => {
              let splideNumber = 0;
              const splideGap = splide.options.gap;
              const splidePerPage = splide.options.perPage;
              const splideInTotal = splide.length;
              const splideYTop = splideY.offsetTop;
              const splideSlideW = splideSlide.getBoundingClientRect().width;

              stickyXClass.remove(mInView);

              let splideXTemp = 0;
              itemXEnd.forEach((item, index) => {
                if (index < splideYId) {
                  splideXTemp += item;
                }
              });
              if (splideYId === 0) {
                itemXEnd[splideYId] = 0;
              }

              let splideYEnd = 0, splideYStart;
              let splideTransX = -1 * splideNumber;
              if (window.innerWidth >= itemXTablet) {
                splideList.style.transform = 'translateX(' + splideTransX + 'px)';
                splide.go(0);
                splideYEnd = Math.ceil((splideSlideW + splideGap) * (splideInTotal - splidePerPage));
              }
              splideYStart = Math.ceil(splideXTemp + splideYTop);
              itemXEnd[splideYId] = splideYEnd;
              itemXStart[splideYId] = splideYStart;
            };

            // Control
            const splideControl = (scrollPos, splideYEnd, splideYStart) => {
              let splideNumber = 0;

              stickyXClass.remove(mInView);
              if (scrollPos >= splideYStart) {
                if (scrollPos <= (splideYEnd + splideYStart)) {
                  splideNumber = scrollPos - splideYStart;
                  stickyXClass.add(mInView);
                } else {
                  splideNumber = splideYEnd;
                }
              }

              let splideTransX = -1 * splideNumber;
              if (window.innerWidth >= itemXTablet) {
                splideList.style.transform = 'translateX(' + splideTransX + 'px)';
              }
            };

            // Init
            itemXControl(stickyX, splideYId, splideHandle, splideControl);
          }
        });

        // Scroller
        const xScroller = document.querySelectorAll('.xScroller');
        if (xScroller.length) {
          xScroller.forEach(scroller => {
            const targetId = scroller.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const xItemTotal = parseInt(targetElement.dataset.xitem);
              scroller.addEventListener('click', (e) => {
                e.preventDefault();

                let xItemGap = 0;
                for (let i = 0; i < xItemTotal; i++) {
                  xItemGap += parseInt(itemXEnd[i]);
                }

                const targetRect = targetElement.getBoundingClientRect();
                const targetTop = Math.ceil(xItemGap + window.scrollY + targetRect.top);
                window.scrollTo({
                  top: targetTop,
                  behavior: 'smooth',
                });
              });
            }
          });
        }
      }
    },

    /**
     * Inview
     */
    inview: () => {
      const mInView = 'inView';
      const inviewX = document.querySelectorAll('.xInView');
      if (inviewX.length) {
        const threshold = () => {
          let numSteps = 20, thresholds = [];
          for (let i = 1.0; i <= numSteps; i++) {
            thresholds.push(i / numSteps);
          }
          thresholds.push(0);
          return thresholds;
        };
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: threshold()
        };
        const callback = (entries) => {
          entries.forEach(entry => {
            const item = entry.target;
            const itemClass = item.classList;
            const isChart = itemClass.contains('xChart');
            const isNumber = itemClass.contains('xNumber');

            // Chart
            if (isChart) {
              if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 1) {
                  itemClass.add(mInView);
                }
              } else {
                itemClass.remove(mInView);
              }
            }

            // Number
            if (isNumber) {

              // Config
              const config = {
                end: parseFloat(item.getAttribute('data-end')),
                start: parseInt(item.getAttribute('data-start')) || 0,
                step: parseFloat(item.getAttribute('data-step')) || 1,
                decimal: parseInt(item.getAttribute('data-decimal')) || 0,
                separator: item.getAttribute('data-separator') || '',
                time: parseInt(item.getAttribute('data-time')) || 1000,
                delay: parseInt(item.getAttribute('data-delay')) || 0,
                format: item.getAttribute('data-format') || '{}'
              };

              let counter, interval;
              const itemTimer = Math.floor(config.time / (config.end - config.start));
              const itemControl = (counter) => {
                let xCounter = counter;
                if (config.decimal) {
                  xCounter = counter.toFixed(config.decimal);
                }
                if (config.separator) {
                  xCounter = xCounter.toString().replace('.', config.separator);
                }
                item.innerHTML = config.format.replace('{}', xCounter);
              };

              // Handle
              if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 1) {
                  counter = config.start;
                  itemControl(counter);
                  setTimeout(() => {
                    interval = setInterval(() => {
                      counter += config.step;
                      if (counter >= config.end) {
                        counter = config.end;
                        clearInterval(interval);
                      }
                      itemControl(counter);
                    }, itemTimer);
                  }, config.delay);
                  itemClass.add(mInView);
                }
              } else {
                counter = config.end;
                itemControl(counter);
                clearInterval(interval);
                itemClass.remove(mInView);
              }
            }
          });
        };
        const observer = new IntersectionObserver(callback, options);
        inviewX.forEach(inviewY => observer.observe(inviewY));
      }
    },

    /**
     * Scroller
     */
    scroller: () => {
      const scrollers = document.querySelectorAll('.scroller');
      if (scrollers.length) {
        scrollers.forEach(scroller => {
          const anchor = scroller.getAttribute('href');
          if (anchor) {
            const targetId = anchor.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              scroller.addEventListener('click', (e) => {
                e.preventDefault();
                const targetRect = targetElement.getBoundingClientRect();
                const targetTop = Math.ceil(window.scrollY + targetRect.top);
                window.scrollTo({
                  top: targetTop,
                  behavior: 'smooth',
                });
              });
            }
          }
        });
      }

      const scrollerTop = document.querySelector('.scroller-top');
      if (scrollerTop) {
        scrollerTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
        window.addEventListener('scroll', () => {
          scrollerTop.classList.toggle('active', window.scrollY > 550);
        });
      }
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
