import "../../css/animations/development-process.css";
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

// swiper docs
// https://swiperjs.com/get-started
// import Swiper JS
import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";

const slideNumbersTracks = document.querySelectorAll(
   ".process_slide-numbers-track",
);

// Function to update classes based on the active slide (so we can change the numbers on the slides)
function updateActiveSlideClasses(slideIndex) {
   slideNumbersTracks.forEach((track) => {
      track.className = "process_slide-numbers-track"; // Reset classes
      track.classList.add(`active-slide-${slideIndex + 1}`); // Add the new active class
   });
}

let servicesSlider;

function initSwiper() {
   servicesSlider = new Swiper(".process", {
      modules: [Scrollbar, Navigation],
      direction: "horizontal",
      slidesPerView: 1,
      spaceBetween: 0,
      scrollbar: {
         el: ".swiper-scrollbar",
         hide: false,
         draggable: true,
         dragSize: "auto",
         snapOnRelease: true,
      },
      navigation: {
         nextEl: ".process_navigation-next",
         prevEl: ".process_navigation-prev",
      },
      on: {
         slideChangeTransitionStart: function () {
            // Set navigation opacity to 0 when slide starts changing
            document.querySelector(".process_navigation-next").style.opacity =
               "0";
            document.querySelector(".process_navigation-prev").style.opacity =
               "0";
         },
         slideChangeTransitionEnd: function () {
            // Set navigation opacity back to 1 when slide stops changing
            document.querySelector(".process_navigation-next").style.opacity =
               "1";
            document.querySelector(".process_navigation-prev").style.opacity =
               "1";
         },
         slideChange: function () {
            // Update the slide number track classes based on the current slide
            updateActiveSlideClasses(this.activeIndex);
         },
      },
   });
}

// Initialize Swiper on load
initSwiper();

// Re-initialize Swiper on resize
window.addEventListener("resize", initSwiper);
