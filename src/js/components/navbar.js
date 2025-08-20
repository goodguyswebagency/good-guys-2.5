import "../../css/components/navbar.css";
// import { lenis } from '../animations/lenisSmoothScroll.js';
// import gsap from 'gsap';

// Code for all menu dropdown links and the media content on the right side of each dropdown content
// we check the index of the nav-dropdown-link that is hovered
// and then add the "show" class on the media image that has the same index
// if the screen size is less than 992px we remove the mouseenter and mouseleave events
// Function to handle the hover events for a specific set of links and images
function setupDropdownHoverEvents(dropdownLinks, dropdownImages) {
   let lastHoveredIndex = 0;

   // Show the image based on the index
   function showImage(index) {
      dropdownImages.forEach((img, idx) => {
         if (idx === index) {
            img.classList.add("show");
         } else {
            img.classList.remove("show");
         }
      });
   }

   // Function that is executed when mouse enter
   function handleMouseEnter(event) {
      const index = Array.from(dropdownLinks).indexOf(event.currentTarget);
      lastHoveredIndex = index;
      showImage(index);
   }

   // Function that is executed when mouse leave
   function handleMouseLeave() {
      showImage(lastHoveredIndex);
   }

   // Add hover event listeners (triggered if screen size is more than 991px)
   function addHoverEventListeners() {
      dropdownLinks.forEach((link) => {
         link.addEventListener("mouseenter", handleMouseEnter);
         link.addEventListener("mouseleave", handleMouseLeave);
      });
   }

   // Remove hover event listeners (triggered if screen size is less than 992px)
   function removeHoverEventListeners() {
      dropdownLinks.forEach((link) => {
         link.removeEventListener("mouseenter", handleMouseEnter);
         link.removeEventListener("mouseleave", handleMouseLeave);
      });
   }

   // Check the screen size and apply/remove hover event listeners
   function applyEventListeners() {
      const mediaQuery = window.matchMedia("(min-width: 992px)");

      if (mediaQuery.matches) {
         addHoverEventListeners();
      } else {
         removeHoverEventListeners();
      }
   }

   // Initially show the first image
   showImage(0);

   // Apply the event listeners on load
   applyEventListeners();

   // Re-apply the event listeners on window resize
   window.addEventListener("resize", applyEventListeners);
}

// Set up for the core dropdown
const coreDropdownLinks = document.querySelectorAll(
   "#core-drop .nav-dropdown-link",
);
const coreDropdownImages = document.querySelectorAll(
   "#core-drop .nav-drop_content-media-image",
);
setupDropdownHoverEvents(coreDropdownLinks, coreDropdownImages);

// Set up for the resources dropdown
const resourcesDropdownLinks = document.querySelectorAll(
   "#resources-drop .nav-dropdown-link",
);
const resourcesDropdownImages = document.querySelectorAll(
   "#resources-drop .nav-drop_content-media-image",
);
setupDropdownHoverEvents(resourcesDropdownLinks, resourcesDropdownImages);

///////////////////////////////////////////////
// this code is for the migration list dropdown
// the white overlay that is showing at the bottom of the list
// if the list has a scroll bar
// we check the fixed height of the element and compare with the height of its children
///////////////////////////////////////////////
// function checkOverflow() {
//   const sublinksWrapper = document.querySelectorAll('.nav-drop_content-media_sublinks');

//   sublinksWrapper.forEach(sublinks => {
//     const overlay = sublinks.previousElementSibling;

//     if (sublinks.scrollHeight > sublinks.clientHeight) {
//       overlay.style.display = 'block';
//     } else {
//       overlay.style.display = 'none';
//     }
//   });
// }

// // Run the overflow check on page load
// checkOverflow()
// // on screen reseize
// window.addEventListener('resize', checkOverflow);

///////////////////////////////////////////////
// hamburger button add class when menu is open
///////////////////////////////////////////////
const hamburgerBtn = document.querySelector(".menu-button");
const navbar = document.querySelector(".navbar");

hamburgerBtn.addEventListener("click", function () {
   navbar.classList.toggle("menu-open");
   if (navbar.classList.contains("menu-open")) {
      disablePageScroll();
   } else {
      enablePageScroll();

      //close all active submenu items
      navDropContent.forEach((item) => {
         item.classList.remove("show-drop-content");
      });

      const activeWrapper = document.querySelectorAll(".active-link-wrapper");
      activeWrapper.forEach((activeWrap) => {
         activeWrap.classList.remove("active-link-wrapper");
      });

      // remove blur effect from inactive links
      const dim = document.querySelectorAll(".dim");
      dim.forEach((dimElement) => {
         dimElement.classList.remove("dim");
      });
   }
});

/////////////
/// apply function on click only if screen size is less than 991px
//////////////////
const navDropWrapper = document.querySelectorAll(".nav-drop-wrapper");
const navDropContent = document.querySelectorAll(".nav-drop_content");

function showContent(content) {
   if (content.classList.contains("show-drop-content")) {
      navDropContent.forEach((item) => {
         item.classList.remove("show-drop-content");
         // stop propagation so the cleck inside the sidebar wont triger the toggle of the parent link
         // and thus close the content
         item.addEventListener(
            "click",
            (event) => {
               event.stopPropagation();
            },
            { passive: true },
         );
      });
   } else {
      navDropContent.forEach((item) => {
         item.classList.remove("show-drop-content");
         // stop propagation so the cleck inside the sidebar wont triger the toggle of the parent link
         // and thus close the content
         item.addEventListener(
            "click",
            (event) => {
               event.stopPropagation();
            },
            { passive: true },
         );
      });
      content.classList.add("show-drop-content");
   }
}

// when we click on element we add / remove the show drop content class
function toggleContent(event) {
   // event.currentTarget.classList.toggle('nav-drop-wrapper_active');
   event.currentTarget.classList.toggle("active-dropdown");
   const content = event.currentTarget.querySelector(".nav-drop_content");
   if (content) {
      if (content.classList.contains("show-drop-content")) {
         content.classList.remove("show-drop-content");
      } else {
         showContent(content);
      }
   }
}

// add click event if screen is less than 991px
function addClickEventListeners() {
   navDropWrapper.forEach((wrapper) => {
      wrapper.addEventListener("click", toggleContent);
   });
}

// remove click event if screen is larger than 991px
function removeClickEventListeners() {
   navDropWrapper.forEach((wrapper) => {
      wrapper.removeEventListener("click", toggleContent);
   });
}

// we check the screen size so we can add or remove click event listeners
function applyNavDropWrapperEventListeners() {
   const mediaQuery = window.matchMedia("(max-width: 991px)");

   if (mediaQuery.matches) {
      addClickEventListeners();
      navDropWrapper.forEach((wrapper) => {
         wrapper.removeEventListener("mouseenter", navDropWrapperMouseEnter);
         wrapper.removeEventListener("mouseleave", navDropWrapperMouseLeave);
         wrapper.addEventListener("click", navDropWrapperClick);
      });
   } else {
      removeClickEventListeners();
      navDropWrapper.forEach((wrapper) => {
         wrapper.addEventListener("mouseenter", navDropWrapperMouseEnter);
         wrapper.addEventListener("mouseleave", navDropWrapperMouseLeave);
         wrapper.removeEventListener("click", navDropWrapperClick);
      });
   }
}

function disablePageScroll() {
   // lenis.stop();
   document.body.style.overflow = "hidden";
   document.body.style.touchAction = "none";
   document.body.style.position = "fixed";
}

function enablePageScroll() {
   // lenis.start();
   document.body.style.overflow = "auto";
   document.body.style.touchAction = "auto";
   document.body.style.position = "static";
}

// adding dim class for blur effect on dropdown links
// when a dropdown is open all siblings get blured
function navDropWrapperMouseEnter() {
   navDropWrapper.forEach((sibling) => {
      if (sibling !== this) {
         sibling.classList.add("dim");
         // disablePageScroll()
      }
   });
}

function navDropWrapperMouseLeave() {
   navDropWrapper.forEach((sibling) => {
      sibling.classList.remove("dim");
      // enablePageScroll()
   });
}

// on click we add a dim class to all sibling elements
// here we first check if we clicked again on the same element
let lastClickedwrapper = null;

function navDropWrapperClick(event) {
   const wrapper = event.currentTarget;
   const isClickedAgain = lastClickedwrapper === wrapper;

   navDropWrapper.forEach((sibling) => {
      if (sibling !== wrapper) {
         sibling.classList.remove("dim");
      } else {
         wrapper.classList.remove("dim");
      }
   });

   if (!isClickedAgain) {
      navDropWrapper.forEach((sibling) => {
         if (sibling !== wrapper) {
            sibling.classList.add("dim");
         }
      });
      lastClickedwrapper = wrapper;
   } else {
      lastClickedwrapper = null;
   }
}

// Apply the event listeners on load
applyNavDropWrapperEventListeners();

// Re-apply the event listeners on window resize
window.addEventListener("resize", applyNavDropWrapperEventListeners);

///////////////////////////////////////////////
// accordion for tablet / mobile integrations submenu links
// since they are no longer side by side, but one bellow the other
// we then target the second list that was hidden on desktop but showed on tablet / mobile
///////////////////////////////////////////////
const navDropList = document.querySelector(".nav-drop-list");
const linkWrappers = navDropList.querySelectorAll(".nav-drop_link-wrapper");

linkWrappers.forEach((wrapper) => {
   wrapper.addEventListener(
      "click",
      () => {
         if (wrapper.classList.contains("active-link-wrapper")) {
            linkWrappers.forEach((item) =>
               item.classList.remove("active-link-wrapper"),
            );
         } else {
            linkWrappers.forEach((item) =>
               item.classList.remove("active-link-wrapper"),
            );
            wrapper.classList.add("active-link-wrapper");
         }
      },
      { passive: true },
   );
});

///////////////////////////////////////////////
// disable link click for Resources main links on tablet and mobile (so the submeni can open on click)
// on desktop it opens on hover, so there its not a problem there
///////////////////////////////////////////////
// Function to detect mobile and tablet devices
function isMobileOrTablet() {
   return (
      /Mobi|Android/i.test(navigator.userAgent) ||
      /iPad|Tablet/i.test(navigator.userAgent)
   );
}

// Function to prevent link navigation
function preventLinkNavigation(event) {
   event.preventDefault(); // Prevent the default link behavior
   // event.stopPropagation(); // Stop event propagation
}

// Function to handle links based on device type
function handleLinks() {
   const links = document.querySelectorAll(
      ".resources_drop-links .nav-dropdown-link",
   );

   if (isMobileOrTablet()) {
      // Add event listeners for mobile and tablet
      links.forEach((link) => {
         link.addEventListener("click", preventLinkNavigation);
         // link.classList.add('disabled');
      });
   } else {
      // Remove event listeners for desktop
      links.forEach((link) => {
         link.removeEventListener("click", preventLinkNavigation);
         // link.classList.remove('disabled');
      });
   }
}

// Debounce function to limit the rate at which the handleLinks function is called
function debounce(func, wait) {
   let timeout;
   return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
   };
}

// Handle links after scrolling stops
const handleLinksAfterScroll = debounce(handleLinks, 200);

// Initialize links handling on page load
handleLinks();

// Reapply links handling after scrolling stops
window.addEventListener("scroll", handleLinksAfterScroll, { passive: true });
window.addEventListener("resize", handleLinksAfterScroll);

/////////////////////////////////////////////
// menu peekaboo
/////////////////////////////////////////////
let lastScrollTop = 0;
// var scrollThreshold = 10; // Set a threshold for scroll detection
// var isScrolling; // Variable to hold the timeout

window.addEventListener(
   "scroll",
   function () {
      var currentScroll =
         window.pageYOffset || document.documentElement.scrollTop;
      var navbar = document.querySelector(".navbar");

      // if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) { // Only proceed if the scroll is significant
      //   console.log('currentScroll', currentScroll)
      //   console.log('lastScrollTop', lastScrollTop)
      //   if (currentScroll > 100 && currentScroll > lastScrollTop) {
      //     if (!navbar.classList.contains('menu-hidden')) {
      //       navbar.classList.add('menu-hidden');
      //     }
      //   } else if (currentScroll < lastScrollTop) {
      //     if (navbar.classList.contains('menu-hidden')) {
      //       navbar.classList.remove('menu-hidden');
      //     }
      //   }
      // }

      // Adding background class when scrolled down
      if (currentScroll > 0) {
         navbar.classList.add("menu-background");
      } else {
         navbar.classList.remove("menu-background");
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
   },
   { passive: true },
);

// Initializing GSAP animation variables
// var lastScrollTop = 0;
// var scrollThreshold = 100; // Set a threshold of 100px from the top

// // Scroll event listener
// window.addEventListener('scroll', function() {
//   var currentScroll = window.scrollY; // Use window.scrollY to get the current scroll position
//   var navbar = document.querySelector('.navbar');

//   // Check if the user has scrolled more than 100px
//   if (currentScroll > scrollThreshold) {
//     // If the user is scrolling down
//     if (currentScroll > lastScrollTop) {
//       gsap.to(navbar, { y: '-100%', duration: 0.5, ease: 'power2.out' });
//     }
//     // If the user is scrolling up
//     else {
//       gsap.to(navbar, { y: '0%', duration: 0.5, ease: 'power2.out' });
//     }
//   }
//   // Ensure the navbar is visible when near the top of the page
//   else {
//     gsap.to(navbar, { y: '0%', duration: 0.5, ease: 'power2.out' });
//   }

//   // Update lastScrollTop with the current scroll position
//   lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
// });

///////////////////////////////////////////////
// adding numbers to each CMS sublink
///////////////////////////////////////////////
const mediaSublinks = document.querySelectorAll(
   ".nav-drop_content-media_sublinks, .nav-drop_content-media_sublinks-mobile",
);

// Loop through each 'nav-drop_content-media_sublinks' element
mediaSublinks.forEach((mediaSublink) => {
   // Select all 'w-dyn-item' elements inside this 'nav-drop_content-media_sublinks' element
   const dynItems = mediaSublink.querySelectorAll(".w-dyn-item");

   // Loop through each 'w-dyn-item' and update the content of the 'nav-drop_listing-sublink-small'
   dynItems.forEach((dynItem, index) => {
      // Select the 'nav-drop_listing-sublink-small' inside this 'w-dyn-item'
      const sublinkSmall = dynItem.querySelector(
         ".nav-drop_listing-sublink-small",
      );

      // Update the content with the index, formatted as '01.', '02.', etc.
      if (sublinkSmall) {
         sublinkSmall.textContent =
            (index + 1).toString().padStart(2, "0") + ".";
      }
   });
});
