/**
 * Muhammad Usman - Professional Portfolio JavaScript
 * Features: Dark/Light Mode, Mobile Navigation, Interactive Filtering,
 * Service Estimator, WhatsApp/Email Inquirer, Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initNavigation();
  initSkillFiltering();
  initServiceEstimator();
  initContactForm();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
 * 1. THEME TOGGLER (Dark / Light)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  // Check saved theme or system preference
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

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-lg', 'bg-opacity-95');
    } else {
      navbar.classList.remove('shadow-lg', 'bg-opacity-95');
    }

    // Scroll spy for active menu link
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

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

  // Mobile menu toggle
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
 * 3. SKILLS CATEGORY FILTERING
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
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 4. INTERACTIVE SERVICE ESTIMATOR / INQUIRY BUILDER
 * -------------------------------------------------------------------------- */
function initServiceEstimator() {
  const checkboxes = document.querySelectorAll('.service-checkbox');
  const locationSelect = document.getElementById('inquiry-location');
  const notesInput = document.getElementById('inquiry-notes');
  const whatsappSendBtn = document.getElementById('estimator-whatsapp-btn');
  const emailSendBtn = document.getElementById('estimator-email-btn');

  function generateInquiryMessage() {
    const selectedServices = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        selectedServices.push(cb.value);
      }
    });

    const location = locationSelect ? locationSelect.value : 'Peshawar';
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'None provided';

    let message = `Hello Muhammad Usman,\n\nI visited your portfolio and would like to discuss an opportunity / project:\n`;
    message += `• Location: ${location}\n`;
    message += `• Required Services:\n  - ${selectedServices.length > 0 ? selectedServices.join('\n  - ') : 'General Technical Inquiry'}\n`;
    message += `• Project Details: ${notes}\n\nLooking forward to hearing from you!`;

    return message;
  }

  if (whatsappSendBtn) {
    whatsappSendBtn.addEventListener('click', () => {
      const text = generateInquiryMessage();
      const phone = '923325145099';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      showToast('Opening WhatsApp with your request...', 'success');
    });
  }

  if (emailSendBtn) {
    emailSendBtn.addEventListener('click', () => {
      const text = generateInquiryMessage();
      const email = 'usmanwadood090@gmail.com';
      const subject = encodeURIComponent('Project & Technical Service Inquiry for Muhammad Usman');
      const body = encodeURIComponent(text);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      showToast('Drafting inquiry email...', 'success');
    });
  }
}

/* --------------------------------------------------------------------------
 * 5. CONTACT FORM & DIRECT ACTIONS
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('usmanwadood090@gmail.com').then(() => {
        showToast('Email copied to clipboard!', 'success');
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+92 3325145099').then(() => {
        showToast('Phone number copied to clipboard!', 'success');
      });
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

      const emailBody = `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:usmanwadood090@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client to send message...', 'success');
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
 * 6. TOAST NOTIFICATION UTILITY
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
    iconSvg = '<svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
  } else if (type === 'error') {
    iconSvg = '<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
  } else {
    iconSvg = '<svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  }

  toast.innerHTML = `
    ${iconSvg}
    <span class="text-sm font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
 * 7. SCROLL ANIMATIONS
 * -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-6');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
      observer.observe(el);
    });
  }
}

