console.log('script.js loaded');
// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('no-scroll', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close on link click (mobile)
  nav.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('no-scroll');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close mobile menu on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav && nav.classList.contains('open')){
    nav.classList.remove('open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
});

// Header style on scroll
const header = document.querySelector('.site-header');
const setHeaderScrolled = () => {
  if(!header) return;
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
setHeaderScrolled();
window.addEventListener('scroll', setHeaderScrolled, { passive: true });

// Scroll reveal for readability improvements
const revealTargets = document.querySelectorAll(
  '.section, .card, .why-item, .about-figure, .cta-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  revealTargets.forEach(el => io.observe(el));
} else {
  // Fallback: reveal all
  revealTargets.forEach(el => el.classList.add('reveal-in'));
}