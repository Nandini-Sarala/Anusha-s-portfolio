/* ═══════════════════════════════════════════════════════════
   ANUSHA SARLA — PORTFOLIO SCRIPT
   Handles: Navigation, Scroll Reveals, Particles, Counters,
            Skill Bars, Smooth Scrolling, Form
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initParticles();
  initCounters();
  initSkillBars();
  initSmoothScroll();
  initContactForm();
  initActiveNavHighlight();
});

/* ─── NAVIGATION ─── */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('.nav-link');

  // Scroll behaviour
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    lastScroll = scrollY;
  }, { passive: true });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ─── ACTIVE NAV HIGHLIGHT ─── */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -70% 0px' }
  );

  sections.forEach(section => observer.observe(section));
}

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-scale');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ─── FLOATING PARTICLES ─── */
function initParticles() {
  const field = document.getElementById('particleField');
  if (!field) return;

  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.3 + 0.05;

    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: Math.random() > 0.5
        ? 'rgba(212, 168, 83, ' + opacity + ')'
        : 'rgba(232, 160, 191, ' + opacity + ')',
      left: `${x}%`,
      top: `${y}%`,
      animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    });

    field.appendChild(particle);
  }

  // Inject keyframes
  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: var(--opacity, 0.15);
        }
        25% {
          transform: translate(${rnd(-30, 30)}px, ${rnd(-40, 40)}px) scale(1.2);
          opacity: calc(var(--opacity, 0.15) * 1.5);
        }
        50% {
          transform: translate(${rnd(-20, 20)}px, ${rnd(-30, 30)}px) scale(0.8);
          opacity: var(--opacity, 0.15);
        }
        75% {
          transform: translate(${rnd(-25, 25)}px, ${rnd(-35, 35)}px) scale(1.1);
          opacity: calc(var(--opacity, 0.15) * 0.8);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ─── COUNTER ANIMATION ─── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/* ─── SKILL BARS ─── */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const width = el.dataset.width;
          el.style.setProperty('--target-width', width + '%');
          el.classList.add('animated');
          // Set the width directly after a tiny delay for the transition
          requestAnimationFrame(() => {
            el.style.width = width + '%';
          });
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  fills.forEach(fill => observer.observe(fill));
}

/* ─── SMOOTH SCROLL ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─── CONTACT FORM ─── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const subject = document.getElementById('formSubject').value;
    const message = document.getElementById('formMessage').value;

    // Build mailto link
    const mailtoSubject = encodeURIComponent(subject || 'Portfolio Contact');
    const mailtoBody = encodeURIComponent(
      `Hi Anusha,\n\nName: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailto = `mailto:anushasarla123@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.location.href = mailto;

    // Show success feedback
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Message Prepared! ✓</span>';
    btn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      btn.style.color = '';
      form.reset();
    }, 3000);
  });
}

/* ─── SUBTLE PARALLAX ON LANDING ─── */
(function initParallax() {
  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      const shapes = document.querySelectorAll('.shape');
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 8;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });

      ticking = false;
    });
  }, { passive: true });
})();

/* ─── TYPED TEXT EFFECT ON LANDING ─── */
(function initTypedGreeting() {
  const greeting = document.querySelector('.landing-greeting');
  if (!greeting) return;

  const text = greeting.textContent;
  greeting.textContent = '';
  greeting.style.minHeight = '1.5em';

  let i = 0;
  function type() {
    if (i < text.length) {
      greeting.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }

  // Wait for reveal
  setTimeout(type, 600);
})();
