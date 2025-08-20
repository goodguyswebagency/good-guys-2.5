// import custom styling
import "../../css/components/blog-list.css";

// Function to calculate reading time
function calculateReadingTime(content) {
   const wordsPerMinute = 200; // Average reading speed
   const text = content.innerText || content.textContent;
   const wordCount = text.split(/\s+/).length;
   const readingTime = Math.ceil(wordCount / wordsPerMinute);
   return readingTime;
}

// Function to fetch blog post content and display reading time
async function fetchAndDisplayReadingTime(blogUrl, timeToReadElementId) {
   try {
      const response = await fetch(blogUrl);
      if (!response.ok) {
         throw new Error("Network response was not ok");
      }
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const blogContent = doc.querySelector(
         ".blog_single-content .blog_rich-text",
      ); // Adjust the selector to match your blog post content class
      if (blogContent) {
         const timeToRead = calculateReadingTime(blogContent);
         const timeToReadElement = document.getElementById(timeToReadElementId);
         if (timeToReadElement) {
            timeToReadElement.textContent = `${timeToRead} min`;
         }
      }
   } catch (error) {
      console.error("Failed to fetch blog post content:", error);
   }
}

// Function to initialize reading time for all blog posts
function initializeReadingTime() {
   const blogPosts = document.querySelectorAll(".blog-list .blog");
   blogPosts.forEach((blog) => {
      const blogLink = blog.querySelector(".blog_link");
      const timeToReadElement = blog.querySelector('[id^="time-to-read-"]');

      if (blogLink && timeToReadElement) {
         const blogUrl = blogLink.href;
         const timeToReadElementId = timeToReadElement.id;
         fetchAndDisplayReadingTime(blogUrl, timeToReadElementId);
      }
   });
}

initializeReadingTime();
