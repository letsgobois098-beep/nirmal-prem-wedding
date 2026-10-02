/**
 * NIRMAL PREM — WEDDING PLAZA • DRESSUP • RENTAL STUDIO
 * Global Main Application Scripts
 * Sticky Header, Mobile Drawer, Floating Actions, Lightbox, Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initActiveNavLink();
  initLightbox();
  initGlobalScrollAnimation();
});

// 1. Sticky Header Compact Transition
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// 2. Clean Mobile Hamburger Drawer
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    toggleBtn.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  overlay.addEventListener('click', closeDrawer);

  closeLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

// 3. Highlight Current Active Nav Link based on URL
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 4. Global Lookbook & Gallery Lightbox System
function initLightbox() {
  let lightbox = document.querySelector('.lightbox-overlay');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <button class="modal-close-btn lightbox-close" aria-label="Close Lightbox">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="lightbox-content">
        <img src="" alt="Lookbook High-Resolution Preview" class="lightbox-img" id="lightbox-img">
        <div class="lightbox-caption">
          <h3 id="lightbox-title">Lookbook Title</h3>
          <p id="lightbox-category">Category</p>
          <div style="margin-top: 1rem;">
            <a href="#" id="lightbox-wa-btn" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => closeLightbox());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // Attach click to any element with data-lightbox-src
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-src]');
    if (!trigger) return;
    e.preventDefault();

    const src = trigger.getAttribute('data-lightbox-src');
    const title = trigger.getAttribute('data-title') || 'Nirmal Prem Collection';
    const category = trigger.getAttribute('data-category') || 'Bridal & Celebration';

    openLightbox(src, title, category);
  });
}

function openLightbox(src, title, category) {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (!lightbox) return;

  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const catEl = document.getElementById('lightbox-category');
  const waBtn = document.getElementById('lightbox-wa-btn');

  img.src = src;
  titleEl.textContent = title;
  catEl.textContent = category;
  
  const waMsg = `Hello Nirmal Prem, I loved this design from your lookbook: "${title}" (${category}). Please share details and availability at your Tohana store.`;
  waBtn.href = window.buildWhatsAppLink(waMsg);

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightbox-overlay');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 5. Toast Notification System
window.showToast = function(message, duration = 4000) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
};

// 6. Subtle scroll reveal helper
function initGlobalScrollAnimation() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}
