const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(245, 240, 232, 0.95)';
    navbar.style.backdropFilter = 'blur(12px)';
    navbar.style.borderBottom = '1px solid rgba(0,0,0,0.08)';
  } else {
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
    navbar.style.borderBottom = 'none';
  }
});
const fadeElements = document.querySelectorAll('.project-row, .skill-item, .contact-link');

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));
// Create cursor elements
const cursor = document.createElement('div');
const follower = document.createElement('div');

cursor.style.cssText = `
  width: 10px; height: 10px;
  background: #0A0A0A;
  border-radius: 50%;
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9999;
`;

follower.style.cssText = `
  width: 36px; height: 36px;
  border: 1.5px solid #0A0A0A;
  border-radius: 50%;
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.4s ease, width 0.3s, height 0.3s, border-color 0.3s;
`;

document.body.appendChild(cursor);
document.body.appendChild(follower);

// Hide default cursor
document.body.style.cursor = 'none';

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  follower.style.transform = `translate(${mouseX - 18}px, ${mouseY - 18}px)`;
});

// Grow on hover over links
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width = '60px';
    follower.style.height = '60px';
    follower.style.borderColor = '#D63C2F';
    follower.style.transform = `translate(${mouseX - 30}px, ${mouseY - 30}px)`;
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = '#0A0A0A';
  });
});
