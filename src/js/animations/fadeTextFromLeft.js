import "../../css/animations/fade-text-from-left.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// Function to initialize animations
function initializeAnimations() {
   const fadeFromLeftElements = document.querySelectorAll(
      "[fade-from-left='true']",
   );

   fadeFromLeftElements.forEach((element) => {
      let targets = element;

      // If the element is an h1, target its child elements with a staggered animation
      if (element.tagName.toLowerCase() === "h1") {
         targets = element.children;
      }

      // If the element has the split-lines='true' attribute, split the text into lines
      if (element.hasAttribute("split-lines")) {
         const splitTypeInstance = new SplitType(element, {
            types: "lines",
            tagName: "span",
         });
         targets = splitTypeInstance.lines;
      }

      // Determine if the animation should play in reverse
      const animateReverse = element.hasAttribute("animate-reverse");

      // GSAP animation
      gsap.to(targets, {
         opacity: 1,
         x: 0,
         duration: 1,
         stagger:
            targets instanceof NodeList || Array.isArray(targets) ? 0.2 : 0, // Apply stagger only if it's a collection of elements
         ease: "back.inOut",
         scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: !animateReverse, // Play only once unless animate-reverse is true
            invalidateOnRefresh: true, // Recalculate positions on screen resize
            toggleActions: animateReverse
               ? "play reverse play reverse"
               : "play none none none",
         },
      });
   });
}

// Initialize the animations
initializeAnimations();
