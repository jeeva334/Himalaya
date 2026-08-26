/* =========================================================
   WHO WE ARE — ACCORDION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const accordionItems = document.querySelectorAll(
        ".who-accordion-item"
    );

    if (!accordionItems.length) {
        return;
    }


    accordionItems.forEach((item) => {

        const header = item.querySelector(
            ".who-accordion-header"
        );

        const icon = item.querySelector(
            ".who-accordion-icon"
        );


        header.addEventListener("click", () => {

            const isActive = item.classList.contains(
                "active"
            );


            /* ---------------------------------------------
               CLOSE ALL OTHER ITEMS
            --------------------------------------------- */

            accordionItems.forEach((otherItem) => {

                const otherHeader =
                    otherItem.querySelector(
                        ".who-accordion-header"
                    );

                const otherIcon =
                    otherItem.querySelector(
                        ".who-accordion-icon"
                    );


                otherItem.classList.remove(
                    "active"
                );

                otherHeader.setAttribute(
                    "aria-expanded",
                    "false"
                );

                otherIcon.textContent = "+";

            });


            /* ---------------------------------------------
               OPEN SELECTED ITEM
            --------------------------------------------- */

            if (!isActive) {

                item.classList.add(
                    "active"
                );

                header.setAttribute(
                    "aria-expanded",
                    "true"
                );

                icon.textContent = "−";

            }

        });

    });

});

/* =========================================================
   WHO WE SUPPORT — INTERACTIVE CARDS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const supportCards = document.querySelectorAll(
        ".who-support-card"
    );


    /* ---------------------------------------------------------
       Stop if the section does not exist on this page
    --------------------------------------------------------- */

    if (!supportCards.length) {
        return;
    }


    /* ---------------------------------------------------------
       Set first card as active by default
    --------------------------------------------------------- */

    let activeCard = document.querySelector(
        ".who-support-card.is-active"
    );


    if (!activeCard) {

        activeCard = supportCards[0];

        activeCard.classList.add("is-active");

    }


    /* ---------------------------------------------------------
       Card interaction
    --------------------------------------------------------- */

    supportCards.forEach((card) => {

        card.addEventListener("click", () => {

            /* ---------------------------------------------
               If the clicked card is already active,
               collapse it
            --------------------------------------------- */

            if (card.classList.contains("is-active")) {

                card.classList.remove("is-active");

                activeCard = null;

                return;
            }


            /* ---------------------------------------------
               Close currently active card
            --------------------------------------------- */

            supportCards.forEach((item) => {

                item.classList.remove("is-active");

            });


            /* ---------------------------------------------
               Open clicked card
            --------------------------------------------- */

            card.classList.add("is-active");

            activeCard = card;

        });

    });


    /* ---------------------------------------------------------
       Keyboard accessibility
    --------------------------------------------------------- */

    supportCards.forEach((card) => {

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.setAttribute(
            "role",
            "button"
        );


        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    card.click();

                }

            }
        );

    });

});