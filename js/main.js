/* ============================================================
   TET - Transgender Empowerment Trust — site interactivity
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header shrink/shadow ---------- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector('.menu-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mainNav.classList.remove('open'); });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cIo.observe(el); });
  }

  /* ---------- Accessibility toolbar ---------- */
  var root = document.documentElement;
  var savedFont = localStorage.getItem('tet-font');
  if (savedFont) root.classList.add(savedFont);
  if (localStorage.getItem('tet-contrast') === '1') root.classList.add('high-contrast');

  document.querySelectorAll('[data-font]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      root.classList.remove('font-lg', 'font-xl');
      var size = btn.getAttribute('data-font');
      if (size !== 'base') { root.classList.add(size); localStorage.setItem('tet-font', size); }
      else { localStorage.removeItem('tet-font'); }
    });
  });
  document.querySelectorAll('[data-contrast]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      root.classList.toggle('high-contrast');
      localStorage.setItem('tet-contrast', root.classList.contains('high-contrast') ? '1' : '0');
      btn.classList.toggle('active');
    });
  });

  /* ---------- Testimonial carousel ---------- */
  var slides = document.querySelectorAll('.testi-slide');
  var dots = document.querySelectorAll('.testi-dots span');
  var tIndex = 0;
  function showSlide(i) {
    if (!slides.length) return;
    tIndex = (i + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle('active', idx === tIndex); });
    dots.forEach(function (d, idx) { d.classList.toggle('active', idx === tIndex); });
  }
  var prevBtn = document.querySelector('.testi-prev');
  var nextBtn = document.querySelector('.testi-next');
  if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(tIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(tIndex + 1); });
  dots.forEach(function (d, idx) { d.addEventListener('click', function () { showSlide(idx); }); });
  if (slides.length) {
    showSlide(0);
    setInterval(function () { showSlide(tIndex + 1); }, 6500);
  }

  /* ---------- Newsletter / contact / volunteer forms (no backend) ---------- */
  document.querySelectorAll('form[data-fake-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      if (msg) {
        msg.textContent = form.getAttribute('data-success') || 'Thank you — we received your message.';
        msg.classList.add('ok');
      }
      form.reset();
    });
  });

  /* ================= SHOP / CART ================= */
  var CART_KEY = 'tet-cart';
  function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
  function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

  function renderCart() {
    var cart = getCart();
    var countEl = document.querySelector('.cart-count');
    var totalCount = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    if (countEl) countEl.textContent = totalCount;

    var body = document.querySelector('.cart-drawer-body');
    var footTotal = document.querySelector('.cart-total-amount');
    if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Browse the shop to support TET.</div>';
    } else {
      body.innerHTML = cart.map(function (item, idx) {
        return '<div class="cart-item">' +
          '<div class="cart-item-thumb">' + item.icon + '</div>' +
          '<div class="cart-item-info"><strong>' + item.name + '</strong><span>Qty ' + item.qty + ' &times; Rs. ' + item.price + '</span></div>' +
          '<button class="cart-remove" data-idx="' + idx + '">Remove</button>' +
          '</div>';
      }).join('');
    }
    var total = cart.reduce(function (s, i) { return s + i.qty * i.price; }, 0);
    if (footTotal) footTotal.textContent = 'Rs. ' + total.toLocaleString();

    body.querySelectorAll('.cart-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cart2 = getCart();
        cart2.splice(parseInt(btn.getAttribute('data-idx'), 10), 1);
        saveCart(cart2);
        renderCart();
      });
    });
  }

  document.querySelectorAll('.add-cart-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cart = getCart();
      var name = btn.getAttribute('data-name');
      var price = parseFloat(btn.getAttribute('data-price'));
      var icon = btn.getAttribute('data-icon') || '👜';
      var existing = cart.find(function (i) { return i.name === name; });
      if (existing) existing.qty += 1;
      else cart.push({ name: name, price: price, icon: icon, qty: 1 });
      saveCart(cart);
      renderCart();
      btn.classList.add('added');
      var old = btn.textContent;
      btn.textContent = 'Added ✓';
      setTimeout(function () { btn.classList.remove('added'); btn.textContent = old; }, 1200);
      openCart();
    });
  });

  var cartDrawer = document.querySelector('.cart-drawer');
  var cartOverlay = document.querySelector('.cart-overlay');
  function openCart() { if (cartDrawer) { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); } }
  function closeCart() { if (cartDrawer) { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); } }
  var cartFab = document.querySelector('.cart-fab');
  if (cartFab) cartFab.addEventListener('click', openCart);
  var cartClose = document.querySelector('.cart-close');
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  var checkoutBtn = document.querySelector('.cart-checkout');
  if (checkoutBtn) checkoutBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!getCart().length) return;
    alert('This is a demo storefront — checkout is not connected to a payment processor yet. Wire this button to Stripe, PayPal, or your preferred gateway to go live.');
  });
  renderCart();

  /* Shop filter chips */
  document.querySelectorAll('.filter-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var cat = chip.getAttribute('data-cat');
      document.querySelectorAll('[data-cat-item]').forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-cat-item') === cat;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ================= DONATE ================= */
  var freqButtons = document.querySelectorAll('.toggle-switch button');
  var amountBtns = document.querySelectorAll('.amount-btn');
  var customInput = document.querySelector('.custom-amount input');
  var freqSuffixEls = document.querySelectorAll('.freq-suffix');
  var currentFreq = 'once';

  freqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      freqButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFreq = btn.getAttribute('data-freq');
      freqSuffixEls.forEach(function (el) { el.textContent = currentFreq === 'monthly' ? '/month' : ''; });
    });
  });
  amountBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      amountBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (customInput) customInput.value = '';
    });
  });
  if (customInput) {
    customInput.addEventListener('input', function () {
      if (customInput.value) amountBtns.forEach(function (b) { b.classList.remove('active'); });
    });
  }
  var donateForm = document.querySelector('.donate-card form');
  if (donateForm) {
    donateForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var active = document.querySelector('.amount-btn.active');
      var amount = customInput && customInput.value ? customInput.value : (active ? active.getAttribute('data-amount') : '0');
      var msg = donateForm.querySelector('.form-msg');
      if (msg) {
        msg.textContent = 'Thank you for choosing to give Rs. ' + amount + (currentFreq === 'monthly' ? '/month' : '') + '. This demo form is not yet connected to a payment processor — wire it to Stripe/PayPal to accept real donations.';
        msg.classList.add('ok');
      }
    });
  }

  /* Progress bar fill on scroll into view */
  var fillBars = document.querySelectorAll('.progress-bar-fill');
  if ('IntersectionObserver' in window && fillBars.length) {
    var pIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-target') + '%';
          pIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    fillBars.forEach(function (b) { pIo.observe(b); });
  }

});
