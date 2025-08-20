import "../../css/pages/home.css";
import "../../css/components/cta.css";
// JavaScript import
// components
import "../components/servicesSlider.js";
import "../components/testimonialSlider.js";
import "../components/blogList.js";
import "../components/featuredWork.js";
import "../components/featuredWorkSlider.js";
// animations
import "../animations/wordBackgroundHighlight.js";
import "../animations/scrubOpacity.js";
import "../animations/heroImageFlip.js";

const videoContainer = document.querySelector(".home-hero_video");
const videoElement = document.querySelector("#home-hero-video-element");

// Set the poster image as background while video is not loaded
videoElement.style.backgroundImage = `url("${videoContainer.getAttribute("data-poster-url")}")`;

// Get the video URLs from the data-video-urls attribute
const videoUrls = videoContainer.getAttribute("data-video-urls").split(",");

// Create source elements for MP4 and WebM formats
const mp4Source = document.createElement("source");
mp4Source.src = videoUrls[0];
mp4Source.type = "video/mp4";

const webmSource = document.createElement("source");
webmSource.src = videoUrls[1];
webmSource.type = "video/webm";

// Append sources to the video element
videoElement.appendChild(mp4Source);
videoElement.appendChild(webmSource);

// Optionally, start playing the video if autoplay is true
if (videoContainer.getAttribute("data-autoplay") === "true") {
   videoElement.play();
}
