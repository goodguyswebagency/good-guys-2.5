import "../../css/components/faq.css";

import { gsap } from "gsap";

const endPathData =
   "M24 12C23.9687 11.2097 24.5684 10.4257 25.764 9.69418C26.9596 8.96264 28.7271 8.2982 30.9625 7.73987C33.198 7.18155 35.8566 6.74055 38.7823 6.44279C41.708 6.14502 44.8418 5.99646 48 6.00584C44.8396 6.01365 41.7047 5.86363 38.7788 5.56458C35.8529 5.26552 33.1948 4.82342 30.9599 4.26417C28.7251 3.70492 26.9584 3.03972 25.7633 2.30754C24.5683 1.57536 23.9688 0.790865 24 8.58276e-07C24.0376 0.791302 23.4425 1.57651 22.2497 2.30941C21.0568 3.04231 19.2904 3.70815 17.0543 4.26772C14.8182 4.82729 12.1575 5.26934 9.22869 5.56783C6.2999 5.86632 3.16214 6.01524 -2.62013e-07 6.00584C3.15991 5.99487 6.29664 6.14233 9.2252 6.43952C12.1538 6.73672 14.8149 7.17766 17.0517 7.73631C19.2885 8.29496 21.0556 8.96003 22.249 9.6923C23.4423 10.4246 24.0377 11.2092 24 12Z";
const endLineData = "M48 6.5H0";

// Function to animate SVG paths
function animateSVG(svg, reverse) {
   let tl = gsap.timeline();

   if (reverse) {
      tl.to(svg.querySelector(".faq_accordion-icon-path1"), {
         duration: 0.3,
         attr: {
            d: "M24 48C23.9687 44.8387 24.5684 41.7029 25.764 38.7767C26.9596 35.8505 28.7271 33.1928 30.9625 30.9595C33.198 28.7262 35.8566 26.9622 38.7823 25.7711C41.708 24.5801 44.8418 23.9859 48 24.0234C44.8396 24.0546 41.7047 23.4545 38.7788 22.2583C35.8529 21.0621 33.1948 19.2937 30.9599 17.0567C28.7251 14.8197 26.9584 12.1589 25.7633 9.23015C24.5683 6.3014 23.9688 3.16348 24 2.76562e-06C24.0376 3.16523 23.4425 6.30601 22.2497 9.23764C21.0568 12.1693 19.2904 14.8326 17.0543 17.0709C14.8182 19.3092 12.1575 21.0774 9.22869 22.2713C6.2999 23.4653 3.16214 24.061 -1.04805e-06 24.0234C3.15991 23.9795 6.29664 24.5693 9.2252 25.7581C12.1538 26.9469 14.8149 28.7106 17.0517 30.9452C19.2885 33.1798 21.0556 35.8401 22.249 38.7692C23.4423 41.6983 24.0377 44.8369 24 48Z",
         },
         ease: "power1.inOut",
      }).to(
         svg.querySelector(".faq_accordion-icon-line1"),
         {
            duration: 0.3,
            attr: { d: "M23.9998 -9.53674e-07L23.9998 48" },
            ease: "power1.inOut",
         },
         0,
      );
   } else {
      tl.to(svg.querySelector(".faq_accordion-icon-path1"), {
         duration: 0.3,
         attr: { d: endPathData },
         ease: "power1.inOut",
      }).to(
         svg.querySelector(".faq_accordion-icon-line1"),
         {
            duration: 0.3,
            attr: { d: endLineData },
            ease: "power1.inOut",
         },
         0,
      );
   }
}

let accordions = document.querySelectorAll(".faq_accordion");
accordions.forEach((accordion) => {
   let items = accordion.querySelectorAll(
      ".faq_accordion-block .faq_accordion-question",
   );

   items.forEach((item) => {
      item.addEventListener(
         "click",
         (e) => {
            if (e.currentTarget.classList.contains("open")) {
               e.currentTarget.classList.remove("open");
               let svgs = e.currentTarget.querySelectorAll(
                  ".faq_accordion-question-icon",
               );
               svgs.forEach((svg) => {
                  animateSVG(svg, true);
                  setTimeout(function () {
                     svg.querySelector(
                        ".faq_accordion-icon-line2",
                     ).style.opacity = "1";
                  }, 300);
               });
            } else {
               items.forEach((el) => {
                  if (el !== e.currentTarget && el.classList.contains("open")) {
                     el.classList.remove("open");
                     let svgs = el.querySelectorAll(
                        ".faq_accordion-question-icon",
                     );
                     svgs.forEach((svg) => {
                        animateSVG(svg, true);
                        setTimeout(function () {
                           svg.querySelector(
                              ".faq_accordion-icon-line2",
                           ).style.opacity = "1";
                        }, 300);
                     });
                  }
               });
               e.currentTarget.classList.add("open");
               let svgs = e.currentTarget.querySelectorAll(
                  ".faq_accordion-question-icon",
               );
               svgs.forEach((svg) => {
                  animateSVG(svg, false);
                  svg.querySelector(".faq_accordion-icon-line2").style.opacity =
                     "0";
               });
            }
         },
         { passive: true },
      );
   });
});

// let accordions = document.querySelectorAll('.faq_accordion');
// accordions.forEach(accordion => {
//   let items = accordion.querySelectorAll('.faq_accordion-block .faq_accordion-question');

//   items.forEach(item => {
//     item.addEventListener('click', e => {
//       if (e.currentTarget.classList.contains('open')) {
//         e.currentTarget.classList.remove('open');
//       } else {
//         items.forEach(el => {
//           el.classList.remove('open');
//         });
//         e.currentTarget.classList.add('open');
//       }
//     });
//   });
// });
