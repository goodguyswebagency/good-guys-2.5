import "../../css/components/breadcrumbs.css";

const excerpts = Array.from(document.querySelectorAll(".bredcrumbs-manuell"));

function truncateText() {
   // Check if the screen width is 767px or lower
   if (window.matchMedia("(max-width: 500px)").matches) {
      excerpts.forEach((item) => {
         const lastParagraph = item.querySelector("p:last-of-type"); // Select the last paragraph inside the container
         if (lastParagraph && lastParagraph.innerText.length > 24) {
            lastParagraph.innerText =
               lastParagraph.innerText.slice(0, 24) + "...";
         }
      });
   }
}

// Run the function on initial load
truncateText();

// if (document.querySelector(".breadcrumbs")) {
//   // Define the breadcrumb separator character
//   var separator = "<span class='breadcrumb-link'>-</span>";

//   // Build the breadcrumbs string by adding each part of the URL to the string
//   var breadcrumbs = '<a href="/" class="breadcrumb-link">Home</a>' + separator;

//   // Get the current URL and split it into parts
//   var pathArray = window.location.pathname.split("/");

//   // Remove the first empty item from the array (result of splitting the leading slash)
//   pathArray.shift();

//   // Loop through each part of the URL, adding it to the breadcrumbs string
//   for (var i = 0; i < pathArray.length; i++) {
//     // Get the current part of the URL and remove any hyphens
//     var part = pathArray[i].replace(/-/g, ' ');

//     // Capitalize the first letter of the part
//     part = part.charAt(0).toUpperCase() + part.slice(1);

//     // If this is the last part of the URL, add the page title to the breadcrumbs string
//     if (i === pathArray.length - 1) {
//       var fileName = part.split('.')[0];
//       breadcrumbs += '<span class="breadcrumb-link">' + fileName + '</span>';
//       // breadcrumbs += '<span class="breadcrumb-link">' + document.title + '</span>';
//     } else {
//       // Otherwise, add a link to the current part of the URL to the breadcrumbs string
//       breadcrumbs += '<a href="/' + pathArray.slice(0, i + 1).join("/") + '" class="breadcrumb-link">' +  part  + '</a>' + separator;
//     }
//   }

//   // Insert the breadcrumbs string into the breadcrumbs container
//   document.querySelector(".breadcrumbs").innerHTML = breadcrumbs;
// }
