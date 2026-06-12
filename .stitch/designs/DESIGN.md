# The Wheaton Group, LLC — Design System

> Design direction for the Stitch-Loop rebuild.
> Vibe: Professional · Sleek · Trustworthy · Executive
> Primary palette: Navy · White · Black

---

## Brand Snapshot

**Company:** The Wheaton Group, LLC (TWG)
**Industry:** Talent Acquisition / Executive Recruiting
**Audience:** HR leaders, hiring managers, business owners, job candidates
**Tone:** Authoritative but approachable. No fluff. Results-oriented.
**Design goal:** Elevate the existing navy + white identity into something that reads like a premium boutique firm — not a Squarespace template.

---

## Color Palette

| Token               | Hex       | Usage                                              |
|---------------------|-----------|----------------------------------------------------|
| `--navy`            | `#0D1B5E` | Primary brand color. Nav, footer, hero accents, CTA backgrounds |
| `--navy-dark`       | `#09144A` | Hover states, deep backgrounds                     |
| `--navy-light`      | `#1A2D7A` | Section dividers, secondary navy surfaces          |
| `--white`           | `#FFFFFF` | Page backgrounds, card surfaces, nav text on navy  |
| `--off-white`       | `#F5F6FA` | Alternating section backgrounds, input fields      |
| `--black`           | `#0A0A0A` | Body text, headings on white                       |
| `--gray-mid`        | `#6B7280` | Subtext, captions, placeholders                    |
| `--gray-light`      | `#E5E7EB` | Borders, dividers, table lines                     |
| `--accent-gold`     | `#C9A84C` | Signature accent. Sparingly: CTA underlines, stat highlights, hover indicators |

**Color rules:**
- Navy is the anchor. White is the canvas. Black is the text. Gold is the one surprise.
- Never use the cyan/teal from the current site illustration — it reads cheap.
- CTA buttons: navy bg + white text. Ghost buttons: transparent + navy border + navy text.
- On navy backgrounds: white text only. Never gray.

---

## Typography

### Typeface Roles

| Role           | Family                        | Source      |
|----------------|-------------------------------|-------------|
| Display / Hero | `Playfair Display`            | Google Fonts |
| Body / UI      | `Inter`                       | Google Fonts |
| Labels / Caps  | `Inter` (uppercase, tracked)  | Google Fonts |

**Pairing rationale:** Playfair Display gives the serif gravitas that signals an established, executive-level firm — it mirrors the existing site's serif DNA but with more refinement. Inter keeps everything else clean, readable, and modern.

### Type Scale

| Level         | Font         | Size          | Weight | Line Height | Usage                        |
|---------------|--------------|---------------|--------|-------------|------------------------------|
| `display`     | Playfair     | 56–72px       | 700    | 1.1         | Hero headline                |
| `h1`          | Playfair     | 42px          | 700    | 1.2         | Page titles                  |
| `h2`          | Playfair     | 32px          | 600    | 1.25        | Section headings             |
| `h3`          | Inter        | 20px          | 600    | 1.3         | Card titles, service names   |
| `body-lg`     | Inter        | 18px          | 400    | 1.7         | Hero subtext, intro copy     |
| `body`        | Inter        | 16px          | 400    | 1.65        | General body text            |
| `small`       | Inter        | 14px          | 400    | 1.5         | Captions, meta, badges       |
| `label`       | Inter        | 11px          | 600    | 1.4         | ALL CAPS, letter-spacing 0.1em. Section eyebrows, tags |

**Rules:**
- Sentence case everywhere except `label` elements.
- No bold body text mid-paragraph. Use a pull quote or callout block instead.
- Hero headline: Playfair Display, no italic, tight leading, up to 3 lines max on desktop.

---

## Spacing System

Base unit: `8px`

| Token       | Value  | Usage                              |
|-------------|--------|------------------------------------|
| `--sp-1`    | 8px    | Inline gaps, icon padding          |
| `--sp-2`    | 16px   | Component internal padding         |
| `--sp-3`    | 24px   | Card padding, form field gaps      |
| `--sp-4`    | 32px   | Between related sections           |
| `--sp-6`    | 48px   | Section internal padding           |
| `--sp-8`    | 64px   | Section vertical rhythm (desktop)  |
| `--sp-12`   | 96px   | Major section breaks               |
| `--sp-16`   | 128px  | Hero padding top/bottom            |

---

## Layout

### Grid
- **Desktop:** 12-column, 1280px max-width container, 24px gutters
- **Tablet:** 8-column, fluid, 20px gutters
- **Mobile:** 4-column, 16px gutters, 16px horizontal padding

### Breakpoints
| Name     | Width    |
|----------|----------|
| mobile   | < 640px  |
| tablet   | 640–1024px |
| desktop  | 1024–1440px |
| wide     | > 1440px |

### Container Max-Widths
- Content: `1280px`
- Text blocks (articles): `720px`
- Hero content: `900px`

---

## Components

### Navigation
```
Height: 72px (desktop) / 60px (mobile)
Background: #0D1B5E (navy)
Logo: White wordmark, left-aligned, Inter 600 or Playfair
Nav links: White, Inter 15px, 400 weight, 24px gap
Active link: White + 2px gold underline
CTA button: White bg + navy text, 36px height, 16px horizontal padding, border-radius 4px
Mobile: Hamburger (3 lines → X), full-height side drawer, navy bg
Sticky: yes, no shadow change — stays solid navy
```

### Hero (Home)
```
Layout: Left-aligned text, right-side image (60/40 split on desktop)
Background: #F5F6FA (off-white) with subtle navy left border or full navy bg option
Headline: Playfair Display, 64px, #0A0A0A or white (depends on bg)
Subtext: Inter 18px, --gray-mid
CTAs: Primary (navy pill) + Ghost (navy outline pill), 44px height
Image: Real photo (two professionals), full bleed right column, no rounded corners
Mobile: Stack — headline → subtext → CTAs → image
```

### Cards (Service Cards, Job Cards)
```
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 8px
Padding: 32px
Shadow: none by default; box-shadow: 0 2px 12px rgba(0,0,0,0.06) on hover
Hover: translate Y -2px, shadow appears — 200ms ease
Icon area: 40x40px navy bg, white icon, border-radius 8px
Title: Inter 600, 20px, #0A0A0A
Body: Inter 16px, #6B7280
Link: Navy, underline on hover, arrow →
```

### Buttons
```
Primary:
  Background: #0D1B5E
  Text: #FFFFFF, Inter 600, 15px
  Padding: 12px 28px
  Border-radius: 4px
  Hover: #09144A
  Active: scale(0.98)

Ghost:
  Background: transparent
  Border: 1.5px solid #0D1B5E
  Text: #0D1B5E
  Hover: bg #0D1B5E, text #FFFFFF

Gold accent (use sparingly — key CTAs only):
  Background: #C9A84C
  Text: #0A0A0A
  Hover: darken 8%
```

### Badges / Tags (Job Work Type)
```
Remote:  bg #EEF2FF, text #0D1B5E, Inter 12px 600
Hybrid:  bg #F0FDF4, text #166534, Inter 12px 600
On-site: bg #FFF7ED, text #9A3412, Inter 12px 600
Border-radius: 4px, padding: 4px 10px
```

### Section Divider / Eyebrow
```
Eyebrow label: Inter 11px, 600, ALL CAPS, letter-spacing 0.12em, --accent-gold color
Place above section headings to add hierarchy without extra size
```

### CTA Banner (Full-width)
```
Background: #0D1B5E (navy)
Headline: Playfair Display, 36px, white
Subtext: Inter 17px, rgba(255,255,255,0.75)
Button: White bg, navy text — or gold accent
Padding: 80px 0
```

### Forms
```
Label: Inter 13px, 600, #0A0A0A, margin-bottom 6px
Input: Height 44px, border 1px solid #E5E7EB, border-radius 4px, padding 0 14px
Focus: border-color #0D1B5E, box-shadow 0 0 0 3px rgba(13,27,94,0.12)
Select: same as input + chevron icon right
Textarea: min-height 120px, same border/focus rules
Submit: Primary button, full width on mobile
```

### Footer
```
Background: #0D1B5E (navy)
Text: rgba(255,255,255,0.85)
Links: white, opacity 0.7 default → 1.0 hover, no underline
Divider: rgba(255,255,255,0.15)
Copyright: Inter 13px, opacity 0.5
Padding: 64px 0 40px
Layout: Logo + tagline left | nav links center | contact right (desktop)
```

---

## Iconography

- **Library:** Lucide Icons (outline style, 24px default)
- **Weight:** 1.5px stroke — matches Inter's lightness
- **Color:** Navy on white surfaces; white on navy surfaces
- **Service icons:** Wrap in 48px navy bg square, border-radius 8px, white icon inside

---

## Imagery Guidelines

- **Photography:** Real professionals, light/neutral environments, candid over posed
- **No:** Stock clipart, cartoons, faceless illustrations (retire the current teal team graphic)
- **Aspect ratios:** Hero 16:9 or 3:2; Team headshots 1:1; Section images 4:3
- **Treatment:** No filters, no overlays with low contrast. Images should feel documentary, not marketed.

---

## Motion

- **Default transition:** `200ms ease` on color, transform, opacity
- **Hover cards:** `transform: translateY(-2px)` + shadow in, `200ms ease`
- **Page load:** No splash screens. Fade-in sections on scroll (opacity 0 → 1, translateY 12px → 0, 400ms)
- **Respect:** `prefers-reduced-motion` — disable all transitions and animations
- **No:** Parallax, auto-playing video, spinning loaders

---

## Signature Design Element

**Gold rule accent on section headings.**
A single 2px × 40px gold (`#C9A84C`) horizontal rule sits beneath each major section eyebrow label. It's the one recurring decorative element. Subtle, but it signals craft and gives every section a distinct entry point without relying on color blocking or heavy borders.

```
TALENT SOLUTIONS          ← eyebrow, Inter 11px 600, gold color
——————                    ← 40px gold rule, 2px height
Direct Placement          ← h2, Playfair Display
and Contract Recruiting.
```

---

## Stitch Home Screen — Component Inventory

For the Stitch loop, the home page uses these components in order:

1. `NavBar` — sticky, navy, logo + links + CTA
2. `HeroSplit` — headline (Playfair 64px) + subtext + 2 CTAs + right image
3. `AboutSnapshot` — 2-col: copy left, image right, "Who We Are →" CTA
4. `ServiceCards` — 2-up grid: Direct Placement + Contract Recruiting cards
5. `StatsRow` — 3 differentiators: "90-Day Guarantee" · "30+ Day Vacancies" · "Success-Based Pricing"
6. `CTABanner` — full-width navy, Playfair headline, white button
7. `Footer` — navy, links, email, copyright

---

## Anti-Patterns (What to Avoid)

- ❌ Teal/cyan accents — clashes with navy, reads casual
- ❌ Cartoon or faceless team illustrations — undercuts credibility
- ❌ Centered body text blocks — hard to read, feels like a flyer
- ❌ Large empty light-gray sections with nothing in them — current site has too much dead space
- ❌ More than 2 font families
- ❌ Rounded corners > 8px on cards (too playful for this brand)
- ❌ Generic stock photo of handshake or skyline
- ❌ Shadow-heavy cards — stay flat with subtle hover lift only
