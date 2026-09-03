/* =========================================================
   HIMALAYA MEDICAL SERVICES
   CONTACT PAGE JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeEnquiryForm();

});


/* =========================================================
   2. SERVICE ENQUIRY FORM
   Sends enquiry data to Google Apps Script
   ========================================================= */

function initializeEnquiryForm() {

    var form = document.getElementById("serviceEnquiryForm");
    var formStatus = document.getElementById("formStatus");

    if (!form) {
        return;
    }


    /*
     * IMPORTANT:
     * Replace this URL after we create and deploy
     * the Google Apps Script Web App.
     */

    var GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbw0X2-TTZr2Rgolojpjx4nOXgZpDBGF2oGeL-lauXT8brv8zxVOMz12XRiXEAgDhMW7RA/exec";


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        /* =================================================
           GET FORM VALUES
           ================================================= */

        var name =
            document.getElementById("name").value.trim();

        var phone =
            document.getElementById("phone").value.trim();

        var email =
            document.getElementById("email").value.trim()||"null";

        var service =
            document.getElementById("service").value||"null";

        var organization =
            document.getElementById("organization").value.trim()||"null";

        var message =
            document.getElementById("message").value.trim()||"null";


        /* =================================================
           BASIC VALIDATION
           ================================================= */

        if (!name || !phone ) {

            showFormStatus(
                "Please fill in all required fields.",
                "error"
            );

            return;
        }


        /* =================================================
           SHOW SUBMITTING STATUS
           ================================================= */

        showFormStatus(
            "Submitting your enquiry...",
            "loading"
        );


        /* Disable submit button */

        var submitButton =
            form.querySelector(".enquiry-submit");

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";

        }


        /* =================================================
           PREPARE DATA
           ================================================= */

        var enquiryData = {

            name: name,

            phone: phone,

            email: email,

            service: service,

            organization: organization,

            message: message

        };


        /* =================================================
           SEND DATA TO GOOGLE APPS SCRIPT
           ================================================= */

        fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(enquiryData)

        })

        .then(function () {


            /* =============================================
               SUCCESS
               ============================================= */

            showFormStatus(
                "✓ Enquiry submitted successfully! Our biomedical support team will contact you shortly.",
                "success"
            );


            /* Clear the form */

            form.reset();


        })

        .catch(function (error) {

            console.error(
                "Enquiry submission error:",
                error
            );


            /* =============================================
               ERROR
               ============================================= */

            showFormStatus(
                "Unable to submit your enquiry. Please try again.",
                "error"
            );

        })

        .finally(function () {


            /* Re-enable submit button */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Submit Enquiry";

            }

        });

    });

}
console.log("FORM SUBMITTED");

/* =========================================================
   3. FORM STATUS MESSAGE
   ========================================================= */

function showFormStatus(message, type) {

    var formStatus =
        document.getElementById("formStatus");

    if (!formStatus) {
        return;
    }


    formStatus.textContent = message;

    formStatus.style.display = "block";


    /* Remove previous status classes */

    formStatus.classList.remove(
        "success",
        "error",
        "loading"
    );


    /* Add current status class */

    if (type) {

        formStatus.classList.add(type);

    }

}