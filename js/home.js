/* =========================================================
   HIMALAYA MEDICAL SERVICES
   HOME PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeHeaderScrollState();

    initializeMobileNavigation();

    initializeHeroCarousel();

});


/* =========================================================
   2. HEADER SCROLL STATE
   Adds a subtle shadow to the sticky header once the page
   has been scrolled, matching the existing .scrolled style.
   ========================================================= */

function initializeHeaderScrollState() {

    var header = document.querySelector(".site-header");

    if (!header) {
        return;
    }

    function updateHeaderState() {

        if (window.scrollY > 8) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, { passive: true });

}


/* =========================================================
   3. MOBILE NAVIGATION
   Handles the hamburger toggle and, on small screens, the
   Services submenu (which relies on hover on desktop).
   ========================================================= */

function initializeMobileNavigation() {

    var toggle = document.getElementById("mobileMenuToggle");
    var nav = document.querySelector(".main-navigation");

    if (!toggle || !nav) {
        return;
    }

    var servicesItem = document.querySelector(".services-nav-item");
    var servicesLink = document.querySelector(".services-nav-link");


    function closeMobileNav() {

        nav.classList.remove("active");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open navigation menu");
        document.body.classList.remove("menu-open");

        if (servicesItem) {
            servicesItem.classList.remove("mobile-open");
        }

    }


    toggle.addEventListener("click", function () {

        var isOpen = nav.classList.toggle("active");

        toggle.classList.toggle("active", isOpen);
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        toggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        document.body.classList.toggle("menu-open", isOpen);

    });


    // Close the mobile menu when a plain nav link is followed.

    var navLinks = nav.querySelectorAll(
        ".nav-link:not(.services-nav-link)"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMobileNav();
        });

    });


    // On mobile, the Services item has no hover, so tapping it
    // opens/closes the submenu instead of navigating away.

   // Mobile Services behavior
// First tap = open/close service list
// Second tap = navigate to Services page

if (servicesItem && servicesLink) {

    servicesLink.addEventListener("click", function (event) {

        if (window.innerWidth > 992) {

            return;

        }

        var isServicesOpen =
            servicesItem.classList.contains("mobile-open");

        if (!isServicesOpen) {

            // First tap: open service list
            event.preventDefault();

            servicesItem.classList.add("mobile-open");

        } else {

            // Second tap: allow normal navigation
            servicesItem.classList.remove("mobile-open");

            // Do NOT use preventDefault()
            // href="services.html" will work normally

        }

    });

}


    // Reset mobile menu state if the viewport grows back to desktop.

    window.addEventListener("resize", function () {

        if (window.innerWidth > 992) {
            closeMobileNav();
        }

    });

}


/* =========================================================
   4. HERO CAROUSEL
   Handles slide rotation, arrow navigation, indicator clicks,
   the live slide counter, and autoplay with pause-on-hover.
   ========================================================= */

function initializeHeroCarousel() {

    var carousel = document.querySelector(".hero-carousel");

    if (!carousel) {
        return;
    }

    var slides = Array.prototype.slice.call(
        carousel.querySelectorAll(".hero-slide")
    );

    var indicators = Array.prototype.slice.call(
        carousel.querySelectorAll(".hero-indicator")
    );

    var prevButton = carousel.querySelector(".hero-carousel-prev");
    var nextButton = carousel.querySelector(".hero-carousel-next");
    var counter = carousel.querySelector(".hero-slide-count");

    if (slides.length === 0) {
        return;
    }

    var startIndex = slides.findIndex(function (slide) {
        return slide.classList.contains("active");
    });

    var currentIndex = startIndex > -1 ? startIndex : 0;

    var AUTOPLAY_DELAY = 6500;
    var autoplayTimer = null;


    function padNumber(number) {

        return number < 10 ? "0" + number : String(number);

    }


    function goToSlide(index) {

        var total = slides.length;

        currentIndex = ((index % total) + total) % total;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === currentIndex);
        });

        indicators.forEach(function (indicator, i) {
            indicator.classList.toggle("active", i === currentIndex);
        });

        if (counter) {
            counter.textContent =
                padNumber(currentIndex + 1) + " / " + padNumber(total);
        }

    }


    function nextSlide() {
        goToSlide(currentIndex + 1);
    }


    function prevSlide() {
        goToSlide(currentIndex - 1);
    }


    function startAutoplay() {

        stopAutoplay();

        autoplayTimer = window.setInterval(nextSlide, AUTOPLAY_DELAY);

    }


    function stopAutoplay() {

        if (autoplayTimer) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }

    }


    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            startAutoplay();
        });
    }


    if (prevButton) {
        prevButton.addEventListener("click", function () {
            prevSlide();
            startAutoplay();
        });
    }


    indicators.forEach(function (indicator, i) {

        indicator.addEventListener("click", function () {
            goToSlide(i);
            startAutoplay();
        });

    });


    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);


    // Pause when the tab isn't visible, resume when it is.

    document.addEventListener("visibilitychange", function () {

        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }

    });


    goToSlide(currentIndex);
    startAutoplay();

}