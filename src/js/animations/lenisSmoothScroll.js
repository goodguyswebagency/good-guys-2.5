import "../../css/animations/lenis-smooth-scroll.css";

import Lenis from "lenis";

const lenis = new Lenis({
   lerp: 0.3, // scroll smoothness
   wheelMultiplier: 0.9, // scroll distance
   infinite: false,
   guestureOrientation: "vertical",
   normalizeWheel: false,
   smoothTouch: false,
});

function raf(time) {
   lenis.raf(time);
   requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// da bi ti radilo smooth scroll na anchor linkovima, moras onda da dodas ovo
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
         lenis.scrollTo(targetElement, {
            offset: 0,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         });
      }
   });
});

export { lenis };

// scroll is not working on other elements, this is the fix
const navInnerLinks = document.querySelectorAll("[data-lenis-prevent]");

// Loop through each element and add the event listener
navInnerLinks.forEach((element) => {
   element.addEventListener(
      "wheel",
      (event) => {
         event.stopPropagation(); // Stop the event from propagating
      },
      { passive: true },
   );

   element.addEventListener(
      "mousedown",
      (event) => {
         event.stopPropagation(); // Stop the event from propagating for mousedown as well
      },
      { passive: true },
   );

   element.addEventListener(
      "mousemove",
      (event) => {
         event.stopPropagation(); // Stop the event from propagating for mousemove
      },
      { passive: true },
   );

   element.style.touchAction = "auto"; // Ensure touch-action is set to auto for touch devices

   // element.addEventListener('touchstart', (event) => {
   //   event.stopPropagation();
   // });
   // element.addEventListener('touchmove', (event) => {
   //   event.stopPropagation();
   // });
   // element.addEventListener('touchend', (event) => {
   //   event.stopPropagation();
   // });
});

const navMobileSublinks = document.querySelectorAll("[lenis-scroll-fix]");
navMobileSublinks.forEach((element) => {
   element.addEventListener(
      "touchstart",
      (event) => {
         event.stopPropagation();
      },
      { passive: true },
   );
   element.addEventListener(
      "touchmove",
      (event) => {
         event.stopPropagation();
      },
      { passive: true },
   );
   element.addEventListener(
      "touchend",
      (event) => {
         event.stopPropagation();
      },
      { passive: true },
   );
});

// Fix for scrolling over Testimonial iFrame elemenets
// on scroll, we create a class that has a pseudo element attached
// that element will go over the iFrame and iteract with the Lenis scroll
// when scroll is finished, we remove the class that has the pseudo element
// so we can interact with the iFrame
const testimonialVideo = document.querySelectorAll(
   ".testimonial-slide_media-video",
);

if (testimonialVideo.length > 0) {
   let scrollTimeout;

   window.addEventListener(
      "scroll",
      () => {
         testimonialVideo.forEach((element) => {
            element.classList.add("overflow-scroll-element");
         });

         // Clear the timeout if it's already set
         if (scrollTimeout) {
            clearTimeout(scrollTimeout);
         }

         // Set a timeout to remove the class "overflow-scroll-element" after scrolling stops
         scrollTimeout = setTimeout(() => {
            testimonialVideo.forEach((element) => {
               element.classList.remove("overflow-scroll-element");
            });
         }, 150); // Adjust the delay as needed
      },
      { passive: true },
   );
}
