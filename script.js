// ── CONFIG ────────────────────────────────────────────────────────────────────
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwnAlHnFuMQ9FXntjEe057vHOB96Dqzkb0AFPduXqfL7JsOHzlkk5xs-Re368vGsMzM/exec';

// ── FALLBACK IMAGES ───────────────────────────────────────────────────────────
const fallbackImages = {
  face    : 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=650&q=80',
  cleanser: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=650&q=80',
  mask    : 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=650&q=80',
  kit     : 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=650&q=80'
};

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
const products = [
  {
    id:'kit', name:'Whitish Facial Kit', category:'Kit', file:'Kit',
    price:4499, discount:22, kind:'kit',
    intro:'A complete at-home skincare ritual. Please confirm the exact included items, quantities, and directions before purchase.',
    benefits:['A special self-care collection','Ideal for gifting or personal pampering','Kit contents are confirmed when ordering']
  },
  {
    id:'hydra-glow', name:'Whitish Hydra Glow Rose Face Wash', category:'Face Washes', file:'Hydra glow',
    price:1199, discount:20, kind:'face',
    intro:'Whitish Hydra Glow Rose Face Wash ek hydrating aur brightening formula hai jo skin se dirt aur excess oil ko gently saaf karta hai.',
    benefits:['Sulphate & Paraben-Free','Glycolic-acid cleansing formula','Designed to help skin feel hydrated and soft','Rose-inspired refreshing routine'],
    use:['Apne chehre ko paani se geela karlein.','Thodi si face wash le kar 30–60 seconds tak circular motions mein gently massage karein.','Paani se achi tarah dho lein aur pat dry karein.','Subah aur shaam routine mein use karein.'],
    ingredients:'Aqua, Stearic Acid, Glycerin, Potassium Hydroxide, Sodium C14-16 Olefin Sulfonate, Propylene Glycol, Cocamidopropyl Betaine, Lauric Acid, Palmitic Acid, Myristic Acid, PEG-150 Distearate, Sodium Cocoyl Isethionate, Glyceryl Stearate, Glycol Distearate, Acrylates Copolymer, Phenoxyethanol, Parfum, Menthol, Glycolic Acid, Disodium EDTA.',
    details:'120 ml / 4.05 fl. oz. · Item No: W-301'
  },
  {
    id:'glutathione', name:'Whitish Glutathione Premium Face Wash', category:'Face Washes', file:'Glutathione',
    price:1199, discount:25, kind:'face',
    intro:'Whitish Glutathione Premium Face Wash is designed to remove dirt, excess oil and impurities while leaving skin feeling refreshed.',
    benefits:['Sulfate & Paraben Free','Gentle-feel daily cleansing','Contains glutathione','Designed to leave skin soft and refreshed'],
    use:['Apne chehre ko paani se geela karlein.','Thodi si face wash le kar 30–60 seconds tak circular motions mein gently massage karein.','Achi tarah rinse karein aur pat dry karlein.','Morning aur evening routine mein use karein.'],
    ingredients:'Aqua, Stearic Acid, Glycerin, Potassium Hydroxide, Sodium C14-16 Olefin Sulfonate, Propylene Glycol, Cocamidopropyl Betaine, Lauric Acid, Palmitic Acid, Myristic Acid, PEG-150 Distearate, Sodium Cocoyl Isethionate, Glyceryl Stearate, Glycol Distearate, Acrylates Copolymer, Phenoxyethanol, Parfum, Menthol, Glutathione, Disodium EDTA.',
    details:'120 ml / 4.05 fl. oz. · Item No: W-305'
  },
  {
    id:'kojic-acid', name:'Whitish Kojic Acid Face Wash', category:'Face Washes', file:'Kojic acid',
    price:1199, discount:20, kind:'face',
    intro:'A face wash in the Whitish daily-cleansing collection. Please review the product label for complete ingredients and directions.',
    benefits:['Face-cleansing essential','Check the packaging for ingredient concentrations and precautions']
  },
  {
    id:'korean-glass', name:'Whitish Korean Glass Skin Face Wash', category:'Face Washes', file:'Korean glass',
    price:1199, discount:18, kind:'face',
    intro:'A daily face cleanser formulated with rice ferment filtrate. Designed to cleanse skin and leave it feeling fresh.',
    benefits:['Rice ferment filtrate in the listed formula','Helps cleanse dirt and oil','Designed for a fresh, smooth-looking finish'],
    use:['Sabse pehle apne chehre ko paani se geela karein.','Thodi si miqdar mein face wash hatheli par nikalein.','Chehre par circular motion mein 30 se 60 seconds tak narmi se massage karein.','Saaf paani se dho kar narm tauliye se pat dry karlein.'],
    ingredients:'Aqua, Stearic Acid, Glycerin, Potassium Hydroxide, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Propylene Glycol, Lauric Acid, Palmitic Acid, PEG-150 Distearate, Myristic Acid, Glyceryl Stearate, Glycol Distearate, Ceteareth-18, Acrylates Copolymer, Cocamide DEA, Phenoxyethanol, Parfum, Saccharomyces/Rice Ferment Filtrate, Methylparaben, Ethylparaben, Propylparaben, Butylparaben, Menthol, Disodium EDTA.',
    details:'120 ml / 4.05 fl. oz.'
  },
  {
    id:'cool', name:'Whitish Cool Mint Fresh Face Wash', category:'Face Washes', file:'Cool',
    price:1499, discount:15, kind:'face',
    intro:'Whitish Cool Mint Fresh Face Wash gently removes dirt, excess oil, and impurities while delivering an instant cooling and refreshing sensation. Enriched with Mint Extract, this 3-Action Formula helps control excess oil, refresh tired skin, and enhance your natural beauty.',
    benefits:[
      'Instant Cooling — delivers an extra-cool, refreshing sensation that instantly energizes tired skin',
      'Controls Excess Oil — cleanses sebum to maintain a fresh, shine-free appearance',
      'Enhances Natural Beauty — revitalizes skin tone for a naturally fresh, healthy glow',
      'Moisture Balance — gentle formula cleanses without stripping skin\'s natural moisture'
    ],
    use:[
      'Wet your face with clean water.',
      'Apply a small amount of face wash onto your hands.',
      'Gently massage in circular motions over your face for 30–60 seconds.',
      'Rinse thoroughly with water.',
      'Pat dry with a clean towel. Use morning and evening for best results.'
    ],
    ingredients:'Aqua, Stearic Acid, Glycerin, Potassium Hydroxide, Sodium Laureth Sulfate, Palmitic Acid, Lauric Acid, Cocamidopropyl Betaine, Myristic Acid, PEG-150 Distearate, Propylene Glycol, Glyceryl Stearate, Glycol Distearate, Cocamide DEA, Acrylate Copolymer, Sodium Cocoyl Isethionate, Sodium C14-16 Olefin Sulfonate, Phenoxyethanol, Parfum, Menthol, Disodium EDTA.',
    details:'120 ml / 4.05 fl. oz. · Item No: W-306'
  },
  {
    id:'charcoal', name:'Whitish Charcoal Oil Control Face Wash', category:'Face Washes', file:'Charcoal',
    price:1499, discount:15, kind:'face',
    intro:'Whitish Charcoal Oil Control Face Wash deeply cleanses dirt, excess oil, and impurities from the pores to give you a clearer, fresher, and matte look. Enriched with Activated Charcoal, this 3-Action Formula deeply purifies acne-prone skin, controls excess sebum, and leaves skin feeling exceptionally fresh, smooth, and healthy.',
    benefits:[
      'Deep Pore Cleansing — Activated Charcoal pulls out deeply embedded dirt, pollution, and impurities',
      'Oil & Sebum Control — regulates excess oil production to keep skin fresh, matte, and shine-free all day',
      'Skin Refreshment — instantly revitalizes tired skin with a cooling sensation and healthy glow',
      'Acne Prevention — gently cleanses acne-prone skin to reduce breakouts from clogged pores'
    ],
    use:[
      'Wet your face thoroughly with lukewarm or cold water.',
      'Apply a small amount of face wash onto your fingertips.',
      'Gently massage in circular motions over your face for 30–60 seconds.',
      'Rinse thoroughly with clean water.',
      'Pat dry with a soft towel. Use twice daily for best results.'
    ],
    ingredients:'Aqua, Stearic Acid, Glycerin, Potassium Hydroxide, Cocamidopropyl Betaine, Myristic Acid, Lauric Acid, Propylene Glycol, Sodium Laureth Sulfate, Palmitic Acid, PEG-150 Distearate, Glyceryl Stearate, Glycol Distearate, Ceteareth-18, Alpha-Olefin Sulfonate, Acrylate Copolymer, Cocamide DEA, Sodium Cocoyl Isethionate, Phenoxyethanol, Parfum, Charcoal Powder, Methylparaben, Ethylparaben, Propylparaben, Butylparaben, Menthol, Disodium EDTA.',
    details:'120 ml / 4.05 fl. oz. · Key Ingredients: Activated Charcoal Powder, Menthol · Best for: Oily & Combination Skin'
  },
  {
    id:'orange', name:'Whitish Orange Cleanser', category:'Deep Cleansers', file:'Orange',
    price:1499, discount:24, kind:'cleanser',
    intro:'Whitish Orange Cleanser (with Vitamin C & Hyaluronic Acid) ek purifying formula hai jo skin se dirt, excess oil aur impurities gently saaf karne ke liye banaya gaya hai.',
    benefits:['Purifying cleanser for everyday dirt and oil','Vitamin C for a radiant-looking finish','Hyaluronic acid for a hydrated feel','Refreshing cleansing routine']
  },
  {
    id:'apricot', name:'Whitish Apricot Scrub', category:'Deep Cleansers', file:'Apricot',
    price:1499, discount:15, kind:'cleanser',
    intro:'An exfoliating scrub from the Whitish cleansing collection. Use gently and follow the directions and precautions on the packaging.',
    benefits:['Exfoliating skincare step','Avoid use on irritated or broken skin','Confirm the complete ingredients on the label']
  },
  {
    id:'avocado', name:'Whitish Avocado Massage Cream', category:'Masks & Massages', file:'Avocado',
    price:1499, discount:28, kind:'mask',
    intro:'Whitish Avocado Massage Cream (with Vitamin A & Avocado Oil) ek moisturizing skincare cream hai jo massage ke dauran aaram-deh experience aur skin ko soft, supple feel dene ke liye banayi gayi hai.',
    benefits:['Hydrating massage cream','Avocado oil for a nourished feel','Vitamin A highlighted in the description','Designed for soft, supple-looking skin']
  },
  {
    id:'strawberry', name:'Whitish Strawberry Mask', category:'Masks & Massages', file:'Strawberry',
    price:1499, discount:21, kind:'mask',
    intro:'Whitish Strawberry Mask (with Vitamin E & Strawberry Extract) ek nourishing face mask hai jo skin ko fresh, soft aur smooth feel dene ke liye banaya gaya hai.',
    benefits:['Nourishing glow-mask experience','Helps remove surface impurities','Contains strawberry extract and vitamin E','Designed for a refreshed, smooth-looking complexion']
  },
  {
    id:'fruity', name:'Whitish Fruity Skin Polish', category:'Masks & Massages', file:'Fruity',
    price:1499, discount:23, kind:'mask',
    intro:'Whitish Fruity Skin Polish (with Vitamin B5 & Glycolic Acid) ek exfoliating skincare product hai jo surface dead skin cells aur impurities ko gently remove karne ke liye design kiya gaya hai.',
    benefits:['Exfoliating skincare formula','Glycolic acid and mixed fruit extracts','Vitamin B5 for a moisturizing feel','Designed for smoother-looking skin']
  }
];

// ── PRODUCT IMAGE MAP ─────────────────────────────────────────────────────────
const productImages = {
  'kit'         : 'kit.jpeg',
  'hydra-glow'  : 'hydra.jpeg',
  'glutathione' : 'glutathione.jpeg',
  'kojic-acid'  : 'kojic.jpeg',
  'korean-glass': 'korean.jpeg',
  'orange'      : 'orange.jpeg',
  'apricot'     : 'apricot.jpeg',
  'avocado'     : 'avocado.jpeg',
  'strawberry'  : 'strawberry.jpeg',
  'fruity'      : 'fruity.jpeg',
  'cool'        : 'cool.jpeg',
  'charcoal'    : 'charcoal.jpeg'
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
const $ = s => document.querySelector(s);
const money = n => 'Rs. ' + n.toLocaleString('en-PK');

let cart = {};
try { cart = JSON.parse(localStorage.getItem('whitish_cart') || '{}'); } catch(e) { cart = {}; }

let activeCategory = 'All', searchTerm = '', detailQty = 1,
    slideIndex = 0, slideInterval, toastTimer;

function originalPrice(p) { return Math.ceil(p.price / (1 - p.discount / 100)); }

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g,
    c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function picture(p, css = '') {
  const src = productImages[p.id] || fallbackImages[p.kind];
  return `<img ${css} src="${src}" alt="${escapeHtml(p.name)}" loading="lazy"
    onerror="this.onerror=null;this.src='${fallbackImages[p.kind]}'">`;
}

// ── PRODUCT RENDERING ─────────────────────────────────────────────────────────
function productCard(p) {
  return `<article class="product-card">
    <div class="product-img">
      <a href="#product/${p.id}" aria-label="View ${escapeHtml(p.name)}">${picture(p)}</a>
      <span class="discount-tag">${p.discount}% OFF</span>
      <button class="quick-add" type="button" data-add="${p.id}">+ Add to bag</button>
    </div>
    <div class="product-meta">
      <span class="product-category">${p.category}</span>
      <a href="#product/${p.id}" class="product-title">${escapeHtml(p.name)}</a>
      <span class="price">${money(p.price)}</span>
      <span class="compare">${money(originalPrice(p))}</span>
    </div>
  </article>`;
}

function renderProducts() {
  const shown = products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm)
  );
  $('#productGrid').innerHTML = shown.map(productCard).join('');
  $('#emptyProducts').hidden = shown.length > 0;
  document.querySelectorAll('#filterTabs button').forEach(b =>
    b.classList.toggle('active', b.dataset.category === activeCategory)
  );
}

// ── CART ──────────────────────────────────────────────────────────────────────
function saveCart() { localStorage.setItem('whitish_cart', JSON.stringify(cart)); renderCart(); }

function addToCart(id, qty = 1) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  cart[id] = (cart[id] || 0) + qty;
  saveCart();
  toast(p.name + ' added to your bag');
  openCart();
}

function updateQty(id, d) {
  cart[id] = Math.max(0, (cart[id] || 0) + d);
  if (!cart[id]) delete cart[id];
  saveCart();
}

function renderCart() {
  const entries = Object.entries(cart)
    .filter(([id, q]) => products.some(p => p.id === id) && q > 0);
  const count = entries.reduce((s, [, q]) => s + q, 0);
  const total = entries.reduce((s, [id, q]) =>
    s + products.find(p => p.id === id).price * q, 0);

  $('#cartCount').textContent   = count;
  $('#bagCount').textContent    = '(' + count + ')';
  $('#cartSubtotal').textContent = money(total);
  $('#checkoutBtn').disabled    = !count;

  $('#cartItems').innerHTML = entries.length
    ? entries.map(([id, q]) => {
        const p = products.find(x => x.id === id);
        return `<div class="cart-item">${picture(p)}
          <div class="cart-item-info">
            <h4>${escapeHtml(p.name)}</h4>
            <p>${money(p.price * q)}</p>
            <div class="qty-control">
              <button data-minus="${id}" aria-label="Remove one">−</button>
              <span>${q}</span>
              <button data-plus="${id}" aria-label="Add one">+</button>
              <button class="remove-item" data-remove="${id}">Remove</button>
            </div>
          </div>
        </div>`;
      }).join('')
    : '<div class="cart-empty"><div>♡</div><h3>Your bag is empty</h3><p>Good things are waiting in the shop.</p></div>';
}

function openCart() {
  $('#overlay').hidden = false;
  $('#cartDrawer').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#closeCart').focus();
}

function closeCart() {
  $('#overlay').hidden = true;
  $('#cartDrawer').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function toast(s) {
  const el = $('#toast');
  el.textContent = s;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2700);
}

// ── ORDER FORM ────────────────────────────────────────────────────────────────
function openOrderModal() {
  const entries = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ p: products.find(p => p.id === id), q }))
    .filter(x => x.p);
  if (!entries.length) return;

  const subtotal = entries.reduce((s, {p, q}) => s + p.price * q, 0);

  $('#modalOrderSummary').innerHTML = `
    <div class="modal-items">
      ${entries.map(({p, q}) => `
        <div class="modal-item">
          <span class="modal-item-name">${escapeHtml(p.name)} × ${q}</span>
          <span class="modal-item-price">${money(p.price * q)}</span>
        </div>`).join('')}
    </div>`;

  $('#formTotal').innerHTML = `<span>Order Total</span><strong>${money(subtotal)}</strong>`;

  // Reset payment selection
  document.querySelectorAll('.payment-option').forEach(b => b.classList.remove('selected'));
  $('#paymentError').hidden = true;

  closeCart();
  $('#orderModalBackdrop').hidden = false;
  document.body.style.overflow = 'hidden';
  $('#custName').focus();
}

function closeOrderModal() {
  $('#orderModalBackdrop').hidden = true;
  document.body.style.overflow = '';
  $('#orderForm').reset();
  document.querySelectorAll('.payment-option').forEach(b => b.classList.remove('selected'));
  $('#paymentError').hidden = true;
}

function generateOrderId() {
  return 'WT-' + Date.now().toString(36).toUpperCase();
}

// ── PAYMENT SELECTION ─────────────────────────────────────────────────────────
let selectedPayment = '';

document.addEventListener('click', e => {
  const opt = e.target.closest('.payment-option');
  if (opt) {
    document.querySelectorAll('.payment-option').forEach(b => b.classList.remove('selected'));
    opt.classList.add('selected');
    selectedPayment = opt.dataset.payment;
    $('#paymentError').hidden = true;
  }
});

// ── SUBMIT ORDER ──────────────────────────────────────────────────────────────
async function submitOrder(e) {
  e.preventDefault();

  const name    = $('#custName').value.trim();
  const phone   = $('#custPhone').value.trim();
  const address = $('#custAddress').value.trim();

  if (!name || !phone || !address) {
    toast('Please fill in all required fields.');
    return;
  }

  // Payment method validation
  if (!selectedPayment) {
    $('#paymentError').hidden = false;
    $('#paymentError').scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const entries = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([id, q]) => ({ p: products.find(p => p.id === id), q }))
    .filter(x => x.p);

  const productNames = entries.map(({p, q}) => `${p.name} x${q}`).join(', ');
  const quantities   = entries.map(({p, q}) => `${p.name}: ${q}`).join(', ');
  const total        = entries.reduce((s, {p, q}) => s + p.price * q, 0);
  const orderId      = generateOrderId();
  const orderDate    = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

  const payload = {
    orderId, orderDate, name, phone, address,
    products: productNames, quantities,
    total  : money(total),
    payment: selectedPayment,
    status : 'Pending'
  };

  const btn = $('#submitOrderBtn');
  btn.disabled    = true;
  btn.textContent = 'Placing order…';

  try {
    await fetch(SHEET_URL, {
      method : 'POST',
      mode   : 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(payload)
    });
  } catch(err) {
    console.log('Order submitted (no-cors):', err.message);
  }

  cart = {};
  selectedPayment = '';
  saveCart();
  closeOrderModal();
  showThankyou(orderId, name, selectedPayment);

  btn.disabled    = false;
  btn.textContent = 'Confirm Order ✦';
}

function showThankyou(orderId, name) {
  $('#thankyouRef').innerHTML = `
    <p>Order ID: <strong>${orderId}</strong></p>
    <p>Name: <strong>${escapeHtml(name)}</strong></p>
    <p>Payment: <strong>Cash on Delivery (COD)</strong></p>`;
  $('#thankyouModalBackdrop').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeThankyou() {
  $('#thankyouModalBackdrop').hidden = true;
  document.body.style.overflow = '';
}

// ── PRODUCT DETAIL VIEW ───────────────────────────────────────────────────────
function listBlock(items, ordered = false) {
  return items?.length
    ? `<${ordered?'ol':'ul'}>${items.map(i=>`<li>${escapeHtml(i)}</li>`).join('')}</${ordered?'ol':'ul'}>`
    : '';
}

function detailView(p) {
  const related = (() => {
    let r = products.filter(x => x.id !== p.id && x.category === p.category).slice(0, 4);
    if (r.length < 4)
      r = [...r, ...products.filter(x => x.id !== p.id && !r.includes(x)).slice(0, 4 - r.length)];
    return r;
  })();

  return `<div class="product-detail">
    <div class="breadcrumbs">
      <a href="#home">Home</a> /
      <a href="#shop?category=${encodeURIComponent(p.category)}">${escapeHtml(p.category)}</a> /
      ${escapeHtml(p.name)}
    </div>
    <div class="detail-main">
      <div class="detail-photo">${picture(p)}<span class="discount-tag">${p.discount}% OFF</span></div>
      <div class="detail-info">
        <span class="eyebrow purple">WHITISH SKINCARE · ${escapeHtml(p.category.toUpperCase())}</span>
        <h1>${escapeHtml(p.name)}</h1>
        <div class="detail-price">
          ${money(p.price)} <del>${money(originalPrice(p))}</del>
          <span class="detail-badge">${p.discount}% OFF</span>
        </div>
        <p class="detail-intro">${escapeHtml(p.intro)}</p>
        <div class="detail-purchase">
          <div class="detail-qty">
            <button id="detailMinus" aria-label="Decrease quantity">−</button>
            <span id="detailCount">${detailQty}</span>
            <button id="detailPlus" aria-label="Increase quantity">+</button>
          </div>
          <button id="detailAdd" class="btn btn-dark detail-add">Add to bag +</button>
        </div>
        <p class="detail-notes">Fill in your details at checkout. Delivery and payment confirmed separately.</p>
        <div class="detail-tabs">
          <details open><summary>Key benefits</summary>${listBlock(p.benefits)}</details>
          <details><summary>How to use</summary>${p.use
            ? listBlock(p.use, true)
            : '<p>Use only as directed on the product packaging. Patch-test first.</p>'
          }</details>
          <details><summary>Ingredients & product details</summary>
            <p>${p.ingredients
              ? escapeHtml(p.ingredients)
              : 'Full ingredients list not yet provided. Please contact us before ordering.'
            }</p>
            ${p.details ? `<p>${escapeHtml(p.details)}</p>` : ''}
          </details>
          <details><summary>Care & precautions</summary>
            <p>Read the label carefully. Patch-test before use; avoid contact with eyes and do not use on irritated or broken skin. Discontinue if irritation occurs. Results vary.</p>
          </details>
        </div>
      </div>
    </div>
    <h2 class="related-title">You may also love</h2>
    <div class="related-grid">${related.map(productCard).join('')}</div>
  </div>`;
}

// ── ROUTING ───────────────────────────────────────────────────────────────────
function route() {
  const hash  = decodeURIComponent(location.hash || '#home');
  const match = hash.match(/^#product\/([^?]+)/);
  closeCart();

  if (match) {
    const p = products.find(x => x.id === match[1]);
    if (!p) { location.hash = '#shop'; return; }
    detailQty = 1;
    $('#homeView').hidden   = true;
    $('#productView').hidden = false;
    $('#productView').innerHTML = detailView(p);
    window.scrollTo(0, 0);
    return;
  }

  $('#homeView').hidden   = false;
  $('#productView').hidden = true;

  const cat = hash.match(/^#shop\?category=(.*)$/);
  if (cat) {
    activeCategory = cat[1]; searchTerm = '';
    $('#productSearch').value = '';
    renderProducts();
    setTimeout(() => $('#shop').scrollIntoView(), 35);
  } else if (hash.startsWith('#shop')) {
    activeCategory = 'All';
    renderProducts();
    setTimeout(() => $('#shop').scrollIntoView(), 35);
  } else {
    const dest = document.getElementById(hash.slice(1));
    if (dest) setTimeout(() => dest.scrollIntoView(), 35);
  }
}

// ── HERO SLIDER ───────────────────────────────────────────────────────────────
function goSlide(i) {
  const slides = [...document.querySelectorAll('.hero-slide')];
  slideIndex = (i + slides.length) % slides.length;
  slides.forEach((s, j) => s.classList.toggle('active', j === slideIndex));
  [...$('#heroDots').children].forEach((d, j) => d.classList.toggle('active', j === slideIndex));
}
function restartSlider() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => goSlide(slideIndex + 1), 5500);
}

// ── EVENT LISTENERS ───────────────────────────────────────────────────────────
document.addEventListener('click', e => {
  const add = e.target.closest('[data-add]');
  if (add) { e.preventDefault(); addToCart(add.dataset.add); return; }

  const plus = e.target.closest('[data-plus]');
  if (plus) { updateQty(plus.dataset.plus, 1); return; }

  const minus = e.target.closest('[data-minus]');
  if (minus) { updateQty(minus.dataset.minus, -1); return; }

  const remove = e.target.closest('[data-remove]');
  if (remove) { delete cart[remove.dataset.remove]; saveCart(); return; }

  if (e.target.id === 'detailMinus' || e.target.id === 'detailPlus') {
    detailQty = Math.max(1, detailQty + (e.target.id === 'detailPlus' ? 1 : -1));
    $('#detailCount').textContent = detailQty;
    return;
  }
  if (e.target.id === 'detailAdd') {
    const id = location.hash.split('/')[1];
    addToCart(id, detailQty);
  }
  if (e.target.closest('#mainNav a')) $('#mainNav').classList.remove('open');
});

$('#cartBtn').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#overlay').addEventListener('click', closeCart);
$('#continueShopping').addEventListener('click', closeCart);
$('#checkoutBtn').addEventListener('click', openOrderModal);
$('#kitAddBtn').addEventListener('click', () => addToCart('kit'));
$('#kitDetailBtn').addEventListener('click', () => location.hash = '#product/kit');
$('#menuBtn').addEventListener('click', () => $('#mainNav').classList.toggle('open'));
$('#searchBtn').addEventListener('click', () => {
  location.hash = '#shop';
  setTimeout(() => $('#productSearch').focus(), 70);
});
$('#productSearch').addEventListener('input', e => {
  searchTerm = e.target.value.toLowerCase().trim();
  renderProducts();
});
$('#filterTabs').addEventListener('click', e => {
  const b = e.target.closest('[data-category]');
  if (!b) return;
  activeCategory = b.dataset.category;
  renderProducts();
});
$('#heroDots').addEventListener('click', e => {
  const i = [...$('#heroDots').children].indexOf(e.target);
  if (i < 0) return;
  goSlide(i); restartSlider();
});
$('#prevSlide').addEventListener('click', () => { goSlide(slideIndex - 1); restartSlider(); });
$('#nextSlide').addEventListener('click', () => { goSlide(slideIndex + 1); restartSlider(); });
$('#closeOrderModal').addEventListener('click', closeOrderModal);
$('#orderModalBackdrop').addEventListener('click', e => {
  if (e.target === $('#orderModalBackdrop')) closeOrderModal();
});
$('#orderForm').addEventListener('submit', submitOrder);
$('#closeThankyou').addEventListener('click', closeThankyou);
$('#thankyouModalBackdrop').addEventListener('click', e => {
  if (e.target === $('#thankyouModalBackdrop')) closeThankyou();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeCart(); closeOrderModal(); closeThankyou(); }
});

// ── MARQUEE ───────────────────────────────────────────────────────────────────
const words = ['Hydra Glow','Glutathione','Korean Glass','Avocado','Apricot',
               'Fruity','Orange','Strawberry','Kojic Acid','Cool Mint','Charcoal'];
$('#marqueeTrack').innerHTML = Array.from({length: 2}, () =>
  words.map(w => `<span class="marquee-item">${w}</span><span class="marquee-star">✦</span>`).join('')
).join('');

$('#year').textContent = new Date().getFullYear();
renderProducts();
renderCart();
route();
window.addEventListener('hashchange', route);
restartSlider();
