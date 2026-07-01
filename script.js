/* ═══════════════════════════════════════════════════════════
   ANUSHA SARLA — PORTFOLIO SCRIPT
   Handles: Navigation, Scroll Reveals, Teal Particles,
            Smooth Scrolling, Name Reveal Animation
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initTealParticles();
  initSmoothScroll();
  initNameReveal();
  initActiveNavHighlight();
  initCardHoverEffects();
});

/* ─── NAVIGATION ─── */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks.querySelectorAll('.nav-link');

  // Scroll behavior (navbar, progress bar, scroll variables, sticky badge)
  const scrollProgress = document.getElementById('scrollProgress');
  const stickyConnect = document.getElementById('stickyConnect');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    navbar.classList.toggle('scrolled', scrollY > 50);
    document.body.style.setProperty('--scroll-y', `${scrollY}px`);

    if (scrollProgress) {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;
    }

    if (stickyConnect) {
      stickyConnect.classList.toggle('show', scrollY > 450);
    }
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
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
    { rootMargin: '-30% 0px -60% 0px' }
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
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ─── CYBER TEAL FLOATING PARTICLES ─── */
function initTealParticles() {
  // Create particle container inside body if not exists
  let field = document.getElementById('particleField');
  if (!field) {
    field = document.createElement('div');
    field.id = 'particleField';
    Object.assign(field.style, {
      position: 'fixed',
      inset: '0',
      pointerEvents: 'none',
      zIndex: '1',
      overflow: 'hidden'
    });
    document.body.appendChild(field);
  }

  const count = 35;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.15 + 0.03;

    Object.assign(particle.style, {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `rgba(100, 255, 218, ${opacity})`, // Beautiful cyber teal color
      boxShadow: `0 0 8px rgba(100, 255, 218, ${opacity * 2})`,
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
          transform: translateY(0) translateX(0) scale(1);
        }
        33% {
          transform: translateY(-50px) translateX(20px) scale(1.1);
        }
        66% {
          transform: translateY(30px) translateX(-30px) scale(0.9);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ─── SMOOTH SCROLL ─── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 80; // navbar offset
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─── NAME REVEAL ANIMATION ON PAGE LOAD ─── */
function initNameReveal() {
  const nameElement = document.getElementById('heroName');
  if (!nameElement) return;

  const originalText = nameElement.textContent.trim();
  nameElement.textContent = '';
  
  // Set styling for typing name first
  nameElement.style.display = 'inline-block';
  nameElement.style.borderRight = '3px solid var(--clr-primary)';
  nameElement.style.whiteSpace = 'nowrap';
  nameElement.style.animation = 'cursorBlink 0.75s step-end infinite';

  // Inject blink cursor styling
  if (!document.getElementById('cursor-keyframes')) {
    const style = document.createElement('style');
    style.id = 'cursor-keyframes';
    style.textContent = `
      @keyframes cursorBlink {
        from, to { border-color: transparent }
        50% { border-color: var(--clr-primary); }
      }
    `;
    document.head.appendChild(style);
  }

  let i = 0;
  function typeName() {
    if (i < originalText.length) {
      nameElement.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeName, 100); // speed of typing
    } else {
      // Typing done, stop cursor blinking after a delay
      setTimeout(() => {
        nameElement.style.borderRight = 'none';
        nameElement.style.animation = 'none';
        
        // Stagger show rest of the hero elements
        const staggers = document.querySelectorAll('.hero-content > *:not(#heroName), .hero-photo-container');
        staggers.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
          }, (index + 1) * 200);
        });
      }, 500);
    }
  }

  // Hide other elements initially to allow name to show first
  const staggers = document.querySelectorAll('.hero-content > *:not(#heroName), .hero-photo-container');
  staggers.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(15px)';
    el.style.transition = 'opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out)';
  });

  // Start typing
  setTimeout(typeName, 400);
}

/* ─── SKILL & EXPERIENCE CARDS INTERACTIVE HOVER ─── */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.skill-card, .exp-card, .edu-card, .project-card, .ach-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Set custom CSS variables for light reflection tracking
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D tilt calculations
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const rotateX = ((centerY - y) / centerY) * 4; // Max tilt of 4 degrees
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.setProperty('--rotate-x', `${rotateX}deg`);
      card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      // Reset tilt values on mouse leave
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
    });
  });
}
