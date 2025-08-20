// CSS import
import "../../css/pages/about-us.css";
import "../../css/components/cta.css";
// JavaScript import
// components
// animations
import "../animations/fadeTextFromBottom.js";
import "../animations/imageParallax.js";

// import './animations/fadeTextFromLeft.js'
// import './animations/fadeTextFromRight.js'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
// import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

/************************************
hero logo animation
**************************************/

// Select all SVGs representing the letters
const letters = document.querySelectorAll(".logo-letter");
const stickyElement = document.querySelector(".about-hero_sticky");
const stickyLogo = document.querySelector(".about-hero_logo");
const introText = document.querySelector(".about-hero_sticky-intro");

// Define an array of 7 positions with x and y coordinates
const positions = [
   { x: -50, y: -50 }, // Position for the first letter
   { x: -150, y: -100 }, // Position for the second letter
   { x: 0, y: -150 }, // Position for the third letter
   { x: 250, y: -120 }, // Position for the fourth letter
   { x: 100, y: 50 }, // Position for the fifth letter
   { x: -20, y: 200 }, // Position for the sixth letter
   { x: -100, y: 100 }, // Position for the seventh letter
];

letters.forEach((letter, index) => {
   // Get the corresponding position from the array
   const { x, y } = positions[index % positions.length]; // Use modulo to prevent out-of-bounds access

   gsap.fromTo(
      letter,
      {
         y: (y * window.innerHeight) / 100, // Start from the specified Y position
         x: (x * window.innerWidth) / 100, // Start from the specified X position
         scale: 6, // Start with each letter scaled up
         opacity: 0, // Start with each letter invisible
      },
      {
         y: 0, // Move the letter to its original position
         x: 0, // Move the letter to its original X position
         scale: 1, // Scale down to the original size
         opacity: 1, // Fade in the letter
         stagger: 0.3,
         scrollTrigger: {
            trigger: ".about-hero", // Trigger animation when .about-hero_trigger is in view
            start: `center ${90 - index * 5}%`, // Dynamic start value based on index
            end: "center 50%", // End when the top of .about-hero_trigger is 50% from the top of the viewport
            scrub: 1, // Scrub smoothly with a duration of 1 second
            // markers: true, // Enable markers to visualize trigger points
         },
      },
   );

   gsap.fromTo(
      introText,
      {
         opacity: 1,
      },
      {
         opacity: 0,
         ease: "power2.inOut", // Easing function (optional)
         scrollTrigger: {
            trigger: ".about-hero", // Trigger the animation when stickyElement is in view
            start: "center 90%",
            end: "center 80%",
            scrub: 1,
         },
      },
   );

   gsap.fromTo(
      stickyElement,
      {
         maxWidth: "100vw", // Change this value to your desired max-width
         maxHeight: "100vh",
      },
      {
         maxWidth: "0px", // Change this value to your desired max-width
         maxHeight: "0px", // Change this value to your desired max-height
         ease: "power2.inOut", // Easing function (optional)
         scrollTrigger: {
            trigger: ".about-hero", // Trigger the animation when stickyElement is in view
            start: "center 40%", // Start the animation at 40% scroll progress
            end: "bottom 25%", // End the animation at 25% scroll progress
            scrub: 1, // Smoothly animate with scrolling
            // markers: true, // Enable markers to visualize trigger points
         },
      },
   );

   gsap.fromTo(
      stickyElement,
      {
         opacity: 1,
      },
      {
         opacity: 0,
         ease: "power2.inOut",
         scrollTrigger: {
            trigger: ".about-hero", // Trigger the animation when stickyElement is in view
            start: "center 40%", // Start the animation at 40% scroll progress
            end: "bottom 70%", // End the animation at 30% scroll progress
            scrub: 1, // Smoothly animate with scrolling
            // markers: true, // Enable markers to visualize trigger points
         },
      },
   );

   gsap.fromTo(
      stickyLogo,
      {
         scale: 1,
         opacity: 1,
      },
      {
         scale: 0.2,
         ease: "power2.inOut", // Easing function (optional)
         scrollTrigger: {
            trigger: ".about-hero", // Trigger the animation when stickyElement is in view
            start: "center 40%", // Start the animation at 40% scroll progress
            end: "bottom 25%", // End the animation at 10% scroll progress
            scrub: 1, // Smoothly animate with scrolling
            // markers: true, // Enable markers to visualize trigger points
         },
      },
   );
});

/************************************
blurScrollEffect
https://tympanus.net/Development/ScrollBlurTypography/
**************************************/
// // Define the class for the Blur Scroll Effect
// export class BlurScrollEffect {
//   constructor(textElement) {
//     // Check if the provided element is valid
//     if (!textElement || !(textElement instanceof HTMLElement)) {
//       throw new Error('Invalid text element provided.');
//     }

//     this.textElement = textElement;

//     // Set up the effect for the provided text element
//     this.initializeEffect();
//   }

//   // Sets up the initial text effect on the provided element
//   initializeEffect() {
//     // Split text for animation using SplitType and store the reference
//     this.splitter = new SplitType(this.textElement, {
//       types: 'words, chars', // Split into words and characters
//     });

//     // Trigger the initial scroll effect
//     this.scroll();
//   }

//   // Animates text based on the scroll position
//   scroll() {
//     // Query all individual characters in the line for animation
//     const chars = this.splitter.chars;

//     gsap.fromTo(
//       chars,
//       {
//         filter: 'blur(10px) opacity(40%)',
//         willChange: 'filter',
//       },
//       {
//         ease: 'none', // Animation easing
//         filter: 'blur(0px) opacity(100%)',
//         stagger: 0.05, // Delay between starting animations for each character
//         scrollTrigger: {
//           trigger: this.textElement, // Element that triggers the animation
//           start: 'top bottom-=15%', // Animation starts when element hits the bottom of viewport
//           end: 'bottom center+=15%', // Animation ends in the center of the viewport
//           scrub: true, // Animation progress tied to scroll position
//         },
//       }
//     );
//   }
// }

// // Initialize the blur scroll effect
// const init = () => {
//   const effects = [
//     { selector: '[blur-text-reveal]', effect: BlurScrollEffect },
//   ];

//   // Iterate over each effect configuration and apply the effect to all matching elements
//   effects.forEach(({ selector, effect }) => {
//     document.querySelectorAll(selector).forEach((el) => {
//       new effect(el);
//     });
//   });
// };

// init();

/************************************
        Line animations
**************************************/
// Function to initialize the animations
function initAnimations() {
   // Select all SVG paths with the class name 'steps_line'
   const paths = document.querySelectorAll(".about_line > :first-child");

   // Check if any elements are found
   if (paths.length > 0) {
      // Loop through each path and create the animation
      paths.forEach((path) => {
         // we need to check if the element parent is set to display none
         // if it is, we will not calculate getTotalLength() for that line because it will throw an error
         let pathParent = path.parentElement;
         let calculate = true;
         if (pathParent) {
            const parentStyle = window.getComputedStyle(pathParent);
            if (parentStyle.display === "none") {
               calculate = false; // A parent has display: none
            }
         }

         let pathLength;
         if (calculate) {
            pathLength = path.getTotalLength();
         } else {
            return; // Skip if the parent has display: none
         }

         // Determine if the path should fill from right to left by checking a custom attribute or class
         const fillDirection = path.classList.contains("fill-reverse") ? -1 : 1;

         gsap.fromTo(
            path,
            {
               strokeDasharray: pathLength, // Set the strokeDasharray to the length of the path
               strokeDashoffset: fillDirection * pathLength, // Start with the stroke hidden, reverse for right to left
            },
            {
               strokeDashoffset: 0, // Fill the stroke by reducing dashoffset to 0
               scrollTrigger: {
                  trigger: path, // Trigger the animation when the path is in view
                  start: "top 60%", // Start the animation when the top of the SVG is 60% from the top of the viewport
                  end: "top 20%", // End the animation when the top of the SVG is 20% from the top
                  scrub: true, // Smoothly animate in sync with the scroll position
               },
            },
         );
      });
   }
}

// Initialize animations on page load
initAnimations();

// recalculate the elements for animation when screen resize
// let resizeTimeout;
// window.addEventListener('resize', () => {
//   // Clear the existing timeout
//   clearTimeout(resizeTimeout);

//   // Set a new timeout to reinitialize animations after 1 second
//   resizeTimeout = setTimeout(() => {
//     // Clear existing ScrollTriggers
//     ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//     // Reinitialize animations
//     initAnimations();
//   }, 1000); // 1000 milliseconds = 1 second
// }, { passive: true });

/************************************
      floating images
**************************************/

// GSAP Animation for scaling and opacity when the element is scrolled into view
gsap.fromTo(
   ".strength_media",
   { scale: 0, opacity: 0 },
   {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      onComplete: floatElement,
      scrollTrigger: {
         trigger: ".strength_media",
         start: "top 80%", // Adjust this value based on when you want the animation to trigger
         once: true, // Ensure the animation only happens once
      },
   },
);

function floatElement() {
   const radius = 50;
   const numPoints = 5; // Number of coordinates to move through
   const minDuration = 5; // Minimum duration in seconds
   const maxDuration = 7; // Maximum duration in seconds

   // Get all elements with the class 'strength_media'
   const elements = document.querySelectorAll(".strength_media");

   elements.forEach((element) => {
      // Generate random points for each element
      const points = Array.from({ length: numPoints }, () => {
         return {
            x: Math.random() * 2 * radius - radius, // Random x between -radius and radius
            y: Math.random() * 2 * radius - radius, // Random y between -radius and radius
         };
      });

      // Generate a random duration for this element
      const duration =
         Math.random() * (maxDuration - minDuration) + minDuration;

      // Create a GSAP timeline for the floating animation
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Add animations for each point
      points.forEach((point, index) => {
         tl.to(element, {
            x: point.x,
            y: point.y,
            duration: duration,
            ease: "power1.inOut",
            delay: index === 0 ? 0 : 1, // Ensure there is no delay on the first point
         });
      });

      // To ensure the last point animates back to the starting position before yoyo
      tl.to(element, {
         x: points[0].x,
         y: points[0].y,
         duration: duration,
         ease: "power1.inOut",
      });
   });
}

/************************************
      Typing hero text
**************************************/
// --------------------------------//
// Initial animation: typing out #startText
// --------------------------------//
const tl = gsap.timeline({
   onStart: () => blinking.play(),
   onComplete: () => animation.play(),
});
tl.from(".sentance", {
   text: {
      value: "",
      delimiter: "",
   },
   duration: 4,
   ease: "none",
});
// END Initial animation: typing out #startText --------------//

let startText = document.querySelector("#startText");
let cursor = document.querySelector("#cursor");
let words = gsap.utils.toArray(".type-del");

//--------------------------------//
// Blinking animation
//--------------------------------//

const blinking = gsap.timeline({
   repeat: -1,
   paused: true,
});

blinking.from(cursor, {
   opacity: -100,
   ease: "steps(1)",
});

// END Blinking animation --------------//

//--------------------------------//
// Creative coding club GSAP Staggers with Seamless Loops
// https://www.youtube.com/watch?v=0DSkgXNFZHs
//--------------------------------//
let animation = gsap.timeline({ repeat: 20, paused: true });
let targets = document.querySelectorAll(".type-del");
let numberOfTargets = targets.length;

let duration = 1; //change this
let pause = 2; // change this

let stagger = duration + pause;
let repeatDelay = stagger * (numberOfTargets - 1) + pause;

// gsap.set(".demo", {autoAlpha:1})
animation.from(".type-del", {
   text: {
      value: "",
   },
   duration: duration,
   // opacity: 0,
   stagger: {
      each: stagger,
      repeat: -1,
      repeatDelay: repeatDelay,
   },
});
animation.to(
   ".type-del",
   {
      text: {
         value: "",
      },
      duration: duration,
      // opacity: 0,
      stagger: {
         each: stagger,
         repeat: -1,
         repeatDelay: repeatDelay,
      },
   },
   2,
);
