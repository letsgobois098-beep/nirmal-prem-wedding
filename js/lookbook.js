/**
 * NIRMAL PREM — Lookbook & Visual Editorial Engine
 * Category filtering, masonry rendering, and lightbox integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initLookbookGallery();
});

function initLookbookGallery() {
  const container = document.getElementById('lookbook-masonry-grid');
  if (!container) return;

  const filterButtons = document.querySelectorAll('.lookbook-filter-btn');
  let currentFilter = 'All';

  const render = () => {
    let items = window.NirmalCMS ? window.NirmalCMS.getLookbook() : [];

    if (currentFilter !== 'All') {
      items = items.filter(item => item.category === currentFilter);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; margin-bottom: 0.5rem;">New Editorial Edits Coming Soon</h3>
          <p style="color: var(--color-text-muted);">Explore our complete bridal and groom collections at our Tohana store.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map((item, index) => {
      const isTall = item.tall || index % 3 === 0;
      return `
        <div class="lookbook-item ${isTall ? 'tall' : ''}" 
             data-lightbox-src="${item.image}" 
             data-title="${item.title}" 
             data-category="${item.category}">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <div class="lookbook-hover-overlay">
            <span>${item.category}</span>
            <h4>${item.title}</h4>
            <div class="lookbook-zoom-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');
  };

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'All';
      render();
    });
  });

  render();
}
