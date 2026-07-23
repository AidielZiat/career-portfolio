# Portfolio Redesign — Design Spec

Date: 2026-07-24
Status: Approved by user, ready for implementation planning

## 1. Goals

Redesign the visual theme and page structure of the personal portfolio (React + Vite +
Tailwind + shadcn/ui, deployed on AWS Amplify from this GitHub repo). Positioning: tech
consulting background, moving toward fintech/e-commerce. Clean, minimal, content-first —
light theme by default with a persisted dark mode toggle.

**Out of scope for this pass:**
- No AI chat widget (planned v2).
- No changes to deployment/Amplify config.
- `/grocery` route (`GroceryList.tsx` and its supporting components/data) is an unrelated
  side project bundled in the same app — not touched.
- `Analytics.tsx` (visitor tracking) — not touched.

## 2. Theming approach

Use `next-themes` (already a dependency, currently unused) rather than a hand-rolled
context or CSS-only `prefers-color-scheme`:
- `ThemeProvider` wraps the app (`attribute="class"`, `defaultTheme="light"`,
  `enableSystem={false}`, `storageKey="portfolio-theme"`).
- Persists to `localStorage` automatically; ships a blocking inline script so there's no
  flash-of-wrong-theme on reload.
- Matches the existing `darkMode: ["class"]` in `tailwind.config.ts` and the
  `hsl(var(--x))` token pattern already used throughout the codebase — no new pattern
  introduced.
- New `ThemeToggle` component (sun/moon icon via `lucide-react`) in the header, both
  desktop nav and mobile menu.

## 3. Design tokens

Reuse the existing shadcn/ui semantic token set already wired into `tailwind.config.ts`
(`background`, `foreground`, `card`, `muted`, `primary`, `accent`, `border`, etc.) rather
than inventing new token names. `--muted` doubles as the "section background" role
(alternating section fills); `--card` is the surface project/timeline cards sit on.

All values in `H S% L%` (the format `base.css` already uses):

| Token | Light hex | Light HSL | Dark hex | Dark HSL |
|---|---|---|---|---|
| `--background` | `#FFFFFF` | `0 0% 100%` | `#0B1220` | `220 49% 8%` |
| `--muted` (section bg) | `#F6F8FB` | `216 38% 97%` | `#111827` | `221 39% 11%` |
| `--card` | `#FFFFFF` | `0 0% 100%` | `#111827` | `221 39% 11%` |
| `--foreground` | `#0F172A` | `222 47% 11%` | `#F7F8FA` | `220 23% 97%` |
| `--muted-foreground` | `#5B6472` | `217 11% 40%` | `#B7C3DA` | `219 32% 79%` |
| `--primary` | `#2563EB` | `221 83% 53%` | `#2563EB` | `221 83% 53%` |
| `--primary-foreground` | `#FFFFFF` | `0 0% 100%` | `#FFFFFF` | `0 0% 100%` |
| `--accent-alt` (new, hover/secondary emphasis) | `#3730A3` | `244 55% 41%` | `#3730A3` | `244 55% 41%` |
| `--border` / `--input` | `#E4E7EC` | `218 17% 91%` | `#3B4A66` | `219 27% 32%` |
| `--ring` | `#2563EB` | `221 83% 53%` | `#2563EB` | `221 83% 53%` |

`--card-foreground`, `--popover`, `--popover-foreground` mirror `--foreground`/`--card`.
`--accent`/`--accent-foreground` (shadcn's structural hover-state token, used internally
by dropdown/nav-menu components) stays a light tint of `--muted`, distinct from the new
`--accent-alt` brand color above. `--destructive` and `--radius` are unchanged — not
specified by the user, no reason to touch them. Sidebar tokens are unused in this app
(no sidebar component is rendered) and are left mirroring background/foreground/border
for consistency only.

`--accent-alt` is a new custom property (not part of shadcn's default set) — add it to
`tailwind.config.ts` as `accentAlt: 'hsl(var(--accent-alt))'` for hover/secondary-emphasis
use (e.g. link hover, secondary button hover).

## 4. Page structure (final order)

1. **Hero** — headline/value prop, two CTAs, theme toggle in nav.
2. **Logo strip** — "Where I've Worked": Deloitte, PwC.
3. **Work Experience timeline** — extracted from current combined `Experience.tsx`.
4. **Education & Certifications** — kept as its own section (user's explicit choice),
   directly after Work Experience.
5. **Projects** — 3 existing projects, refreshed copy, no domain tags.
6. **Skills grid** — new standalone section, 3 categories.
7. **Contact** — existing channels + resume download button.
8. **Footer**.

## 5. Component changes

| File | Change |
|---|---|
| `src/styles/base.css` | Replace `:root` tokens with light values; add `.dark` block with dark values (table above). Remove `glass`/`glass-card` neon styling. |
| `tailwind.config.ts` | Add `accentAlt` color mapping to `--accent-alt`. |
| `src/App.tsx` / `src/main.tsx` | Wrap app in `next-themes` `ThemeProvider`. |
| `src/components/ui/ThemeToggle.tsx` (new) | Sun/moon toggle button using `useTheme()`. |
| `src/components/Header.tsx` | Remove hardcoded `text-white`/`text-gray-900` scroll logic; use `bg-background/80` + `text-foreground` theme-aware classes. Add `ThemeToggle`. Drop "Download CV" nav item (moved to Contact). |
| `src/components/header/NavigationLinks.tsx`, `MobileMenu.tsx` | Same theme-aware class fix; `MobileMenu` currently hardcodes `bg-white/95`/`text-gray-900` — replace with tokens. |
| `src/components/ui/AnimatedLogo.tsx` | Recolor canvas "AZ" mark from neon green to cobalt (`#2563EB`); keep the effect (it's the logo mark, not ambient decoration). |
| `src/components/Hero.tsx`, `hero/HeroContent.tsx` | New copy (Section 6). CTAs reduced to "View Projects" (primary → `#projects`) + "Contact Me" (secondary → `#contact`). CV/LinkedIn buttons removed from Hero (now in Contact). |
| `src/components/hero/ParticlesBackground.tsx` | Keep the particle network only; remove the glow-orb blur divs. Recolor from neon green to cobalt. Roughly halve particle/point count and lower opacity. Render at very low opacity in light mode so it doesn't compete with the flat white background. |
| `src/components/LogoStrip.tsx` (new) | Placeholder text-badge row (styled pills, not real logos yet). Built so each entry becomes `{ name, logoSrc? }` — when `logoSrc` is set, render `<img>` instead of the text badge, so swapping in real files later is a one-line data change, not a rewrite. |
| `src/components/Experience.tsx` | Split into two: work-experience-only timeline (this file, retitled), skills bubbles removed (moved to new `SkillsGrid`). |
| `src/components/EducationCertifications.tsx` (new, content extracted from current `Experience.tsx`) | Own section, same timeline visual treatment. |
| `src/components/SkillsGrid.tsx` (new) | 3 categories of pills (Section 6 copy). |
| `src/components/Projects.tsx` | Refresh copy (Section 6), drop `isLarge` two-tier layout in favor of consistent card weight, remove `glass-card`/backdrop-blur in favor of flat `bg-card` + `border`. |
| `src/components/Contact.tsx` | Add "Download Resume" button (existing Google Drive link, moved from Header/Hero). Restyle to flat tokens. |
| `src/components/Footer.tsx` | Restyle to new tokens. Remove `<GlowingCircle />` (`NetworkPulse` canvas) — pure decoration outside Hero. |
| `src/components/ui/GlowingCircle.tsx` | Delete (no longer used anywhere after Footer change). |
| `src/pages/Index.tsx` | Reorder sections per Section 4; add `LogoStrip`, `EducationCertifications`, `SkillsGrid`. |
| `src/styles/components.css` | Remove `.glass`/`.glass-card`/`.glass-card-dark` rules (no longer used). `.btn-primary`/`.btn-secondary`/`.section`/`.section-inner` stay, colors follow updated tokens automatically. |

**Logo files, for later:** once you have the actual employer logos, drop them in
`src/assets/logos/` as SVG (preferred, scales cleanly at any size) or PNG, named by
company slug lowercase-hyphenated — e.g. `deloitte.svg`, `pwc.svg`. Tell me when they're
in place and I'll wire `LogoStrip`'s data array to point at them.

## 6. Copy (approved)

**Hero**
- Eyebrow: "AI & Data Consultant"
- Headline: "I build resilient, data-driven systems for financial services — and I'm
  moving toward fintech and e-commerce."
- Subtext: "I'm Aidiel, an AI & Data consultant at Deloitte SEA with a background in
  financial risk modeling at PwC. I care about turning regulatory complexity and messy
  data into systems that hold up in production — and I'm now applying that lens to
  fintech and e-commerce problems."
- CTAs: "View Projects" (primary) · "Contact Me" (secondary)

**Logo strip** — label: "Where I've Worked" — Deloitte, PwC (placeholder badges; only 2
real past employers, kept honest rather than padded with unrelated logos).

**Work Experience** (subtitle "Career Journey")
- *Consultant, AI & Data* — Deloitte Consulting SEA — 2024–Present: "Lead data engineer
  for QA automation using AWS Bedrock and Transcribe; architected customer churn
  prediction systems on SageMaker and EventBridge."
- *Associate, Financial Risk* — PwC Malaysia — 2022–2024: "Automated IFRS 9 credit risk
  modeling workflows in Python and R; built attrition models using LightGBM and XGBoost."

**Education & Certifications** — unchanged from current content (Masters of AI @
Universiti Malaya 2024–2026, BSc Mathematics & Statistics @ University of Manchester
2019–2022 First Class Honours, IB Diploma @ MARA College Banting 2017–2019 42/45; AWS
Certified ML Engineer – Associate 2026, AWS Cloud Practitioner 2025, Applied Data Science
Lab @ WorldQuant University 2024). Achievements (Yayasan Peneraju Scholarship, MARA YTP
Scholarship) stay attached to this section as today.

**Projects** (blurb + explicit outcome line each, no domain tags)
1. *Personal Portfolio & Serverless Architecture* — "Designed and deployed this site's
   own serverless backend on AWS — CI/CD, edge caching, WAF-protected APIs — as a live
   demonstration of production cloud architecture." Outcome: "A zero-maintenance,
   globally-cached site with sub-second load times and no idle infrastructure cost."
2. *Agentic GraphRAG Framework* (Master's Thesis) — "Built a hybrid knowledge-graph and
   retrieval system using LangChain and Neo4j to reason over cross-jurisdictional
   regulatory text across Southeast Asian markets." Outcome: "A framework that answers
   multi-hop regulatory compliance questions flat RAG pipelines can't handle."
3. *MYSignLingo* — "Built a real-time computer-vision app translating sign language to
   text, using MediaPipe for hand tracking and a TensorFlow classifier." Outcome: "A
   working prototype recognizing gestures in real time from a standard webcam, no
   specialized hardware."

**Skills grid**
- *Consulting & Strategy*: Stakeholder Management, Regulatory Compliance (IFRS 9), Risk
  Advisory, Project Delivery, Data Strategy, Cross-functional Leadership
- *Technical Tools*: Python, SQL, R, PyTorch, TensorFlow, LightGBM, XGBoost, AWS
  (SageMaker, Lambda, Bedrock, EventBridge), LangChain, Neo4j
- *Domain Knowledge*: Financial Risk Modeling, Credit Risk (IFRS 9), Cloud Architecture,
  MLOps, RegTech

**Contact** — "I'm always open to conversations about AI, data, and financial services —
particularly where they intersect with fintech and e-commerce. Reach out through any of
the channels below, or grab a copy of my resume." Plus a "Download Resume" button
(existing CV Google Drive link). Existing email/LinkedIn/GitHub/phone/location entries
unchanged.

**Footer tagline** (lightly tweaked from current): "Leveraging consulting expertise in
financial services to build resilient, AI-driven systems — with an eye toward fintech
and e-commerce."

## 7. Verification plan

- `npm run build` succeeds with no type errors.
- Manual check in a browser: both light and dark mode, at desktop and mobile widths, for
  every section — confirm contrast/readability against the new tokens, confirm the theme
  toggle persists across reload, confirm nav/mobile menu are legible in both themes
  (fixing the current hardcoded-white-nav bug), confirm the Hero particle network is
  visibly subtle rather than dominant.
- Confirm `/grocery` route still renders unaffected (untouched files, but worth a sanity
  check since it shares `App.tsx`/global CSS imports).
