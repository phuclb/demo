'use strict';

const App = {
  /**
   * Initialize the application
   */
  init() {
    App.form();
    App.gallery();
  },

  /**
   * Form
   */
  form: () => {
    const cForm = document.getElementById('contestForm');
    if (cForm) {
      const fConfirm = cForm.querySelector('.form-confirm');
      const pristine = new Pristine(cForm, {
        classTo: 'form-pristine',
        errorClass: 'error',
        successClass: 'success',
        errorTextParent: 'form-pristine',
        errorTextTag: 'div',
        errorTextClass: 'form-alert'
      });
      cForm.addEventListener('submit', (e) => {
        const valid = pristine.validate();
        fConfirm.classList.toggle('hidden', !valid);
        e.preventDefault();
      });
    }
  },

  /**
   * Gallery
   */
  gallery: () => {
    const gGrid = document.querySelector('.gallery-grid');
    if (gGrid) {

      // Masonry
      let gMasonry = new Masonry(gGrid, {
        itemSelector: '.none',
        columnWidth: '.gallery-column',
        gutter: '.gallery-gutter',
        percentPosition: true,
        stagger: 30,
        visibleStyle: {transform: 'translateY(0)', opacity: 1},
        hiddenStyle: {transform: 'translateY(100px)', opacity: 0}
      });

      // ImagesLoaded
      imagesLoaded(gGrid, () => {

        // Masonry
        gGrid.classList.remove('gallery-unloaded');
        gMasonry.options.itemSelector = '.gallery-item';
        let galleryItems = gGrid.querySelectorAll('.gallery-item.visible');
        gMasonry.appended(galleryItems);

        // Modal
        App.modal();

        // Button
        gButton.classList.remove('hidden');

      });

      // Button
      const gButton = document.querySelector('.gallery-button'), gMax = 18;
      if (gButton) {
        gButton.addEventListener('click', (e) => {
          let gHiddenItems = gGrid.querySelectorAll('.gallery-item.hidden');
          if (gHiddenItems) {
            if (gHiddenItems.length > gMax) {
              gHiddenItems.forEach((item, index) => {
                if (index < gMax) {
                  item.classList.replace('hidden', 'visible');
                  gMasonry.appended(item);
                }
              });
            } else {
              gHiddenItems.forEach(item => {
                item.classList.replace('hidden', 'visible');
                gMasonry.appended(item);
              });
              gButton.classList.add('hidden');
            }
          }
          e.preventDefault();
        });
      }
    }
  },

  /**
   * Modal
   */
  modal: () => {
    const modal = document.getElementById('modal');
    if (modal) {

      // Close
      const mClose = modal.querySelector('.modal-close');
      if (mClose) {
        mClose.addEventListener('click', (e) => {
          MicroModal.close('modal');
          e.preventDefault();
        });
      }

      // Trigger
      const mTrigger = document.querySelectorAll('.modal-trigger');
      if (mTrigger) {
        mTrigger.forEach(item => {
          item.addEventListener('click', (e) => {
            App.modalControl(item);
            e.preventDefault();
          });
        });
      }
    }
  },
  modalControl: (image) => {
    const mFigure = document.getElementById('modalImage');
    const mSource = image.getAttribute('src');
    if (mSource.length) {
      mFigure.setAttribute('src', mSource);
      MicroModal.show('modal', {
        disableScroll: true,
        disableFocus: false,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true
      });
    }
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