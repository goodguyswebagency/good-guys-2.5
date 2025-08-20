// CSS import
import "../../css/pages/contact-us.css";
// JavaScript import
// animations
import "../animations/wordBackgroundHighlight.js";

// Selecting form elements
const nameForm = document.querySelector("#full-name");
const companyForm = document.querySelector("#company-name");
const emailForm = document.querySelector("#company-email");
const submitButton = document.querySelector("#contact-submit");
const submitWrapper = document.querySelector("#submit-wrapper");
const buttonText = document.querySelector("#submit-wrapper .button-text");

// Variables
let nameIsValid = false;
let companyIsValid = false;
let emailIsValid = false;

// Helper Functions
const validateEmail = (value) => {
   const emailValidation = /^\w+([-.]?\w+)*@\w+([-.]?\w+)*(\.\w{2,})+$/;
   return emailValidation.test(value);
};

const applyInvalidStyles = (el) => {
   el.classList.add("input-error-state");
};

const applyValidStyles = (el) => {
   el.classList.remove("input-error-state");
};

const disableSubmitButton = () => {
   submitButton.disabled = true;
   submitWrapper.classList.add("submit-disabled-state");
};

const enableSubmitButton = () => {
   submitButton.disabled = false;
   submitWrapper.classList.remove("submit-disabled-state");
};

const updateSubmitButton = () => {
   if (nameIsValid && companyIsValid && emailIsValid) {
      enableSubmitButton();
   } else {
      disableSubmitButton();
   }
};

// Event Listeners
nameForm.addEventListener(
   "input",
   (event) => {
      const nameFormValue = event.target.value.trim();
      if (nameFormValue) {
         nameIsValid = true;
         applyValidStyles(nameForm);
      } else {
         nameIsValid = false;
         applyInvalidStyles(nameForm);
      }
      updateSubmitButton();
   },
   { passive: true },
);

companyForm.addEventListener(
   "input",
   (event) => {
      const companyFormValue = event.target.value.trim();
      if (companyFormValue) {
         companyIsValid = true;
         applyValidStyles(companyForm);
      } else {
         companyIsValid = false;
         applyInvalidStyles(companyForm);
      }
      updateSubmitButton();
   },
   { passive: true },
);

emailForm.addEventListener(
   "input",
   (event) => {
      const emailFormValue = event.target.value.trim();
      if (validateEmail(emailFormValue)) {
         emailIsValid = true;
         applyValidStyles(emailForm);
      } else {
         emailIsValid = false;
         applyInvalidStyles(emailForm);
      }
      updateSubmitButton();
   },
   { passive: true },
);

function updateDivContent() {
   buttonText.textContent = submitButton.value;
}

// Observe for changes to the button text
const observer = new MutationObserver(updateDivContent);
observer.observe(submitButton, {
   attributes: true,
   attributeFilter: ["value"],
});

// Execution
updateSubmitButton();
updateDivContent();

// we are adding the value of the select field in the hidden input field
document.querySelector(".custom-select-trigger").addEventListener(
   "click",
   function () {
      document.querySelector(".custom-options").classList.toggle("show");
      document
         .querySelector(".custom-select-trigger-icon")
         .classList.toggle("dropdown-open");
   },
   { passive: true },
);

document.querySelectorAll(".custom-option").forEach(function (option) {
   option.addEventListener(
      "click",
      function () {
         document.querySelector(".custom-select-trigger-text").textContent =
            this.textContent;
         document.querySelector(".custom-options").classList.remove("show");
         document
            .querySelector(".custom-select-trigger-icon")
            .classList.remove("dropdown-open");
         // Set the value of the input field with id "budget"
         document.getElementById("budget").value = this.textContent;
      },
      { passive: true },
   );
});

document.addEventListener(
   "click",
   function (event) {
      if (!event.target.closest(".custom-select-wrapper")) {
         document.querySelector(".custom-options").classList.remove("show");
         document
            .querySelector(".custom-select-trigger-icon")
            .classList.remove("dropdown-open");
      }
   },
   { passive: true },
);

const form = document.querySelector(".contact-form"); // Select the form element
// const lottieAnimationLeft = document.querySelector('.contact-form_success-confeti-left');
// const lottieAnimationRight = document.querySelector('.contact-form_success-confeti-right');

// var confettiAnimation = document.querySelector('.contact-form_success-confeti-left');

form.addEventListener("submit", function (e) {
   //   console.log('aaaaa')
   //     // e.preventDefault(); // Prevent the form from submitting immediately
   //    // Reset the animation
   // confettiAnimation.setAttribute('data-autoplay', '1'); // Turn on autoplay
   // confettiAnimation.setAttribute('data-direction', '1'); // Ensure direction is forward
   // confettiAnimation.setAttribute('data-loop', '0'); // No loop, play once
   // // Reset the animation to start
   // confettiAnimation.dispatchEvent(new Event('animationstart'));
   // lottieAnimationLeft.goToAndPlay(0, true); // Play the Lottie animation
   // lottieAnimationRight.goToAndPlay(0, true); // Play the Lottie animation
});

// Select the hidden language input element
const languageInput = document.querySelector(".contact-hidden-language-input");

if (languageInput) {
   // Check if the URL contains '/en/'
   if (window.location.pathname.includes("/en/")) {
      // Set the value to "english" if '/en/' is in the URL
      languageInput.value = "english";
   } else {
      // Set the value to "swedish" if '/en/' is not in the URL
      languageInput.value = "swedish";
   }
}
