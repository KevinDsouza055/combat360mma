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

  // ---------- Coach Modal ----------
  const coachData = {
    owner: {
      name: 'Vikram "Iron" Singh',
      role: 'Founder · Head Coach',
      img: 'assets/images/coach-owner.jpg',
      bio: [
        'Former professional MMA fighter with 14 years inside the cage and over a decade coaching world-class athletes. Vikram built COMBAT 360 to forge a new generation of fighters — disciplined, complete, and unbreakable.',
        'His philosophy fuses elite striking, world-class grappling, and the mental edge of a champion. Every athlete he trains learns to fight smart, recover sharp, and live with intent.'
      ],
      stats: [
        ['Pro Fights', '32-4'],
        ['Years Coaching', '12+'],
        ['Champions Produced', '9'],
        ['Black Belt', 'BJJ · Muay Thai'],
      ]
    },
    coach2: {
      name: 'Aryan Sharma',
      role: 'Muay Thai Head Coach',
      img: 'assets/images/coach-2.jpg',
      bio: [
        'Lumpinee-trained Muay Thai specialist with 80+ professional bouts in Thailand and Europe. Aryan brings a relentless, technical style sharpened by a decade in the ring.',
        'He coaches striking with surgical precision — clinch work, elbows, low-kick destruction — and prepares amateurs and pros alike for the highest level of competition.'
      ],
      stats: [
        ['Pro Bouts', '80+'],
        ['World Title Camps', '6'],
        ['Specialty', 'Clinch · Elbows'],
        ['Languages', 'EN · ES · TH'],
      ]
    },
    coach3: {
      name: 'Ananya Iyer',
      role: 'BJJ & Grappling Coach',
      img: 'assets/images/coach-3.jpg',
      bio: [
        'Brown-to-black belt under the Mendes brothers, ADCC trials competitor and former national wrestling champion. Ananya runs the most technical grappling program in the city.',
        'Her approach blends modern no-gi systems, traditional jiu-jitsu fundamentals, and competition-tested wrestling — built so any athlete can dominate where the fight goes.'
      ],
      stats: [
        ['Belt', 'IBJJF Black'],
        ['Major Medals', '14'],
        ['Years Training', '15'],
        ['Specialty', 'No-Gi · Wrestling'],
      ]
    }
  };

  const modal = document.getElementById('coachModal');
  const openCoach = (key) => {
    const d = coachData[key];
    if (!d || !modal) return;
    modal.querySelector('.modal-img').style.backgroundImage = `url(${d.img})`;
    modal.querySelector('.m-name').textContent = d.name;
    modal.querySelector('.m-role').textContent = d.role;
    modal.querySelector('.m-bio').innerHTML = d.bio.map(p => `<p>${p}</p>`).join('');
    modal.querySelector('.m-stats').innerHTML = d.stats
      .map(([k, v]) => `<li>${k}<span>${v}</span></li>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeCoach = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-coach]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCoach(el.dataset.coach);
    });
  });
  modal?.querySelector('.modal-close')?.addEventListener('click', closeCoach);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeCoach(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCoach(); });

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

  // ---------- Hero parallax ----------
  const heroBg = document.querySelector('.hero-bg');
  const heroGlove = document.querySelector('.hero-glove');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 800) {
        heroBg.style.transform = `translateY(${y * 0.25}px) scale(1.05)`;
        if (heroGlove) heroGlove.style.transform = `translateY(${y * -0.15}px) rotate(${-8 + y * 0.02}deg)`;
      }
    }, { passive: true });
  }

  // ---------- 3D Tilt Effect ----------
  const tiltElements = document.querySelectorAll('.program-card, .coach-card, .price-card');
  
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

  // ---------- Hero 3D Glove Interaction ----------
  if (heroGlove) {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
      // Combine with existing floating animation in CSS by using a wrapper or applying style
      heroGlove.style.left = `calc(50% + ${moveX}px)`; // Relative offset
      heroGlove.style.filter = `drop-shadow(${moveX * -1}px ${moveY * -1}px 60px rgba(200,16,46,0.35))`;
    });
  }
});
