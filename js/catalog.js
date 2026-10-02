/**
 * NIRMAL PREM — Dynamic Product Catalog & Quick View Engine
 * Filter categories, render dynamic products, open quick view modal, WhatsApp enquiry
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductCatalog();
  initProductModal();
});

function initProductCatalog() {
  const container = document.getElementById('catalog-products-grid');
  if (!container) return;

  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('catalog-search-input');
  
  let currentFilter = 'All';
  let searchQuery = '';

  const render = () => {
    let products = window.NirmalCMS ? window.NirmalCMS.getProducts() : [];

    // Filter by Category or Tag
    if (currentFilter !== 'All') {
      if (currentFilter === 'New Arrivals') {
        products = products.filter(p => p.isNew);
      } else if (currentFilter === 'Rental') {
        products = products.filter(p => p.division === 'Rental Studio' || p.type.includes('Rental') || p.category === 'Rental');
      } else {
        products = products.filter(p => p.category === currentFilter || p.division === currentFilter);
      }
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) || 
        p.division.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No Designs Found</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">We are constantly updating our showroom collection at Gandhi Gate, Tohana.</p>
          <a href="${window.buildWhatsAppLink('Hello Nirmal Prem, I am looking for a specific design. Could you share your latest collection photos on WhatsApp?')}" class="btn btn-whatsapp" target="_blank" rel="noopener">
            Ask on WhatsApp
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(product => {
      const isRental = product.type.includes('Rental');
      const badgeClass = isRental ? 'badge-rental' : 'badge-purchase';
      const waMsg = `Hello Nirmal Prem, I am interested in "${product.name}" (${product.category} • ${product.division}). Please share price, trial availability, and details.`;
      const waUrl = window.buildWhatsAppLink(waMsg);

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card-img-wrap" onclick="openProductModal('${product.id}')">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badges">
              <span class="badge ${badgeClass}">${product.type}</span>
              ${product.badge ? `<span class="badge badge-gold">${product.badge}</span>` : ''}
            </div>
          </div>
          <div class="product-card-body">
            <span class="product-category-text">${product.division} • ${product.category}</span>
            <h3 class="product-title" onclick="openProductModal('${product.id}')" style="cursor: pointer;">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-card-footer">
              <button class="btn btn-secondary btn-sm" onclick="openProductModal('${product.id}')">
                Quick View
              </button>
              <a href="${waUrl}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener" aria-label="Enquire about ${product.name} on WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
                </svg>
                Enquire
              </a>
            </div>
          </div>
        </article>
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

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });
  }

  // Initial render
  render();
}

// Product Quick View Modal
function initProductModal() {
  let modalOverlay = document.getElementById('product-quickview-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'product-quickview-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-container">
        <button class="modal-close-btn" onclick="closeProductModal()" aria-label="Close details">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="product-modal-grid">
          <div class="modal-gallery-wrap">
            <img id="modal-product-img" src="" alt="Product Detail">
          </div>
          <div class="modal-content-wrap">
            <div style="margin-bottom: 0.5rem;">
              <span id="modal-product-division" class="badge badge-maroon">Wedding Plaza</span>
              <span id="modal-product-type" class="badge badge-gold" style="margin-left: 0.4rem;">Purchase & Rental</span>
            </div>
            <h2 id="modal-product-title" style="font-size: 1.85rem; margin-bottom: 0.75rem;">Product Name</h2>
            <div class="gold-hairline"></div>
            <p id="modal-product-desc" style="color: var(--color-text-muted); font-size: 0.98rem; line-height: 1.7; margin-bottom: 2rem;">
              Description goes here.
            </p>
            <div style="background-color: var(--color-offwhite); padding: 1.25rem; border-radius: 4px; margin-bottom: 2rem; border-left: 3px solid var(--color-maroon);">
              <p style="font-size: 0.85rem; font-weight: 600; color: var(--color-charcoal); margin-bottom: 0.35rem;">
                📍 NIRMAL PREM FLAGSHIP STORE
              </p>
              <p style="font-size: 0.82rem; color: var(--color-text-muted);">
                Gandhi Gate, Tohana, Haryana | Trials & Custom Fitting Available
              </p>
            </div>
            <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
              <a id="modal-product-wa-btn" href="#" class="btn btn-whatsapp btn-lg" target="_blank" rel="noopener">
                Enquire on WhatsApp
              </a>
              <a href="tel:+919896730300" class="btn btn-secondary btn-lg">
                Call Store
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeProductModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeProductModal();
      }
    });
  }
}

window.openProductModal = function(productId) {
  const modal = document.getElementById('product-quickview-modal');
  if (!modal) return;

  const products = window.NirmalCMS ? window.NirmalCMS.getProducts() : [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modal-product-img').src = product.image;
  document.getElementById('modal-product-title').textContent = product.name;
  document.getElementById('modal-product-division').textContent = `${product.division} • ${product.category}`;
  document.getElementById('modal-product-type').textContent = product.type;
  document.getElementById('modal-product-desc').textContent = product.description;

  const waMsg = `Hello Nirmal Prem, I am interested in "${product.name}" (${product.category} • ${product.division}). Please share details and trial availability at Gandhi Gate, Tohana.`;
  document.getElementById('modal-product-wa-btn').href = window.buildWhatsAppLink(waMsg);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeProductModal = function() {
  const modal = document.getElementById('product-quickview-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};
