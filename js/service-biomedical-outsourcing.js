document.addEventListener("DOMContentLoaded", () => {

    /*
     * Service page interactions
     */

    const buttons = document.querySelectorAll(
        ".primary-btn, .cta-button"
    );

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            // Contact page navigation
            window.location.href = "../pages/contact.html";

        });

    });


    /*
     * Simple reveal animation
     */

    const revealElements = document.querySelectorAll(
        ".benefit-card, .scope-card, .process-step, .cta-box"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });

});