'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.card();
    App.slide();
    App.misc();
  },

  /**
   * Card
   */
  card() {
    const container = document.querySelector('.nux-card');
    const allCards = document.querySelectorAll('.nux-card__item');

    if (container) {

      // zIndex
      allCards.forEach((card, index) => {
        card.style.zIndex = allCards.length - index;
      });

      // Init
      const initCards = () => {
        const newCards = document.querySelectorAll('.nux-card__item:not(.past)');
        newCards.forEach((card, index) => {
          card.classList.remove('past', 'present', 'future');
          if (index === 0) {
            card.classList.add('present');
          } else {
            card.classList.add('future');
          }
        });

        if (!container.classList.contains('nux-card--loaded')) {
          container.classList.add('nux-card--loaded');
        }
      };
      initCards();

      // Hammer
      allCards.forEach((card) => {
        const hammer = new Hammer(card);

        hammer.on('pan', (event) => {
          card.classList.add('moving');

          if (event.deltaX === 0) {
            return;
          }
          if (event.center.x === 0 && event.center.y === 0) {
            return;
          }

          container.classList.toggle('nux-card--accept', event.deltaX > 0);
          container.classList.toggle('nux-card--reject', event.deltaX < 0);

          let xMulti = event.deltaX * 0.03;
          let yMulti = event.deltaY / 80;
          let rotate = xMulti * yMulti;

          card.style.rotate = rotate + 'deg';
          card.style.translate = event.deltaX + 'px ' + event.deltaY + 'px';
        });

        hammer.on('panend', (event) => {
          card.classList.remove('moving');

          container.classList.remove('nux-card--accept', 'nux-card--reject');

          let moveOutW = document.body.clientWidth * 1.25;
          let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
          let status = event.deltaX > 0 ? 'Accepted' : 'Rejected';

          card.classList.toggle('past', !keep);

          if (keep) {
            card.style.rotate = '';
            card.style.translate = '';
          } else {
            let endX = Math.max(Math.abs(event.velocityX) * moveOutW, moveOutW);
            let toX = event.deltaX > 0 ? endX : -endX;
            let endY = Math.abs(event.velocityY) * moveOutW;
            let toY = event.deltaY > 0 ? endY : -endY;
            let xMulti = event.deltaX * 0.03;
            let yMulti = event.deltaY / 80;
            let rotate = xMulti * yMulti;

            card.style.rotate = rotate + 'deg';
            card.style.translate = toX + 'px ' + (toY + event.deltaY) + 'px';
            card.classList.remove('present');
            card.setAttribute('data-card-status', status);

            initCards();
          }
        });
      });

      // Reject vs Accept
      const rejectBtn = document.querySelector('.nux-card__reject');
      const acceptBtn = document.querySelector('.nux-card__accept');
      const handleYN = (yes) => {
        return (event) => {
          let presentCard = document.querySelector('.nux-card__item.present');
          let moveOutW = document.body.clientWidth * 1.25;
          let status = yes ? 'Accepted' : 'Rejected';

          if (presentCard) {
            let card = presentCard;

            if (yes) {
              card.style.rotate = '-30deg';
              card.style.translate = moveOutW + 'px 25%';
            } else {
              card.style.rotate = '30deg';
              card.style.translate = '-' + moveOutW + 'px 25%';
            }
            card.classList.add('past');
            card.classList.remove('present');
            card.setAttribute('data-card-status', status);

            initCards();
          } else {
            getResult();
          }

          event.preventDefault();
        };
      };
      rejectBtn.addEventListener('click', handleYN(false));
      acceptBtn.addEventListener('click', handleYN(true));

      // Back
      const backBtn = document.querySelector('.nux-card__back');
      backBtn.addEventListener('click', (event) => {
        let pastCards = document.querySelectorAll('.nux-card__item.past');
        let presentCard = document.querySelector('.nux-card__item.present');

        if (!pastCards.length) {
          return false;
        }

        let lastPastCard = pastCards[pastCards.length - 1];
        if (lastPastCard) {
          lastPastCard.style.rotate = '';
          lastPastCard.style.translate = '';
          lastPastCard.classList.add('present');
          lastPastCard.classList.remove('past');
          lastPastCard.removeAttribute('data-card-status');
        }

        if (presentCard) {
          presentCard.classList.add('future');
          presentCard.classList.remove('present');
        }

        initCards();

        event.preventDefault();
      });

      // Result
      const getResult = () => {
        let matchRejectIDs = [];
        let matchAcceptIDs = [];
        allCards.forEach((card) => {
          let id = card.getAttribute('data-card-id');
          let status = card.getAttribute('data-card-status');
          if (status === 'Accepted') {
            matchAcceptIDs.push(id);
          } else {
            matchRejectIDs.push(id);
          }
        });

        console.log('Rejected IDs: ' + matchRejectIDs);
        console.log('Accepted IDs: ' + matchAcceptIDs);
      };
    }
  },

  /**
   * Slide
   */
  slide() {
    const createSplide = (selector, options) => {
      document.querySelectorAll(selector).forEach(el => {
        let splide = new Splide(el, options);

        // element
        const index = el.querySelector('.splide__index');
        const total = el.querySelector('.splide__total');

        // event
        splide.on('ready', () => {
          index.textContent = splide.index + 1;
          total.textContent = splide.length;
        }).on('moved', () => {
          index.textContent = splide.index + 1;
        });

        // mount
        splide.mount();
      });
    };

    createSplide('.splide-card', {
      type: 'slide',
      gap: 20,
      speed: 1000,
      focus: 0,
      autoWidth: true,
      pagination: false,
      omitEnd: true
    });
  },

  /**
   * Misc
   */
  misc() {
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