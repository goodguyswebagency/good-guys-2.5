// Select the hidden language input element
const pageLanguage = document.querySelector(
   ".newsletter_hidden-language-input",
);

if (pageLanguage) {
   // Check if the URL contains '/en/'
   if (window.location.pathname.includes("/en/")) {
      // Set the value to "english" if '/en/' is in the URL
      pageLanguage.value = "english";
   } else {
      // Set the value to "swedish" if '/en/' is not in the URL
      pageLanguage.value = "swedish";
   }
}

// Selecting form elements
// const name = document.querySelector("#subscriber-name");
// const email = document.querySelector("#subscriber-email");
// const subscribeButton = document.querySelector('#footer-subscribe-button');

// // Variables
// let nameIsValid = false;
// let emailIsValid = false;

// // Helper Functions
// const validateEmail = (value) => {
//   const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
//   return emailValidation.test(value);
// };

// const invalidInput = (el) => {
//   el.classList.add("input-error-state");
// };

// const validInput = (el) => {
//   el.classList.remove("input-error-state");
// };

// const disableSubscribeButton = () => {
//   subscribeButton.disabled = true;
//   subscribeButton.classList.add("submit-disabled-state");
// };

// const enableSubscribeButton = () => {
//   subscribeButton.disabled = false;
//   subscribeButton.classList.remove("submit-disabled-state");
// };

// const updateSubscribeButton = () => {
//   if (nameIsValid && companyIsValid && emailIsValid) {
//     enableSubscribeButton();
//   } else {
//     disableSubscribeButton();
//   }
// };

// // Event Listeners
// name.addEventListener("input", (event) => {
//   const nameFormValue = event.target.value.trim();
//   if (nameFormValue) {
//     nameIsValid = true;
//     validInput(name);
//   } else {
//     nameIsValid = false;
//     invalidInput(name);
//   }
//   updateSubscribeButton();
// });

// emailForm.addEventListener("input", (event) => {
//   const emailFormValue = event.target.value.trim();
//   if (validateEmail(emailFormValue)) {
//     emailIsValid = true;
//     validInput(emailForm);
//   } else {
//     emailIsValid = false;
//     invalidInput(emailForm);
//   }
//   updateSubscribeButton();
// });

// // Execution
// updateSubmitButton();
