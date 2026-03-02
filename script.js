// ============================================
// ΗΛΕΚΤΡΙΚΕΣ ΕΓΚΑΤΑΣΤΑΣΕΙΣ ΣΙΜΟΣ ΒΑΣΙΛΗΣ
// Website JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile Menu Toggle ----
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Hero Particles ----
  const particlesContainer = document.getElementById('heroParticles');
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 6 + 4;
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 4 + 's';
    
    particlesContainer.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
      particle.remove();
    }, (duration + 4) * 1000);
  }

  // Create particles periodically
  setInterval(createParticle, 400);
  
  // Initial batch
  for (let i = 0; i < 15; i++) {
    setTimeout(createParticle, i * 200);
  }

  // ---- Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(el) {
    const text = el.textContent.trim();
    
    // Handle "24/7" case
    if (text.includes('/')) return;
    
    const target = parseInt(text);
    if (isNaN(target)) return;
    
    const suffix = text.replace(/\d/g, '');
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      
      el.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    
    requestAnimationFrame(update);
  }

  // Observe stat numbers
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  // ---- Service Cards stagger animation ----
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // ---- Why Cards stagger animation ----
  const whyCards = document.querySelectorAll('.why-card');
  whyCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  // ---- Review Cards stagger animation ----
  const reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // ---- Active nav link highlighting ----
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.style.color = 'var(--gold-400)';
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // ---- Typing effect for hero subtitle (optional visual enhancement) ----
  // Already using CSS animations, so this is handled via CSS

  // ---- Lazy load Google Maps iframe ----
  const mapIframe = document.querySelector('.contact-map iframe');
  
  if (mapIframe) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Map already has src, but this ensures it only fully loads when visible
          mapObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    mapObserver.observe(mapIframe);
  }

  // ---- Parallax effect on hero ----
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
      const parallaxSpeed = 0.3;
      hero.style.setProperty('--parallax-y', `${scrolled * parallaxSpeed}px`);
    }
  }, { passive: true });

  // ---- Console message ----
  console.log('%c⚡ ΣΙΜΟΣ ΒΑΣΙΛΗΣ - Ηλεκτρικές Εγκαταστάσεις', 
    'color: #f5c518; font-size: 18px; font-weight: bold; background: #0a1628; padding: 10px 20px; border-radius: 8px;');
  console.log('%cΚατασκευασμένο με ❤️ στην Κόρινθο', 
    'color: #5dade2; font-size: 12px;');

});
