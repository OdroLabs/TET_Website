# -*- coding: utf-8 -*-
"""
Generates a self-contained set of brand-illustration SVGs (no external
photos/hotlinking, no real people) for hero sections and card thumbnails.
Flat, abstract, non-identifying illustration style — appropriate for a
community whose privacy and safety matter.
"""
import os, math

IMG_DIR = "/sessions/admiring-zealous-meitner/mnt/outputs/images"
os.makedirs(IMG_DIR, exist_ok=True)

COLORS = {
    "blue": "#5BCEFA", "blue_dark": "#1C7ED6", "blue_deep": "#0B5FA5",
    "pink": "#F5A9B8", "pink_dark": "#D6336C", "pink_deep": "#A61E4D",
    "purple": "#7C4DBB", "ink": "#201A2B", "white": "#FFFFFF",
}

def wrap(name, w, h, c1, c2, angle, body, dots=True, seed=1):
    gid = f"g_{name}"
    pid = f"p_{name}"
    # deterministic scattered dot texture for subtle depth
    dot_svg = ""
    if dots:
        pts = []
        n = 14
        for i in range(n):
            x = (37 * (i * seed + 3)) % w
            y = (53 * (i * seed + 7)) % h
            r = 1.4 + (i % 3) * 0.8
            op = 0.10 + (i % 4) * 0.05
            pts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFFFFF" opacity="{op:.2f}"/>')
        dot_svg = "".join(pts)
    rad = math.radians(angle)
    x1, y1 = 50 - 50*math.cos(rad), 50 - 50*math.sin(rad)
    x2, y2 = 50 + 50*math.cos(rad), 50 + 50*math.sin(rad)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">
<defs>
  <linearGradient id="{gid}" x1="{x1}%" y1="{y1}%" x2="{x2}%" y2="{y2}%">
    <stop offset="0%" stop-color="{c1}"/>
    <stop offset="100%" stop-color="{c2}"/>
  </linearGradient>
</defs>
<rect width="{w}" height="{h}" fill="url(#{gid})"/>
{dot_svg}
{body}
</svg>'''
    with open(os.path.join(IMG_DIR, f"{name}.svg"), "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", name, len(svg), "bytes")

def icon(name, w, h, c1, c2, angle, path_group, seed=1):
    wrap(name, w, h, c1, c2, angle, path_group, dots=True, seed=seed)

S = COLORS
STROKE = "stroke=\"#FFFFFF\" stroke-width=\"3.4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\""
FILLW = "fill=\"#FFFFFF\""
def SW(w=3.4, op=None):
    o = f' opacity="{op}"' if op is not None else ""
    return f'stroke="#FFFFFF" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round"{o}'

# ---- Card / icon illustrations (400x300 canvas, centered symbol ~100x100 scaled) ----
W, H = 400, 300
def center(inner_w=140, inner_h=140):
    return (W-inner_w)/2, (H-inner_h)/2

def g(cx, cy, scale, inner):
    return f'<g transform="translate({cx},{cy}) scale({scale})">{inner}</g>'

# Healthcare: medical cross in rounded square
cx, cy = W/2, H/2
healthcare = g(cx-60, cy-60, 1.2, f'''
  <rect x="10" y="10" width="100" height="100" rx="26" fill="#FFFFFF" opacity="0.16"/>
  <path d="M60 28 L60 92 M28 60 L92 60" {SW(14)}/>
''')
icon("illus-healthcare", W, H, S["blue_deep"], S["blue"], 35, healthcare, seed=2)

# HIV prevention: shield with heart
hiv = g(cx-55, cy-62, 1.15, f'''
  <path d="M55 8 L100 24 V60 C100 92 78 110 55 118 C32 110 10 92 10 60 V24 Z" fill="#FFFFFF" opacity="0.22"/>
  <path d="M55 78 C40 62 24 54 24 40 C24 30 32 24 40 24 C47 24 52 28 55 34 C58 28 63 24 70 24 C78 24 86 30 86 40 C86 54 70 62 55 78 Z" {FILLW}/>
''')
icon("illus-hiv", W, H, S["blue"], S["purple"], 50, hiv, seed=3)

# Counselling: chat bubble + heart
chat = g(cx-62, cy-58, 1.15, f'''
  <path d="M14 20 H110 A10 10 0 0 1 120 30 V78 A10 10 0 0 1 110 88 H55 L34 106 V88 H14 A10 10 0 0 1 4 78 V30 A10 10 0 0 1 14 20 Z" fill="#FFFFFF" opacity="0.22"/>
  <path d="M62 44 C54 34 40 34 34 44 C28 54 34 62 62 78 C90 62 96 54 90 44 C84 34 70 34 62 44 Z" {FILLW}/>
''')
icon("illus-counseling", W, H, S["purple"], S["pink_deep"], 40, chat, seed=4)

# Legal: scales of justice
scales = g(cx-58, cy-64, 1.15, f'''
  <path d="M60 10 V110 M30 118 H90" {SW(8)}/>
  <path d="M20 34 H100" {SW(6)}/>
  <path d="M20 34 L6 62 A16 16 0 0 0 34 62 Z" fill="#FFFFFF" opacity="0.85"/>
  <path d="M100 34 L86 62 A16 16 0 0 0 114 62 Z" fill="#FFFFFF" opacity="0.85"/>
  <circle cx="60" cy="14" r="8" {FILLW}/>
''')
icon("illus-legal", W, H, S["blue_deep"], S["purple"], 55, scales, seed=5)

# Crisis: phone + pulse
phone = g(cx-52, cy-62, 1.1, f'''
  <path d="M30 14 C24 14 20 18 20 24 C20 66 58 104 100 104 C106 104 110 100 110 94 V78 C110 72 106 68 100 68 L82 64 C77 63 72 65 69 69 L60 80 C44 71 33 60 24 44 L35 35 C39 32 41 27 40 22 L36 4 C35 -1 30 -4 25 -3 Z" fill="#FFFFFF" opacity="0.85" transform="translate(-8,4)"/>
  <path d="M14 60 H36 L46 42 L58 78 L68 54 L76 60 H100" {SW(5, 0.9)}/>
''')
icon("illus-crisis", W, H, S["pink_deep"], S["blue_deep"], 60, phone, seed=6)

# Community: three linked people (heads + shoulders)
def person(dx, dy, s=1):
    return f'<g transform="translate({dx},{dy}) scale({s})"><circle cx="0" cy="-14" r="13" {FILLW} opacity="0.92"/><path d="M-22 26 C-22 4 -12 -4 0 -4 C12 -4 22 4 22 26 Z" {FILLW} opacity="0.92"/></g>'
community = g(cx-70, cy-46, 1.05, person(30,50,0.82)+person(70,50,0.82)+person(50,20,1.0))
icon("illus-community", W, H, S["purple"], S["blue"], 45, community, seed=7)

# Night outreach: crescent moon + stars
moon = g(cx-56, cy-56, 1.1, f'''
  <path d="M70 10 A50 50 0 1 0 70 110 A38 38 0 1 1 70 10 Z" {FILLW} opacity="0.92"/>
  <path d="M20 30 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 Z" {FILLW} opacity="0.8"/>
  <path d="M105 60 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" {FILLW} opacity="0.7"/>
''')
icon("illus-outreach", W, H, S["blue_deep"], S["purple"], 65, moon, seed=8)

# ID / legal clinic: ID card
idcard = g(cx-64, cy-46, 1.1, f'''
  <rect x="4" y="4" width="120" height="84" rx="12" fill="#FFFFFF" opacity="0.22"/>
  <circle cx="34" cy="38" r="14" {FILLW}/>
  <path d="M14 76 C14 58 54 58 54 76 Z" {FILLW}/>
  <path d="M70 26 H110 M70 40 H110 M70 54 H96" {SW(5)}/>
''')
icon("illus-idclinic", W, H, S["blue_deep"], S["pink_deep"], 30, idcard, seed=9)

# Economic empowerment: coin with rising arrow
coin = g(cx-56, cy-60, 1.1, f'''
  <circle cx="50" cy="70" r="42" fill="#FFFFFF" opacity="0.85"/>
  <text x="50" y="82" font-size="38" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" fill="{S['pink_deep']}">Rs</text>
  <path d="M74 44 L100 18 M100 18 H82 M100 18 V36" {SW(6)}/>
''')
icon("illus-economic", W, H, S["pink"], S["purple"], 50, coin, seed=10)

# Shelter / house
house = g(cx-58, cy-58, 1.1, f'''
  <path d="M12 60 L60 18 L108 60" {SW(8)}/>
  <path d="M28 54 V108 H92 V54" fill="#FFFFFF" opacity="0.85"/>
  <rect x="50" y="72" width="20" height="36" fill="{S['pink_deep']}" opacity="0.9"/>
''')
icon("illus-shelter", W, H, S["blue"], S["blue_deep"], 40, house, seed=11)

# Gender-affirming: trans symbol style (combined circle + arrows) — simplified abstract emblem
emblem = g(cx-50, cy-58, 1.05, f'''
  <circle cx="60" cy="66" r="34" {SW(7)}/>
  <path d="M60 32 V4 M60 4 L48 16 M60 4 L72 16" {SW(6)}/>
  <path d="M94 32 L112 14 M112 14 H96 M112 14 V30" {SW(6)}/>
  <path d="M60 100 V128" {SW(6)}/>
''')
icon("illus-gender-affirming", W, H, S["pink"], S["blue"], 20, emblem, seed=12)

# ---- Shop product icons ----
tshirt = g(cx-52, cy-56, 1.1, '''
  <path d="M40 10 L60 10 L60 4 L76 4 L76 10 L96 10 L112 28 L96 42 L88 34 L88 108 H40 V34 L32 42 L16 28 Z" fill="#FFFFFF" opacity="0.92"/>
''')
icon("illus-shop-tshirt", W, H, S["blue_deep"], S["blue"], 40, tshirt, seed=13)

tote = g(cx-52, cy-56, 1.1, '''
  <path d="M28 40 H100 L94 118 H34 Z" fill="#FFFFFF" opacity="0.9"/>
  <path d="M42 40 C42 16 86 16 86 40" fill="none" stroke="#FFFFFF" stroke-width="7"/>
''')
icon("illus-shop-tote", W, H, S["pink_deep"], S["pink"], 55, tote, seed=14)

pin = g(cx-40, cy-56, 1.0, '''
  <circle cx="60" cy="46" r="34" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="60" cy="46" r="12" fill="#A61E4D"/>
  <path d="M60 80 V126" stroke="#FFFFFF" stroke-width="6"/>
''')
icon("illus-shop-pin", W, H, S["pink"], S["purple"], 60, pin, seed=15)

cap = g(cx-58, cy-50, 1.05, '''
  <path d="M10 78 Q60 12 110 78 Z" fill="#FFFFFF" opacity="0.9"/>
  <ellipse cx="60" cy="80" rx="52" ry="12" fill="#FFFFFF" opacity="0.9"/>
''')
icon("illus-shop-cap", W, H, S["blue"], S["blue_deep"], 25, cap, seed=16)

def bead(angle, r=30, br=7):
    rad = math.radians(angle)
    x = 60 + r*math.cos(rad); y = 60 + r*math.sin(rad)
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{br}" fill="#FFFFFF" opacity="0.9"/>'
beads = "".join(bead(a) for a in range(0, 360, 40))
icon("illus-shop-bracelet", W, H, S["pink_deep"], S["blue_deep"], 45, g(cx-60, cy-60, 1.0, beads), seed=17)

stickers = g(cx-58, cy-56, 1.0, '''
  <rect x="10" y="30" width="60" height="60" rx="14" fill="#FFFFFF" opacity="0.55" transform="rotate(-12 40 60)"/>
  <rect x="40" y="20" width="60" height="60" rx="14" fill="#FFFFFF" opacity="0.75" transform="rotate(8 70 50)"/>
  <path d="M75 55 l6 14 15 2 -11 10 3 15 -13 -8 -13 8 3 -15 -11 -10 15 -2 Z" fill="#FFFFFF" opacity="0.95"/>
''')
icon("illus-shop-stickers", W, H, S["purple"], S["pink"], 65, stickers, seed=18)

# ---- News / event / initiative editorial art ----
news = g(cx-64, cy-56, 1.1, '''
  <rect x="8" y="8" width="112" height="88" rx="6" fill="#FFFFFF" opacity="0.92"/>
  <rect x="20" y="20" width="34" height="34" fill="#A61E4D" opacity="0.7"/>
  <rect x="62" y="22" width="46" height="7" fill="#0B5FA5" opacity="0.6"/>
  <rect x="62" y="36" width="46" height="7" fill="#0B5FA5" opacity="0.4"/>
  <rect x="20" y="66" width="88" height="6" fill="#0B5FA5" opacity="0.4"/>
  <rect x="20" y="78" width="60" height="6" fill="#0B5FA5" opacity="0.4"/>
''')
icon("illus-news", W, H, S["blue_deep"], S["purple"], 35, news, seed=19)

calendar = g(cx-60, cy-58, 1.1, '''
  <rect x="10" y="18" width="100" height="88" rx="10" fill="#FFFFFF" opacity="0.92"/>
  <rect x="10" y="18" width="100" height="24" rx="10" fill="#A61E4D" opacity="0.85"/>
  <rect x="26" y="4" width="8" height="24" rx="3" fill="#FFFFFF"/>
  <rect x="86" y="4" width="8" height="24" rx="3" fill="#FFFFFF"/>
  <circle cx="34" cy="62" r="6" fill="#0B5FA5" opacity="0.5"/>
  <circle cx="56" cy="62" r="6" fill="#0B5FA5" opacity="0.5"/>
  <circle cx="78" cy="62" r="6" fill="#0B5FA5" opacity="0.5"/>
  <circle cx="34" cy="84" r="6" fill="#0B5FA5" opacity="0.5"/>
  <circle cx="56" cy="84" r="6" fill="#A61E4D"/>
''')
icon("illus-event", W, H, S["pink_deep"], S["blue_deep"], 55, calendar, seed=20)

heart_hands = g(cx-64, cy-58, 1.05, person(30,60,0.8)+person(90,60,0.8)+'''
<path d="M60 30 C52 20 36 20 30 30 C24 40 30 48 60 66 C90 48 96 40 90 30 C84 20 68 20 60 30 Z" fill="#FFFFFF" opacity="0.95"/>
''')
icon("illus-initiative-outreach", W, H, S["blue_deep"], S["pink_deep"], 40, heart_hands, seed=21)
icon("illus-initiative-legal", W, H, S["purple"], S["pink_deep"], 30, scales, seed=22)
icon("illus-initiative-peer", W, H, S["blue_deep"], S["purple"], 50, community, seed=23)
icon("illus-initiative-economic", W, H, S["pink_deep"], S["blue_deep"], 60, coin, seed=24)

# ---- Team avatars (circle, head-and-shoulders silhouette) ----
AW = 200
def avatar(name, c1, c2, angle, seed):
    inner = f'''
    <circle cx="{AW/2}" cy="{AW/2-6}" r="46" fill="#FFFFFF" opacity="0.95"/>
    <circle cx="{AW/2}" cy="{AW/2-24}" r="19" fill="{c1}"/>
    <path d="M{AW/2-32} {AW/2+40} C{AW/2-32} {AW/2+2} {AW/2-16} {AW/2-10} {AW/2} {AW/2-10} C{AW/2+16} {AW/2-10} {AW/2+32} {AW/2+2} {AW/2+32} {AW/2+40} Z" fill="{c1}"/>
    '''
    wrap(name, AW, AW, c1, c2, angle, inner, dots=True, seed=seed)

avatar("avatar-director", S["blue_deep"], S["purple"], 45, 31)
avatar("avatar-health", S["blue"], S["blue_deep"], 30, 32)
avatar("avatar-legal", S["purple"], S["pink_deep"], 60, 33)
avatar("avatar-peer", S["pink_deep"], S["blue_deep"], 50, 34)

# ---- HERO illustration (large, two-figure solidarity artwork) ----
HW, HH = 900, 1125
def hero_scene():
    fig1 = f'''
      <g transform="translate(330,560)">
        <circle cx="0" cy="-140" r="52" fill="#FFFFFF" opacity="0.96"/>
        <path d="M-92 260 C-92 40 -46 -30 0 -30 C46 -30 92 40 92 260 Z" fill="#FFFFFF" opacity="0.96"/>
      </g>'''
    fig2 = f'''
      <g transform="translate(560,560)">
        <circle cx="0" cy="-150" r="56" fill="#FFFFFF" opacity="0.9"/>
        <path d="M-98 270 C-98 30 -50 -40 0 -40 C50 -40 98 30 98 270 Z" fill="#FFFFFF" opacity="0.9"/>
      </g>'''
    hands = '<path d="M420 640 Q450 610 480 640" stroke="#FFFFFF" stroke-width="10" fill="none" stroke-linecap="round"/>'
    heart = '''<path d="M450 330 C420 290 350 290 330 335 C310 380 340 415 450 490 C560 415 590 380 570 335 C550 290 480 290 450 330 Z" fill="#FFFFFF" opacity="0.95"/>'''
    arcs = ""
    for i, (col, r) in enumerate([(S["blue"], 430), (S["pink"], 380), (S["purple"], 330)]):
        arcs += f'<path d="M{450-r} 760 A{r} {r} 0 0 1 {450+r} 760" fill="none" stroke="{col}" stroke-width="10" opacity="0.35"/>'
    stars = ""
    for (x, y, s) in [(150,220,1),(760,180,0.8),(700,560,0.7),(120,650,0.9),(800,760,1.1)]:
        stars += f'<path transform="translate({x},{y}) scale({s})" d="M0 -18 L5 -5 18 0 5 5 0 18 -5 5 -18 0 -5 -5 Z" fill="#FFFFFF" opacity="0.55"/>'
    return arcs + stars + fig1 + fig2 + hands + heart

wrap("hero-community", HW, HH, S["blue_deep"], S["pink_deep"], 35, hero_scene(), dots=True, seed=40)

# Page-hero (smaller banner) reuse a wide version
def banner_scene():
    fig1 = f'''<g transform="translate(width*0.72,120)"></g>'''  # placeholder unused
    return hero_scene()
wrap("banner-community", 1600, 500, S["purple"], S["blue_deep"], 20, '''
  <g transform="translate(1250,-40) scale(0.55)">''' + hero_scene() + '''</g>
''', dots=True, seed=41)

print("ALL IMAGES GENERATED")
