// swiper docs
// https://swiperjs.com/get-started

// import Swiper JS
// import custom styling
import "swiper/css";
import "swiper/css/navigation";
import "../../css/components/featured-archive-slider.css";

import Swiper from "swiper";
import { Navigation } from "swiper/modules";

let featuredArchiveSlider;

featuredArchiveSlider = new Swiper(".portfolio-featured_slider", {
   modules: [Navigation],
   direction: "horizontal",
   slidesPerView: 1,
   spaceBetween: 0,
   navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
   },
});

const counterWrapper = document.querySelector(
   ".portfolio-featured_slider-counter-numbers-wrapper",
);
let currentOffset = 0;

featuredArchiveSlider.on("slideChange", function () {
   const newIndex = featuredArchiveSlider.realIndex;
   const oldIndex = featuredArchiveSlider.previousIndex;

   if (newIndex > oldIndex) {
      currentOffset -= 107;
   } else {
      currentOffset += 107;
   }

   counterWrapper.style.top = `${currentOffset}%`;
});
