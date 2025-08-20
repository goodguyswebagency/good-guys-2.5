// Import custom styling
import "../../css/components/steps.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// Function to initialize the animations
function initAnimations() {
   // Select all SVG paths with the class name 'steps_line'
   const paths = document.querySelectorAll(".step_line");

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
                  start: "top 80%", // Start the animation when the top of the SVG is 80% from the top of the viewport
                  end: "top 50%", // End the animation when the top of the SVG is 50% from the top
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
//   console.log('resize')
//   // Clear the existing timeout
//   clearTimeout(resizeTimeout);

//   // Set a new timeout to reinitialize animations after 1 second
//   resizeTimeout = setTimeout(() => {
//     console.log('resize timeout')
//     // Clear existing ScrollTriggers
//     ScrollTrigger.getAll().forEach(trigger => trigger.kill());

//     // Reinitialize animations
//     initAnimations();
//   }, 1000); // 1000 milliseconds = 1 second
// });

// Function to find the closest visible '.animated_line' higher up in the DOM
// because we want to set the line as a trigger for starting the animation of the text bellow
// so we set the end of line animation to be the begining of the text animation
function findClosestVisibleStepLine(element) {
   let currentElement = element;

   // Loop through parents and previous siblings
   while (currentElement) {
      // Check for previous siblings
      let previousSibling = currentElement.previousElementSibling;

      while (previousSibling) {
         if (
            previousSibling.classList.contains("animated-line") &&
            window.getComputedStyle(previousSibling).display !== "none"
         ) {
            return previousSibling; // Found a visible element with class 'step_line'
         }

         // Continue checking further previous siblings
         previousSibling = previousSibling.previousElementSibling;
      }

      // Move to the parent element and repeat the process
      currentElement = currentElement.parentElement;
   }

   return null; // No matching element found
}

// Select all elements with the class name 'step'
const steps = document.querySelectorAll(".step");

steps.forEach((step) => {
   // Select all child elements of the current 'step' element
   const childElements = step.children;

   // Find the closest visible '.step_line' higher up in the DOM
   const closestVisibleStepLine = findClosestVisibleStepLine(step);

   // Create the staggered animation for child elements
   gsap.fromTo(
      childElements,
      {
         y: 50, // Start 50px below the original position
         opacity: 0, // Start fully transparent
      },
      {
         y: 0, // End at the original position
         opacity: 1, // Fully visible
         // duration: 0.8, // Duration for each element's animation
         ease: "power2.out", // Easing for smooth effect
         stagger: 0.2, // Stagger delay of 0.2s between each child element
         scrollTrigger: {
            trigger: closestVisibleStepLine || step, // Use the closest '.step_line' or fallback to the step itself
            start: "top 55%", // Start the animation when the top of the 'step' element is 55% from the top of the viewport
            end: "top 40%",
            onEnter: () => {
               // Add the 'active-step' class when the animation starts
               let activeStep = document.querySelector(".active-step");
               if (activeStep) {
                  activeStep.classList.remove("active-step");
               }
               step.classList.add("active-step");
            },
            onLeaveBack: () => {
               // Remove the 'active-step' class when scrolling back up
               step.classList.remove("active-step");
            },
         },
      },
   );
});
