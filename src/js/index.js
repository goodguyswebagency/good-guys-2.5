import "../css/index.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// JavaScript import
import "./components/breadcrumbs.js";
import "./components/navbar.js";
import "./components/customCursor.js";
import "./components/footer.js";
import "./animations/animateFromBottom.js";
import "./animations/lenisSmoothScroll.js";

/////////////////////////////////////////
// Adding titles to images
////////////////////////////////////////
$("img").each(function () {
   // take alt text of each image
   let imageAltText = $(this).attr("alt");
   // add as title to each image
   $(this).attr("title", imageAltText);
});

/////////////////////////////////////////
// No follow external links
////////////////////////////////////////
function setRelAttribute() {
   var elems = document.body.getElementsByTagName("a");
   for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];
      var re = /www.goodguys.se/;
      var isInternal = re.test(elem.href);
      if (!isInternal) {
         elem.rel = "noopener noreferrer nofollow";
      }
   }
}
setRelAttribute();

/////////////////////////////////////////
// Remove webflow responsive images
////////////////////////////////////////
$("img").each(function () {
   $(this).removeAttr("sizes");
   $(this).removeAttr("srcset");
});

/////////////////////////////////////////
// og:url change for other languages
////////////////////////////////////////
const urlPath = window.location.origin + window.location.pathname;

// Check for the meta og:url tag
const ogURL = document.querySelector('meta[property="og:url"]');

// Add the meta og:url tag if not found
if (!ogURL) {
   const meta = document.createElement("meta");
   meta.setAttribute("property", "og:url");
   meta.setAttribute("content", urlPath);
   document.head.appendChild(meta);
} else {
   // If the og:url meta tag already exists, update its content
   ogURL.setAttribute("content", urlPath);
}
