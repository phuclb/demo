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
    const allCards = Array.from(document.querySelectorAll('.nux-card__item'));

    if (container && allCards.length) {
      let currentIndex = 0;

      // Set initial z-index stack
      allCards.forEach((card, i) => {
        card.style.zIndex = allCards.length - i;
      });

      const updateCardClasses = () => {
        allCards.forEach((card, i) => {
          card.classList.remove('past', 'present', 'future');
          if (i < currentIndex) {
            card.classList.add('past');
          } else if (i === currentIndex) {
            card.classList.add('present');
          } else {
            card.classList.add('future');
          }
        });

        if (!container.classList.contains('nux-card--loaded')) {
          container.classList.add('nux-card--loaded');
        }
      };

      const moveCard = (isAccept, velocityX = 10, velocityY = 0) => {
        if (currentIndex >= allCards.length) return getResult();

        const card = allCards[currentIndex];
        const moveOutW = document.body.clientWidth * 1.5;
        const direction = isAccept ? 1 : -1;

        // Calculate end position
        const endX = Math.max(Math.abs(velocityX) * moveOutW, moveOutW) * direction;
        const endY = velocityY * moveOutW;
        const rotate = isAccept ? 30 : -30;

        card.style.rotate = `${rotate}deg`;
        card.style.translate = `${endX}px ${endY}px`;
        card.setAttribute('data-card-status', isAccept ? 'Accepted' : 'Rejected');

        currentIndex++;
        updateCardClasses();

        if (currentIndex === allCards.length) getResult();
      };

      // Hammer
      allCards.forEach((card) => {
        const hammer = new Hammer(card);

        hammer.on('pan', (e) => {
          if (card !== allCards[currentIndex]) return;

          card.classList.add('moving');
          container.classList.toggle('nux-card--accept', e.deltaX > 0);
          container.classList.toggle('nux-card--reject', e.deltaX < 0);

          const rotate = e.deltaX * 0.03 * (e.deltaY / 80);
          card.style.rotate = `${rotate}deg`;
          card.style.translate = `${e.deltaX}px ${e.deltaY}px`;
        });

        hammer.on('panend', (e) => {
          if (card !== allCards[currentIndex]) return;

          card.classList.remove('moving');
          container.classList.remove('nux-card--accept', 'nux-card--reject');

          const keep = Math.abs(e.deltaX) < 80 && Math.abs(e.velocityX) < 0.5;

          if (keep) {
            card.style.rotate = '';
            card.style.translate = '';
          } else {
            moveCard(e.deltaX > 0, e.velocityX, e.velocityY);
          }
        });
      });

      // Buttons
      const btnBack = document.querySelector('.nux-card__back');
      const btnReject = document.querySelector('.nux-card__reject');
      const btnAccept = document.querySelector('.nux-card__accept');

      btnBack?.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentIndex > 0) {
          currentIndex--;
          const card = allCards[currentIndex];
          card.style.rotate = '';
          card.style.translate = '';
          card.removeAttribute('data-card-status');
          updateCardClasses();
        }
      });

      btnReject?.addEventListener('click', (e) => { e.preventDefault(); moveCard(false); });
      btnAccept?.addEventListener('click', (e) => { e.preventDefault(); moveCard(true); });

      const getResult = () => {
        const results = allCards.reduce((acc, card) => {
          const id = card.getAttribute('data-card-id');
          const status = card.getAttribute('data-card-status');
          status === 'Accepted' ? acc.accepted.push(id) : acc.rejected.push(id);
          return acc;
        }, { accepted: [], rejected: [] });

        console.log('Final Results:', results);
      };

      updateCardClasses();
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