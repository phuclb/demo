(function($) {

  'use strict';

  var App = {

    /**
     * Init
     */
    init: function() {
      App.header();
      App.banner();
      App.slider();
      App.toggler();
      App.rollover();
      App.propagation();
      App.dropdown();
      App.form();
      App.team();
      App.media();
      App.accordion();
      App.modal();
      App.privateWealth();
    },

    /**
     * Slider
     */
    slider: function() {
      var s1 = $('.slickx-slider.i1');
      if (s1.length) {
        s1.each(function() {
          var I = $(this), myChildren = I.children();
          if (myChildren.length > 1) {
            I.slick({
              accessibility: false,
              draggable: true,
              mobileFirst: true,
              infinite: false,
              adaptiveHeight: true,
              dots: true,
              arrows: false
            });
          }
        });
      }

      var s2 = $('.slickx-slider.i2');
      if (s2.length) {
        s2.on('init afterChange', function() {
          var mhItems = $('[data-mh="mh-item"]');
          if (mhItems.length) {
            mhItems.matchHeight({
              byRow: true,
              property: 'min-height',
              remove: false
            });
          }
        }).slick({
          accessibility: false,
          draggable: true,
          mobileFirst: true,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 5e3,
          pauseOnHover: false,
          pauseOnFocus: false,
          adaptiveHeight: true,
          dots: false,
          arrows: true,
          prevArrow: App.sliderArrow('prev'),
          nextArrow: App.sliderArrow('next'),
          responsive: [
            {
              breakpoint: 599,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 1023,
              settings: {
                slidesToShow: 3
              }
            }
          ]
        });
      }

      var s3 = $('.slickx-slider.i3');
      if (s3.length) {
        s3.each(function() {
          var I = $(this), myChildren = I.children();
          if (myChildren.length > 1) {
            I.slick({
              accessibility: false,
              draggable: true,
              mobileFirst: true,
              infinite: false,
              adaptiveHeight: true,
              dots: false,
              arrows: true,
              prevArrow: App.sliderArrow('prev'),
              nextArrow: App.sliderArrow('next'),
              fade: true
            });
          }
        });
      }

      var s4 = $('.slickx-slider.i4');
      if (s4.length) {
        s4.on('init breakpoint', function() {
          var storyTimeline = $('.story-timeline');
          if (storyTimeline.length) {
            storyTimeline.matchHeight({
              property: 'height',
              remove: false
            });
          }
        }).slick({
          accessibility: false,
          draggable: true,
          mobileFirst: true,
          infinite: false,
          adaptiveHeight: true,
          dots: false,
          arrows: true,
          prevArrow: App.sliderArrow('prev'),
          nextArrow: App.sliderArrow('next'),
          responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2
              }
            }
          ]
        });
      }

      var s5 = $('.slickx-slider.i5');
      if (s5.length) {
        s5.each(function() {
          var I = $(this), myChildren = I.children();
          if (myChildren.length > 1) {
            I.slick({
              accessibility: false,
              draggable: true,
              mobileFirst: true,
              infinite: false,
              adaptiveHeight: true,
              dots: true,
              arrows: false,
              autoplay: true,
              autoplaySpeed: 5e3
            });
          }
        });
      }
    },
    sliderArrow: function(direction) {
      var templateUrl = '';
      return '<button type="button" class="slick-arrow slick-' + direction + '"><svg width="100%" height="100%"><use xlink:href="' + templateUrl + '/assets/img/sprites.svg#' + direction + '"></use></svg></button>';
    },

    /**
     * Toggler
     */
    toggler: function() {
      const expanded = 'expanded';
      const hidden = 'hidden';
      const noScrollbar = 'of-hidden';
      const docCList = document.documentElement.classList;

      var toggler = $('.js-toggler'), viewport = $(window);
      if (toggler.length) {
        toggler.click(function(e) {
          var I = $(this), panel = $(I.attr('data-target')), withinHeader = I.closest('.header');
          if (panel.length) {
            if (!panel.hasClass(expanded)) {
              var expandedPanel = $('.' + expanded);
              if (expandedPanel.length) {
                expandedPanel.removeClass(expanded);
              }
              panel.addClass(expanded);
              I.addClass(expanded);
              docCList.toggle(noScrollbar, withinHeader.length);
            } else {
              panel.removeClass(expanded);
              I.removeClass(expanded);
              docCList.remove(noScrollbar);
            }
          }
          e.preventDefault();
        });

        viewport.bind('click', function(e) {
          var target = $(e.target);
          if (!target.closest('.' + expanded).length) {
            var expandedItem = $('.' + expanded);
            if (expandedItem.length) {
              toggler.removeClass(expanded);
              expandedItem.removeClass(expanded);
              docCList.remove(noScrollbar);
            }
          }
        }).bind('resize', function() {
          var expandedItem = $('.header .expanded:visible');
          docCList.toggle(noScrollbar, expandedItem.length);
        });
      }

      var switcher = $('.js-switcher');
      if (switcher.length) {
        switcher.click(function(e) {
          var I = $(this), panel = $(I.attr('data-target')), siblings = panel.siblings();
          if (panel.length) {
            panel.removeClass(hidden);
            siblings.addClass(hidden);
          }
          e.preventDefault();
        });
      }

      var collapse = $('.js-collapse');
      if (collapse.length) {
        collapse.click(function(e) {
          var I = $(this), panel = $(I.attr('data-target')), parent = panel.parent();
          if (panel.length) {
            parent.toggleClass(expanded);
          }
          e.preventDefault();
        });
      }
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
     * Propagation
     */
    propagation: function() {
      var propagation = $('.js-propagation');
      if (propagation.length) {
        propagation.click(function(e) {
          e.stopPropagation();
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
            myOutput.html(myInput.val());
            I.addClass(selected);
          } else {
            I.removeClass(selected);
          }
          myInput.change(function() {
            myOutput.html(myInput.val());
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
    },

    /**
     * Team
     */
    team: function() {
      var teamFlex = $('.team-flex');
      if (teamFlex.length) {
        teamFlex.children().addClass('item');
        App.teamControl(teamFlex, 2);
        App.teamControl(teamFlex, 3);
        App.teamControl(teamFlex, 4);
      }

      var teamItem1 = $('.team-item.i1'), active = 'active';
      if (teamItem1.length) {
        teamItem1.each(function() {
          var I = $(this);
          if (App.touchDevice()) {
            I.bind('click', function() {
              if (!I.hasClass(active)) {
                teamItem1.removeClass(active);
                I.addClass(active);
              } else {
                I.removeClass(active);
              }
            });
          } else {
            I.mouseenter(function() {
              I.addClass(active);
            }).mouseleave(function() {
              I.removeClass(active);
            });
          }
        });
      }

      var teamItem2 = $('.team-item.i2');
      if (teamItem2.length) {
        teamItem2.each(function() {
          var I = $(this);
          if (App.touchDevice()) {
            I.bind('click', function() {
              if (!I.hasClass(active)) {
                teamItem2.removeClass(active);
                I.addClass(active);
              } else {
                I.removeClass(active);
              }
            });
          } else {
            I.mouseenter(function() {
              teamItem2.removeClass(active);
              I.addClass(active);
            }).mouseleave(function() {
              I.removeClass(active);
            });
          }
        });
      }
    },
    teamControl: function(list, number) {
      var items = list.children(), length = items.length, index, str1, str2;
      if (length % number === 0) {
        index = (length / number - 1) * number;
      } else {
        index = Math.floor(length / number) * number;
      }
      str1 = 'last-' + number;
      str2 = 'not-' + str1;
      items.eq(index).addClass(str1);
      items.eq(index).nextAll().addClass(str1);
      items.eq(index).prevAll().addClass(str2);
    },

    /**
     * Media
     */
    media: function() {
      var media = $('.js-media'), revealed = 'revealed';
      if (media.length) {
        media.each(function() {
          var I = $(this), myButton = I.find('.media-button'), myIframe = I.find('.media-iframe');
          myButton.click(function(e) {
            myIframe.attr('src', myIframe.attr('data-src'));
            myIframe.removeAttr('data-src');
            I.addClass(revealed);
            e.preventDefault();
          });
        });
      }
    },

    /**
     * Accordion
     */
    accordion: function() {
      var accordion = $('.js-accordion'), expanded = 'expanded';
      if (accordion.length) {
        accordion.each(function() {
          var I = $(this), panel = $(I.attr('data-target')), parent = panel.parent();
          I.click(function(e) {
            if (panel.length) {
              if (!parent.hasClass(expanded)) {
                parent.addClass(expanded).siblings().removeClass(expanded);
              } else {
                parent.removeClass(expanded);
              }
            }
            e.preventDefault();
          });
        });
      }
    },

    /**
     * Banner
     */
    banner: function() {
      var banner = $('.banner.slidedshow'), delay = 4e3, loop = 4e3, duration = 1e3, pause = 4e3, autoplay = true, timer,
          hidden = 'hidden', active = 'active', disabled = 'disabled', animated = 'animate-animated', fadeIn = animated + ' animate-fadeIn',
          delay1s = 'animate-delay-1s', delay2s = 'animate-delay-2s', delay3s = 'animate-delay-3s',
          slideInLeft = animated + ' animate-slideInLeft', slideInRight = animated + ' animate-slideInRight';
      if (banner.length) {
        banner.imagesLoaded(function() {
          var slogan1 = $('.banner-slogan.i1'), slogan2 = $('.banner-slogan.i2'),
              info = $('.banner-info'), item = $('.banner.slidedshow .banner-item'), dots = $('.banner-dots'),
              total = item.length, current = 0, prev = total - 1,
              prevItem, prevButton, activeItem, activeButton, activeImage1, activeImage2;

          // Dot
          item.each(function(i) {
            var btnClass = 'banner-dot', btnIndex = i;
            dots.append('<button class="' + btnClass + '" type="button">' + btnIndex + '</button>');
          });
          var dot = $('.banner-dot');
          dots.addClass(disabled);
          dot.eq(current).addClass(active).siblings().removeClass(active);

          // Init
          slogan1.removeClass(hidden).addClass(fadeIn + ' ' + delay1s);
          slogan2.removeClass(hidden).addClass(fadeIn + ' ' + delay2s);
          info.removeClass(hidden).addClass(fadeIn + ' ' + delay3s);

          activeItem = item.eq(current);
          activeItem.removeClass(hidden);
          activeButton = activeItem.find('.banner-button');
          activeButton.removeClass(hidden).addClass(fadeIn + ' ' + delay3s);

          var bannerSwitch = function(current, prev) {

            // Dot
            dots.addClass(disabled);
            dot.eq(current).addClass(active).siblings().removeClass(active);

            // Define
            prevItem = item.eq(prev);
            prevButton = prevItem.find('.banner-button');
            activeItem = item.eq(current);
            activeButton = activeItem.find('.banner-button');
            activeImage1 = activeItem.find('.banner-image.i1');
            activeImage2 = activeItem.find('.banner-image.i2');

            // Switch
            prevItem.removeClass(active);
            prevButton.removeClass(fadeIn + ' ' + delay1s);
            activeItem.removeClass(hidden).addClass(active);
            activeButton.removeClass(hidden).addClass(fadeIn + ' ' + delay1s);
            activeImage1.addClass(slideInLeft);
            activeImage2.addClass(slideInRight);

            // Reset
            setTimeout(function() {
              prevItem.addClass(hidden);
              prevButton.addClass(hidden);
              activeImage1.removeClass(slideInLeft);
              activeImage2.removeClass(slideInRight);
              dots.removeClass(disabled);
            }, duration);

          }, bannerAuto = function() {
            autoplay = true;
            clearTimeout(timer);
            clearInterval(timer);
            timer = setInterval(function() {
              if (current < total - 1) {
                current += 1;
                prev = current - 1;
              } else {
                current = 0;
                prev = total - 1;
              }
              bannerSwitch(current, prev);
            }, loop);
          };

          // Delay
          timer = setTimeout(function() {

            // Reset
            activeButton.removeClass(fadeIn + ' ' + delay3s);
            dots.removeClass(disabled);

            // Switch
            if (autoplay) {
              bannerAuto();
            }

            // Dot
            dot.click(function() {
              var I = $(this), myCurrent = I.index(), myPrev = I.siblings('.active').index();
              if (!I.hasClass(active)) {
                autoplay = false;
                clearTimeout(timer);
                clearInterval(timer);
                current = myCurrent;
                bannerSwitch(myCurrent, myPrev);
                timer = setTimeout(function() {
                  bannerAuto();
                }, pause);
              }
            });

          }, delay);
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
                if (myVideo) {
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
                  }
                  myPlayer.play();
                }
              },
              onClose: function() {
                if (myVideo && myPlayer) {
                  myPlayer.pause();
                }
              }
            });
            e.preventDefault();
          });
        });
      }
    },

    /**
     * Private Wealth
     */
    privateWealth: function() {
      var mPrivateWealth = $('.modal-private-wealth');
      if (mPrivateWealth.length) {
        mPrivateWealth.each(function() {
          var I = $(this), myModal = I.attr('href'), myModalID = myModal.replace('#', '');
          I.click(function(e) {
            MicroModal.show(myModalID, {
              disableScroll: true,
              disableFocus: true,
              awaitOpenAnimation: true,
              awaitCloseAnimation: true,
              onShow: pwReset()
            });
            e.preventDefault();
          });
        });
      }

      var mAccessDenied = $('.modal-access-denied');
      if (mAccessDenied.length) {
        mAccessDenied.each(function() {
          var I = $(this), myModal = I.attr('href'), myModalID = myModal.replace('#', '');
          I.click(function(e) {
            MicroModal.close();
            MicroModal.show(myModalID, {
              disableScroll: true,
              disableFocus: true,
              awaitOpenAnimation: true,
              awaitCloseAnimation: true
            });
            e.preventDefault();
          });
        });
      }

      var pwInput = $('.pw-input');
      if (pwInput.length) {
        pwReset();
        pwInput.on('change', function() {
          pwForm();
        });
      }

      function pwForm() {
        var pwButton = $('.pw-button');
        if (pwButton.length) {
          var isRadioChecked = $('input[name="pWRadio"]:checked').length > 0;
          var isCheckboxChecked = $('#pWCheckbox').is(':checked');
          if (isRadioChecked && isCheckboxChecked) {
            pwButton.removeClass('disabled');
          } else {
            pwButton.addClass('disabled');
          }
        }
      }

      function pwReset() {
        $('input[name="pWRadio"]').prop('checked', false);
        $('#pWCheckbox').prop('checked', false);
        pwForm();
      }
    },

    /**
     * Header
     */
    header: function() {
      var modal = $('.header-modal');
      if (modal.length) {
        modal.each(function() {
          var I = $(this), myList = I.children('ul');
          if (myList.length) {
            I.addClass(myList.children('li').length > 4 ? 'gte-5' : 'lt-5');
          }
        });
      }
    },

    /**
     * Touch Device
     */
    touchDevice: function() {
      return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    },

  };

  $(function() {
    App.init();
  });

})(jQuery);
