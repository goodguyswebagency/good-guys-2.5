import "../../css/components/custom-cursor.css";

// Function to initialize custom cursor functionality
function initCustomCursor() {
   // Check if the window width is greater than 992px
   if (window.innerWidth > 992) {
      /************************************
        when hovering over any links we add / remove is larger class
        ************************************/
      $(
         "a, .faq_accordion-question, .contact-form-submit-button, .footer_submit-button, .testimonials-card, w-checkbox-input, custom-select-wrapper",
      ).on("mouseenter", function () {
         $(".cursor_dot").addClass("is-larger");
      });

      $(
         "a, .faq_accordion-question, .contact-form-submit-button, .footer_submit-button, .testimonials-card, w-checkbox-input , custom-select-wrapper",
      ).on("mouseleave", function () {
         $(".cursor_dot").removeClass("is-larger");
      });

      /************************************
        add yellow color when hovering links on dark page
        ************************************/
      $(".dark-background a").on("mouseenter", function () {
         $(".cursor_dot").addClass("cursor-yellow");
      });

      $(".dark-background a").on("mouseleave", function () {
         $(".cursor_dot").removeClass("cursor-yellow");
      });

      /************************************
        scale down the mouse a bit when clicking
        ************************************/
      $("body").on("mousedown", function () {
         $(".cursor_dot").css("transform", "scale(0.9)");
      });

      $("body").on("mouseup", function () {
         $(".cursor_dot").css("transform", "scale(1)");
      });

      /************************************
        hover over pink section
        ************************************/
      $("[custom-cursor]").on("mouseenter", function () {
         let cursorColor = $(this).attr("cursor-color");
         let cursorText = $(this).attr("cursor-text");

         $(".cursor_dot").css("background-color", cursorColor);
         // Check if the URL contains '/en/'
         if (
            window.location.href.indexOf("/en/") !== -1 &&
            cursorText.trim().toLowerCase() === "se mer"
         ) {
            cursorText = "view";
         }
         $(".cursor-text").text(cursorText);

         $(".cursor_dot").addClass("custom-cursor");
         $(".cursor").addClass("custom-cursor");
         $(".cursor-text").addClass("custom-cursor");
      });

      $("[custom-cursor]").on("mouseleave", function () {
         $(".cursor_dot").css("background-color", "#fff");
         $(".cursor-text").text("");

         $(".cursor_dot").removeClass("custom-cursor");
         $(".cursor").removeClass("custom-cursor");
         $(".cursor-text").removeClass("custom-cursor");
      });
   } else {
      // Remove event listeners if the screen size is smaller than 992px
      $(
         "a, .faq_accordion-question, .contact-form-submit-button, .footer_submit-button, .testimonials-card, w-checkbox-input, custom-select-wrapper",
      ).off("mouseenter mouseleave");
      $(".dark-background a").off("mouseenter mouseleave");
      $("body").off("mousedown mouseup");
      $("[custom-cursor]").off("mouseenter mouseleave");
   }
}

// Initialize on document ready
$(document).ready(function () {
   initCustomCursor();

   // Reinitialize on window resize
   $(window).on("resize", function () {
      initCustomCursor();
   });
});
