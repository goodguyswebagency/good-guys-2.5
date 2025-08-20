import "../../css/animations/word-background-highlight.css";

// Import gsap and ScrollTrigger
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// Function to initialize the animation
function initializeHighlightAnimation() {
   const paragraph = document.querySelector(
      '[text-background-animation="true"]',
   );

   // Check if paragraph and highlight exist
   if (!paragraph) return;
   const highlight = paragraph.querySelector(".highlight");
   if (!highlight) return;

   ScrollTrigger.create({
      trigger: paragraph,
      start: "top bottom",
      onEnter: () => animateHighlight(highlight),
      onEnterBack: () => animateHighlight(highlight),
   });
}

// Function to animate the highlight span and its :after pseudo-element
function animateHighlight(highlight) {
   // Animate the span element
   // gsap.fromTo(highlight, {
   //   scale: 0.5,
   //   opacity: 0
   // }, {
   //   scale: 1,
   //   opacity: 1,
   //   duration: 0.4,
   //   ease: 'power1.out',
   //   delay: 1
   // });

   // Animate the :after pseudo-element
   gsap.fromTo(
      highlight,
      {
         "--after-width": "0%",
      },
      {
         "--after-width": "103%",
         duration: 0.5,
         ease: "power1.out",
         // delay: 1,
         onUpdate: function () {
            highlight.style.setProperty(
               "--after-width",
               this.targets()[0].style.getPropertyValue("--after-width"),
            );
         },
      },
   );
}

// Initialize the animation
initializeHighlightAnimation();
