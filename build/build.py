# -*- coding: utf-8 -*-
import os

OUT = "/sessions/admiring-zealous-meitner/mnt/outputs"

ORG_SHORT = "TET"
ORG_FULL = "Transgender Empowerment Trust"
ORG_TAGLINE = "Trans Female Sex Workers Community Services"
PHONE = "+94 11 234 5678"
HOTLINE = "+94 77 000 1234"
EMAIL = "support@tet-srilanka.org"
ADDRESS_L1 = "42 Independence Avenue"
ADDRESS_L2 = "Colombo 05, Sri Lanka"
WHATSAPP = "94770001234"

NAV_ITEMS = [
    ("index.html", "Home"),
    ("about.html", "About"),
    ("services.html", "Services"),
    ("resources.html", "Resources"),
    ("events.html", "Events"),
    ("shop.html", "Shop"),
    ("volunteer.html", "Volunteer"),
    ("donate.html", "Donate"),
    ("contact.html", "Contact"),
]

def head(title, desc):
    return f"""<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} | {ORG_SHORT}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%235BCEFA'/%3E%3Cstop offset='1' stop-color='%23D6336C'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='url(%23g)'/%3E%3Ctext x='50' y='64' font-size='42' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'%3ET%3C/text%3E%3C/svg%3E">
</head>"""

def access_bar():
    return f"""<div class="access-bar">
  <div class="container">
    <span style="margin-right:auto; opacity:.8;">Accessibility:</span>
    <button class="access-btn" data-font="base" title="Reset text size">A-</button>
    <button class="access-btn" data-font="font-lg" title="Larger text">A</button>
    <button class="access-btn" data-font="font-xl" title="Largest text">A+</button>
    <button class="access-btn wide" data-contrast title="Toggle high contrast">High Contrast</button>
  </div>
</div>"""

def header(active):
    links = []
    for href, label in NAV_ITEMS:
        cls = " active" if href == active else ""
        links.append(f'<a href="{href}" class="nav-link{cls}">{label}</a>')
    links_html = "\n      ".join(links)
    return f"""<header class="site-header">
  {access_bar()}
  <div class="container nav-wrap">
    <a href="index.html" class="brand">
      <span class="brand-mark">TET</span>
      <span>{ORG_SHORT}<small>{ORG_FULL}</small></span>
    </a>
    <nav class="main-nav">
      {links_html}
    </nav>
    <div class="nav-cta">
      <button class="menu-toggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
      <a href="donate.html" class="btn btn-primary btn-sm">Donate</a>
    </div>
  </div>
</header>"""

def cart_drawer():
    return """<div class="cart-overlay"></div>
<div class="cart-drawer">
  <div class="cart-drawer-head">
    <h3>Your Cart</h3>
    <button class="cart-close" aria-label="Close cart">&times;</button>
  </div>
  <div class="cart-drawer-body"></div>
  <div class="cart-drawer-foot">
    <div class="cart-total-row"><span>Total</span><span class="cart-total-amount">Rs. 0</span></div>
    <a href="#" class="btn btn-primary btn-block cart-checkout">Checkout</a>
    <p class="field-hint center" style="margin-top:10px;">All proceeds support TET programs. Demo storefront — no live payments yet.</p>
  </div>
</div>
<a href="shop.html" class="cart-fab" aria-label="View cart">🛍<span class="cart-count">0</span></a>"""

def footer():
    cols = "\n      ".join([f'<li><a href="{h}">{l}</a></li>' for h, l in NAV_ITEMS if h not in ("index.html",)])
    return f"""<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="brand"><span class="brand-mark">TET</span><span>{ORG_SHORT}</span></a>
        <p>{ORG_FULL} is a trans-led community organization supporting trans female sex workers across Sri Lanka with healthcare, legal aid, and peer solidarity since 2016.</p>
        <div class="social-row">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">◎</a>
          <a href="#" aria-label="Twitter/X">𝕏</a>
          <a href="https://wa.me/{WHATSAPP}" aria-label="WhatsApp">☎</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="shop.html">Shop</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Get Involved</h4>
        <ul>
          <li><a href="events.html">Events</a></li>
          <li><a href="volunteer.html">Volunteer</a></li>
          <li><a href="donate.html">Donate</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul class="footer-contact">
          <li>📍 {ADDRESS_L1}, {ADDRESS_L2}</li>
          <li>📞 {PHONE}</li>
          <li>✉ {EMAIL}</li>
          <li>🆘 24/7 Crisis Line: {HOTLINE}</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 {ORG_SHORT}. All rights reserved. Trans-led. Confidential. Judgment-free.</span>
      <span><a href="contact.html">Privacy Policy</a> &middot; <a href="contact.html">Terms of Use</a></span>
    </div>
  </div>
</footer>"""

def page(title, desc, active, body, extra_class=""):
    return f"""<!DOCTYPE html>
<html lang="en">
{head(title, desc)}
<body class="{extra_class}">
<a href="#main-content" class="skip-link">Skip to content</a>
{header(active)}
<main id="main-content">
{body}
</main>
{footer()}
{cart_drawer()}
<script src="js/main.js"></script>
</body>
</html>"""

def write(fname, html):
    with open(os.path.join(OUT, fname), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", fname, len(html), "bytes")


# ============================================================
# HOME PAGE
# ============================================================
home_body = f"""
<section class="hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div><div class="blob blob-3"></div></div>
  <div class="container hero-grid">
    <div>
      <span class="hero-badge reveal">🏳️‍⚧️ Free &middot; Confidential &middot; Trans-Led</span>
      <h1 class="reveal d1">Health, Safety &amp; Dignity for <span class="accent">Trans Women</span> in Sex Work</h1>
      <p class="hero-lede reveal d2">{ORG_SHORT} is a trans-led community organization providing free healthcare navigation, legal support, and peer solidarity for trans female sex workers across Sri Lanka.</p>
      <div class="hero-actions reveal d3">
        <a href="contact.html" class="btn btn-primary">❤ Get Support</a>
        <a href="#who" class="btn btn-outline">Learn More →</a>
      </div>
      <div class="hero-points reveal d4">
        <div class="hero-point"><span class="ic">🔒</span> Confidential &amp; judgment-free, always</div>
        <div class="hero-point"><span class="ic">🏳️‍⚧️</span> Led by trans women, for trans women</div>
        <div class="hero-point"><span class="ic">〰</span> Free services — no cost, no barriers</div>
        <div class="hero-point"><span class="ic">🤝</span> Rooted in community trust</div>
      </div>
      <div class="trust-strip reveal d5">
        <div class="trust-item">📍 6 outreach sites</div>
        <div class="trust-item">🏥 9 partner clinics</div>
        <div class="trust-item">🗺 3 provinces served</div>
      </div>
    </div>
    <div class="hero-visual reveal-right">
      <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
      <div class="hero-stat-float f1"><strong>1,200+</strong><span>Women Supported</span></div>
      <div class="hero-stat-float f2"><strong>24/7</strong><span>Crisis Hotline</span></div>
      <div class="hero-visual-card">
        <strong>"A community that finally sees me."</strong>
        <span style="opacity:.85; font-size:.85rem;">— TET peer program member</span>
      </div>
    </div>
  </div>
  <a href="#who" class="scroll-cue"><span class="dot-track"></span>Scroll to explore ⌄</a>
</section>

<section id="who">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Who We Are</span>
      <h2>Community-led support grounded in dignity and trust</h2>
      <p>{ORG_FULL} ({ORG_SHORT}) is a trans-led, community-based organization founded by and for trans women engaged in sex work. Registered as a non-profit in 2016, we work at the intersection of gender identity and sex worker rights — providing healthcare navigation, harm reduction, legal aid, and peer support so every member of our community can access care without discrimination and build a life on her own terms.</p>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Impact</span>
      <h2>Measured progress that reflects community priorities</h2>
    </div>
    <div class="stats-grid">
      <div class="stat-card reveal-scale d1"><div class="stat-num" data-count="1200" data-suffix="+">0</div><div class="stat-label">Community Members Supported</div></div>
      <div class="stat-card reveal-scale d2"><div class="stat-num" data-count="3400" data-suffix="+">0</div><div class="stat-label">Health &amp; HIV Screenings</div></div>
      <div class="stat-card reveal-scale d3"><div class="stat-num" data-count="180" data-suffix="+">0</div><div class="stat-label">Legal Cases Supported</div></div>
      <div class="stat-card reveal-scale d4"><div class="stat-num" data-count="2600" data-suffix="+">0</div><div class="stat-label">Peer Counselling Sessions</div></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Our Services</span>
      <h2>Integrated services that address health, safety, and opportunity</h2>
    </div>
    <div class="grid-3">
      <div class="service-card reveal d1"><div class="service-icon"><img src="images/illus-healthcare.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Healthcare Navigation</h3><p>Referrals and escorted visits to trans-friendly clinics for general and gender-affirming care, without judgment.</p><a href="services.html" class="more">Learn more →</a></div>
      <div class="service-card reveal d2"><div class="service-icon"><img src="images/illus-hiv.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>HIV &amp; STI Prevention</h3><p>Free confidential testing, PrEP/PEP navigation, and condom &amp; lubricant distribution.</p><a href="services.html" class="more">Learn more →</a></div>
      <div class="service-card reveal d3"><div class="service-icon"><img src="images/illus-counseling.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Mental Health &amp; Peer Counselling</h3><p>One-on-one and group counselling delivered by peer counsellors who share lived experience.</p><a href="services.html" class="more">Learn more →</a></div>
      <div class="service-card reveal d4"><div class="service-icon"><img src="images/illus-legal.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Legal Aid &amp; Rights Defense</h3><p>Support responding to police harassment, violence, ID documentation, and workplace discrimination.</p><a href="services.html" class="more">Learn more →</a></div>
      <div class="service-card reveal d5"><div class="service-icon"><img src="images/illus-crisis.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Crisis &amp; Emergency Support</h3><p>24/7 hotline, emergency shelter referrals, and rapid response to violence or arrest.</p><a href="services.html" class="more">Learn more →</a></div>
      <div class="service-card reveal d6"><div class="service-icon"><img src="images/illus-economic.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1776562340826-9b7716dc1fe7?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Community &amp; Livelihood</h3><p>Peer-led savings groups, skills training, and safer-work planning for economic independence.</p><a href="services.html" class="more">Learn more →</a></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Our Initiatives</span>
      <h2>Featured programs</h2>
    </div>
    <div class="grid-4">
      <div class="initiative-card reveal d1" style="background-image:linear-gradient(180deg, rgba(11,95,165,.35), rgba(32,26,43,.82)), url('images/illus-initiative-outreach.svg')"><img class="photo-overlay" src="https://images.unsplash.com/photo-1650296388316-190565f0ce5b?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"><span class="tag">Outreach</span><h3>Safe Night Outreach</h3></div>
      <div class="initiative-card alt reveal d2" style="background-image:linear-gradient(180deg, rgba(11,95,165,.35), rgba(32,26,43,.82)), url('images/illus-initiative-legal.svg')"><img class="photo-overlay" src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"><span class="tag">Legal</span><h3>ID &amp; Legal Clinic</h3></div>
      <div class="initiative-card alt2 reveal d3" style="background-image:linear-gradient(180deg, rgba(11,95,165,.35), rgba(32,26,43,.82)), url('images/illus-initiative-peer.svg')"><img class="photo-overlay" src="https://images.unsplash.com/photo-1776562340826-9b7716dc1fe7?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"><span class="tag">Peer Support</span><h3>Peer Navigator Program</h3></div>
      <div class="initiative-card alt3 reveal d4" style="background-image:linear-gradient(180deg, rgba(11,95,165,.35), rgba(32,26,43,.82)), url('images/illus-initiative-economic.svg')"><img class="photo-overlay" src="https://images.unsplash.com/photo-1776562340826-9b7716dc1fe7?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"><span class="tag">Livelihood</span><h3>Economic Empowerment Fund</h3></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Community Voices</span>
      <h2>Stories from the center of our work</h2>
    </div>
    <div class="testi-wrap reveal">
      <div class="testi-slide active">
        <p class="testi-quote">"TET's outreach team treated me like a person, not a statistic. I finally got tested without fear of being judged."</p>
        <div class="testi-author">Peer program participant</div><div class="testi-role">Outreach client, Colombo</div>
      </div>
      <div class="testi-slide">
        <p class="testi-quote">"The legal clinic helped me update my ID. For the first time, my documents match who I am."</p>
        <div class="testi-author">Community member</div><div class="testi-role">Legal aid client</div>
      </div>
      <div class="testi-slide">
        <p class="testi-quote">"Having someone to call at 2am who understands what we go through — that saved my life."</p>
        <div class="testi-author">Hotline caller</div><div class="testi-role">Crisis support client</div>
      </div>
      <div class="testi-controls">
        <button class="testi-prev" aria-label="Previous">←</button>
        <button class="testi-next" aria-label="Next">→</button>
      </div>
      <div class="testi-dots"><span class="active"></span><span></span><span></span></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Latest News</span><h2>Updates from the field</h2></div>
    <div class="grid-2">
      <div class="news-card reveal d1"><div class="news-thumb" style="background-image:url('images/illus-outreach.svg')"></div><div class="card-body"><div class="card-date">05 Jul 2026</div><h3>Mobile health van expands to three new outreach points</h3><p>Late-night outreach now reaches more street-based workers with testing and supplies.</p></div></div>
      <div class="news-card reveal d2"><div class="news-thumb" style="background-image:url('images/illus-community.svg')"></div><div class="card-body"><div class="card-date">22 Jun 2026</div><h3>Peer navigators complete trauma-informed care training</h3><p>New graduates are strengthening accompaniment support at clinics and courts.</p></div></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Events</span><h2>Upcoming activities</h2></div>
    <div class="grid-2">
      <div class="event-card reveal d1"><div class="event-row"><div class="event-date-badge"><strong>19</strong><span>Jul</span></div><div><h3>Community Health &amp; HIV Testing Day</h3><p>Free, confidential testing and referrals in a welcoming space.</p><div class="event-meta"><span>📍 Colombo Outreach Centre</span><span>🕓 10am–4pm</span></div></div></div></div>
      <div class="event-card reveal d2"><div class="event-row"><div class="event-date-badge"><strong>27</strong><span>Jul</span></div><div><h3>Know Your Rights: Legal Literacy Workshop</h3><p>Practical guidance on ID documentation, policing, and safety planning.</p><div class="event-meta"><span>📍 TET Community Hall</span><span>🕓 2pm–5pm</span></div></div></div></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Partners</span><h2>Working with health, legal, and community organizations</h2></div>
    <div class="partners-row reveal">
      <span class="partner-chip">National STI/AIDS Program</span>
      <span class="partner-chip">Trans Health Alliance</span>
      <span class="partner-chip">Legal Aid Commission</span>
      <span class="partner-chip">Community Justice Network</span>
      <span class="partner-chip">Safe Harbour Shelter</span>
      <span class="partner-chip">Regional Health Bureau</span>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="cta-band reveal-scale">
      <div><h2>Help sustain healthcare, legal aid &amp; outreach</h2><p>Your support funds direct services, peer navigation, health education, and safe community spaces for trans women in sex work.</p></div>
      <div class="cta-actions">
        <a href="donate.html" class="btn btn-ghost-white">Make a Donation</a>
        <a href="volunteer.html" class="btn btn-ghost-white">Become a Volunteer</a>
      </div>
    </div>
  </div>
</section>

<section class="newsletter">
  <div class="container newsletter-inner">
    <div><h2>Stay informed about programs, events &amp; resources</h2></div>
    <div>
    <form class="newsletter-form" data-fake-submit data-success="Subscribed! Thank you for staying connected.">
      <input type="email" placeholder="Email address" required>
      <button class="btn btn-primary" type="submit">Subscribe</button>
    </form>
    <p class="form-msg" style="color:#C9C3D4;"></p>
    </div>
  </div>
</section>
"""
write("index.html", page("Home", f"{ORG_FULL} — {ORG_TAGLINE}. Free, confidential health, legal, and community support.", "index.html", home_body))

# ============================================================
# ABOUT PAGE
# ============================================================
about_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / About</div>
    <span class="eyebrow">About Us</span>
    <h1>Built by the community we serve</h1>
    <p>{ORG_SHORT} was founded in 2016 by a small group of trans women in sex work who were tired of navigating hostile clinics, unresponsive police, and services that were never designed with them in mind. A decade later, we're a trans-led team of outreach workers, peer counsellors, legal advocates, and volunteers.</p>
  </div>
</section>

<section>
  <div class="container grid-2">
    <div class="reveal-left">
      <span class="eyebrow">Our Mission</span>
      <h2>Health, safety, and dignity — on our own terms</h2>
      <p>We exist to improve access to healthcare, defend human rights, and strengthen community for trans women engaged in sex work in Sri Lanka — through services that are confidential, free, and led by people who understand the work firsthand.</p>
    </div>
    <div class="reveal-right">
      <span class="eyebrow">Our Vision</span>
      <h2>A future where dignity isn't conditional</h2>
      <p>We envision a Sri Lanka where trans women in sex work can access healthcare, justice, and opportunity without fear of discrimination, violence, or erasure — and where community-led organizations are trusted partners in public health and policy.</p>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Our Values</span><h2>What guides every program we run</h2></div>
    <div class="grid-3">
      <div class="service-card reveal d1"><div class="service-icon">🔒</div><h3>Confidentiality</h3><p>Every interaction is private. No one accesses our services without control over their own information.</p></div>
      <div class="service-card reveal d2"><div class="service-icon">🏳️‍⚧️</div><h3>Trans Leadership</h3><p>Our staff and peer educators are majority trans women — because lived experience is expertise.</p></div>
      <div class="service-card reveal d3"><div class="service-icon">🌱</div><h3>Harm Reduction</h3><p>We meet people where they are, without judgment, ultimatums, or conditions on care.</p></div>
      <div class="service-card reveal d4"><div class="service-icon">⚖</div><h3>Rights-Based</h3><p>Health and safety are rights, not privileges — we advocate accordingly, publicly and firmly.</p></div>
      <div class="service-card reveal d5"><div class="service-icon">🤝</div><h3>Solidarity</h3><p>We build peer networks so no member of our community has to navigate crisis alone.</p></div>
      <div class="service-card reveal d6"><div class="service-icon">🔎</div><h3>Accountability</h3><p>We report transparently to our community and funders on how resources are used.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Our Story</span><h2>Nearly a decade of community-led work</h2></div>
    <div class="grid-4">
      <div class="stat-card reveal d1"><h3>2016</h3><p style="font-size:.85rem; margin-top:8px;">Founded by five peer outreach volunteers operating from a rented room in Colombo.</p></div>
      <div class="stat-card reveal d2"><h3>2019</h3><p style="font-size:.85rem; margin-top:8px;">Registered as a non-profit; launched our first mobile health outreach van.</p></div>
      <div class="stat-card reveal d3"><h3>2022</h3><p style="font-size:.85rem; margin-top:8px;">Opened our ID &amp; Legal Clinic in partnership with the Legal Aid Commission.</p></div>
      <div class="stat-card reveal d4"><h3>2026</h3><p style="font-size:.85rem; margin-top:8px;">Serving 3 provinces with 6 outreach sites and a 24/7 crisis hotline.</p></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Our Team</span><h2>Peer leaders and advocates</h2></div>
    <div class="grid-4">
      <div class="service-card reveal d1 center"><div class="avatar-img"><img src="images/avatar-director.svg" alt=""></div><h3>Programme Director</h3><p>Oversees outreach, health partnerships, and organizational strategy.</p></div>
      <div class="service-card reveal d2 center"><div class="avatar-img"><img src="images/avatar-health.svg" alt=""></div><h3>Health Navigation Lead</h3><p>Coordinates clinic referrals and testing services.</p></div>
      <div class="service-card reveal d3 center"><div class="avatar-img"><img src="images/avatar-legal.svg" alt=""></div><h3>Legal Aid Coordinator</h3><p>Manages the ID &amp; Legal Clinic and rights defense casework.</p></div>
      <div class="service-card reveal d4 center"><div class="avatar-img"><img src="images/avatar-peer.svg" alt=""></div><h3>Peer Navigator Team</h3><p>Twelve trained peer navigators providing accompaniment and support.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="cta-band reveal-scale">
      <div><h2>Want to know more about our work?</h2><p>Read about our services or reach out directly — we're happy to talk.</p></div>
      <div class="cta-actions">
        <a href="services.html" class="btn btn-ghost-white">Our Services</a>
        <a href="contact.html" class="btn btn-ghost-white">Contact Us</a>
      </div>
    </div>
  </div>
</section>
"""
write("about.html", page("About", f"Learn about {ORG_FULL}, a trans-led organization supporting trans female sex workers in Sri Lanka.", "about.html", about_body))

# ============================================================
# SERVICES PAGE
# ============================================================
services_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Services</div>
    <span class="eyebrow">Our Services</span>
    <h1>Care that meets you where you are</h1>
    <p>Every {ORG_SHORT} service is free, confidential, and delivered by people who understand the realities of trans life and sex work. No appointment is required to start — just reach out.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="grid-3">
      <div class="service-card reveal d1"><div class="service-icon"><img src="images/illus-healthcare.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Healthcare Navigation</h3><p>Referrals and escorted visits to trans-friendly clinics for general checkups, hormone therapy support, and gender-affirming care — without judgment or misgendering.</p></div>
      <div class="service-card reveal d2"><div class="service-icon"><img src="images/illus-hiv.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>HIV &amp; STI Prevention</h3><p>Free, confidential testing, PrEP/PEP navigation and prescription support, and regular distribution of condoms and lubricant at outreach sites.</p></div>
      <div class="service-card reveal d3"><div class="service-icon"><img src="images/illus-counseling.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Mental Health &amp; Peer Counselling</h3><p>One-on-one and group counselling delivered by trained peer counsellors, plus referral to trauma-informed professional therapists when needed.</p></div>
      <div class="service-card reveal d4"><div class="service-icon"><img src="images/illus-legal.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Legal Aid &amp; Rights Defense</h3><p>Free legal consultations for police harassment, arbitrary detention, workplace discrimination, and identity document (NIC/gender marker) changes.</p></div>
      <div class="service-card reveal d5"><div class="service-icon"><img src="images/illus-crisis.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Crisis &amp; Emergency Support</h3><p>A 24/7 hotline staffed by peer responders, emergency shelter referrals, and rapid accompaniment following violence or arrest.</p></div>
      <div class="service-card reveal d6"><div class="service-icon"><img src="images/illus-economic.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1776562340826-9b7716dc1fe7?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Community &amp; Livelihood</h3><p>Peer-led savings circles, vocational skills training, and safer-work planning to support financial independence and choice.</p></div>
      <div class="service-card reveal d1"><div class="service-icon"><img src="images/illus-outreach.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1650296388316-190565f0ce5b?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Safe Night Outreach</h3><p>Mobile outreach teams work late-night hours to bring supplies, information, and a trusted contact directly to street-based workers.</p></div>
      <div class="service-card reveal d2"><div class="service-icon"><img src="images/illus-gender-affirming.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1650296390057-06aab57bc288?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Gender-Affirming Support</h3><p>Guidance on hormone therapy access, name/gender marker changes, and connections to trans-competent providers.</p></div>
      <div class="service-card reveal d3"><div class="service-icon"><img src="images/illus-shelter.svg" alt=""><img class="photo-overlay" src="https://images.unsplash.com/photo-1631815590016-ebce183022ce?w=700&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();"></div><h3>Shelter Referrals</h3><p>Emergency and short-term housing referrals through our partner shelter network for members facing violence or displacement.</p></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">How It Works</span><h2>Getting support is simple</h2></div>
    <div class="grid-3">
      <div class="service-card reveal d1 center"><div class="service-icon" style="margin:0 auto 16px;">1️⃣</div><h3>Reach out</h3><p>Call, WhatsApp, or visit an outreach site — no referral or appointment needed.</p></div>
      <div class="service-card reveal d2 center"><div class="service-icon" style="margin:0 auto 16px;">2️⃣</div><h3>Talk it through</h3><p>A peer navigator listens and helps you decide what support fits your situation.</p></div>
      <div class="service-card reveal d3 center"><div class="service-icon" style="margin:0 auto 16px;">3️⃣</div><h3>Get connected</h3><p>We accompany you to services, or bring services directly to you — always at your pace.</p></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="cta-band reveal-scale">
      <div><h2>Need support today?</h2><p>Our team is ready to help — confidentially, and at no cost.</p></div>
      <div class="cta-actions">
        <a href="contact.html" class="btn btn-ghost-white">Get Support</a>
        <a href="tel:{HOTLINE.replace(' ','')}" class="btn btn-ghost-white">Call Hotline</a>
      </div>
    </div>
  </div>
</section>
"""
write("services.html", page("Services", f"Free, confidential health, legal, and community services from {ORG_FULL}.", "services.html", services_body))

# ============================================================
# RESOURCES PAGE
# ============================================================
resources_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Resources</div>
    <span class="eyebrow">Resources</span>
    <h1>Guides, hotlines, and information you can trust</h1>
    <p>Practical information on health, rights, and safety — written with and for our community.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head left reveal"><span class="eyebrow">Guides &amp; Downloads</span><h2>Free resources</h2></div>
    <div class="grid-3">
      <div class="news-card reveal d1"><div class="news-thumb" style="background-image:url('images/illus-legal.svg')"></div><div class="card-body"><h3>Know Your Rights: A Pocket Guide</h3><p>What to do during police stops, detentions, and ID checks.</p><a href="#" class="more">Download PDF →</a></div></div>
      <div class="news-card reveal d2"><div class="news-thumb" style="background-image:url('images/illus-hiv.svg')"></div><div class="card-body"><h3>HIV Prevention &amp; PrEP Basics</h3><p>Plain-language guide to testing, PrEP, and PEP access in Sri Lanka.</p><a href="#" class="more">Download PDF →</a></div></div>
      <div class="news-card reveal d3"><div class="news-thumb" style="background-image:url('images/illus-gender-affirming.svg')"></div><div class="card-body"><h3>Gender-Affirming Care Directory</h3><p>Trans-friendly clinics and providers across the island.</p><a href="#" class="more">Download PDF →</a></div></div>
      <div class="news-card reveal d1"><div class="news-thumb" style="background-image:url('images/illus-counseling.svg')"></div><div class="card-body"><h3>Coping With Stigma &amp; Stress</h3><p>Mental health self-care strategies from our peer counsellors.</p><a href="#" class="more">Download PDF →</a></div></div>
      <div class="news-card reveal d2"><div class="news-thumb" style="background-image:url('images/illus-idclinic.svg')"></div><div class="card-body"><h3>ID Document Change Checklist</h3><p>Step-by-step guide to updating your NIC and gender marker.</p><a href="#" class="more">Download PDF →</a></div></div>
      <div class="news-card reveal d3"><div class="news-thumb" style="background-image:url('images/illus-crisis.svg')"></div><div class="card-body"><h3>Safer Work Planning Toolkit</h3><p>Practical safety planning for street-based and venue-based work.</p><a href="#" class="more">Download PDF →</a></div></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container grid-2">
    <div class="reveal-left">
      <span class="eyebrow">Emergency Contacts</span>
      <h2>Hotlines &amp; helplines</h2>
      <div class="hotline-box mt-40">
        <span>{ORG_SHORT} 24/7 Crisis Line</span>
        <strong>{HOTLINE}</strong>
        <span>Free, confidential, peer-staffed.</span>
      </div>
    </div>
    <div class="reveal-right">
      <div class="info-card">
        <div class="info-item"><div class="info-ic">🏥</div><div><strong>National STI/AIDS Control Programme</strong><p style="font-size:.85rem;">Free testing &amp; treatment referrals nationwide.</p></div></div>
        <div class="info-item"><div class="info-ic">⚖</div><div><strong>Legal Aid Commission of Sri Lanka</strong><p style="font-size:.85rem;">Free legal consultation for rights violations.</p></div></div>
        <div class="info-item"><div class="info-ic">🏠</div><div><strong>Safe Harbour Shelter Network</strong><p style="font-size:.85rem;">Emergency housing referrals, 24/7 intake line.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">FAQ</span><h2>Common questions</h2></div>
    <div class="grid-2">
      <details class="service-card reveal d1"><summary style="cursor:pointer; font-weight:700;">Is everything really confidential?</summary><p style="margin-top:12px;">Yes. We never share your information without explicit consent, including with police, family, or other agencies.</p></details>
      <details class="service-card reveal d2"><summary style="cursor:pointer; font-weight:700;">Do I need documentation to access services?</summary><p style="margin-top:12px;">No. You do not need an ID, referral, or appointment to access any {ORG_SHORT} service.</p></details>
      <details class="service-card reveal d3"><summary style="cursor:pointer; font-weight:700;">Are services really free?</summary><p style="margin-top:12px;">Yes, all core services are fully free, funded through grants and community donations.</p></details>
      <details class="service-card reveal d4"><summary style="cursor:pointer; font-weight:700;">Can cisgender women access these services too?</summary><p style="margin-top:12px;">Our programs are specifically designed for trans women; we can refer cis women in sex work to partner organizations.</p></details>
    </div>
  </div>
</section>
"""
write("resources.html", page("Resources", f"Guides, hotlines, and trusted information from {ORG_FULL}.", "resources.html", resources_body))

# ============================================================
# EVENTS PAGE
# ============================================================
events_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Events</div>
    <span class="eyebrow">Events</span>
    <h1>Community activities &amp; workshops</h1>
    <p>Health camps, legal clinics, and community gatherings — all free and open to the community we serve.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head left reveal"><span class="eyebrow">Upcoming</span><h2>Mark your calendar</h2></div>
    <div class="grid-2">
      <div class="event-card reveal d1"><div class="event-row"><div class="event-date-badge"><strong>19</strong><span>Jul</span></div><div><h3>Community Health &amp; HIV Testing Day</h3><p>Free, confidential rapid testing, counselling, and referrals in a welcoming space.</p><div class="event-meta"><span>📍 Colombo Outreach Centre</span><span>🕓 10am–4pm</span></div></div></div></div>
      <div class="event-card reveal d2"><div class="event-row"><div class="event-date-badge"><strong>27</strong><span>Jul</span></div><div><h3>Know Your Rights: Legal Literacy Workshop</h3><p>Practical guidance on ID documentation, policing, and safety planning.</p><div class="event-meta"><span>📍 {ORG_SHORT} Community Hall</span><span>🕓 2pm–5pm</span></div></div></div></div>
      <div class="event-card reveal d3"><div class="event-row"><div class="event-date-badge"><strong>08</strong><span>Aug</span></div><div><h3>Peer Counsellor Training — Cohort 6</h3><p>Six-week training for members interested in becoming peer counsellors.</p><div class="event-meta"><span>📍 {ORG_SHORT} Training Centre</span><span>🕓 Weekly, 5pm–7pm</span></div></div></div></div>
      <div class="event-card reveal d4"><div class="event-row"><div class="event-date-badge"><strong>21</strong><span>Aug</span></div><div><h3>Economic Empowerment Info Session</h3><p>Learn about micro-grants and vocational skills training available this cycle.</p><div class="event-meta"><span>📍 Kandy Outreach Site</span><span>🕓 3pm–6pm</span></div></div></div></div>
      <div class="event-card reveal d5"><div class="event-row"><div class="event-date-badge"><strong>05</strong><span>Sep</span></div><div><h3>Mobile Clinic — Galle Route</h3><p>Health screening, HIV testing, and referrals brought directly to the community.</p><div class="event-meta"><span>📍 Galle Fort Outreach Point</span><span>🕓 11am–5pm</span></div></div></div></div>
      <div class="event-card reveal d6"><div class="event-row"><div class="event-date-badge"><strong>18</strong><span>Sep</span></div><div><h3>Community Solidarity Evening</h3><p>A social gathering to celebrate community, share food, and build connection.</p><div class="event-meta"><span>📍 {ORG_SHORT} Community Hall</span><span>🕓 6pm–9pm</span></div></div></div></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="cta-band reveal-scale">
      <div><h2>Want to help run an event?</h2><p>Volunteers make our outreach and workshops possible.</p></div>
      <div class="cta-actions"><a href="volunteer.html" class="btn btn-ghost-white">Become a Volunteer</a></div>
    </div>
  </div>
</section>
"""
write("events.html", page("Events", f"Upcoming community health camps, legal clinics, and workshops from {ORG_FULL}.", "events.html", events_body))

# ============================================================
# SHOP PAGE
# ============================================================
products = [
    ("Solidarity T-Shirt", "Apparel", "apparel", "👕", "images/illus-shop-tshirt.svg", 2200, "Soft cotton tee with the TET solidarity emblem. Sizes S–XXL.", "Bestseller"),
    ("Pride Tote Bag", "Accessories", "accessories", "👜", "images/illus-shop-tote.svg", 1500, "Durable canvas tote — carry your everyday and your solidarity.", ""),
    ("Enamel Pin Set", "Accessories", "accessories", "📌", "images/illus-shop-pin.svg", 900, "Set of 3 enamel pins featuring community symbols.", "New"),
    ("Community Cap", "Apparel", "apparel", "🧢", "images/illus-shop-cap.svg", 1800, "Adjustable cap embroidered with the TET wordmark.", ""),
    ("Solidarity Bracelet", "Accessories", "accessories", "📿", "images/illus-shop-bracelet.svg", 700, "Handmade beaded bracelet, crafted by community members.", "Handmade"),
    ("Sticker Pack", "Accessories", "accessories", "✨", "images/illus-shop-stickers.svg", 500, "Set of 6 vinyl stickers celebrating trans joy and resilience.", ""),
]

def product_card(name, cat_label, cat_key, icon, image, price, desc, badge, idx):
    badge_html = f'<span class="product-badge">{badge}</span>' if badge else ""
    return f'''<div class="product-card reveal d{ (idx % 6) + 1 }" data-cat-item="{cat_key}">
        <div class="product-thumb" style="background-image:url('{image}')">{badge_html}</div>
        <div class="product-body">
          <h3>{name}</h3>
          <p>{desc}</p>
          <div class="product-price">Rs. {price:,}</div>
          <div class="product-foot">
            <span class="field-hint">{cat_label}</span>
            <button class="add-cart-btn" data-name="{name}" data-price="{price}" data-icon="{icon}">Add to Cart</button>
          </div>
        </div>
      </div>'''

product_cards_html = "\n      ".join([product_card(*p, idx=i) for i, p in enumerate(products)])

shop_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Shop</div>
    <span class="eyebrow">Solidarity Shop</span>
    <h1>Wear your support</h1>
    <p>Every purchase directly funds {ORG_SHORT} healthcare, legal aid, and outreach programs. Designed and produced with community members.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="shop-toolbar reveal">
      <div class="filter-chips">
        <button class="filter-chip active" data-cat="all">All Products</button>
        <button class="filter-chip" data-cat="apparel">Apparel</button>
        <button class="filter-chip" data-cat="accessories">Accessories</button>
      </div>
      <span class="badge-pill">100% of profits fund community programs</span>
    </div>
    <div class="grid-3">
      {product_cards_html}
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container">
    <div class="cta-band reveal-scale">
      <div><h2>Prefer to give directly?</h2><p>Every rupee — whether from the shop or a direct gift — funds the same programs.</p></div>
      <div class="cta-actions"><a href="donate.html" class="btn btn-ghost-white">Make a Donation</a></div>
    </div>
  </div>
</section>
"""
write("shop.html", page("Shop", f"Shop TET solidarity merchandise — proceeds fund community health and legal programs.", "shop.html", shop_body))

# ============================================================
# VOLUNTEER PAGE
# ============================================================
volunteer_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Volunteer</div>
    <span class="eyebrow">Get Involved</span>
    <h1>Volunteer with {ORG_SHORT}</h1>
    <p>Whether you have an hour a week or a professional skill to share, there's a place for you in our community.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-head reveal"><span class="eyebrow">Opportunities</span><h2>Ways to get involved</h2></div>
    <div class="grid-4">
      <div class="service-card reveal d1"><div class="service-icon">🌙</div><h3>Outreach Volunteer</h3><p>Join night outreach teams distributing health supplies and information.</p></div>
      <div class="service-card reveal d2"><div class="service-icon">💬</div><h3>Peer Counsellor Trainee</h3><p>Train to provide one-on-one peer counselling and emotional support.</p></div>
      <div class="service-card reveal d3"><div class="service-icon">⚖</div><h3>Legal Aid Assistant</h3><p>Support case intake and documentation for our legal clinic.</p></div>
      <div class="service-card reveal d4"><div class="service-icon">🎪</div><h3>Event Support</h3><p>Help organize health camps, workshops, and community gatherings.</p></div>
    </div>
  </div>
</section>

<section class="section-soft">
  <div class="container grid-2">
    <div class="reveal-left">
      <span class="eyebrow">Sign Up</span>
      <h2>Tell us about yourself</h2>
      <p>Fill out the form and our volunteer coordinator will reach out within a few days. No experience necessary — we provide full training and support.</p>
      <div class="info-card mt-40">
        <div class="info-item"><div class="info-ic">🕐</div><div><strong>Time Commitment</strong><p style="font-size:.85rem;">As little as 2 hours a month, flexible scheduling.</p></div></div>
        <div class="info-item"><div class="info-ic">🎓</div><div><strong>Training Provided</strong><p style="font-size:.85rem;">All volunteers complete orientation and role-specific training.</p></div></div>
        <div class="info-item"><div class="info-ic">🔒</div><div><strong>Confidentiality Agreement</strong><p style="font-size:.85rem;">All volunteers sign and honor our community confidentiality policy.</p></div></div>
      </div>
    </div>
    <div class="reveal-right">
      <div class="form-card">
        <form data-fake-submit data-success="Thank you! Our volunteer coordinator will be in touch soon.">
          <div class="field-row">
            <div class="field"><label>Full Name</label><input type="text" required></div>
            <div class="field"><label>Email</label><input type="email" required></div>
          </div>
          <div class="field-row">
            <div class="field"><label>Phone</label><input type="tel"></div>
            <div class="field"><label>Area of Interest</label>
              <select>
                <option>Outreach Volunteer</option>
                <option>Peer Counsellor Trainee</option>
                <option>Legal Aid Assistant</option>
                <option>Event Support</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="field"><label>Availability</label><input type="text" placeholder="e.g. Weekday evenings, weekends"></div>
          <div class="field"><label>Why do you want to volunteer with {ORG_SHORT}?</label><textarea rows="4"></textarea></div>
          <div class="checkbox-row"><input type="checkbox" required><span>I agree to honor {ORG_SHORT}'s community confidentiality policy.</span></div>
          <button class="btn btn-primary btn-block mt-40" type="submit">Submit Application</button>
          <p class="form-msg"></p>
        </form>
      </div>
    </div>
  </div>
</section>
"""
write("volunteer.html", page("Volunteer", f"Volunteer opportunities with {ORG_FULL} — outreach, peer counselling, legal aid, and events.", "volunteer.html", volunteer_body))

# ============================================================
# DONATE PAGE
# ============================================================
donate_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Donate</div>
    <span class="eyebrow">Support Our Work</span>
    <h1>Your gift funds care, dignity, and safety</h1>
    <p>Every donation goes directly toward healthcare navigation, legal aid, crisis support, and outreach for trans women in sex work.</p>
  </div>
</section>

<section>
  <div class="container donate-layout">
    <div class="donate-card reveal-left">
      <div class="toggle-switch">
        <button type="button" class="active" data-freq="once">One-time</button>
        <button type="button" data-freq="monthly">Monthly</button>
      </div>
      <form>
        <div class="amount-grid">
          <button type="button" class="amount-btn active" data-amount="1000">Rs. 1,000<span>Health kit for one</span></button>
          <button type="button" class="amount-btn" data-amount="2500">Rs. 2,500<span>Counselling session</span></button>
          <button type="button" class="amount-btn" data-amount="5000">Rs. 5,000<span>Outreach night</span></button>
          <button type="button" class="amount-btn" data-amount="10000">Rs. 10,000<span>Legal consultation</span></button>
          <button type="button" class="amount-btn" data-amount="25000">Rs. 25,000<span>Month of hotline staffing</span></button>
          <button type="button" class="amount-btn" data-amount="custom">Custom<span>Any amount helps</span></button>
        </div>
        <div class="custom-amount"><span class="prefix">Rs.</span><input type="number" min="1" placeholder="Enter custom amount"></div>
        <div class="donate-impact">Your <strong><span class="freq-suffix"></span></strong> gift helps fund direct services — 100% of proceeds stay within community programs.</div>
        <div class="field-row">
          <div class="field"><label>Full Name</label><input type="text" required></div>
          <div class="field"><label>Email</label><input type="email" required></div>
        </div>
        <div class="checkbox-row" style="margin-bottom:20px;"><input type="checkbox"><span>Make this donation anonymous</span></div>
        <button class="btn btn-primary btn-block" type="submit">Donate Now</button>
        <p class="form-msg"></p>
        <p class="field-hint center mt-40">This is a demo donation form. Connect it to Stripe, PayPal, or your preferred payment processor to accept real gifts.</p>
      </form>
    </div>

    <div class="reveal-right">
      <div class="progress-box">
        <span class="eyebrow">2026 Campaign</span>
        <h3>Keep the Hotline Running</h3>
        <div class="progress-bar-track"><div class="progress-bar-fill" data-target="68"></div></div>
        <div class="progress-labels"><span><strong>Rs. 2,040,000</strong> raised</span><span>Goal: Rs. 3,000,000</span></div>
      </div>
      <div class="info-card">
        <h3 style="margin-bottom:18px;">Other ways to give</h3>
        <div class="info-item"><div class="info-ic">🏦</div><div><strong>Bank Transfer</strong><p style="font-size:.85rem;">Account details available on request — email {EMAIL}.</p></div></div>
        <div class="info-item"><div class="info-ic">🏢</div><div><strong>Corporate Giving</strong><p style="font-size:.85rem;">Partner with us on matched giving or sponsorships.</p></div></div>
        <div class="info-item"><div class="info-ic">📦</div><div><strong>In-Kind Donations</strong><p style="font-size:.85rem;">Health supplies, hygiene kits, and clothing always welcome.</p></div></div>
      </div>
      <div class="mt-40">
        <span class="eyebrow">Recent Supporters</span>
        <div class="donor-wall mt-40">
          <span class="donor-chip">Anonymous</span><span class="donor-chip">R. Fernando</span><span class="donor-chip">Anonymous</span>
          <span class="donor-chip">Colombo Allies Circle</span><span class="donor-chip">S. Perera</span><span class="donor-chip">Anonymous</span>
          <span class="donor-chip">N. Jayasuriya</span><span class="donor-chip">Anonymous</span>
        </div>
      </div>
    </div>
  </div>
</section>
"""
write("donate.html", page("Donate", f"Donate to {ORG_FULL} to fund healthcare, legal aid, and outreach for trans female sex workers.", "donate.html", donate_body))

# ============================================================
# CONTACT PAGE
# ============================================================
contact_body = f"""
<section class="page-hero">
  <div class="hero-blobs"><div class="blob blob-1"></div><div class="blob blob-2"></div></div>
  <img class="photo-overlay" src="https://images.unsplash.com/photo-1556159916-26bf2ce06da9?w=900&q=75&auto=format&fit=crop" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.remove();">
  <div class="container">
    <div class="breadcrumb"><a href="index.html">Home</a> / Contact</div>
    <span class="eyebrow">Contact Us</span>
    <h1>We're here — reach out anytime</h1>
    <p>Whether you need support, want to volunteer, or have a question, our team responds confidentially and without judgment.</p>
  </div>
</section>

<section>
  <div class="container grid-2">
    <div class="reveal-left">
      <div class="form-card">
        <h3 style="margin-bottom:20px;">Send us a message</h3>
        <form data-fake-submit data-success="Thank you — we received your message and will respond confidentially.">
          <div class="field-row">
            <div class="field"><label>Name</label><input type="text" required></div>
            <div class="field"><label>Email</label><input type="email" required></div>
          </div>
          <div class="field"><label>Subject</label>
            <select>
              <option>General Inquiry</option>
              <option>Request Support</option>
              <option>Volunteer Question</option>
              <option>Media / Partnership</option>
              <option>Other</option>
            </select>
          </div>
          <div class="field"><label>Message</label><textarea rows="5" required></textarea></div>
          <div class="checkbox-row" style="margin-bottom:20px;"><input type="checkbox"><span>You can respond via WhatsApp instead of email</span></div>
          <button class="btn btn-primary btn-block" type="submit">Send Message</button>
          <p class="form-msg"></p>
        </form>
      </div>
    </div>
    <div class="reveal-right">
      <div class="info-card">
        <div class="info-item"><div class="info-ic">📍</div><div><strong>Address</strong><p style="font-size:.85rem;">{ADDRESS_L1}, {ADDRESS_L2}</p></div></div>
        <div class="info-item"><div class="info-ic">📞</div><div><strong>Phone</strong><p style="font-size:.85rem;">{PHONE}</p></div></div>
        <div class="info-item"><div class="info-ic">✉</div><div><strong>Email</strong><p style="font-size:.85rem;">{EMAIL}</p></div></div>
        <div class="info-item"><div class="info-ic">🕐</div><div><strong>Office Hours</strong><p style="font-size:.85rem;">Mon–Fri, 9am–5pm. Hotline available 24/7.</p></div></div>
        <div class="hotline-box">
          <span>24/7 Crisis Line</span>
          <strong>{HOTLINE}</strong>
          <span>Free &amp; confidential — call or WhatsApp anytime.</span>
        </div>
        <div class="map-box">
          <iframe src="https://www.google.com/maps?q=Colombo,Sri+Lanka&output=embed" loading="lazy" title="Map"></iframe>
        </div>
      </div>
    </div>
  </div>
</section>
"""
write("contact.html", page("Contact", f"Get in touch with {ORG_FULL} — confidential support, volunteering, and general inquiries.", "contact.html", contact_body))

print("ALL PAGES WRITTEN")
