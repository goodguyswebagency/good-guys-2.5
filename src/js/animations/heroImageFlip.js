import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true);

// ScrollTrigger.config({
//   limitCallbacks: true,
//   ignoreMobileResize: true,
// });

/*****************/
/* Old animation */
/*****************/

// // SETUP ELEMENTS
// const zonesLeft = document.querySelectorAll("[js-scrollflip-element-left='zone']");
// const targetLeft = document.querySelector("[js-scrollflip-element-left='target']");
// const zonesRight = document.querySelectorAll("[js-scrollflip-element-right='zone']");
// const targetRight = document.querySelector("[js-scrollflip-element-right='target']");
// const videoWrapper = document.querySelector('.home-hero_video');
// const videoElement = document.querySelector('.home-hero_video video');

// // Function to create timeline for a set of elements
// function createTimeline(zones, target) {
//   let tl;
//   if (tl) {
//     tl.kill();
//     gsap.set(target, { clearProps: "all" });
//   }

//   const originalClipPath = target.style.clipPath || '';

//   tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: zones[0],
//       start: "center center",
//       endTrigger: zones[zones.length - 1],
//       end: "top 30%",
//       scrub: true,
//       onUpdate: (self) => {
//         if (self.direction === 1 && self.progress > (1 / zones.length) + 0.4) {
//           target.style.clipPath = 'none';
//         } else if (self.direction === -1 && self.progress <= (1 / zones.length) + 0.4) {
//           target.style.clipPath = originalClipPath;
//         }
//       },
//       onLeave: () => {
//         gsap.to(target, { opacity: 0, duration: 0.5 });
//         gsap.to(videoWrapper, { opacity: 1, duration: 0.5, onComplete: () => videoElement.play() });
//       },
//       onEnterBack: () => {
//         gsap.to(videoWrapper, { opacity: 0, duration: 0.5, onComplete: () => videoElement.pause() });
//         gsap.to(target, { opacity: 1, duration: 0.5 });
//       }
//     }
//   });

//   zones.forEach((zone, index) => {
//     let nextZone = zones[index + 1];
//     if (nextZone) {
//       let nextZoneDistance = nextZone.getBoundingClientRect().top + nextZone.offsetHeight / 2;
//       let thisZoneDistance = zone.getBoundingClientRect().top + zone.offsetHeight / 2;
//       let zoneDifference = nextZoneDistance - thisZoneDistance;
//       tl.add(
//         Flip.fit(target, nextZone, {
//           duration: zoneDifference / 1000, // Convert to seconds for duration
//           ease: "power2.inOut"
//         })
//       );
//     } else {
//       const firstZone = zones[0];
//       const firstZoneRect = firstZone.getBoundingClientRect();
//       target.style.width = `${firstZoneRect.width}px`;
//       target.style.height = `${firstZoneRect.height}px`;
//     }
//   });
// }

// // Function to check screen size and initialize/remove animations
// function checkScreenSize() {
//   if (window.innerWidth > 767) {
//     // If screen size is larger than 767px, create timelines and hide the video wrapper
//     videoWrapper.style.opacity = 0;
//     videoElement.pause();
//     createTimeline(zonesLeft, targetLeft);
//     createTimeline(zonesRight, targetRight);
//   } else {
//     gsap.set([targetLeft, targetRight], { clearProps: "all" });

//     // Make the videoWrapper visible and set up a ScrollTrigger to play the video when scrolled to 90% of the viewport
//     videoWrapper.style.opacity = 1;

//     ScrollTrigger.create({
//       trigger: videoWrapper,
//       start: "top 50%",  // 90% from the top of the viewport
//       end: "bottom top",
//       onEnter: () => videoElement.play(),
//       onLeaveBack: () => videoElement.pause(),
//       onLeave: () => videoElement.pause(),
//       onEnterBack: () => videoElement.play(),
//     });
//   }
// }

// // Run on load
// checkScreenSize();

// // SETUP RESIZE
// let resizeTimer;
// window.addEventListener("resize", function () {
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(checkScreenSize, 250);
// }, { passive: true });

/*****************/
/* New animation */
/*****************/

// SETUP ELEMENTS
const videoElement = document.querySelector("#home-hero-video-element");

// Play the video continuously
videoElement.play();

// Initialize clip-path
gsap.set(videoElement, { clipPath: "inset(15%)" });

// Animate clip-path on scroll
gsap.to(videoElement, {
   clipPath: "inset(0%)",
   ease: "none",
   scrollTrigger: {
      trigger: ".home-hero_media-large",
      start: "top 85%",
      end: "top 40%",
      scrub: true,
   },
});
