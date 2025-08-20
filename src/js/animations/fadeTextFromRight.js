import "../../css/animations/fade-text-from-right.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// Function to initialize animations
function initializeRightAnimations() {
   const fadeFromRightlements = document.querySelectorAll(
      "[fade-from-right='true']",
   );

   fadeFromRightlements.forEach((element) => {
      let targets = element;

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
initializeRightAnimations();
