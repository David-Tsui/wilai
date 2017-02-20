var VIEWPORT_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var VIEWPORT_HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

$(window).on('load', function() {
  var callback = function() {
    $('body').removeClass('initial');
    section1Init();
  };
  var tl = new TimelineLite({onComplete: callback});
  tl.to('#loading', 1, { opacity: 0, zIndex: -1 });

  $('.chat-panel').click(function() {
    $(this).hide(0);
    $('.chat-box').show(0);
  });

  $('.chat-box-title').click(function() {
    $('.chat-box').hide(0);
    $('.chat-panel').show(0);
  });
});

$(window).on('resize', function() {
  VIEWPORT_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  VIEWPORT_HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  // if (VIEWPORT_WIDTH <= 768)
});

$(document).ready(function() {
  var IS_PAGE2_ANIMATED = false;
  var IS_PAGE3_ANIMATED = false;
  var IS_PAGE4_ANIMATED = false;
  $('#fullpage').fullpage({
    menu: '#menu',
    anchors: ['index', 'service', 'intro', 'demo', 'contact'],
    scrollingSpeed: 850,
    normalScrollElements: '#projects-pc, #projects-mb',
    scrollOverflow: true,
    onLeave: function(index, nextSlideIndex) {
      changeTopLogo(nextSlideIndex);
      changeMenu(nextSlideIndex);
      if (nextSlideIndex == 2 && !IS_PAGE2_ANIMATED) {
        IS_PAGE2_ANIMATED = true;
        var Page2Callback = function() { IS_PAGE2_ANIMATED = false; };
        var tl = new TimelineLite({ onComplete: Page2Callback });
        var title = document.querySelectorAll('.service-container h1.title .dest span');
        var line = document.querySelectorAll('.service-container h1.title .line');
        var service_segments = document.querySelectorAll('.service-container .segment');
        if (VIEWPORT_WIDTH >= 768) {
          tl.set(title, { opacity: 0 })
            .set(service_segments, { opacity: 0, scale: .95 })
            .set(line, { opacity: 0, scaleX: 0, transformOrigin: 'left' })
            .staggerTo(title, .25, { opacity: 1, delay: 1 }, 0.075)
            .to(line, .65, { opacity: 1, scaleX: 1 })
            .staggerTo(service_segments, 1.25, { opacity: 1 }, .3)
            .staggerTo(service_segments, .5, { scale: 1 }, .25, '-=2.05');
        } else {
          tl.set(title, { opacity: 0 })
            .set(service_segments, { opacity: 0, scale: .55 })
            .set(line, { opacity: 0, scaleX: 0, transformOrigin: 'left' })
            .staggerTo(title, .25, { opacity: 1, delay: 1 }, 0.075)
            .to(line, .65, { opacity: 1, scaleX: 1 })
            .staggerTo(service_segments, 1.25, { opacity: 1 }, .3)
            .staggerTo(service_segments, .5, { scale: .5 }, .25, '-=2.05');
        }
      }
      if (nextSlideIndex == 3 && !IS_PAGE3_ANIMATED) {
        IS_PAGE3_ANIMATED = true;
        var Page3Callback = function() {
          $('.proc-segment').addClass('hoverable');
          $('.proc-segment > img').mouseenter(function(e) {
            var step = $(e.target).attr('step');
            TweenMax.to('.proc-detail .msg[step=' + step + '] .dest', .25, { opacity: 1 });
          }).mouseleave(function(e) {
            var step = $(e.target).attr('step');
            TweenMax.to('.proc-detail .msg[step=' + step + '] .dest', .25, { opacity: 0 });
          })
        };
        var tl = new TimelineLite({ onComplete: Page3Callback });
        if (VIEWPORT_WIDTH >= 768) {
          var proc_segments = document.getElementsByClassName('proc-segment');
          var shape_duration = .5, msg_duration = .25, msg_speed = .075, msg_delay = 1;
          tl.to('.proc-detail', 1, { opacity: 1, delay: .75 })
            .to(proc_segments[0], shape_duration, { opacity: 1, x: -157, y: -357, rotation: 360 }, 'step1')
            .staggerTo('.proc-detail .msg[step=1] .dest .header span', msg_duration, { opacity: 1 }, msg_speed)
            .staggerTo('.proc-detail .msg[step=1] .dest .content span', msg_duration, { opacity: 1 }, msg_speed)
            .to('.proc-detail .msg[step=1] .dest', .5, { opacity: 0, delay: msg_delay })
            .to(proc_segments[1], shape_duration, { opacity: 1, x: -347, y: -252, rotation: 360 }, 'step2')
            .staggerTo('.proc-detail .msg[step=2] .dest .header span', msg_duration, { opacity: 1 }, msg_speed)
            .staggerTo('.proc-detail .msg[step=2] .dest .content span', msg_duration, { opacity: 1 }, msg_speed)
            .to('.proc-detail .msg[step=2] .dest', .5, { opacity: 0, delay: msg_delay })
            .to(proc_segments[2], shape_duration, { opacity: 1, x: -347, y: -33, rotation: 360 }, 'step3')
            .staggerTo('.proc-detail .msg[step=3] .dest .header span', msg_duration, { opacity: 1 }, msg_speed)
            .staggerTo('.proc-detail .msg[step=3] .dest .content span', msg_duration, { opacity: 1 }, msg_speed)
            .to('.proc-detail .msg[step=3] .dest', .5, { opacity: 0, delay: msg_delay })
            .to(proc_segments[3], shape_duration, { opacity: 1, x: -157, y: 75, rotation: 360 }, 'step4')
            .staggerTo('.proc-detail .msg[step=4] .dest .header span', msg_duration, { opacity: 1 }, msg_speed)
            .staggerTo('.proc-detail .msg[step=4] .dest .content span', msg_duration, { opacity: 1 }, msg_speed)
            .to('.proc-detail .msg[step=4] .dest', .5, { opacity: 0, delay: msg_delay });
        } else {
          // pass
        }
      }
      if (nextSlideIndex == 4) {
        if (IS_PAGE4_ANIMATED) return;
        IS_PAGE4_ANIMATED = true;
        section4Init();
      }
    }
  });

  particlesJS.load('particle-js', 'assets/json/particles.json', function() {
    // console.log('callback - particles.js config loaded');
  });

  section2Init();
  section3Init();
  section5Init();
});

function section1Init() {
  var callback = function() {
    if (VIEWPORT_WIDTH <= 768) {
      var offset = (VIEWPORT_WIDTH >= 320) ? VIEWPORT_WIDTH - 320 : 0;
      $('.fb-page').attr({
        'data-height': 500,
        'data-width': 320 + offset
      });
    }
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.8&appId=1677661819185560";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  var tl = new TimelineLite({onComplete: callback});
  var titles = document.querySelectorAll('#page1 .image-title');
  tl.set(titles[1], { opacity: 1, y: 400, z: 120, transformPerspective: 3, rotationX: 40, scale: 3 })
    .set(titles[0], { scale: .5 })
    .to(titles[1], 1.2, { opacity: .85, y: 50, z: -100, scale: 1, ease: Power1.easeOut })
    .to(titles[1], .4, { opacity: 0 }, '-=.4')
    .set(titles[1], { transformPerspective: 100, rotationX: 0, y: 15, z: 0, scale: .5 })
    .to(titles[0], 1.2, { opacity: 1, scale: 1, ease: Elastic.easeOut.config(1, 0.5), delay: .2 })
    .to(titles[1], 1.2, { opacity: 1, scale: 1, ease: Elastic.easeOut.config(1, 0.5) }, '-=1')
    .to('#menu', 1.2, { opacity: 1, y: 0, ease: Power3.easeOut }, '-=1.2')
    .to('.chat-panel', .85, { opacity: 1, y: 0 });
}

function section2Init() {
  splitChar($('.service-container h1.title .source'), $('.service-container h1.title .dest'));
}

function section3Init() {
  splitChar($('.proc-container h1.title .source'), $('.proc-container h1.title .dest'));
  splitChar($('.proc-container-mobile h1.title .source'), $('.proc-container-mobile h1.title .dest'));
  splitChar($('.intro-container h1.title .source'), $('.intro-container h1.title .dest'));
  splitChar($('.tech-container h1.title .source'), $('.tech-container h1.title .dest'));

  $source = $('.proc-detail .msg .source');
  $dest = $('.proc-detail .msg .dest');
  for(var $i = 0; $i < $source.length; $i++) {
    var source = $source[$i], dest = $dest[$i];
    splitChar($(source).find('p.header'), $(dest).find('p.header'));
    splitChar($(source).find('p.content'), $(dest).find('p.content'));
  };

  // if (VIEWPORT_WIDTH >= 768) {
    $('.cloud9-carousel').Cloud9Carousel({
      autoPlay: 1,
      autoPlayDelay: 5000,
      bringToFront: true,
      mirror: {
        gap    : 2,
        height : 0.75,
        opacity: 0.25
      }
    });
  // }
  window.onresize = function() {
    $('.cloud9-carousel').data('carousel').deactivate();
    $('.cloud9-carousel').Cloud9Carousel({
      autoPlay: 1,
      autoPlayDelay: 5000,
      mirror: {
        gap    : 2,
        height : 0.75,
        opacity: 0.3
      }
    });
  }
}

function section4Init() {
  var scrollTop = 0;
  getYoutubeList().then(function(res) {
    res = res.items;
    video_list = res.map(function(video) {
      var snippet = video.snippet;
      return {
        title      : snippet.title,
        description: snippet.description,
        thumbnail  : snippet.thumbnails.medium.url,
        id         : snippet.resourceId.videoId
      }
    });
    var video_ul = $(".projects-list");
    video_list.forEach(function(video, i) {
      var index = i;
      var temp = $("#project-template").clone().removeAttr('id');
      temp.find(".thumbnail").attr('src', video.thumbnail);
      temp.find(".title").html(video.title);
      temp.find('.project-link').click(function() {
        changeVideo($(this), video);
      });
      video_ul.append(temp);
    });

    $('#project-template').remove();
    $('#projects-mb .projects-list').slick({
      // dots: true,
      arrows: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    });

    // mouse wheel
    var mouseWheelHandler = function(e) {
      var body_height = $('body').height(), scrollbar_height = $('.scrollbar-thumb').height(), menu_height = $('#menu').height();
      var offset = 0, max_scrollTop = -1 * $('.project-link').height() * (video_list.length - 4) + offset;
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      if (delta > 0) { // up
        if (scrollTop >= 0) return;
        (scrollTop > -100) ? scrollTop = 0 : scrollTop += 100;
      } else { // down
        if (scrollTop <= max_scrollTop) return;
        (scrollTop <= -200 * (video_list.length - 4) + 60) ? scrollTop -= 40 : scrollTop -= 100;
      }
      TweenMax.to('.scroll-content', .35, { y: scrollTop });
      TweenMax.to('.scrollbar-thumb', .5, { y: scrollTop * ((body_height - scrollbar_height - menu_height) / max_scrollTop) });
    };

    var projects = document.getElementById('projects-pc');
    // IE9, Chrome, Safari, Opera
    projects.addEventListener("mousewheel", mouseWheelHandler, false);
    // Firefox
    projects.addEventListener("DOMMouseScroll", mouseWheelHandler, false);

    $('#demo-video').attr('src', 'https://www.youtube.com/embed/' + video_list[0].id);
    if (VIEWPORT_WIDTH <= 768) {
      var offset = VIEWPORT_WIDTH - 320;
      $('#demo-video').attr({width: 280 + offset, height: 200});
    }
    $('#demo-video').mediaelementplayer({
      features: ['playpause', 'current', 'progress', 'duration', 'volume']
    });

    var callback = function() {
      video_ul.find('.project-item:first-child').each(function() {
        $(this).find('.project-link').click();
      });
    };
    var tl1 = new TimelineLite({onComplete: callback}),
      tl2 = new TimelineLite({onComplete: callback});
    tl1.to('#projects-mb', .65, { y: 0, delay: 1 })
      .staggerTo('#projects-mb .project-item', .35, { opacity: 1, y: 0 }, .12, '-=0.8')
      .to('.video-container', 1, { opacity: 1 });
    tl2.to('#projects-pc', .65, { x: 0, delay: 1 })
      .staggerTo('#projects-pc .project-item', .35, { opacity: 1, x: 0 }, .12, '-=0.8')
      .to('.video-container', 1, { opacity: 1 });
  });
}

function section5Init() {
  // var initMap = function() {
  //   var myLatLng = {
  //     lat: 24.8269282,
  //     lng: 121.01498950
  //   };
  //   var mapOptions = {
  //     zoom: 12,
  //     center: myLatLng
  //   };
  //   var map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
  //   var marker = new google.maps.Marker({
  //     position: myLatLng,
  //     map: map,
  //     title: '威萊動畫視覺設計有限公司'
  //   });

  //   var contentString = '<div class="location">威萊動畫視覺設計有限公司</div>';

  //   var infowindow = new google.maps.InfoWindow({
  //     content: contentString
  //   });
  //   infowindow.open(map, marker);
  //   setTimeout(function() {
  //     $('gm-style-iw').css({ left: '22px !important' });
  //   }, 0);
  // };
  // initMap();
  var handleSendMail = function () {
    $('#contact-form').submit(function(e) {
      e.preventDefault();
      var req = {
        name: $('input[name=\'contactName\'').val(),
        email: $('input[name=\'contactEmail\'').val(),
        content: $('textarea[name=\'contactMessage\']').val()
      };
      var uri = window.location.pathname + 'send_mail';
      $.post(uri, req, function(res) {
        console.log("res: ", res);
        if (res.error_id === 0) {
          alert('發送成功!');
        }
      });
    });
  };
  handleSendMail();
  $('input, textarea').on('focus', function() {
    $('#menu').addClass('typing');
  }).on('blur', function() {
    $('#menu').removeClass('typing');
  });
}

function splitChar($source, $target) {
  var $source = $source, text = $source.text(), words = text.split("");
  var html = "";
  for (var i = 0; i < words.length; i++) {
    html += '<span>' + words[i] + '</span>';
  };
  $target.html(html).children().css({ opacity: 0 });
}

function changeVideo(element, video, is_init) {
  if (element.hasClass('active')) return;
  var parents = element.parents('.projects');
  parents.find('.project-link').removeClass('active');
  element.addClass('active');

  var callback = function() {
    var msg_duration = .25, msg_speed = .075, msg_delay = 1;
    var player = mejs.players['mep_0'];
    player.setSrc('https://www.youtube.com/embed/' + video.id);
    player.setPoster('');
    player.load();

    var vd = $('.video-description');
    vd.find('.source .title').text(video.title);
    vd.find('.source .content').html(video.description);
    var $source = $('.video-description .source');
    var $dest = $('.video-description .dest');
    for(var $i = 0; $i < $source.length; $i++) {
      var source = $source[$i], dest = $dest[$i];
      splitChar($(source).find('h3.title'), $(dest).find('h3.title'));
      splitChar($(source).find('p.content'), $(dest).find('p.content'));
    };
    tl = new TimelineLite();
    tl.to('#demo-video', .5, { opacity: 1, delay: .35 })
      .staggerTo('.video-description .dest .title span', msg_duration, { opacity: 1 }, msg_speed)
      .staggerTo('.video-description .dest .content span', msg_duration, { opacity: 1 }, msg_speed - 0.025);
  }
  if (is_init) {
    callback();
  } else {
    var tl = new TimelineLite({ onComplete: callback });
    tl.to('#demo-video', .5, { opacity: 0.085 });
  }

  // if (VIEWPORT_WIDTH < 1200) {
  //   tl.to('#demo-video', .5, { opacity: 0 });
  // } else {
  //   tl.to('#demo-video', .75, { opacity: 0 })
  //     .to('#demo-video', .3, { scale: 0, rotation: 0, ease: Power1.easeIn }, '-=.65');
  // }
}

function getYoutubeList() {
  var api_key = 'AIzaSyA6Ps99kmLXnp-K9hpR3Cy5WySsKlpP6L8';
  var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLjGER8gQdcHWal0zTRTILyEYOAUxbakez&key=' + api_key;
  return $.getJSON(url);
};

function changeTopLogo(nextIndex) {
  if (nextIndex % 2 === 0) {
    $('.top-static-bg').addClass('bright');
  } else {
    $('.top-static-bg').removeClass('bright');
  }
}

function changeMenu(nextIndex) {
  if (nextIndex % 2 === 0) {
    $('#menu').addClass('bright');
  } else {
    $('#menu').removeClass('bright');
  }
}