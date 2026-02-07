/**
 * McMillen World - Application Logic
 * Handles Mobile Navigation, Investor Modal, Language Dropdown, and Animations.
 */

(function () {

  // 1. Investor Declaration Modal
  const investorModal = document.getElementById('investorModal');
  const confirmInvestor = document.getElementById('confirmInvestor');

  if (investorModal && confirmInvestor) {
    const hasConfirmed = localStorage.getItem('mcmillen_investor_confirmed');

    if (!hasConfirmed) {
      investorModal.classList.add('active');
    }

    confirmInvestor.addEventListener('click', () => {
      investorModal.classList.remove('active');
      localStorage.setItem('mcmillen_investor_confirmed', 'true');
    });
  }

  // 2. Mobile Nav Listener
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('open');
    });
  }

  // 3. Language Dropdown
  const langDropdown = document.getElementById('langDropdown');
  if (langDropdown) {
    const langBtn = langDropdown.querySelector('.lang-btn');
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
      langDropdown.classList.remove('active');
    });
  }

  // 4. Contact Form (Netlify Fetch Submission)
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then(() => {
          contactStatus.textContent = "Thank you! Your inquiry has been received.";
          contactStatus.style.color = "#2ECC71";
          contactForm.reset();
        })
        .catch((error) => {
          contactStatus.textContent = "Submission failed. Please try again.";
          contactStatus.style.color = "#E74C3C";
        });
    });
  }

  // 5. GSAP & Parallax
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Scroll Animations
    gsap.utils.toArray(".float-block, .card, .info-card, .section-head, .grid-3 > div, .grid-4 > div").forEach((el) => {
      gsap.fromTo(el,
        { y: 50, opacity: 0, filter: "blur(8px)" },
        {
          y: 0, opacity: 1, filter: "blur(0px)",
          duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        }
      );
    });

    // 3D Parallax Mouse Effect
    const hero = document.getElementById('hero');
    const card = document.getElementById('card');
    const layers = document.querySelectorAll('.layer');

    if (hero && card) {
      hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { clientWidth, clientHeight } = currentTarget;

        const x = (clientX / clientWidth) - 0.5;
        const y = (clientY / clientHeight) - 0.5;

        // Rotate Card
        card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;

        // Move Layers (Parallax)
        layers.forEach(layer => {
          const depth = layer.getAttribute('data-depth') || 0.02;
          const moveX = x * clientWidth * depth;
          const moveY = y * clientHeight * depth;
          layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      });

      hero.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        layers.forEach(layer => {
          layer.style.transform = `translate(0, 0)`;
        });
      });
    }
  }

})();
