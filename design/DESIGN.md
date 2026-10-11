# DESIGN.md — Personal Portfolio (Aidiel Ziat)

Source of truth: `Personal_Portfolio_Design_v0_1.pptx`, exported slide images in `/design`.
The deck shows **intent**, not pixel-perfect spec. The slides use stock Office theme colours and
Calibri, which are PowerPoint defaults and should **not** be carried into the site. Everything
below marked _(inferred)_ is my interpretation — change it if it's wrong, this file wins over the slides.

Existing site to stay consistent with: https://aidielziat.com/ — match its tone and any
established branding there before falling back to the tokens below.

---

## 1. Concept

A personal, place-based portfolio. The spine of the site is a **map**: the user travels with
Aidiel from a small town in Kedah outward to KL, the UK and Indonesia. Photos sit on the map
as rounded cards pinned near their location. It should feel warm and personal, not corporate.

Three content pillars, reachable from the landing screen:

1. Career Portfolio
2. Hiking Hobby
3. My Life Journey

Slide 3 of the deck shows a later nav variant with two more pillars — build the nav so adding
these is trivial:

4. Islamic Studies
5. Property Investment

---

## 2. Pages / sections

| Route | Deck slide | Content |
|---|---|---|
| `/` (hero + nav) | 2, 3 | Portrait photo background, intro copy, pillar cards |
| `/journey` | 4, 5 | Life timeline on a map: Kodiang → Kedah → Banting → KL → Manchester |
| `/career` | 6 | Career on a map: PwC, Deloitte, Universiti Malaya |
| `/hiking` | 7 | Stat overview + regional sections |
| `/hiking` sub-sections | 8–11 | Kedah, Peninsular Malaysia, Indonesia, UK |

### Hero (slide 2)
- Full-bleed landscape photo, person seated on a cliff overlooking paddy fields (Kodiang).
- Circular avatar portrait overlapping the photo, left-of-centre _(inferred: this is the white
  circle placeholder in the deck)_.
- Right-aligned text block, roughly the right 45% of the viewport:
  - `Hey there! I'm Aidiel.` — larger, acts as an H1.
  - `This is where I grew up, Kodiang (/ˈkodiaŋ/) – a small town in the North Malaysia.`
    The IPA `(/ˈkodiaŋ/)` is italic.
  - `This is my personal portfolio and feel free to click any of the items below to know me better :D`
- Below the copy: pillar cards as **translucent frosted rounded rectangles** over the photo.
  Deck layout is one wide card on top (Career Portfolio) and two half-width cards below
  (My Life Journey, Hiking Hobby). Labels are bold, centred.
- A `Download CV` button is required (noted on the final slide of the deck). Put it in the hero
  and/or a sticky header; it should download a PDF from `/public/cv.pdf`.

### Life journey (slides 4, 5)
- Map background, pins at each location.
- Photo cards: SK Siputeh (Kodiang), a secondary school, Kolej MARA Banting, University of Manchester.
- Slides 4 and 5 are the same map at two zoom levels — Malaysia, then the world, with Manchester
  appearing when zoomed out. _(inferred: implement as a scroll-driven or step-through zoom, or as
  two stacked sections if that's too costly.)_

### Career (slide 6)
- Same map treatment. Cards: PwC, Deloitte, Universiti Malaya.
- Each card should carry role + dates + a short blurb — the deck only has images, so copy is TBD.

### Hiking (slide 7)
- Headline: `My hiking journey so far…` / `More to come!`
- Circular stat badges placed on the map at their region, solid blue fill, white numerals:
  - UK / Europe — **2**
  - Malaysia — **15**
  - Indonesia — **4**
- Badges should feel like map pins, not a stats bar.

### Hiking detail (slides 8–11)
Numbered lists over regional maps:

- **Kedah:** Bukit Perangin, Bukit Talipong, Gunung Keriang
- **Peninsular Malaysia:** Gunung Angsi, Gunung Datuk, etc.
- **Indonesia:** Mount Bromo, Tumpak Sewu Waterfall, Madakaripura Waterfall, Kapas Biru Waterfall
- **UK:** Mam Tor (Peak District), Arthur's Seat

---

## 3. Visual language

### Colours _(inferred — deck uses Office defaults, these are drawn from the imagery)_

```
--bg            #FFFFFF   page background outside media
--ink           #1A1D21   body text on light
--ink-muted     #5B6470   secondary text
--on-media      #FFFFFF   text over photos/maps
--accent        #2F6FB8   stat badges, links, active nav (sampled from the deck's circles)
--accent-warm   #E8663C   sparing highlight (sunset/laterite tones)
--card-glass    rgba(255,255,255,0.18)
--card-border   rgba(255,255,255,0.35)
```

Dark mode: not in the deck. Optional, and if added, photos stay as-is — only the non-media
surfaces invert.

### Typography _(inferred)_
- Do not use Calibri. Pick one humanist sans for everything, e.g. Inter or Plus Jakarta Sans.
- Scale: H1 clamp(2rem, 5vw, 3.5rem) · H2 clamp(1.5rem, 3vw, 2.25rem) · body 1.0625rem / 1.65.
- Card labels: 600 weight, slightly tightened tracking.
- Text over photos always needs a scrim (see below), never raw white on an image.

### Surfaces
- **Glass cards** — the dominant motif. `background: var(--card-glass)`, `backdrop-filter: blur(12px)`,
  `1px solid var(--card-border)`, `border-radius: 20px`, soft shadow. Hover: lift 2–3px and raise
  opacity slightly.
- **Photo cards on maps** — opaque, `border-radius: 16px`, white 4px border or a soft shadow, slight
  random rotation (±2°) for the scrapbook feel _(inferred from the deck's loose placement)_.
- **Stat badges** — perfect circles, solid `--accent`, white numeral, ~96px desktop / 72px mobile.
- Radii: `--r-sm 12px`, `--r-md 16px`, `--r-lg 20px`, `--r-full 9999px`.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.

### Media treatment
- Hero and section backgrounds are full-bleed, `object-fit: cover`.
- Every image over which text sits gets a gradient scrim — e.g. `linear-gradient(90deg, transparent
  0%, rgba(0,0,0,0.45) 55%)` for the hero's right-aligned copy. Target 4.5:1 contrast.
- Images must be optimised: WebP/AVIF, `srcset`, lazy loading below the fold. The deck's images
  are screenshots and stock photos — **replace with properly licensed or personal photos** before
  going live.

---

## 4. Motion _(inferred — the deck can't show this)_

- Keep it restrained. Intent is "quietly alive", not animated.
- Section entrances: fade + 12px rise, 400ms, ease-out, staggered 60ms between cards.
- Map zoom transitions between journey steps: 700ms ease-in-out.
- Card hover: 150ms.
- Respect `prefers-reduced-motion: reduce` — drop all transforms, keep opacity only.

---

## 5. Responsive

Breakpoints: 480 / 768 / 1024 / 1280.

- **Hero:** on mobile the right-aligned text block becomes full-width, stacked below the avatar,
  with the photo as a shorter cropped background. Pillar cards stack to one column.
- **Maps:** the desktop layout (photo cards scattered across a wide map) will not work on a phone.
  Below 768px, drop the map to a simplified background or a static image and render the photo
  cards as a vertical list, each with its location name as a label. The map is decorative — the
  content must survive without it.
- **Stat badges:** on mobile, lay out as a row of three beneath the heading rather than pinned.
- Tap targets ≥ 44px.

---

## 6. Accessibility

- Every photo needs real alt text (place and what it is), not "image".
- Maps are decorative → `alt=""` / `aria-hidden`, with location names present as text.
- Keyboard navigable pillar cards, visible focus ring in `--accent`.
- Don't rely on the map position alone to convey which region a stat belongs to — label it.

---

## 7. Open questions / not in the deck

- [ ] Career copy — roles, dates, achievements for PwC, Deloitte, Universiti Malaya.
- [ ] Which font. Currently unspecified.
- [ ] Whether "Islamic Studies" and "Property Investment" ship in v1 or later.
- [ ] Contact details / socials — no slide covers this, but a portfolio needs it.
- [ ] Final photo set and licensing.
- [ ] Does the journey map need to be interactive (Mapbox/Leaflet) or is a static image enough?
      Static is cheaper and probably sufficient for v1.
