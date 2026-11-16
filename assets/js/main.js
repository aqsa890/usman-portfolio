/**
 * Muhammad Usman - Enhanced Portfolio JavaScript
 * Features: Typewriter Hero Effect, Domain Switcher, 3D Hover Spotlight,
 * Interactive Quickbar, Service Builder, Theme Management & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initHeroTypewriter();
  initDomainSwitcher();
  initSpotlightEffect();
  initServiceInquiry();
  initCopyActions();
  initContactForm();
  initScrollEffects();
});

/* --------------------------------------------------------------------------
 * 1. HERO TYPEWRITER / ROLE ROTATOR
 * -------------------------------------------------------------------------- */
function initHeroTypewriter() {
  const target = document.getElementById('role-rotator');
  if (!target) return;

  const roles = [
    'CCTV Surveillance Systems',
    'Audiovisual & Live Broadcasts',
    'Cat6 Structured Cabling & Networks',
    'DVR & NVR Security Storage',
    'Multi-Cam Video Production'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      speed = 45;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      speed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400; // Pause before typing new word
    }

    setTimeout(type, speed);
  }

  type();
}

/* --------------------------------------------------------------------------
 * 2. DOMAIN SWITCHER (All / CCTV / Media)
 * -------------------------------------------------------------------------- */
function initDomainSwitcher() {
  const switchBtns = document.querySelectorAll('.domain-pill');
  const items = document.querySelectorAll('[data-domain]');

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-white', 'shadow-md', 'shadow-cyan-500/25');
        b.classList.add('bg-slate-800/60', 'text-slate-300');
      });

      btn.classList.add('bg-cyan-500', 'text-white', 'shadow-md', 'shadow-cyan-500/25');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300');

      const domain = btn.getAttribute('data-target');

      items.forEach(item => {
        const itemDomain = item.getAttribute('data-domain');
        if (domain === 'all' || itemDomain === domain || itemDomain.includes(domain)) {
          item.style.display = '';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 3. 3D SPOTLIGHT / HOVER EFFECT
 * -------------------------------------------------------------------------- */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
 * 4. THEME TOGGLER (Dark / Light)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (saved === 'light' || (!saved && prefersLight)) {
    html.classList.add('light');
  }

  function toggle() {
    html.classList.toggle('light');
    const isLight = html.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    showToast(isLight ? 'Switched to Light mode' : 'Switched to Dark mode');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  if (toggleMobile) toggleMobile.addEventListener('click', toggle);
}

/* --------------------------------------------------------------------------
 * 5. INTERACTIVE SERVICE INQUIRY (WhatsApp / Email)
 * -------------------------------------------------------------------------- */
function initServiceInquiry() {
  const chips = document.querySelectorAll('.service-chip');
  const waBtn = document.getElementById('quick-inquiry-wa');
  const mailBtn = document.getElementById('quick-inquiry-mail');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active-chip');
      chip.classList.toggle('bg-cyan-500/20');
      chip.classList.toggle('border-cyan-400');
      chip.classList.toggle('text-cyan-300');
    });
  });

  function getSelectedServices() {
    const selected = [];
    document.querySelectorAll('.service-chip.active-chip').forEach(c => {
      selected.push(c.textContent.trim());
    });
    return selected.length ? selected : ['General Technical Consultation'];
  }

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const services = getSelectedServices().join(', ');
      const msg = `Hello Muhammad Usman, I reviewed your portfolio and would like to discuss: ${services}.`;
      const url = `https://wa.me/923325145099?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      showToast('Opening WhatsApp chat...');
    });
  }

  if (mailBtn) {
    mailBtn.addEventListener('click', () => {
      const services = getSelectedServices().join(', ');
      const sub = encodeURIComponent('Technical Service Inquiry - ' + services);
      const body = encodeURIComponent(`Hi Muhammad Usman,\n\nI am contacting you regarding: ${services}.\n\nPlease let me know your availability for a call.\n\nThank you.`);
      window.location.href = `mailto:usmanwadood090@gmail.com?subject=${sub}&body=${body}`;
      showToast('Opening Email draft...');
    });
  }
}

/* --------------------------------------------------------------------------
 * 6. ONE-CLICK COPY ACTIONS
 * -------------------------------------------------------------------------- */
function initCopyActions() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(val).then(() => {
        showToast(`Copied: ${val}`);
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 7. CONTACT FORM
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('quick-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all fields.', 'error');
      return;
    }

    const sub = encodeURIComponent(`Portfolio Message from ${name}`);
    const body = encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${message}`);
    window.location.href = `mailto:usmanwadood090@gmail.com?subject=${sub}&body=${body}`;
    showToast('Redirecting to your email client...');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
 * 8. SCROLL & NAV BEHAVIOR
 * -------------------------------------------------------------------------- */
function initScrollEffects() {
  const nav = document.getElementById('main-nav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('shadow-xl', 'bg-opacity-95');
    } else {
      nav.classList.remove('shadow-xl', 'bg-opacity-95');
    }

    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(l => {
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('text-cyan-400', 'font-semibold');
      } else {
        l.classList.remove('text-cyan-400', 'font-semibold');
      }
    });
  });

  // Mobile menu toggle
  const mobBtn = document.getElementById('mobile-menu-btn');
  const mobMenu = document.getElementById('mobile-menu');
  if (mobBtn && mobMenu) {
    mobBtn.addEventListener('click', () => {
      mobMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => mobMenu.classList.add('hidden'));
    });
  }
}

/* --------------------------------------------------------------------------
 * 9. TOAST NOTIFICATION UTILITY
 * -------------------------------------------------------------------------- */
function showToast(text, type = 'info') {
  let box = document.getElementById('toast-container');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast-container';
    document.body.appendChild(box);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-400' : 'bg-cyan-400'} animate-pulse"></span>
    <span class="text-xs sm:text-sm font-medium">${text}</span>
  `;

  box.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
