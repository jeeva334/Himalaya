/* =========================================================
   HIMALAYA MEDICAL SERVICES
   REUSABLE CHATBOT JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. LOAD CHATBOT COMPONENT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const chatbotContainer =
        document.getElementById("chatbot-container");


    if (!chatbotContainer) {

        console.error(
            "Chatbot container not found."
        );

        return;

    }


    fetch("components/chatbot.html")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Unable to load chatbot.html"
                );

            }

            return response.text();

        })

        .then(function (html) {

            chatbotContainer.innerHTML = html;

            initializeChatbot();

        })

        .catch(function (error) {

            console.error(
                "Chatbot loading error:",
                error
            );

        });

});


/* =========================================================
   2. INITIALIZE CHATBOT
   ========================================================= */

function initializeChatbot() {

    const chatbot =
        document.querySelector(".chatbot");

    const chatbotToggle =
        document.getElementById(
            "chatbotToggle"
        );

    const chatbotClose =
        document.getElementById(
            "chatbotClose"
        );

    const whatsappOption =
        document.getElementById(
            "whatsappOption"
        );

    const serviceEnquiryOption =
        document.getElementById(
            "serviceEnquiryOption"
        );


    /* =====================================================
       CHECK REQUIRED ELEMENTS
    ===================================================== */

    if (!chatbot) {

        console.error(
            "Chatbot element not found."
        );

        return;

    }


    if (!chatbotToggle) {

        console.error(
            "Chatbot toggle button not found."
        );

        return;

    }


    /* =====================================================
       3. OPEN / CLOSE CHATBOT
    ===================================================== */

    chatbotToggle.addEventListener(
        "click",
        function () {

            chatbot.classList.toggle(
                "active"
            );


            const isOpen =
                chatbot.classList.contains(
                    "active"
                );


            chatbotToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            const chatbotWindow =
                document.getElementById(
                    "chatbotWindow"
                );


            if (chatbotWindow) {

                chatbotWindow.setAttribute(
                    "aria-hidden",
                    !isOpen
                );

            }

        }
    );


    /* =====================================================
       4. CLOSE CHATBOT
    ===================================================== */

    if (chatbotClose) {

        chatbotClose.addEventListener(
            "click",
            function () {

                chatbot.classList.remove(
                    "active"
                );


                chatbotToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const chatbotWindow =
                    document.getElementById(
                        "chatbotWindow"
                    );


                if (chatbotWindow) {

                    chatbotWindow.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }
        );

    }


    /* =====================================================
       5. WHATSAPP
    ===================================================== */

    if (whatsappOption) {

        whatsappOption.addEventListener(
            "click",
            function () {

                /*
                 * Replace this number with the
                 * actual Himalaya Medical Services
                 * WhatsApp number.
                 *
                 * Format:
                 * Country code + number
                 *
                 * Example:
                 * 919876543210
                 */

                const phoneNumber =
                    "919XXXXXXXXX";


                const message =
                    "Hello, I would like to know more about your biomedical engineering services and medical equipment.";


                const whatsappURL =
                    "https://wa.me/" +
                    phoneNumber +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       6. SERVICE ENQUIRY
    ===================================================== */

    if (serviceEnquiryOption) {

        serviceEnquiryOption.addEventListener(
            "click",
            function () {

                window.location.href =
                    "contact.html#enquiry";

            }
        );

    }


    /* =====================================================
       7. CLOSE WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                chatbot.classList.contains(
                    "active"
                ) &&
                !chatbot.contains(
                    event.target
                )
            ) {

                chatbot.classList.remove(
                    "active"
                );


                chatbotToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const chatbotWindow =
                    document.getElementById(
                        "chatbotWindow"
                    );


                if (chatbotWindow) {

                    chatbotWindow.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }

            }

        }
    );

}