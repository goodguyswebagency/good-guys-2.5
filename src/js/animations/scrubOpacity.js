import "../../css/animations/scrub-opacity.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// need to set this in settimeout because horizontal scroll trigger section is mesing up with the ScrollTrigger
setTimeout(() => {
   function runSplit() {
      // Target each element with data-attribute='mask-text'
      document
         .querySelectorAll("[data-attribute='mask-text']")
         .forEach((element) => {
            // Split the text for each element
            const typeSplit = new SplitType(element, {
               types: "lines",
            });

            // Add line mask to each word
            element.querySelectorAll(".line").forEach((word) => {
               const lineMask = document.createElement("div");
               lineMask.classList.add("line-mask");
               word.appendChild(lineMask);
            });

            // Create animation for each element
            createAnimation(element);
         });
   }

   function createAnimation(element) {
      // Select all line masks for the given element
      const allMasks = Array.from(element.querySelectorAll(".line .line-mask"));

      // Create a timeline for the given element
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 80%",
            scrub: 1,
         },
      });

      // Animate the line masks
      tl.to(allMasks, {
         width: "0%",
         duration: 0.5,
         stagger: 0.5,
      });
   }

   // Run the split and animation setup
   runSplit();
}, 1000);

// ovo je druga varijanta gde ne koristimo pseudo element .line-mask
// vec samo manipulisemo sa opacitijem
// ova opcija nije toliko smooth

// // Function to initialize the scrub opacity animation
// function initializeScrubOpacityAnimation() {
//   // Select all elements with the scrubOpacity attribute
//   const elements = document.querySelectorAll('[scrubOpacity]');

//   // Loop through each element and apply the animation
//   elements.forEach(el => {
//     // Split the text into lines, words, and chars
//     let typeSplit = new SplitType(el, {
//       types: 'lines, words, chars',
//       tagName: 'span'
//     });

//     // Apply the GSAP animation
//     gsap.from(el.querySelectorAll('.word'), {
//       opacity: 0.2,
//       duration: 0.1,
//       ease: 'power1.out',
//       stagger: 0.1,
//       scrollTrigger: {
//         trigger: el,
//         start: 'top bottom',
//         end: "bottom center",
//         scrub: true
//       }
//     });
//   });
// }

// // Initialize the animation
// initializeScrubOpacityAnimation();
