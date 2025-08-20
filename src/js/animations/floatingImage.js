import gsap from "gsap";

// Function to generate a random position within a 20px radius
function getRandomPosition() {
   return Math.random() * 20 - 10; // Generate a random number between -20 and 20
}

// Function to generate a random duration between 5 and 7 seconds
function getRandomDuration() {
   return Math.random() * 2 + 5; // Random number between 5 and 7
}

// Function to animate each icon
function animateIcon(icon) {
   // Store the original position
   const originalX = parseFloat(getComputedStyle(icon).left);
   const originalY = parseFloat(getComputedStyle(icon).top);

   function move() {
      // Random new position within a 20px radius
      const newX = originalX + getRandomPosition();
      const newY = originalY + getRandomPosition();

      // Animate the icon to the new position
      gsap.to(icon, {
         x: newX - originalX, // Offset from the original position
         y: newY - originalY,
         duration: getRandomDuration(), // Duration of 2 seconds for the transition
         ease: "power1.inOut", // Smooth easing for the movement
         onComplete: move, // Call move again when the animation is done to repeat
      });
   }

   move(); // Start the initial movement
}

// Select all elements with the class "hero-dev_media-icon" and animate them
const icons = document.querySelectorAll(".animated-image");
if (icons.length > 0) {
   icons.forEach((icon) => animateIcon(icon));
}
