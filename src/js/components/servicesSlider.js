// swiper docs
// https://swiperjs.com/get-started

// import Swiper JS
// import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
// import custom styling
import "../../css/components/services-slider.css";

import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";

let servicesSlider;

function initSwiper() {
   const screenWidth = window.innerWidth;
   if (screenWidth > 991 || screenWidth < 767) {
      if (!servicesSlider) {
         servicesSlider = new Swiper(".services-slider", {
            modules: [Scrollbar, Navigation],
            direction: "horizontal",
            slidesPerView: screenWidth < 767 ? "auto" : 4,
            spaceBetween: 0,
            scrollbar: {
               el: ".swiper-scrollbar",
               hide: false,
               draggable: true,
               dragSize: "auto",
               snapOnRelease: true,
            },
            navigation: {
               nextEl: ".services-slider-next",
               prevEl: ".services-slider-prev",
            },
         });
         // console.log('Swiper initialized');
      }
   } else {
      if (servicesSlider) {
         servicesSlider.destroy(true, true);
         servicesSlider = null;
         // console.log('Swiper destroyed');
      }
   }
}

// Initialize Swiper on load
initSwiper();

// Re-initialize Swiper on resize
window.addEventListener("resize", initSwiper);
