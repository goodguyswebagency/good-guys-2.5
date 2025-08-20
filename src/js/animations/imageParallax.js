import "../../css/animations/image-parallax.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

// Function to create parallax effect
function createParallaxEffect(container) {
   let image = container.querySelector("img");

   gsap.to(image, {
      y: () => image.offsetHeight - container.offsetHeight,
      ease: "power1.InOut",
      scrollTrigger: {
         trigger: container,
         scrub: true,
         pin: false,
         invalidateOnRefresh: true,
      },
   });
}

document.querySelectorAll("[image-parallax]").forEach(function (element) {
   createParallaxEffect(element);
});
