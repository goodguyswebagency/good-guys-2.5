// swiper docs
// https://swiperjs.com/get-started

// import Swiper JS
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import custom styling
import "../../css/components/testimonial-slider.css";

import Swiper from "swiper";
import { Pagination } from "swiper/modules";

const screenWidth = window.innerWidth;
new Swiper(".testimonials-slider", {
   modules: [Pagination],
   direction: "horizontal",
   slidesPerView: "auto",
   spaceBetween: screenWidth < 767 ? 0 : screenWidth < 991 ? 16 : 24,
   // centeredSlides: true,
   // centeredSlidesBounds: true,
   initialSlide: 0,
   loop: true,
   preventClicks: false,
   preventClicksPropagation: false,
   pagination: {
      el: ".testimonial-pagination.desktop-pagination",
      clickable: true,
   },
   on: {
      slideChange: function () {
         updateActiveTestimonial();
      },
      init() {
         updateActiveTestimonial();
      },
      // click() {
      //   // set clicked slide to be active slide
      //   testimonialSlider.slideTo(this.clickedIndex);
      // },
   },
});

function updateActiveTestimonial() {
   // Remove the 'active-testimonial' class from all elements that have it
   document.querySelectorAll(".active-testimonial").forEach((element) => {
      element.classList.remove("active-testimonial");
   });

   setTimeout(function () {
      // Add the 'active-testimonial' class to the currently active slide
      const activeSlide = document.querySelector(
         ".testimonials-card.swiper-slide-active",
      );
      if (activeSlide) {
         activeSlide.classList.add("active-testimonial");
      }
   }, 200);
}

// JavaScript to stop click event propagation
// document.querySelectorAll('.testimonial-slide_media-video').forEach((element) => {
//   element.addEventListener('click', (event) => {
//     event.stopPropagation();
//   }, { passive: true });
// });

// Select all video elements with the class 'testimonial-slide_media-video'
const videos = document.querySelectorAll(".testimonial-slide_media-video");

// Loop through each video
videos.forEach((video) => {
   // Select the first <source> element within each <video>
   const source = video.querySelector("source[data-src]");

   if (source) {
      // Set the src attribute from data-src
      source.setAttribute("src", source.getAttribute("data-src"));
      source.removeAttribute("data-src"); // Clean up the data-src attribute
   }

   // Ensure the load function is only called on the <video> element
   if (typeof video.load === "function") {
      video.load(); // Load the video to apply the new source
   }
});

const overlays = document.querySelectorAll(".testimonial-slide_media-overlay");

overlays.forEach((overlay) => {
   // Add a click event listener to each overlay
   overlay.addEventListener("click", function () {
      // Find the sibling video element
      const video = this.previousElementSibling.querySelector("video");
      const playButton = this.nextElementSibling;

      // Toggle play/pause
      if (video) {
         // Ensure the video exists
         if (video.paused) {
            video.play();
            if (playButton) {
               // Ensure playButton exists
               playButton.style.opacity = "0";
            }
         } else {
            video.pause();
            if (playButton) {
               // Ensure playButton exists
               playButton.style.opacity = "1";
            }
         }
      }
   });
});
