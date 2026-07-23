# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio's visual theme (light-default with persisted dark toggle, cobalt/indigo palette) and page structure (Hero → Logo strip → Work Experience → Education & Certifications → Projects → Skills grid → Contact → Footer) per the approved spec.

**Architecture:** Retheme via CSS variable tokens already wired into `tailwind.config.ts` (`hsl(var(--x))` pattern) — no new styling system. Add `next-themes` (already a dependency) for the dark-mode toggle. Split the current combined "Experience" section into three focused components. Refresh copy across Hero/Experience/Projects/Skills/Contact/Footer per the approved draft. Remove decorative canvas/glassmorphism effects outside the Hero.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui (Radix), `next-themes`, `lucide-react`.

## Global Constraints

- No automated test framework exists in this repo (no Jest/Vitest, no `test` script in `package.json`). Every task's verification is: `npx tsc --noEmit` (type check), `npm run lint` (lint), and a manual check via `npm run dev` in a browser — per this project's standing rule that UI changes must be verified in a real browser, not just by type-checking.
- Design tokens use the exact hex/HSL values from the spec (`docs/superpowers/specs/2026-07-24-portfolio-redesign-design.md`, Section 3) — copy verbatim, do not approximate.
- Copy text uses the exact wording from the spec, Section 6 — already approved by the user.
- `next-themes` config: `attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`, `storageKey="portfolio-theme"`.
- Do not touch: `src/components/Analytics.tsx`, `src/pages/GroceryList.tsx` and its supporting files (`FoodItemInput.tsx`, `GroceryListGenerator.tsx`, `Receipt.tsx`, `LanguageSelector.tsx`, `src/data/foodCategories.ts`, `src/data/translations.ts`, `src/hooks/useGroceryFilter.ts`, `src/types/grocery.ts`), or any Amplify/deployment config.
- `src/components/header/ToolsDropdown.tsx` and `src/components/experience/AIGlowingSphere.tsx` are pre-existing orphaned files (never imported anywhere) — leave them untouched, do not import or delete them; they're outside this redesign's scope.
- Commit after every task with the working tree left in a buildable state.

---

### Task 1: Design tokens & base styles

**Files:**
- Modify: `src/styles/base.css`
- Modify: `tailwind.config.ts`
- Modify: `src/styles/components.css`

**Interfaces:**
- Produces: CSS custom properties `--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--accent-alt` (new), `--destructive`, `--destructive-foreground`, `--border`, `--input`, `--ring`, defined in both `:root` (light) and `.dark` (dark) blocks. A new Tailwind color utility `accent-alt` (e.g. `text-accent-alt`, `bg-accent-alt`) mapped to `--accent-alt`. Every later task's Tailwind classes (`bg-background`, `text-foreground`, `bg-muted`, `bg-card`, `border-border`, etc.) depend on these values being correct.

- [ ] **Step 1: Replace `src/styles/base.css` with light-default tokens + a `.dark` override block**

Replace the entire file contents with:

```css

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;

    --secondary: 216 38% 97%;
    --secondary-foreground: 222 47% 11%;

    --muted: 216 38% 97%;
    --muted-foreground: 217 11% 40%;

    --accent: 216 38% 97%;
    --accent-foreground: 222 47% 11%;

    --accent-alt: 244 55% 41%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;

    --border: 218 17% 91%;
    --input: 218 17% 91%;
    --ring: 221 83% 53%;

    --radius: 0.5rem;

    --sidebar-background: 0 0% 100%;
    --sidebar-foreground: 222 47% 11%;
    --sidebar-primary: 221 83% 53%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 216 38% 97%;
    --sidebar-accent-foreground: 222 47% 11%;
    --sidebar-border: 218 17% 91%;
    --sidebar-ring: 221 83% 53%;
  }

  .dark {
    --background: 220 49% 8%;
    --foreground: 220 23% 97%;

    --card: 221 39% 11%;
    --card-foreground: 220 23% 97%;

    --popover: 221 39% 11%;
    --popover-foreground: 220 23% 97%;

    --primary: 221 83% 53%;
    --primary-foreground: 0 0% 100%;

    --secondary: 221 39% 11%;
    --secondary-foreground: 220 23% 97%;

    --muted: 221 39% 11%;
    --muted-foreground: 219 32% 79%;

    --accent: 221 39% 11%;
    --accent-foreground: 220 23% 97%;

    --accent-alt: 244 55% 41%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 100%;

    --border: 219 27% 32%;
    --input: 219 27% 32%;
    --ring: 221 83% 53%;

    --sidebar-background: 220 49% 8%;
    --sidebar-foreground: 220 23% 97%;
    --sidebar-primary: 221 83% 53%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 221 39% 11%;
    --sidebar-accent-foreground: 220 23% 97%;
    --sidebar-border: 219 27% 32%;
    --sidebar-ring: 221 83% 53%;
  }
}

/* Global styles */
html {
  scroll-behavior: smooth;
}

body {
  @apply bg-background text-foreground antialiased relative;
  font-feature-settings: "rlig" 1, "calt" 1;
}

/* Modern scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--background));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
```

- [ ] **Step 2: Add the `accent-alt` color to `tailwind.config.ts`**

In `tailwind.config.ts`, inside `theme.extend.colors`, add a new entry right after the `accent` block (which currently ends at line 51 with `},`):

```ts
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				accentAlt: 'hsl(var(--accent-alt))',
```

- [ ] **Step 3: Remove unused glassmorphism classes and fix `.btn-primary` in `src/styles/components.css`**

Replace the file contents with:

```css

/* Button components */
.btn-primary {
  @apply inline-flex items-center justify-center rounded-md px-5 py-2.5 font-medium bg-primary text-primary-foreground shadow-md
  transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2;
}

.btn-secondary {
  @apply inline-flex items-center justify-center rounded-md px-5 py-2.5 font-medium bg-secondary text-secondary-foreground shadow-md
  transition-all duration-200 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2;
}

.btn-outline {
  @apply inline-flex items-center justify-center rounded-md border border-primary/40 px-5 py-2.5 font-medium text-primary shadow-md
  transition-all duration-200 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2;
}

/* Section layouts */
.section {
  @apply py-20 sm:py-28 relative overflow-hidden;
}

.section-inner {
  @apply container max-w-6xl mx-auto px-6 md:px-8;
}
```

This drops `.glass`, `.glass-card`, `.glass-card-dark` (only `.glass-card` was used, by `Projects.tsx` — that usage is removed in Task 6) and `.timeline-connector`/`.timeline-dot` (unused anywhere in the codebase — confirmed via `grep -rln "timeline-connector\|timeline-dot" src`, zero matches).

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser. The page should render with a white background and dark text (light theme is now the default — it will look visually broken/unstyled in places since no dark-mode toggle exists yet and several components still reference removed classes like `glass-card`; that's expected and fixed in later tasks). Confirm there's no console error about a missing CSS class.

- [ ] **Step 5: Commit**

```bash
git add src/styles/base.css src/styles/components.css tailwind.config.ts
git commit -m "feat: replace neon dark-only theme with light/dark token palette"
```

---

### Task 2: Theme toggle & header/nav

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/header/NavigationLinks.tsx`
- Modify: `src/components/header/MobileMenu.tsx`
- Modify: `src/components/ui/AnimatedLogo.tsx`

**Interfaces:**
- Consumes: Task 1's tokens (`bg-background`, `text-foreground`, `bg-muted`, `border-border`, etc.).
- Produces: `ThemeToggle` — default export, no props, renders a button that calls `next-themes`' `setTheme`. `useTheme()` from `next-themes` becomes available anywhere in the tree once `App.tsx` is wrapped in `ThemeProvider`. `NavigationLinks` and `MobileMenu` no longer take an `isScrolled` prop — later tasks touching `Header.tsx` must not reintroduce it.

- [ ] **Step 1: Create `src/components/ui/ThemeToggle.tsx`**

```tsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 flex items-center justify-center rounded-full text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
```

- [ ] **Step 2: Wrap the app in `next-themes`' `ThemeProvider` in `src/App.tsx`**

Replace the full file contents with:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import GroceryList from "./pages/GroceryList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="portfolio-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/grocery" element={<GroceryList />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
```

- [ ] **Step 3: Recolor `src/components/ui/AnimatedLogo.tsx` from neon green to cobalt**

Change (around lines 24-28):

```tsx
    // Theme Colors synced with your portfolio's orange
    // const primaryColor = 'rgba(249, 115, 22, 1)'; 
    // const particleColor = 'rgba(249, 115, 22, 0.4)';
    const primaryColor = 'rgba(57, 255, 20, 1)'; // Neon Green
    const particleColor = 'rgba(57, 255, 20, 0.2)'; // Fainter particles for better clarity
```

to:

```tsx
    const primaryColor = 'rgba(37, 99, 235, 1)'; // Cobalt
    const particleColor = 'rgba(37, 99, 235, 0.25)'; // Fainter particles for better clarity
```

Change (line 119):

```tsx
      className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]"
```

to:

```tsx
      className="w-[30px] h-[30px] md:w-[45px] md:h-[45px] drop-shadow-[0_0_8px_rgba(37,99,235,0.3)]"
```

- [ ] **Step 4: Rewrite `src/components/header/NavigationLinks.tsx` to be theme-aware and drop the `isScrolled` prop**

```tsx

import { NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu';

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

const NavigationLinks = () => (
  <>
    {navLinks.map((link) => (
      <NavigationMenuItem key={link.name}>
        <NavigationMenuLink
          href={link.href}
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 px-4 py-2"
        >
          {link.name}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ))}
  </>
);

export default NavigationLinks;
```

- [ ] **Step 5: Rewrite `src/components/header/MobileMenu.tsx` to be theme-aware and drop the CV download item**

```tsx
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md py-6 px-6 animate-fade-in border-t border-border">
      <nav className="flex flex-col space-y-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-lg font-medium text-foreground hover:text-primary py-2 transition-colors duration-200"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}

        <div className="pt-4">
          <a
            href="#contact"
            className="btn-primary flex justify-center py-3 text-base font-bold"
            onClick={onClose}
          >
            Get in Touch
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
```

- [ ] **Step 6: Rewrite `src/components/Header.tsx`**

```tsx

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from './ui/AnimatedLogo';
import ThemeToggle from './ui/ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from './ui/navigation-menu';
import NavigationLinks from './header/NavigationLinks';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center space-x-2 font-medium text-foreground">
            <AnimatedLogo />
            <span className="text-xl font-bold">AidielZiat</span>
          </a>

          <nav className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationLinks />
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle />

            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView();
              }}
              className="btn-primary text-sm ml-2"
            >
              Get in Touch
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
```

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser:
- Header background/text should be legible both before and after scrolling.
- Click the theme toggle: the whole page should flip to dark colors immediately (header, body, scrollbar), and the sun/moon icon should swap.
- Reload the page: the theme you picked should persist (this is `next-themes` writing to `localStorage` under the key `portfolio-theme`).
- Open the mobile menu (narrow the browser window): it should show "Experience", "Projects", and a "Get in Touch" button, legible in both themes, with no "Download CV" entry.
- The header logo mark should now animate in cobalt blue, not green.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/components/Header.tsx src/components/header/NavigationLinks.tsx src/components/header/MobileMenu.tsx src/components/ui/AnimatedLogo.tsx src/components/ui/ThemeToggle.tsx
git commit -m "feat: add light/dark theme toggle and make header theme-aware"
```

---

### Task 3: Hero section — copy, CTAs, and toned-down particle background

**Files:**
- Modify: `src/components/hero/HeroContent.tsx`
- Modify: `src/components/hero/ParticlesBackground.tsx`

**Interfaces:** Leaf task — no exports consumed elsewhere.

- [ ] **Step 1: Rewrite `src/components/hero/HeroContent.tsx`**

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';

const HeroContent = () => {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>({
    threshold: 0.2
  });
  const ctaRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.3
  });

  return (
    <div className="max-w-3xl">
      <p className="inline-block mb-4 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in border border-primary/20">
        AI & Data Consultant
      </p>

      <h1
        ref={titleRef}
        className="reveal-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground"
      >
        I build resilient, data-driven systems for financial services — and I'm moving toward fintech and e-commerce.
      </h1>

      <div ref={subtitleRef} className="reveal-text">
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          I'm Aidiel, an AI & Data consultant at Deloitte SEA with a background in financial risk modeling at PwC. I care about turning regulatory complexity and messy data into systems that hold up in production — and I'm now applying that lens to fintech and e-commerce problems.
        </p>
      </div>

      <div ref={ctaRef} className="reveal-text flex flex-wrap gap-4">
        <a href="#projects" className="btn-primary">
          View Projects
        </a>

        <a href="#contact" className="btn-secondary">
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
```

- [ ] **Step 2: Rewrite `src/components/hero/ParticlesBackground.tsx`** — keep the particle network, drop the glow-orb divs and dark gradient scrim, recolor to cobalt, halve the density, and dampen it in light mode via a wrapper opacity class

```tsx
import { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const particles: HTMLDivElement[] = [];
    const particlesContainer = document.querySelector('.particles-container');

    if (!particlesContainer) return;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 30}s`;
      particle.style.animationDuration = `${Math.random() * 15 + 15}s`;

      const hue = Math.random() * 20 + 213;
      const saturation = Math.random() * 30 + 70;
      const lightness = Math.random() * 30 + 50;
      particle.style.backgroundColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${Math.random() * 0.4 + 0.15})`;

      particlesContainer.appendChild(particle);
      particles.push(particle);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    let animationFrameId: number;
    const points: { x: number; y: number; vx: number; vy: number; radius: number; connections: number[] }[] = [];
    const maxDistance = 180;

    for (let i = 0; i < 60; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        connections: [],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((point, i) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        point.connections = [];

        points.forEach((otherPoint, j) => {
          if (i !== j) {
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance) point.connections.push(j);
          }
        });
      });

      points.forEach((point, i) => {
        point.connections.forEach(j => {
          if (i < j) {
            const otherPoint = points[j];
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const opacity = 1 - (distance / maxDistance);

            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${opacity * 0.15})`;
            ctx.lineWidth = Math.min(point.radius, otherPoint.radius) * 0.5;
            ctx.stroke();
          }
        });
      });

      points.forEach(point => {
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius * 4
        );
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
        gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.6)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateCanvasSize);
      particles.forEach(particle => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      });
    };
  }, []);

  return (
    <div className="absolute inset-0 opacity-40 dark:opacity-70 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="particles-container" />
    </div>
  );
};

export default ParticlesBackground;
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser:
- Hero headline/subtext match the new copy; only two CTA buttons ("View Projects", "Contact Me") appear, no CV/LinkedIn buttons.
- Clicking "View Projects" scrolls to the Projects section; "Contact Me" scrolls to Contact.
- The particle network in the Hero is cobalt-colored and noticeably subtler than before — in light mode it should be barely-there; in dark mode, visible but not dominant. No glowing orb blobs.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/HeroContent.tsx src/components/hero/ParticlesBackground.tsx
git commit -m "feat: refresh Hero copy and tone down particle background"
```

---

### Task 4: Logo strip, and Index.tsx cleanup

**Files:**
- Create: `src/components/LogoStrip.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/pages/Index.tsx`

**Interfaces:**
- Produces: `LogoStrip` — default export, no props. Internally: `interface LogoEntry { name: string; logoSrc?: string }`. When `logoSrc` is set on an entry, that entry renders an `<img>` instead of a text badge — this is the extension point for when real logo files are added later.
- `Hero.tsx`'s root `<section>` gains `id="home"` — from this task on, `Index.tsx` stops wrapping top-level sections in extra `<section id="...">` tags (several already define their own `id` internally, which was creating duplicate-id sections; see Step 3).

- [ ] **Step 1: Create `src/components/LogoStrip.tsx`**

```tsx
interface LogoEntry {
  name: string;
  logoSrc?: string;
}

const logos: LogoEntry[] = [
  { name: "Deloitte" },
  { name: "PwC" },
];

const LogoStrip = () => (
  <section className="py-12 bg-muted border-y border-border">
    <div className="section-inner">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
        Where I've Worked
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
        {logos.map((logo) => (
          <div key={logo.name} className="flex items-center justify-center h-10">
            {logo.logoSrc ? (
              <img
                src={logo.logoSrc}
                alt={logo.name}
                className="h-full w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
              />
            ) : (
              <span className="text-lg font-semibold text-muted-foreground tracking-wide">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LogoStrip;
```

- [ ] **Step 2: Add `id="home"` to `src/components/Hero.tsx`'s root section**

Change:

```tsx
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-8 overflow-hidden">
```

to:

```tsx
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 pb-8 overflow-hidden">
```

- [ ] **Step 3: Rewrite `src/pages/Index.tsx`** — drop the redundant outer `<section id="...">` wrappers (Hero/Projects/Experience/Contact already each render their own root `<section id="...">` internally, or now do after Step 2 — wrapping them again created two nested elements sharing the same `id`, which is invalid HTML), and insert `LogoStrip` after `Hero`

```tsx

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogoStrip from '@/components/LogoStrip';
import Project from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

const Index = () => {
  useEffect(() => {
    document.title = "AidielZiat Portfolio";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LogoStrip />
        <Project />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Index;
```

Note: this is an intermediate page order (Projects still before Experience) — the final order lands in Task 9 once every section exists.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser: a "Where I've Worked" strip with "Deloitte" and "PwC" text badges appears directly below the Hero. Clicking the header logo/site name (top-left) jumps to the top of the page.

- [ ] **Step 5: Commit**

```bash
git add src/components/LogoStrip.tsx src/components/Hero.tsx src/pages/Index.tsx
git commit -m "feat: add logo strip and remove duplicate section ids in Index"
```

---

### Task 5: Split resume section into Work Experience, Education & Certifications, and Skills grid

**Files:**
- Create: `src/components/ui/TimelineSection.tsx`
- Modify: `src/components/Experience.tsx`
- Create: `src/components/EducationCertifications.tsx`
- Create: `src/components/SkillsGrid.tsx`
- Modify: `src/pages/Index.tsx`

**Interfaces:**
- Produces: `TimelineSection` (`src/components/ui/TimelineSection.tsx`) — default export, props `{ title: string; icon: LucideIcon; items: TimelineItem[] }`; also exports `interface TimelineItem { title: string; subtitle: string; period: string; description?: string; details?: string[] }`. Consumed by both `Experience.tsx` and `EducationCertifications.tsx`.
- Produces: `Experience` (trimmed to Work Experience only, same `id="experience"` anchor other files already link to), `EducationCertifications` (new, `id="education"`), `SkillsGrid` (new, `id="skills"`) — all consumed by `Index.tsx`.

- [ ] **Step 1: Create the shared `src/components/ui/TimelineSection.tsx`**

```tsx
import type { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  details?: string[];
}

interface TimelineSectionProps {
  title: string;
  icon: LucideIcon;
  items: TimelineItem[];
}

const TimelineSection = ({ title, icon: Icon, items }: TimelineSectionProps) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
      <Icon size={24} className="text-primary" />
      <h3 className="text-2xl font-bold uppercase tracking-wider">{title}</h3>
    </div>
    <div className="space-y-8 border-l-2 border-primary/20 ml-3 pl-8 relative">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-primary/80">{item.period}</span>
            <h4 className="text-lg font-bold leading-tight">{item.title}</h4>
            <p className="text-muted-foreground font-medium">{item.subtitle}</p>
            {item.description && <p className="text-sm text-foreground/70 mt-1">{item.description}</p>}
            {item.details && (
              <ul className="mt-2 space-y-1">
                {item.details.map((detail, i) => (
                  <li key={i} className="text-xs text-foreground/60 flex gap-2">
                    <span className="text-primary">•</span> {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TimelineSection;
```

- [ ] **Step 2: Rewrite `src/components/Experience.tsx` to Work Experience only**

```tsx

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { Briefcase } from 'lucide-react';

const workExperience: TimelineItem[] = [
  {
    title: "Consultant, AI & Data",
    subtitle: "Deloitte Consulting SEA",
    period: "2024 - Present",
    details: [
      "Lead data engineer for QA automation using AWS Bedrock and Transcribe.",
      "Architected customer churn prediction systems on SageMaker and EventBridge."
    ]
  },
  {
    title: "Associate, Financial Risk",
    subtitle: "PwC Malaysia",
    period: "2022 - 2024",
    details: [
      "Automated IFRS 9 credit risk modeling workflows in Python and R.",
      "Built attrition models using LightGBM and XGBoost."
    ]
  }
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Work Experience" subtitle="Career Journey" />

        <div ref={sectionRef} className="reveal-text max-w-3xl mx-auto">
          <TimelineSection title="Experience" icon={Briefcase} items={workExperience} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
```

- [ ] **Step 3: Create `src/components/EducationCertifications.tsx`**

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { GraduationCap, Award, Trophy } from 'lucide-react';

const education: TimelineItem[] = [
  {
    title: "Masters of Artificial Intelligence",
    subtitle: "Universiti Malaya",
    period: "2024 - 2026 (Expected)",
    description: "Current CGPA: 4.0/4.0. Focused on Advanced Machine Learning and NLP."
  },
  {
    title: "BSc (Hons) Mathematics and Statistics",
    subtitle: "The University of Manchester",
    period: "2019 - 2022",
    description: "First Class Honours. Specialized in Multivariate Statistics and Machine Learning."
  },
  {
    title: "International Baccalaureate (IB) Diploma",
    subtitle: "MARA College, Banting",
    period: "2017 - 2019",
    description: "IB Score: 42/45 points."
  }
];

const certifications: TimelineItem[] = [
  { title: "AWS Certified Machine Learning Engineer - Associate", subtitle: "Amazon Web Services", period: "2026" },
  { title: "AWS Cloud Practitioner", subtitle: "Amazon Web Services", period: "2025" },
  { title: "Applied Data Science Lab", subtitle: "WorldQuant University", period: "2024" }
];

const achievements = [
  {
    title: "Yayasan Peneraju Scholarship",
    subtitle: "Professional Certification Funding"
  },
  {
    title: "MARA Young Talent Program (YTP) Scholarship",
    subtitle: "Selected for an education programme to study at a top 50 university in the United Kingdom."
  }
];

const EducationCertifications = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section bg-muted">
      <div className="section-inner">
        <SectionTitle title="Education & Certifications" subtitle="Academic Background" />

        <div ref={sectionRef} className="reveal-text grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          <div>
            <TimelineSection title="Education" icon={GraduationCap} items={education} />
            <TimelineSection title="Certifications" icon={Award} items={certifications} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
              <Trophy size={24} className="text-primary" />
              <h3 className="text-2xl font-bold uppercase tracking-wider">Achievements</h3>
            </div>
            <ul className="space-y-4 ml-3">
              {achievements.map((achievement, i) => (
                <li key={i} className="flex flex-col">
                  <span className="font-bold">{achievement.title}</span>
                  <span className="text-sm text-muted-foreground">{achievement.subtitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
```

- [ ] **Step 4: Create `src/components/SkillsGrid.tsx`**

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Consulting & Strategy",
    skills: ["Stakeholder Management", "Regulatory Compliance (IFRS 9)", "Risk Advisory", "Project Delivery", "Data Strategy", "Cross-functional Leadership"]
  },
  {
    name: "Technical Tools",
    skills: ["Python", "SQL", "R", "PyTorch", "TensorFlow", "LightGBM", "XGBoost", "AWS SageMaker", "AWS Lambda", "AWS Bedrock", "AWS EventBridge", "LangChain", "Neo4j"]
  },
  {
    name: "Domain Knowledge",
    skills: ["Financial Risk Modeling", "Credit Risk (IFRS 9)", "Cloud Architecture", "MLOps", "RegTech"]
  }
];

const SkillsGrid = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section bg-muted">
      <div className="section-inner">
        <SectionTitle title="Skills" subtitle="What I Work With" />

        <div ref={sectionRef} className="reveal-text grid grid-cols-1 md:grid-cols-3 gap-10">
          {skillCategories.map((category, idx) => (
            <div key={idx}>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsGrid;
```

- [ ] **Step 5: Wire the two new sections into `src/pages/Index.tsx`** (still not final order — Task 9 finishes that)

Change:

```tsx
import Project from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
```

to:

```tsx
import Project from '@/components/Projects';
import Experience from '@/components/Experience';
import EducationCertifications from '@/components/EducationCertifications';
import SkillsGrid from '@/components/SkillsGrid';
import Contact from '@/components/Contact';
```

Change:

```tsx
        <Project />
        <Experience />
        <Contact />
```

to:

```tsx
        <Project />
        <Experience />
        <EducationCertifications />
        <SkillsGrid />
        <Contact />
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser: the section that used to be a combined two-column "Experience" block is now three separate sections in order — "Work Experience" (Deloitte, PwC only, single column), "Education & Certifications" (two-column: Education+Certifications on the left, Achievements on the right), and "Skills" (three categories: Consulting & Strategy, Technical Tools, Domain Knowledge). The nav link "Experience" still scrolls to the Work Experience section.

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/TimelineSection.tsx src/components/Experience.tsx src/components/EducationCertifications.tsx src/components/SkillsGrid.tsx src/pages/Index.tsx
git commit -m "feat: split resume section into Work Experience, Education & Certifications, and Skills grid"
```

---

### Task 6: Projects section refresh

**Files:**
- Modify: `src/components/Projects.tsx`

**Interfaces:** Leaf task — `id="projects"` anchor unchanged, no exports consumed elsewhere.

- [ ] **Step 1: Rewrite `src/components/Projects.tsx`** — equal-weight cards (drop the `isLarge` two-tier layout), blurb + explicit outcome line per project, no domain tags, flat `bg-card`/`border-border` surfaces (no `glass-card`, no `dark-gradient-bg`)

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Cloud, BrainCircuit, Smartphone } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import { Card, CardContent } from './ui/card';

interface ProjectItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  outcome: string;
  techStack: string[];
}

const ProjectCard = ({ icon, title, subtitle, description, outcome, techStack }: ProjectItemProps) => {
  const itemRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={itemRef} className="reveal-text h-full">
      <Card className="h-full bg-card border-border hover:border-primary/40 transition-all duration-300 group flex flex-col">
        <CardContent className="p-8 flex flex-col flex-grow">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold leading-tight">{title}</h3>
              {subtitle && <p className="text-primary/80 text-sm font-semibold mt-1 uppercase tracking-wide">{subtitle}</p>}
            </div>
          </div>

          <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
            {description}
          </p>

          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            <span className="font-semibold text-foreground">Outcome: </span>
            {outcome}
          </p>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold bg-primary/5 text-primary/80 border border-primary/10 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProjectsSection = () => {
  const titleRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="projects" className="section bg-background">
      <div className="section-inner">
        <div ref={titleRef} className="reveal-text">
          <SectionTitle subtitle="Featured Work" title="Projects" align="left" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProjectCard
            icon={<Cloud className="h-7 w-7" />}
            title="Personal Portfolio & Serverless Architecture"
            subtitle="Cloud Engineering"
            description="Designed and deployed this site's own serverless backend on AWS — CI/CD, edge caching, WAF-protected APIs — as a live demonstration of production cloud architecture."
            outcome="A zero-maintenance, globally-cached site with sub-second load times and no idle infrastructure cost."
            techStack={["React", "TypeScript", "AWS Amplify", "Lambda", "DynamoDB", "CloudFront"]}
          />

          <ProjectCard
            icon={<BrainCircuit className="h-7 w-7" />}
            title="Agentic GraphRAG Framework"
            subtitle="Master's Thesis · Universiti Malaya"
            description="Built a hybrid knowledge-graph and retrieval system using LangChain and Neo4j to reason over cross-jurisdictional regulatory text across Southeast Asian markets."
            outcome="A framework that answers multi-hop regulatory compliance questions flat RAG pipelines can't handle."
            techStack={["Python", "LangChain", "Neo4j", "Bedrock"]}
          />

          <ProjectCard
            icon={<Smartphone className="h-7 w-7" />}
            title="MYSignLingo"
            subtitle="Master's Coursework · Universiti Malaya"
            description="Built a real-time computer-vision app translating sign language to text, using MediaPipe for hand tracking and a TensorFlow classifier."
            outcome="A working prototype recognizing gestures in real time from a standard webcam, no specialized hardware."
            techStack={["Computer Vision", "Python", "MediaPipe", "TensorFlow"]}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser: three equal-sized project cards in a row (stacked on mobile), each with an icon, title, description, a bolded "Outcome:" line, and a tech-stack pill row. Cards have a visible border, no frosted-glass blur, and brighten their border on hover. Check both themes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: refresh Projects section copy and flatten card styling"
```

---

### Task 7: Contact section refresh

**Files:**
- Modify: `src/components/Contact.tsx`

**Interfaces:** Leaf task — `id="contact"` anchor unchanged.

- [ ] **Step 1: Rewrite `src/components/Contact.tsx`** — new intro copy, add a "Download Resume" button (CV link moved here from Header/Hero/MobileMenu), drop the neon `dark-gradient-bg` overlay and the dead commented-out Twitter block

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Linkedin, MapPin, Phone, Github, FileText } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const Contact = () => {
  const contactRef = useScrollReveal<HTMLDivElement>();

  const handleDownloadCV = () => {
    window.open('https://drive.google.com/file/d/1PFyfHnXQnkTnuCyh9YX7ExW4xQGVK5EA/view?usp=drive_link', '_blank');
  };

  return (
    <section id="contact" className="section bg-background relative scroll-mt-24">
      <div className="section-inner relative z-10">
        <SectionTitle
          title="Get in Touch"
          subtitle="Contact Me"
        />

        <div className="max-w-2xl mx-auto">
          <div
            ref={contactRef}
            className="reveal-text space-y-6"
          >
            <h3 className="text-2xl font-bold text-center">Let's Connect</h3>
            <p className="text-foreground/80 text-center">
              I'm always open to conversations about AI, data, and financial services — particularly where they intersect with fintech and e-commerce. Reach out through any of the channels below, or grab a copy of my resume.
            </p>

            <div className="flex justify-center pt-2">
              <button onClick={handleDownloadCV} className="btn-primary flex items-center gap-2">
                <FileText size={18} />
                Download Resume
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:aidiel.haikal0708@gmail.com" className="font-medium hover:text-primary transition-colors">
                    aidiel.haikal0708@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Linkedin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/mohamedziat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    linkedin.com/in/mohamedziat
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Github size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <a
                    href="https://github.com/AidielZiat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    github.com/AidielZiat
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+60122803585" className="font-medium hover:text-primary transition-colors">
                    +60 19 854 0708
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

Run: `npm run dev`, open the site in a browser: the Contact section shows the new intro paragraph, a "Download Resume" button that opens the CV link in a new tab, and the existing email/LinkedIn/GitHub/phone/location rows. Check both themes.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: refresh Contact section copy and add resume download"
```

---

### Task 8: Footer refresh and cleanup

**Files:**
- Modify: `src/components/Footer.tsx`
- Delete: `src/components/ui/GlowingCircle.tsx`

**Interfaces:** Leaf task.

- [ ] **Step 1: Rewrite `src/components/Footer.tsx`** — retheme to new tokens, remove the `GlowingCircle` (`NetworkPulse`) canvas decoration, update the tagline, drop dead commented-out blocks and unused imports, and fix a pre-existing wrong email in the "Contact" column (`hisham.mohamaf@gmail.com`, a leftover from the template this repo was originally cloned from — should be the real contact email already used everywhere else on the site)

```tsx

import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background border-t border-border relative">
      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-4">Aidiel Ziat</h3>
            <p className="text-muted-foreground mb-6">
              Leveraging consulting expertise in financial services to build resilient, AI-driven systems — with an eye toward fintech and e-commerce.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/mohamedziat/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/AidielZiat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Pages</h3>
            <ul className="space-y-2.5">
              <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-muted-foreground mb-4">
              Ready to collaborate? Let's get in touch!
            </p>
            <a
              href="mailto:aidiel.haikal0708@gmail.com"
              className="inline-flex items-center text-primary hover:underline"
            >
              <Mail size={18} className="mr-2" />
              aidiel.haikal0708@gmail.com
            </a>
            <div className="mt-2">
              <a
                href="https://github.com/AidielZiat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} className="mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aidiel Ziat. All rights reserved.
          </p>

          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Delete `src/components/ui/GlowingCircle.tsx`**

```bash
rm src/components/ui/GlowingCircle.tsx
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors — confirms nothing else still imports `GlowingCircle`.

Run: `npm run dev`, open the site in a browser: the footer no longer shows an animated glowing canvas, colors match the new tokens in both themes, and the "Contact" column email link now points to `aidiel.haikal0708@gmail.com`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git rm src/components/ui/GlowingCircle.tsx
git commit -m "feat: refresh Footer styling and remove unused glow decoration"
```

---

### Task 9: Final page order and full verification

**Files:**
- Modify: `src/pages/Index.tsx`

**Interfaces:** Consumes every component produced in Tasks 2-8.

- [ ] **Step 1: Reorder `src/pages/Index.tsx` into the final approved page structure**

```tsx

import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogoStrip from '@/components/LogoStrip';
import Experience from '@/components/Experience';
import EducationCertifications from '@/components/EducationCertifications';
import Project from '@/components/Projects';
import SkillsGrid from '@/components/SkillsGrid';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

const Index = () => {
  useEffect(() => {
    document.title = "AidielZiat Portfolio";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LogoStrip />
        <Experience />
        <EducationCertifications />
        <Project />
        <SkillsGrid />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Index;
```

- [ ] **Step 2: Verify — type check and lint**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Verify — production build**

Run: `npm run build`
Expected: build succeeds (this is what AWS Amplify runs on deploy — a failure here would break the live site).

- [ ] **Step 4: Verify — full manual browser walkthrough**

Run `npm run dev` and, in a browser, confirm each of these (per the spec's verification plan):

- Scrolling top to bottom, the page order is: Hero → Logo strip → Work Experience → Education & Certifications → Projects → Skills → Contact → Footer.
- Every header nav link (desktop and mobile) and every Footer "Pages" link scrolls to the correct section: Home → Hero, Experience → Work Experience, Projects → Projects, Contact → Contact.
- Toggle dark mode: re-check every section (Hero, Logo strip, Work Experience, Education & Certifications, Projects, Skills, Contact, Footer) for readable contrast and correct alternating section-background tone (white/near-black for Hero, Work Experience, Projects, Contact; the slightly tinted `F6F8FB`/`#111827` for Logo strip, Education & Certifications, Skills, Footer background stays `bg-background`).
- Reload the page after toggling dark mode: the theme persists.
- Resize to a mobile width: mobile menu opens/closes correctly, all sections stack cleanly, no horizontal scroll.
- The Hero particle network is present but subtle in both themes.
- Visit `/grocery` directly: it still renders (untouched by this redesign — sanity check that shared `App.tsx`/global CSS changes didn't break it).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "feat: finalize portfolio page order per redesign spec"
```
