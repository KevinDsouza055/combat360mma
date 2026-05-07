# COMBAT 360 MMA — Premium Cinematic Website

A complete production-ready multi-page website for a premium MMA gym, built with **vanilla HTML5, CSS3 and JavaScript** — no frameworks.

## Stack
- HTML5, CSS3 (custom design system), Vanilla JS (ES6+)
- [Swiper.js 11](https://swiperjs.com/) (CDN) — testimonial carousel
- Google Fonts — Bebas Neue + Inter

## Pages
1. `index.html` — Home (cinematic hero, philosophy, programs, coaches, testimonials, CTA)
2. `about.html` — Story, values
3. `programs.html` — All 7 programs
4. `coaches.html` — Team + interactive owner spotlight
5. `gallery.html` — Masonry gallery
6. `pricing.html` — 3 membership tiers
7. `booking.html` — Trial-class booking form (validation + snackbar)
8. `testimonials.html` — Reviews grid
9. `contact.html` — Contact info + form
10. `faq.html` — Accordion FAQ

## Folder Structure
```
combat360/
├── index.html
├── about.html
├── programs.html
├── coaches.html
├── gallery.html
├── pricing.html
├── booking.html
├── testimonials.html
├── contact.html
├── faq.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── hero-fighter.jpg
        ├── glove.png
        ├── gym-interior.jpg
        ├── coach-owner.jpg
        ├── coach-2.jpg
        ├── coach-3.jpg
        └── gallery-1..4.jpg
```

## Run Locally
Just open `index.html` in any browser — no build step.

For best experience (correct relative-asset loading), serve via any static server:
```bash
python3 -m http.server 8080
# or
npx serve .
```

## Features
- Premium glass-morphism floating navbar with scroll-state
- Cinematic hero with parallax background, floating glove and animated text
- Smooth scroll-reveal animations (IntersectionObserver)
- Animated stat counters
- Interactive coach modal with cinematic zoom-in (owner spotlight)
- Swiper.js testimonial carousel
- Accordion FAQ
- Form validation + snackbar / loading states
- Floating "Book Trial" CTA on scroll
- Animated hamburger + full-screen mobile menu
- Fully responsive (mobile-first)

## Design Tokens (in `css/style.css`)
- `--black`, `--off-white`, `--metal`, `--gray`, `--blood` (#c8102e)
- Bebas Neue for display, Inter for body

## License
For demonstration purposes. Replace placeholder copy with your gym's content.
