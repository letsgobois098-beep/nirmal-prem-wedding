/**
 * NIRMAL PREM — CMS / Admin Dashboard Logic
 * Allows business owner to add products, lookbook photos, offers, export/import JSON
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminTabs();
  renderAdminProducts();
  renderAdminLookbook();
  renderAdminOffers();
  initAdminForms();
});

// Admin Tab Navigation
function initAdminTabs() {
  const tabs = document.querySelectorAll('.admin-tab-btn');
  const panels = document.querySelectorAll('.admin-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

// 1. Render Products in Admin Table
function renderAdminProducts() {
  const list = document.getElementById('admin-products-table-body');
  if (!list) return;

  const products = window.NirmalCMS.getProducts();

  list.innerHTML = products.map(p => `
    <tr>
      <td>
        <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 2px;">
      </td>
      <td>
        <strong>${p.name}</strong><br>
        <small style="color: var(--color-text-muted);">${p.id}</small>
      </td>
      <td>${p.division} • ${p.category}</td>
      <td><span class="badge ${p.type.includes('Rental') ? 'badge-rental' : 'badge-purchase'}">${p.type}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="handleDeleteProduct('${p.id}')" style="color: #dc3545; border-color: #dc3545;">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

window.handleDeleteProduct = function(id) {
  if (confirm('Are you sure you want to remove this product from Nirmal Prem catalog?')) {
    window.NirmalCMS.deleteProduct(id);
    renderAdminProducts();
    if (window.showToast) window.showToast('Product removed successfully.');
  }
};

// 2. Render Lookbook in Admin Table
function renderAdminLookbook() {
  const list = document.getElementById('admin-lookbook-table-body');
  if (!list) return;

  const items = window.NirmalCMS.getLookbook();

  list.innerHTML = items.map((item, index) => `
    <tr>
      <td>
        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 2px;">
      </td>
      <td><strong>${item.title}</strong></td>
      <td><span class="badge badge-gold">${item.category}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="handleDeleteLookbook(${index})" style="color: #dc3545; border-color: #dc3545;">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

window.handleDeleteLookbook = function(index) {
  if (confirm('Delete this lookbook item?')) {
    const items = window.NirmalCMS.getLookbook();
    items.splice(index, 1);
    window.NirmalCMS.saveLookbook(items);
    renderAdminLookbook();
    if (window.showToast) window.showToast('Lookbook photo removed.');
  }
};

// 3. Render Offers in Admin Table
function renderAdminOffers() {
  const list = document.getElementById('admin-offers-table-body');
  if (!list) return;

  const offers = window.NirmalCMS.getOffers();

  list.innerHTML = offers.map((offer, index) => `
    <tr>
      <td>
        <img src="${offer.image}" alt="${offer.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 2px;">
      </td>
      <td>
        <strong>${offer.title}</strong><br>
        <small style="color: var(--color-text-muted);">${offer.subtitle}</small>
      </td>
      <td>${offer.validTill}</td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="handleDeleteOffer(${index})" style="color: #dc3545; border-color: #dc3545;">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

window.handleDeleteOffer = function(index) {
  if (confirm('Delete this offer banner?')) {
    const offers = window.NirmalCMS.getOffers();
    offers.splice(index, 1);
    window.NirmalCMS.saveOffers(offers);
    renderAdminOffers();
    if (window.showToast) window.showToast('Offer removed.');
  }
};

// 4. Forms Submission Handlers
function initAdminForms() {
  // Add Product Form
  const productForm = document.getElementById('admin-add-product-form');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newProduct = {
        name: productForm.querySelector('[name="p_name"]').value.trim(),
        category: productForm.querySelector('[name="p_category"]').value,
        division: productForm.querySelector('[name="p_division"]').value,
        type: productForm.querySelector('[name="p_type"]').value,
        image: productForm.querySelector('[name="p_image"]').value.trim() || 'assets/images/hero-slide-1.jpg',
        description: productForm.querySelector('[name="p_desc"]').value.trim(),
        badge: productForm.querySelector('[name="p_badge"]').value.trim(),
        featured: productForm.querySelector('[name="p_featured"]').checked,
        isNew: true
      };

      window.NirmalCMS.addProduct(newProduct);
      productForm.reset();
      renderAdminProducts();
      if (window.showToast) window.showToast('New product added to catalog!');
    });
  }

  // Add Lookbook Form
  const lookbookForm = document.getElementById('admin-add-lookbook-form');
  if (lookbookForm) {
    lookbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newItem = {
        id: 'lb-' + Date.now(),
        title: lookbookForm.querySelector('[name="lb_title"]').value.trim(),
        category: lookbookForm.querySelector('[name="lb_category"]').value,
        image: lookbookForm.querySelector('[name="lb_image"]').value.trim() || 'assets/images/hero-slide-1.jpg',
        tall: lookbookForm.querySelector('[name="lb_tall"]').checked
      };

      const items = window.NirmalCMS.getLookbook();
      items.unshift(newItem);
      window.NirmalCMS.saveLookbook(items);
      lookbookForm.reset();
      renderAdminLookbook();
      if (window.showToast) window.showToast('Lookbook editorial image added!');
    });
  }

  // Add Offer Form
  const offerForm = document.getElementById('admin-add-offer-form');
  if (offerForm) {
    offerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newOffer = {
        id: 'of-' + Date.now(),
        title: offerForm.querySelector('[name="of_title"]').value.trim(),
        subtitle: offerForm.querySelector('[name="of_subtitle"]').value.trim(),
        image: offerForm.querySelector('[name="of_image"]').value.trim() || 'assets/images/division-wedding-plaza.jpg',
        validTill: offerForm.querySelector('[name="of_date"]').value.trim() || 'Current Season',
        description: offerForm.querySelector('[name="of_desc"]').value.trim(),
        cta: 'Enquire on WhatsApp'
      };

      const offers = window.NirmalCMS.getOffers();
      offers.unshift(newOffer);
      window.NirmalCMS.saveOffers(offers);
      offerForm.reset();
      renderAdminOffers();
      if (window.showToast) window.showToast('Seasonal offer announcement created!');
    });
  }

  // Export JSON
  const exportBtn = document.getElementById('admin-export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = window.NirmalCMS.exportData();
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nirmal-prem-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Reset to Defaults
  const resetBtn = document.getElementById('admin-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all products, lookbook, and offers to factory defaults?')) {
        window.NirmalCMS.resetToDefaults();
        renderAdminProducts();
        renderAdminLookbook();
        renderAdminOffers();
        if (window.showToast) window.showToast('Data reset to original Nirmal Prem defaults.');
      }
    });
  }
}
