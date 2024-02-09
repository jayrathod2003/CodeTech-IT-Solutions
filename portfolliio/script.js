/* script.js */

// Example: Smooth scrolling to sections
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.getElementById(link.href.substring(1));
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Example: Contact form validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate form data and send message
});

// Add more JavaScript for desired animations and interactions
