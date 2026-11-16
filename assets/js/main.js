/**
 * Muhammad Usman - Portfolio Enhanced JavaScript
 * Features: Typewriter, Counter Animation, Domain Toggle, Interactive Filter,
 * Smooth Scroll, Back-to-Top, Toast Notifications, Clipboard Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initNavigation();
  initTypewriter();
  initCounterAnimation();
  initDomainToggle();
  initSkillFiltering();
  initServiceEstimator();
  initContactActions();
  initScrollReveal();
  initBackToTop();
});

/* --------------------------------------------------------------------------
 * 1. THEME TOGGLER (Dark / Light)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    html.classList.add('light');
  } else {
    html.classList.remove('light');
  }

  function toggleTheme() {
    html.classList.toggle('light');
    const currentTheme = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    showToast(`Switched to ${currentTheme} mode`, 'info');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener('click', toggleTheme);
}

/* --------------------------------------------------------------------------
 * 2. NAVIGATION & MOBILE MENU
 * -------------------------------------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.desktop-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-lg', 'bg-opacity-95');
    } else {
      navbar.classList.remove('shadow-lg', 'bg-opacity-95');
    }

    // Scroll spy
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'font-semibold');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-cyan-400', 'font-semibold');
      }
    });
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* --------------------------------------------------------------------------
 * 3. TYPEWRITER ANIMATION (Hero Section)
 * -------------------------------------------------------------------------- */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'CCTV & Surveillance Specialist',
    'Media Operations Associate',
    'Cat6 & Network Infrastructure Tech',
    'Live Event & Broadcast Specialist'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 2000;
  const pauseStart = 400;

  function type() {
    const currentWord = roles[roleIdx];

    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = pauseStart;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 300);
}

/* --------------------------------------------------------------------------
 * 4. ANIMATED STATS COUNTER
 * -------------------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1500;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = (isDecimal ? target.toFixed(1) : Math.round(target)) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-strip');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
 * 5. INTERACTIVE DOMAIN SWITCHER (Surveillance vs Media)
 * -------------------------------------------------------------------------- */
function initDomainToggle() {
  const toggleBtns = document.querySelectorAll('.domain-toggle-btn');
  const surveillancePanel = document.getElementById('domain-surveillance');
  const mediaPanel = document.getElementById('domain-media');

  if (!toggleBtns.length || !surveillancePanel || !mediaPanel) return;

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-800/80', 'text-slate-300');
      });

      btn.classList.add('bg-cyan-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');

      const domain = btn.getAttribute('data-domain');

      if (domain === 'surveillance') {
        surveillancePanel.classList.remove('hidden');
        mediaPanel.classList.add('hidden');
      } else {
        surveillancePanel.classList.add('hidden');
        mediaPanel.classList.remove('hidden');
      }

      if (window.lucide) window.lucide.createIcons();
    });
  });
}

/* --------------------------------------------------------------------------
 * 6. SKILLS CATEGORY FILTERING
 * -------------------------------------------------------------------------- */
function initSkillFiltering() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-800/60', 'text-slate-300');
      });

      btn.classList.add('bg-cyan-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 7. INTERACTIVE SERVICE ESTIMATOR / INQUIRY BUILDER
 * -------------------------------------------------------------------------- */
function initServiceEstimator() {
  const checkboxes = document.querySelectorAll('.service-checkbox');
  const locationSelect = document.getElementById('inquiry-location');
  const notesInput = document.getElementById('inquiry-notes');
  const whatsappSendBtn = document.getElementById('estimator-whatsapp-btn');
  const emailSendBtn = document.getElementById('estimator-email-btn');

  function generateInquiryMessage() {
    const selected = [];
    checkboxes.forEach(cb => {
      if (cb.checked) selected.push(cb.value);
    });

    const location = locationSelect ? locationSelect.value : 'Peshawar';
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'Standard requirements';

    let msg = `Hello Muhammad Usman,\n\nI reviewed your portfolio and would like to inquire about:\n`;
    msg += `• Location: ${location}\n`;
    msg += `• Services Needed:\n  - ${selected.length > 0 ? selected.join('\n  - ') : 'General Technical Inquiry'}\n`;
    msg += `• Project Details: ${notes}\n\nPlease let me know your availability!`;

    return msg;
  }

  if (whatsappSendBtn) {
    whatsappSendBtn.addEventListener('click', () => {
      const text = generateInquiryMessage();
      const url = `https://wa.me/923325145099?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      showToast('Opening WhatsApp with your inquiry...', 'success');
    });
  }

  if (emailSendBtn) {
    emailSendBtn.addEventListener('click', () => {
      const text = generateInquiryMessage();
      const subject = encodeURIComponent('Technical Inquiry for Muhammad Usman');
      const body = encodeURIComponent(text);
      window.location.href = `mailto:usmanwadood090@gmail.com?subject=${subject}&body=${body}`;
      showToast('Drafting inquiry email...', 'success');
    });
  }
}

/* --------------------------------------------------------------------------
 * 8. CONTACT FORM & INSTANT CLIPBOARD ACTIONS
 * -------------------------------------------------------------------------- */
function initContactActions() {
  const form = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  function copyTextWithFeedback(btn, textToCopy, successMsg) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(successMsg, 'success');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyTextWithFeedback(copyEmailBtn, 'usmanwadood090@gmail.com', 'Email copied to clipboard!');
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyTextWithFeedback(copyPhoneBtn, '+92 3325145099', 'Phone number copied to clipboard!');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || 'New Message from Portfolio';
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      window.location.href = `mailto:usmanwadood090@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      showToast('Opening email client...', 'success');
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
 * 9. SCROLL REVEAL (IntersectionObserver)
 * -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-init');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('reveal-active'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
 * 10. BACK TO TOP BUTTON
 * -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
 * 11. TOAST NOTIFICATIONS
 * -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
  } else {
    iconSvg = '<svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  }

  toast.innerHTML = `
    ${iconSvg}
    <span class="text-xs sm:text-sm font-medium text-white">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}
