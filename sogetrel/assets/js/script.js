(function($) {

  'use strict';

  var App = {

    /**
     * Init
     */
    init: function() {
      App.header();
      App.slider();
      App.toggler();
      App.rollover();
      App.form();
      App.dropdown();
      App.article();
      App.offer();
      App.modal();
      App.faq();
    },

    /**
     * header
     */
    header: function() {
      var header = $('.header'), viewport = $(window), timer, sticky = 'sticky', expanded = 'expanded', hidden = 'hidden', active = 'active';

      App.headerControl(header, viewport, sticky);
      viewport.bind('scroll resize', function() {
        App.headerControl(header, viewport, sticky);
      });

      var mPanel = $('.js-menu-panel'), mIndex, mTimer;
      if (mPanel.length) {
        mPanel.each(function() {
          var I = $(this), aHref = I.attr('href'), aTarget = I.attr('data-target'),
              myPanel = $(aHref), myTarget = $(aTarget), myItem = $('.js-menu-panel[href="' + aHref + '"][data-target="' + aTarget + '"]');
          if (App.touchDevice()) {
            I.click(function(e) {
              if (!I.hasClass(expanded)) {
                myPanel.removeClass(hidden);
                myPanel.siblings().addClass(hidden);
                mPanel.removeClass(expanded);
                mIndex = myPanel.index();
                I.addClass(expanded);
                myItem.addClass(expanded);
                myTarget.addClass(expanded);
                header.addClass(expanded);
              } else {
                myPanel.addClass(hidden);
                I.removeClass(expanded);
                myItem.removeClass(expanded);
                myTarget.removeClass(expanded);
                header.removeClass(expanded);
              }
              e.preventDefault();
            });
          } else {
            I.hover(function() {
              clearTimeout(mTimer);
              mTimer = setTimeout(function() {
                myPanel.removeClass(hidden);
                myPanel.siblings().addClass(hidden);
                mPanel.removeClass(expanded);
                mIndex = myPanel.index();
                I.addClass(expanded);
                myItem.addClass(expanded);
                myTarget.addClass(expanded);
                header.addClass(expanded);
              }, 250);
            }, function() {
              clearTimeout(mTimer);
              mTimer = setTimeout(function() {
                myPanel.addClass(hidden);
                I.removeClass(expanded);
                myItem.removeClass(expanded);
                myTarget.removeClass(expanded);
                header.removeClass(expanded);
              }, 500);
            }).click(function(e) {
              e.preventDefault();
            });
            myPanel.hover(function() {
              clearTimeout(mTimer);
            }, function() {
              clearTimeout(mTimer);
              mTimer = setTimeout(function() {
                myPanel.addClass(hidden);
                I.removeClass(expanded);
                myItem.removeClass(expanded);
                myTarget.removeClass(expanded);
                header.removeClass(expanded);
              }, 250);
            });
          }
        });
        viewport.bind('resize', function() {
          clearTimeout(timer);
          timer = setTimeout(function() {
            var expandedItem = $('.' + expanded), vWidth = viewport.width();
            if ((mIndex === 0) && (vWidth >= 1024)) {
              if (expandedItem.length) {
                expandedItem.removeClass(expanded);
              }
            }
          }, 250);
        });
      }

      var mAccordion = $('.js-menu-accordion');
      if (mAccordion.length) {
        mAccordion.bind('click', function() {
          var I = $(this), myItem = I.closest('.menu-accordion--item');
          if (!myItem.hasClass(active)) {
            myItem.addClass(active);
            myItem.siblings().removeClass(active);
          }
        });
      }
    },
    headerControl: function(header, viewport, sticky) {
      if (viewport.scrollTop() > 0) {
        header.addClass(sticky);
      } else {
        header.removeClass(sticky);
      }
    },

    /**
     * Slider
     */
    slider: function() {
      var s1 = $('.slick-slider.i1');
      if (s1.length) {
        s1.each(function() {
          var I = $(this), myChildren = I.children();
          if (myChildren.length > 1) {
            I.on('init breakpoint afterChange', function() {
              var s1Items = s1.find('[data-mh]');
              if (s1Items.length) {
                $.fn.matchHeight._apply(s1Items, {
                  byRow: true,
                  property: 'min-height',
                  remove: false
                });
              }
            }).slick({
              accessibility: true, mobileFirst: true, infinite: true, adaptiveHeight: true,
              autoplay: true, autoplaySpeed: 5e3, pauseOnFocus: false, pauseOnHover: false,
              dots: true, arrows: false,
              slidesToShow: 1,
              responsive: [{
                breakpoint: 1023,
                settings: {
                  slidesToShow: 2
                }
              },
              {
                breakpoint: 1279,
                settings: {
                  slidesToShow: 3
                }
              }]
            });
          }
        });
      }

      var s2 = $('.slick-slider.i2');
      if (s2.length) {
        s2.each(function() {
          var I = $(this), myChildren = I.children();
          if (myChildren.length > 1) {
            I.slick({
              accessibility: true, mobileFirst: true, infinite: false, adaptiveHeight: true,
              autoplay: true, autoplaySpeed: 5e3, pauseOnFocus: false, pauseOnHover: false,
              dots: true, arrows: false
            });
          }
        });
      }

      var s3 = $('.slick-slider.i3');
      if (s3.length) {
        s3.each(function() {
          var I = $(this), myChildren = I.children();
          if (myChildren.length > 1) {
            I.slick({
              accessibility: true, mobileFirst: true, infinite: false, adaptiveHeight: true,
              autoplay: true, autoplaySpeed: 5e3, pauseOnFocus: false, pauseOnHover: false,
              dots: true, arrows: false,
              slidesToShow: 1,
              responsive: [{
                breakpoint: 1279,
                settings: {
                  slidesToShow: 2
                }
              }]
            });
          }
        });
      }
    },

    /**
     * Toggler
     */
    toggler: function() {
      var toggler = $('.js-toggler'), expanded = 'expanded';
      if (toggler.length) {
        toggler.click(function(e) {
          var I = $(this), myTarget = $(I.attr('data-target'));
          if (myTarget.length) {
            if (!myTarget.hasClass(expanded)) {
              var expandedTarget = $('.' + expanded);
              if (expandedTarget.length) {
                expandedTarget.removeClass(expanded);
              }
              I.addClass(expanded);
              myTarget.addClass(expanded);
            } else {
              I.removeClass(expanded);
              myTarget.removeClass(expanded);
            }
          }
          e.preventDefault();
        });
      }

      var viewport = $(window);
      viewport.bind('click', function(e) {
        var target = $(e.target);
        if (!target.closest('.' + expanded).length) {
          var expandedItem = $('.' + expanded);
          if (expandedItem.length) {
            expandedItem.removeClass(expanded);
          }
        }
      });
    },

    /**
     * Rollover
     */
    rollover: function() {
      var rollover = $('.js-rollover'), hover = 'hover';
      if (rollover.length) {
        if (App.touchDevice()) {
          rollover.bind('click', function(e) {
            var I = $(this);
            if (!I.hasClass(hover)) {
              rollover.removeClass(hover);
              I.addClass(hover);
            } else {
              I.removeClass(hover);
            }
            e.preventDefault();
          });

          // Propagation
          var propagation = $('.js-propagation');
          if (propagation.length) {
            propagation.bind('click', function(e) {
              e.stopPropagation();
            });
          }
        } else {
          rollover.hover(function() {
            var I = $(this);
            rollover.removeClass(hover);
            I.addClass(hover);
          }, function() {
            var I = $(this);
            I.removeClass(hover);
          });
        }
      }
    },

    /**
     * Form
     */
    form: function() {
      var field = $('.js-field'), composed = 'composed';
      if (field.length) {
        field.each(function() {
          var I = $(this);
          if ($.trim(I.val()) !== '') {
            I.addClass(composed);
          } else {
            I.removeClass(composed);
          }
          I.keyup(function() {
            if ($.trim(I.val()) !== '') {
              I.addClass(composed);
            } else {
              I.removeClass(composed);
            }
          });
        });
      }

      var upload = $('.js-upload'), selected = 'selected';
      if (upload.length) {
        upload.each(function() {
          var I = $(this), myInput = I.find('.upload-input'), myOutput = I.find('.upload-output');
          if ($.trim(myInput.val()) !== '') {
            myOutput.val(myInput.val());
            I.addClass(selected);
          } else {
            I.removeClass(selected);
          }
          myInput.change(function() {
            myOutput.val(myInput.val());
            I.addClass(selected);
          });
        });
      }

      var reset = $('.js-reset');
      if (reset.length) {
        reset.click(function(e) {
          var I = $(this), myInput = I.siblings('.js-field');
          if (myInput.length) {
            myInput.prop('value', '').keyup().focus();
          }
          e.preventDefault();
        });
      }

      var filterReset = $('.js-filter-reset');
      if (filterReset.length) {
        filterReset.click(function(e) {
          var I = $(this), myTarget = $(I.attr('data-target'));
          if (myTarget.length) {
            myTarget.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
          }
          e.preventDefault();
        });
      }

      var keyword = $('.keyword'), hidden = 'hidden';
      if (keyword.length) {
        keyword.each(function() {
          var I = $(this), myHeader = I.find('.keyword-header'), myBody = I.find('.keyword-body'),
              myOption = I.find('.keyword-option'), myHolder = I.find('.keyword-placeholder'), myItem = 0;
          myOption.each(function() {
            var opt = $(this), optInput = opt.find('input'), optLabel = opt.find('label'),
                optValue = '<span class="keyword-value d-block">' + optLabel.html() + '</span>',
                optIcon = '<svg width="10" height="10" viewBox="0 0 24 24"><path d="M24 2.4L21.6 0 12 9.6 2.4 0 0 2.4 9.6 12 0 21.6 2.4 24l9.6-9.6 9.6 9.6 2.4-2.4-9.6-9.6L24 2.4z"></path></svg>',
                optItem = $('<div class="keyword-item p-rel"></div>'),
                optRemove = $('<span class="keyword-remove p-abs d-flex justify-center items-center">' + optIcon + '</span>');

            optRemove.attr('data-target', optInput.attr('id'));
            optItem.html(optValue).append(optRemove);

            var addItem = function() {
              myHeader.append(optItem);
              myItem = myItem + 1;
              optRemove.bind('click', function(e) {
                var myInput = $('input[id="' + $(this).attr('data-target') + '"]');
                optItem.remove();
                myInput.prop('checked', false);
                myItem = myItem - 1;
                if (myItem > 0) {
                  myHolder.addClass(hidden);
                } else {
                  myHolder.removeClass(hidden);
                }
                e.stopPropagation();
              });
            }, removeItem = function() {
              optItem.remove();
              optInput.prop('checked', false);
              myItem = myItem - 1;
            }, holderControl = function() {
              if (myItem > 0) {
                myHolder.addClass(hidden);
              } else {
                myHolder.removeClass(hidden);
              }
            };

            if (optInput.prop('checked')) {
              addItem();
            }
            holderControl();

            optInput.change(function() {
              if (optInput.prop('checked')) {
                addItem();
              } else {
                removeItem();
              }
              holderControl();
            });
            myBody.bind('click', function(e) {
              e.stopPropagation();
            });
          });
        });
      }
    },

    /**
     * Dropdown
     */
    dropdown: function() {
      var dropdown = $('.js-dropdown'), expanded = 'expanded', selected = 'selected';
      if (dropdown.length) {
        dropdown.each(function() {
          var dd = $(this), ddSelect = dd.find('.dropdown-select'), ddOutput = dd.find('.dropdown-output'), ddOption = dd.find('.dropdown-option');
          if (ddSelect.find('option:selected').html() !== '') {
            dd.addClass(selected);
            ddOutput.html(ddSelect.find('option:selected').html());
            ddOption.eq(ddSelect.find('option:selected').index()).addClass(selected).siblings().removeClass(selected);
          } else {
            dd.removeClass(selected);
          }
          ddOutput.bind('click', function() {
            dropdown.removeClass(expanded);
            dd.toggleClass(expanded);
          });
          ddOption.bind('click', function() {
            var ddOpt = $(this), myIndex = ddOpt.index();
            if (!ddOpt.hasClass(selected)) {
              ddSelect.find('option').eq(myIndex).prop('selected', true).siblings().prop('selected', false).change();
            }
          });
          ddSelect.change(function() {
            if (ddSelect.find('option:selected').html() !== '') {
              dd.addClass(selected);
              ddOutput.html(ddSelect.find('option:selected').html());
              ddOption.eq(ddSelect.find('option:selected').index()).addClass(selected).siblings().removeClass(selected);
            } else {
              dd.removeClass(selected);
            }
            dd.removeClass(expanded);
          });
        });
      }
    },

    /**
     * Article
     */
    article: function() {
      var section = $('.section-article'), banner = $('.banner-article'), viewport = $(window), timer,
          detail = $('.article-detail'), intro = $('.article-intro'), toolbar = $('.toolbar');
      if (section.length) {
        App.articleBanner(banner, detail, intro, toolbar);
        viewport.bind('resize', function() {
          clearTimeout(timer);
          timer = setTimeout(function() {
            App.articleBanner(banner, detail, intro, toolbar);
          }, 250);
        });
      }
    },
    articleBanner: function(banner, detail, intro, toolbar) {
      if (!intro.length) {
        if (!toolbar.length) {
          banner.height(detail.offset().top);
        } else {
          banner.height(toolbar.offset().top);
        }
      } else {
        banner.height(intro.offset().top + (intro.outerHeight() / 2));
      }
    },

    /**
     * Offer
     */
    offer: function() {
      var offerFilter = $('.offer-filter'), offerInput = offerFilter.find('.offer-filter--input'), active = 'active',
          offerToggle = offerFilter.find('.offer-filter--toggle'), offerHolder = offerFilter.find('.offer-filter--holder'),
          offerReset = offerFilter.find('.offer-filter--reset'), offerSubmit = offerFilter.find('.offer-filter--submit');

      if (offerFilter.length) {
        offerToggle.bind('click', function() {
          var I = $(this);
          if (!I.hasClass(active)) {
            offerToggle.removeClass(active);
            I.addClass(active);
            offerFilter.addClass(active);
          } else {
            I.removeClass(active);
            offerFilter.removeClass(active);
          }
        });

        offerHolder.bind('click', function() {
          offerToggle.removeClass(active);
          offerFilter.removeClass(active);
        });

        offerReset.click(function(e) {
          offerInput.each(function() {
            var I = $(this), myStatus = I.attr('data-status');
            if (myStatus == 'prechecked') {
              I.prop('checked', true);
            } else {
              I.prop('checked', false);
            }
          });
          offerSubmit.click();
          e.preventDefault();
        });

        offerSubmit.click(function() {
          offerToggle.removeClass(active);
          offerFilter.removeClass(active);
        });
      }
    },

    /**
     * modal
     */
    modal: function() {
      var modalVideo = $('.modal-video');
      if (modalVideo.length) {
        modalVideo.each(function() {
          var I = $(this), myModal = I.attr('href'), myModalID = myModal.replace('#', ''),
              myVideo = $(myModal).find('.modal-content video')[0], myIcon = I.attr('data-icon'), myPlayer = 0;
          I.click(function(e) {
            MicroModal.show(myModalID, {
              disableScroll: true,
              disableFocus: true,
              awaitOpenAnimation: true,
              awaitCloseAnimation: true,
              onShow: function() {
                if (!myPlayer) {
                  myPlayer = new MediaElementPlayer(myVideo, {
                    iconSprite: myIcon,
                    videoWidth: '100%',
                    videoHeight: '100%',
                    startVolume: 0.75,
                    alwaysShowControls: true,
                    videoVolume: 'horizontal',
                    features: ['playpause', 'current', 'progress', 'duration', 'volume']
                  });
                  myPlayer.play();
                } else {
                  myPlayer.play();
                }
              },
              onClose: function() {
                myPlayer.pause();
              }
            });
            e.preventDefault();
          });
        });
      }
    },

    /**
     * FAQ
     */
    faq: function() {
      const collapsed = 'collapsed', composed = 'composed', selected = 'selected';

      const toggle = document.querySelectorAll('.faq-toggle');
      if (toggle.length) {
        toggle.forEach(item => {
          const target = document.querySelector(item.dataset.target);
          item.addEventListener('click', (e) => {
            if (target) {
              target.classList.toggle(collapsed);
            }
            e.preventDefault();
          });
        });
      }

      const form = document.querySelector('#faqForm');
      if (form) {
        let formStr = '';
        const formInput = form.querySelector('input');
        const formReset = form.querySelector('button[type="reset"]');
        formInput.value = '';
        formReset.addEventListener('click', (e) => {
          formStr = '';
          formInput.value = '';
          formInput.classList.remove(composed);
          App.faqControl(formStr);
          e.preventDefault();
        });
        form.addEventListener('submit', (e) => {
          formStr = formInput.value.trim();
          App.faqControl(formStr);
          if (formStr !== '') {
            formInput.classList.add(composed);
          } else {
            formInput.focus();
            formInput.classList.remove(composed);
          }
          e.preventDefault();
        });

        const tag = document.querySelectorAll('.faq-tag');
        if (tag.length) {
          tag.forEach(item => {
            item.addEventListener('click', (e) => {
              if (!item.classList.contains(selected)) {
                App.faqTag(item.dataset.filter);
              } else {
                formStr = '';
                formInput.value = '';
                formInput.classList.remove(composed);
                App.faqControl(formStr);
              }
              e.preventDefault();
            });
          });
        }
      }
    },
    faqTag: function(filter) {
      const hidden = 'hidden', selected = 'selected';
      const faqInfo = document.querySelector('.faq-info');
      const faqSection = document.querySelectorAll('.faq-section');
      let noResult = true;
      if (faqSection.length) {
        faqSection.forEach(section => {
          let isSectionHidden = true;
          const faqItem = section.querySelectorAll('.faq-item');
          if (faqItem.length) {
            faqItem.forEach(item => {
              let isItemHidden = true;
              const itemTag = item.querySelectorAll('.faq-tag');
              if (itemTag.length) {
                itemTag.forEach(tag => {
                  if (tag.dataset.filter === filter) {
                    tag.classList.add(selected);
                    noResult = false;
                    isItemHidden = false;
                    isSectionHidden = false;
                  } else {
                    tag.classList.remove(selected);
                  }
                });
              }
              item.classList.toggle(hidden, isItemHidden);
            });
          }
          section.classList.toggle(hidden, isSectionHidden);
        });
      }
      faqInfo.classList.toggle(hidden, noResult);
    },
    faqControl: function(pattern) {
      const hidden = 'hidden', collapsed = 'collapsed', selected = 'selected';
      const faqInfo = document.querySelector('.faq-info');
      const faqResult = document.querySelector('.faq-result');
      const faqTag = document.querySelectorAll('.faq-tag');
      const faqSection = document.querySelectorAll('.faq-section');
      let noResult = true;
      if (faqTag.length) {
        faqTag.forEach(tag => tag.classList.remove(selected));
      }
      if (faqSection.length) {
        faqSection.forEach(section => {
          let isSectionHidden = true;
          const faqItem = section.querySelectorAll('.faq-item');
          if (faqItem.length) {
            faqItem.forEach(item => {
              let isItemHidden = true, isItemCollapsed = true;
              const itemText = item.querySelectorAll('.faq-item--text');
              if (itemText.length) {
                itemText.forEach(text => {
                  App.faqHandle(text, pattern);
                  if (App.faqHandle(text, pattern)) {
                    noResult = false;
                    isItemHidden = false;
                    isSectionHidden = false;

                    const isTextEditor = text.classList.contains('faq-item--editor');
                    if (isTextEditor) {
                      isItemCollapsed = false;
                    }
                  }

                  if (pattern === '') {
                    isItemCollapsed = true;
                  }
                });
              }
              item.classList.toggle(hidden, isItemHidden);
              item.classList.toggle(collapsed, isItemCollapsed);
            });
          }
          section.classList.toggle(hidden, isSectionHidden);
        });
      }
      faqInfo.classList.toggle(hidden, noResult);
      faqResult.classList.toggle(hidden, !noResult);
    },
    faqHandle: function(ele, pattern) {
      const markTagOpen = '<mark>', markTagClose = '</mark>', strEmpty = '';
      let strA = ele.innerHTML.trim(), strB = '', hasResult = false;
      strA = strA.replaceAll(markTagOpen, strEmpty);
      strA = strA.replaceAll(markTagClose, strEmpty);
      if (pattern !== strEmpty) {
        if (strA.toUpperCase().indexOf(pattern.toUpperCase()) !== -1) {
          var regEx = new RegExp(`(${pattern})`, 'ig');
          strB = strA.replace(regEx, markTagOpen + '$1' + markTagClose);
          hasResult = true;
        } else {
          strB = strA;
          hasResult = false;
        }
      } else {
        strB = strA;
        hasResult = true;
      }
      ele.innerHTML = strB;
      return hasResult;
    },

    /**
     * Touch Device
     */
    touchDevice: function() {
      return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

  };

  $(function() {
    App.init();
  });

})(jQuery);
