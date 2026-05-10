/* COMBAT 360 — main.js
   Handles loader, navbar, mobile menu, scroll reveal,
   FAQ, snackbar, form validation, modals, swiper init. */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Year ----------
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---------- Navbar scroll ----------
  const nav = document.querySelector('.nav');
  const floatCta = document.querySelector('.float-cta');
  const onScroll = () => {
    if (window.scrollY > 50) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
    if (window.scrollY > 600) floatCta?.classList.add('visible');
    else floatCta?.classList.remove('visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Active link ----------
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // ---------- Mobile menu ----------
  const burger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Scroll Reveal ----------
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal,.reveal-stagger').forEach(el => io.observe(el));

  // ---------- FAQ ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  // ---------- Snackbar ----------
  window.showSnack = (msg = 'Done', icon = '✓') => {
    let s = document.querySelector('.snackbar');
    if (!s) {
      s = document.createElement('div');
      s.className = 'snackbar';
      s.innerHTML = `<span class="check">${icon}</span><span class="msg"></span>`;
      document.body.appendChild(s);
    }
    s.querySelector('.msg').textContent = msg;
    s.classList.add('show');
    clearTimeout(window._snackT);
    window._snackT = setTimeout(() => s.classList.remove('show'), 3500);
  };

  // ---------- Booking Form ----------
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = form.querySelectorAll('[data-required]');
      let ok = true;
      fields.forEach(f => {
        const val = (f.value || '').trim();
        const wrap = f.closest('.field');
        wrap.classList.remove('error');
        if (!val) { wrap.classList.add('error'); ok = false; }
        if (f.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          wrap.classList.add('error'); ok = false;
        }
      });
      if (!ok) { showSnack('Please complete required fields', '!'); return; }
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<span class="dots">Booking...</span>';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        showSnack('Trial class booked. Check your email.');
      }, 1400);
    });
  }

  // Coach Modal functionality removed as per user request to simplify profile to a single section.

  // ---------- Swiper ----------
  if (window.Swiper && document.querySelector('.swiper.testimonials')) {
    new Swiper('.swiper.testimonials', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 2 },
        980: { slidesPerView: 3 }
      },
      autoplay: { delay: 5500, disableOnInteraction: false }
    });
  }

  // ---------- Stat counters ----------
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let n = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const t = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = n + suffix;
      }, 24);
      counterObs.unobserve(el);
    });
  }, { threshold: .4 });
  counters.forEach(c => counterObs.observe(c));

  // ---------- 3D Tilt Effect ----------
  const tiltElements = document.querySelectorAll('.coach-card, .price-card');
  
  const handleTilt = (e, el) => {
      const rect = el.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (centerY - y) / 15;
      const rotateY = (x - centerX) / 15;
      
      // Update Shine Position
      el.style.setProperty('--x', `${(x / rect.width) * 100}%`);
      el.style.setProperty('--y', `${(y / rect.height) * 100}%`);

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => handleTilt(e, el));
    el.addEventListener('touchmove', (e) => {
        handleTilt(e, el);
    }, { passive: true });

    const resetTilt = () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    el.addEventListener('mouseleave', resetTilt);
    el.addEventListener('touchend', resetTilt);
  });

  // ---------- Cinematic GSAP Hero Animations ----------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    try {
      gsap.registerPlugin(ScrollTrigger);
    } catch (e) {
      console.warn("ScrollTrigger failed to register:", e);
    }

    // 2. Mouse-Reactive Lighting & Parallax
    const heroLighting = document.querySelector('.hero-lighting');
    const heroSection = document.querySelector('.hero');

    if (heroSection && heroLighting) {
      heroSection.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth) * 100;
        const yPos = (clientY / window.innerHeight) * 100;

        heroLighting.style.setProperty('--mouse-x', `${xPos}%`);
        heroLighting.style.setProperty('--mouse-y', `${yPos}%`);
      });
    }

    // 4. Hero Text Stagger
    if (document.querySelector('.hero h1 .line span')) {
      gsap.from('.hero h1 .line span', {
        y: 100, rotateX: -45, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.5
      });
    }

    // 5. Cinematic Red Embers System
    // PERFORMANCE: We use a limited count (30) to keep FPS high.
    // GSAP transforms are GPU-accelerated for smooth motion.
    const particleContainer = document.querySelector('.hero-particles');
    if (particleContainer) {
      const emberCount = 10; // Further optimized for lag-free experience
      for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        particleContainer.appendChild(ember);

        // Randomize initial properties for organic feel
        const size = gsap.utils.random(2, 5);
        const duration = gsap.utils.random(6, 12); // Customize: duration of float up

        gsap.set(ember, {
          width: size, height: size,
          left: gsap.utils.random(0, 100) + "%",
          bottom: "-10%",
          opacity: 0
        });

        // Main Floating Animation (Starts here)
        gsap.to(ember, {
          y: -window.innerHeight - 100,
          x: gsap.utils.random(-150, 150), // Cinematic horizontal drift
          opacity: gsap.utils.random(0.4, 0.8),
          rotation: gsap.utils.random(0, 360),
          duration: duration,
          delay: gsap.utils.random(0, 10),
          repeat: -1,
          ease: "linear"
        });

        // High-end flickering light effect
        gsap.to(ember, {
          opacity: 0.2, duration: gsap.utils.random(0.5, 1.5),
          repeat: -1, yoyo: true, ease: "sine.inOut"
        });
      }
    }
  }
});
