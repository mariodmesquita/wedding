$(document).ready(function () {
  $(".flexslider").flexslider({
    animation: "slide",
  });

  $(".single_image").fancybox({
    padding: 4,
  });

  $(".fancybox").fancybox({
    padding: 4,
    width: 1000,
    height: 800,
  });

  $('[data-toggle="tooltip"]').tooltip();

  $(".nav-toggle").click(function () {
    $(this).toggleClass("active");
    $(".header-nav").toggleClass("open");
    event.preventDefault();
  });

  $(".header-nav li a").click(function () {
    $(".nav-toggle").toggleClass("active");
    $(".header-nav").toggleClass("open");
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 20) {
      $("section.navigation").addClass("fixed");
    } else {
      $("section.navigation").removeClass("fixed");
    }
  });

  // Função de smooth scroll compatível com iOS
  function smoothScrollTo(target, offset) {
    var targetPosition = target.offset().top - (offset || 90);

    // Detectar iOS
    var isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
      // Para iOS, usar scrollTo com comportamento smooth se suportado
      if ("scrollBehavior" in document.documentElement.style) {
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        // Fallback para iOS mais antigos - animação manual
        var start = window.pageYOffset;
        var distance = targetPosition - start;
        var duration = 1500;
        var startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          var timeElapsed = currentTime - startTime;
          var run = easeInOutQuad(timeElapsed, start, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      }
    } else {
      // Para outros browsers, usar jQuery animate
      $("html,body").animate(
        {
          scrollTop: targetPosition,
        },
        1500
      );
    }
  }

  $("a[href*=#]:not([href=#])").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        smoothScrollTo(target, 90);
        return false;
      }
    }
  });
});
