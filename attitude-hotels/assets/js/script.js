(function($) {
  'use strict';

  const status = {
    active: 'active',
    hidden: 'd--hidden',
    expanded: 'expanded'
  };

  // Article Tab
  var articleToggle = $('.nux-article-toggle'), articleSlider = $('.nux-article-slider');
  if (articleToggle.length) {
    articleToggle.click(function(e) {
      var I = $(this), myAria = 'aria-expanded', myTarget = $(I.attr('href'));
      if (!I.hasClass(status.active)) {
        articleToggle.attr(myAria, false).removeClass(status.active);
        articleSlider.addClass(status.hidden);
        I.attr(myAria, true);
        I.addClass(status.active);
        myTarget.removeClass(status.hidden);
      }
      e.preventDefault();
    });
  }

  // Article Slider
  var articleSplide = $('.splide-article');
  if (articleSplide.length) {
    articleSplide.each(function() {
      const mySplide = new Splide(this, {
        autoWidth: true,
        gap: 24,
        arrows: false,
        pagination: false,
        drag: true,
        snap: true,
        mediaQuery: 'min',
        breakpoints: {
          768: {
            gap: 48
          }
        }
      });
      mySplide.mount();
    });
  }

  // Figure
  var figureSplide = $('.splide-figure');
  if (figureSplide.length) {
    figureSplide.each(function() {
      const mySplide = new Splide(this, {
        perPage: 1,
        perMove: 1,
        autoHeight: true,
        arrows: true,
        pagination: false,
        drag: true,
        snap: true
      });
      mySplide.mount();
    });
  }

  // Sitemap
  var sitemapToggle = $('.nux-sitemap-toggle');
  if (sitemapToggle.length) {
    sitemapToggle.bind('click', function(e) {
      var I = $(this), isExpanded = false, myAria = 'aria-expanded';
      if (!I.hasClass(status.expanded)) {
        isExpanded = true;
      } else {
        isExpanded = false;
      }
      I.attr(myAria, isExpanded);
      I.toggleClass(status.expanded, isExpanded);
      e.preventDefault();
    });
  }

}(jQuery));