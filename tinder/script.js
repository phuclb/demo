'use strict';

// Card
const cardContainer = document.querySelector('.tinder--container');
const allCards = document.querySelectorAll('.tinder--card');

// zIndex
allCards.forEach((card, index) => {
  card.style.zIndex = allCards.length - index;
});

// Init
const initCards = (card, index) => {
  const newCards = document.querySelectorAll('.tinder--card:not(.past)');
  newCards.forEach((card, index) => {
    card.classList.remove('past', 'present', 'future');
    if (index === 0) {
      card.classList.add('present');
    } else {
      card.classList.add('future');
    }
  });

  if (!cardContainer.classList.contains('loaded')) {
    cardContainer.classList.add('loaded');
  }
};
initCards();

// Hammer
allCards.forEach((card) => {
  const hammer = new Hammer(card);

  hammer.on('pan', (event) => {
    card.classList.add('moving');

    if (event.deltaX === 0) return;
    if (event.center.x === 0 && event.center.y === 0) return;

    cardContainer.classList.toggle('tinder--love', event.deltaX > 0);
    cardContainer.classList.toggle('tinder--nope', event.deltaX < 0);

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    card.style.rotate = rotate + 'deg';
    card.style.translate = event.deltaX + 'px ' + event.deltaY + 'px';
  });

  hammer.on('panend', (event) => {
    card.classList.remove('moving');

    cardContainer.classList.remove('tinder--love', 'tinder--nope');

    let moveOutW = document.body.clientWidth * 1.25;
    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    let status = event.deltaX > 0 ? 'Love' : 'Nope';

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

// Love vs Nope
const nopeBtn = document.getElementById('nope');
const loveBtn = document.getElementById('love');
const handleYN = (love) => {
  return (event) => {
    let presentCard = document.querySelector('.tinder--card.present');
    let moveOutW = document.body.clientWidth * 1.25;
    let status = love ? 'Love' : 'Nope';

    if (presentCard) {
      let card = presentCard;
      card.classList.add('past');
      card.classList.remove('present');
      card.setAttribute('data-card-status', status);

      if (love) {
        card.style.rotate = '-30deg';
        card.style.translate = moveOutW + 'px 25%';
      } else {
        card.style.rotate = '30deg';
        card.style.translate = '-' + moveOutW + 'px 25%';
      }

      initCards();
    }

    event.preventDefault();
  };
};
nopeBtn.addEventListener('click', handleYN(false));
loveBtn.addEventListener('click', handleYN(true));

// Back
const backBtn = document.getElementById('back');
backBtn.addEventListener('click', (event) => {
  let pastCards = document.querySelectorAll('.tinder--card.past');
  let presentCard = document.querySelector('.tinder--card.present');

  if (!pastCards.length) return false;

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
const resultBtn = document.getElementById('result');
let matchNopeIDs = [];
let matchLoveIDs = [];
resultBtn.addEventListener('click', (event) => {
  matchNopeIDs = [];
  matchLoveIDs = [];
  allCards.forEach((card) => {
    let id = card.getAttribute('data-card-id');
    let status = card.getAttribute('data-card-status');
    if (status === 'Love') {
      matchLoveIDs.push(id);
    } else {
      matchNopeIDs.push(id);
    }
  });

  console.log(matchNopeIDs);
  console.log(matchLoveIDs);

  event.preventDefault();
});
