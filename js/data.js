/**
 * NIRMAL PREM — WEDDING PLAZA • DRESSUP • RENTAL STUDIO
 * Dynamic Data & CMS LocalStorage Architecture
 * Legacy Since 1948 | Gandhi Gate, Tohana, Haryana
 */

const DEFAULT_PRODUCTS = [
  {
    id: "np-001",
    name: "Royal Zardozi Crimson Bridal Lehenga",
    category: "Bridal",
    division: "Wedding Plaza",
    type: "Purchase & Rental",
    image: "assets/images/hero-slide-1.jpg",
    description: "Handcrafted pure velvet bridal lehenga with royal gold zardozi, kasab work, and intricate heritage floral motifs. Includes dual dupattas and bespoke blouse tailoring.",
    badge: "Masterpiece",
    featured: true,
    isNew: true
  },
  {
    id: "np-002",
    name: "Maharaja Ivory Silk Embroidered Sherwani",
    category: "Groom",
    division: "Wedding Plaza",
    type: "Purchase & Rental",
    image: "assets/images/hero-slide-3.jpg",
    description: "Regal ivory raw silk sherwani adorned with gold Kashmiri embroidery, royal maroon velvet stole, matching safa turban with kalgi detailing.",
    badge: "Groom Signature",
    featured: true,
    isNew: true
  },
  {
    id: "np-003",
    name: "Emerald & Wine Velvet Reception Indo-Western",
    category: "Groom",
    division: "DressUp",
    type: "Purchase & Rental",
    image: "assets/images/cat-indowestern-groom.jpg",
    description: "Contemporary asymmetrical cut velvet Indo-Western jacket with metallic threadwork, brooch accent, tailored trousers, and silk inner kurta.",
    badge: "Trending",
    featured: true,
    isNew: false
  },
  {
    id: "np-004",
    name: "Couture Maroon Reception Cape Gown",
    category: "Bridal",
    division: "Rental Studio",
    type: "Rental & Purchase",
    image: "assets/images/cat-bridal-gown.jpg",
    description: "Grand crimson-maroon ballroom gown with trailing sheer cape sleeves, delicate crystal bead embroidery, and royal flared silhouette.",
    badge: "Couture Edit",
    featured: true,
    isNew: true
  },
  {
    id: "np-005",
    name: "Designer Floral Silk Anarkali Suit Set",
    category: "Ladies",
    division: "DressUp",
    type: "Purchase",
    image: "assets/images/division-dressup.jpg",
    description: "Rich wine-toned pure silk Anarkali suit with delicate floral thread embroidery, scalloped hemline, paired with matching cigarette pants and organza dupatta.",
    badge: "DressUp Exclusive",
    featured: true,
    isNew: false
  },
  {
    id: "np-006",
    name: "Emerald & Maroon Velvet Bridal Ensemble",
    category: "Bridal",
    division: "Wedding Plaza",
    type: "Purchase & Rental",
    image: "assets/images/hero-slide-2.jpg",
    description: "Double dupatta bridal velvet couture featuring emerald green scalloped borders, antique zardozi work, and heirloom-grade craftsmanship.",
    badge: "Heirloom Edition",
    featured: true,
    isNew: true
  },
  {
    id: "np-007",
    name: "Heritage Bridal Chooda & Gold Kaliras",
    category: "Accessories",
    division: "Wedding Plaza",
    type: "Purchase",
    image: "assets/images/wedding-accessories.jpg",
    description: "Traditional deep red and ivory dotted bridal chooda set accompanied by handcrafted gold dome umbrella kaliras with hanging pearls.",
    badge: "Bridal Essentials",
    featured: true,
    isNew: false
  },
  {
    id: "np-008",
    name: "Royal Couple Celebration Ensembles",
    category: "Rental",
    division: "Rental Studio",
    type: "Rental",
    image: "assets/images/hero-slide-5.jpg",
    description: "Coordinated bride and groom couture rental package featuring royal wine-red bridal lehenga and midnight navy/emerald groom bandhgala.",
    badge: "Couple Package",
    featured: true,
    isNew: true
  }
];

const DEFAULT_LOOKBOOK = [
  {
    id: "lb-01",
    title: "The Regal Crimson Bride",
    category: "Bridal Edit",
    image: "assets/images/hero-slide-1.jpg",
    tall: true
  },
  {
    id: "lb-02",
    title: "Maharaja Heritage Sherwani",
    category: "Groom Edit",
    image: "assets/images/hero-slide-3.jpg",
    tall: false
  },
  {
    id: "lb-03",
    title: "Couture Reception Ballgown",
    category: "Bridal Edit",
    image: "assets/images/cat-bridal-gown.jpg",
    tall: true
  },
  {
    id: "lb-04",
    title: "Velvet Indo-Western Signature",
    category: "Groom Edit",
    image: "assets/images/cat-indowestern-groom.jpg",
    tall: false
  },
  {
    id: "lb-05",
    title: "Contemporary DressUp Anarkali",
    category: "DressUp Edit",
    image: "assets/images/division-dressup.jpg",
    tall: true
  },
  {
    id: "lb-06",
    title: "Royal Couple Wedding Couture",
    category: "Rental Edit",
    image: "assets/images/hero-slide-5.jpg",
    tall: false
  },
  {
    id: "lb-07",
    title: "Traditional Chooda & Kaliras",
    category: "Trending Now",
    image: "assets/images/wedding-accessories.jpg",
    tall: false
  },
  {
    id: "lb-08",
    title: "Handcrafted Zardozi Heritage",
    category: "New Arrivals",
    image: "assets/images/heritage-since-1948.jpg",
    tall: false
  }
];

const DEFAULT_OFFERS = [
  {
    id: "of-01",
    title: "Wedding Season Bridal & Groom Privileges",
    subtitle: "Complete Bridal Consultation & Styling Preview",
    image: "assets/images/division-wedding-plaza.jpg",
    validTill: "Active Wedding Season",
    description: "Book an exclusive personal bridal & groom styling appointment at Nirmal Prem Tohana. Enjoy personalized fittings, matching accessory coordination, and curated celebration trials.",
    cta: "Book Appointment on WhatsApp"
  },
  {
    id: "of-02",
    title: "Rental Studio Premium Celebration Packages",
    subtitle: "Luxury Occasion Wear on Rent",
    image: "assets/images/division-rental-studio.jpg",
    validTill: "Limited Seasonal Dates",
    description: "Experience royal designer lehengas, sherwanis, and cocktail gowns at a fraction of purchase cost. Complete with hygienic steam-sanitization and custom alterations.",
    cta: "Enquire Rental Availability"
  }
];

// --- Nirmal Prem CMS State Manager ---
class NirmalCMSManager {
  constructor() {
    this.STORAGE_KEY_PRODUCTS = "nirmalprem_products";
    this.STORAGE_KEY_LOOKBOOK = "nirmalprem_lookbook";
    this.STORAGE_KEY_OFFERS = "nirmalprem_offers";
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY_PRODUCTS)) {
      localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_LOOKBOOK)) {
      localStorage.setItem(this.STORAGE_KEY_LOOKBOOK, JSON.stringify(DEFAULT_LOOKBOOK));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_OFFERS)) {
      localStorage.setItem(this.STORAGE_KEY_OFFERS, JSON.stringify(DEFAULT_OFFERS));
    }
  }

  getProducts() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY_PRODUCTS)) || DEFAULT_PRODUCTS;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  }

  saveProducts(products) {
    localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }

  addProduct(product) {
    const products = this.getProducts();
    product.id = "np-" + Date.now();
    products.unshift(product);
    this.saveProducts(products);
    return product;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    this.saveProducts(products);
    return products;
  }

  getLookbook() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY_LOOKBOOK)) || DEFAULT_LOOKBOOK;
    } catch (e) {
      return DEFAULT_LOOKBOOK;
    }
  }

  saveLookbook(items) {
    localStorage.setItem(this.STORAGE_KEY_LOOKBOOK, JSON.stringify(items));
  }

  getOffers() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY_OFFERS)) || DEFAULT_OFFERS;
    } catch (e) {
      return DEFAULT_OFFERS;
    }
  }

  saveOffers(offers) {
    localStorage.setItem(this.STORAGE_KEY_OFFERS, JSON.stringify(offers));
  }

  resetToDefaults() {
    localStorage.setItem(this.STORAGE_KEY_PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem(this.STORAGE_KEY_LOOKBOOK, JSON.stringify(DEFAULT_LOOKBOOK));
    localStorage.setItem(this.STORAGE_KEY_OFFERS, JSON.stringify(DEFAULT_OFFERS));
  }

  exportData() {
    return JSON.stringify({
      products: this.getProducts(),
      lookbook: this.getLookbook(),
      offers: this.getOffers()
    }, null, 2);
  }

  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.products) this.saveProducts(data.products);
      if (data.lookbook) this.saveLookbook(data.lookbook);
      if (data.offers) this.saveOffers(data.offers);
      return true;
    } catch (e) {
      console.error("Invalid JSON import", e);
      return false;
    }
  }
}

// Global CMS instance
window.NirmalCMS = new NirmalCMSManager();

// Helper: Context-aware WhatsApp link builder
window.buildWhatsAppLink = function(customMessage) {
  const phone = "919896730300";
  const defaultMsg = "Hello Nirmal Prem, I would like to enquire about your wedding & fashion collections at Tohana.";
  const encoded = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${phone}?text=${encoded}`;
};
