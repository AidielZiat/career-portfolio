# Portfolio Redesign Revisions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the user's round-2 feedback (given after visually reviewing the round-1 redesign live) to the portfolio: revert Hero copy, remove the logo strip, restyle Work Experience as a logo-timeline, merge Certifications+Achievements into a badge grid, make Projects an auto-sliding carousel, simplify Contact, and trim the Footer down to just the copyright/back-to-top bar.

**Architecture:** All changes are scoped edits to existing components from the round-1 redesign (`docs/superpowers/plans/2026-07-24-portfolio-redesign.md`). No new dependencies — the auto-sliding carousel reuses the shadcn/embla `Carousel` primitives already in `src/components/ui/carousel.tsx` (embla-carousel-react is already installed), with autoplay implemented manually (no `embla-carousel-autoplay` package) via `setApi` + `setInterval` + a hover-pause ref, since that plugin isn't currently a dependency and this keeps the tech stack unchanged.

**Tech Stack:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui (Radix), embla-carousel-react (already installed), `lucide-react`.

## Global Constraints

- No automated test framework exists in this repo. Every task's verification is: `npx tsc --noEmit`, `npm run lint` (baseline: only the same pre-existing errors documented in the round-1 plan — `command.tsx:24`, `textarea.tsx:5`, `tailwind.config.ts` require-import line — no others), and a manual check via the already-running `npm run dev` server (http://localhost:8080/).
- Every section's root `<section>` must use `bg-background` (uniform background, no alternating tinted bands) — this is a deliberate reversal of round-1's alternating `bg-muted`/`bg-background` pattern.
- Do not touch: `src/components/Analytics.tsx`, the `/grocery` route and its files, deployment/Amplify config.
- Where an item introduces content with no real asset yet (company logos in the Work Experience timeline, certification/achievement badge images), follow the same placeholder-now/real-later convention established in round 1 for the (now-removed) logo strip: a clean placeholder today, with an optional `logoSrc`/`badgeSrc` field on the data so swapping in a real image later is a one-line data change, not a rewrite.
- Commit after every task with the working tree left in a buildable state.

---

### Task R1: Revert Hero headline and subtext

**Files:**
- Modify: `src/components/hero/HeroContent.tsx`

**Interfaces:** Leaf task — no exports consumed elsewhere. CTAs ("View Projects" / "Contact Me") and the "AI & Data Consultant" eyebrow badge are unchanged — only the `<h1>` and the paragraph below it change.

- [ ] **Step 1: Replace the headline and subtext in `src/components/hero/HeroContent.tsx`**

Change:

```tsx
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
```

to:

```tsx
      <h1
        ref={titleRef}
        className="reveal-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground"
      >
        Creating the best experiences for users, with a focus on AI and data-driven solutions.
      </h1>

      <div ref={subtitleRef} className="reveal-text">
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4">
          Hey there! I'm Aidiel, a Consultant in AI & Data at Deloitte SEA.
        </p>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          I enjoy working with teams to drive innovation and deliver experiences to users. Feel free to explore my portfolio to see how I've contributed to various projects and initiatives in the tech space.
        </p>
      </div>
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors.
Check in the browser (http://localhost:8080/, already running): Hero shows the two-paragraph copy above exactly, CTAs unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/HeroContent.tsx
git commit -m "feat: revert Hero headline and subtext to original copy"
```

---

### Task R2: Remove the logo strip and make every section background uniform

**Files:**
- Delete: `src/components/LogoStrip.tsx`
- Modify: `src/pages/Index.tsx`
- Modify: `src/components/EducationCertifications.tsx`
- Modify: `src/components/SkillsGrid.tsx`

**Interfaces:** `Index.tsx` no longer imports or renders `LogoStrip`. After this task every top-level section (`Hero`, `Experience`, `EducationCertifications`, `Project`, `SkillsGrid`, `Contact`) uses `bg-background` — none use `bg-muted`.

- [ ] **Step 1: Delete `src/components/LogoStrip.tsx`**

```bash
rm src/components/LogoStrip.tsx
```

- [ ] **Step 2: Remove the `LogoStrip` import and usage from `src/pages/Index.tsx`**

Change:

```tsx
import Hero from '@/components/Hero';
import LogoStrip from '@/components/LogoStrip';
import Experience from '@/components/Experience';
```

to:

```tsx
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
```

Change:

```tsx
        <Hero />
        <LogoStrip />
        <Experience />
```

to:

```tsx
        <Hero />
        <Experience />
```

- [ ] **Step 3: Change `EducationCertifications.tsx`'s section background from `bg-muted` to `bg-background`**

Change:

```tsx
    <section id="education" className="section bg-muted">
```

to:

```tsx
    <section id="education" className="section bg-background">
```

- [ ] **Step 4: Change `SkillsGrid.tsx`'s section background from `bg-muted` to `bg-background`**

Change:

```tsx
    <section id="skills" className="section bg-muted">
```

to:

```tsx
    <section id="skills" className="section bg-background">
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors, and confirm nothing else still imports `LogoStrip` (a stale import would be a compile error, so `tsc` passing is sufficient confirmation).
Check in the browser: no "Where I've Worked" strip appears below the Hero anymore; scrolling through the whole page shows one continuous background color per theme, no visible band/color change between sections (Experience, Education & Certifications, Projects, Skills, Contact all look the same shade).

- [ ] **Step 6: Commit**

```bash
git add -A src/components/LogoStrip.tsx src/pages/Index.tsx src/components/EducationCertifications.tsx src/components/SkillsGrid.tsx
git commit -m "feat: remove logo strip and make section backgrounds uniform"
```

---

### Task R3: Restyle Work Experience as a centered logo-timeline

**Files:**
- Modify: `src/components/Experience.tsx`

**Interfaces:** `id="experience"` unchanged (nav links depend on it). This task stops using the shared `TimelineSection` component for Work Experience specifically (it stays in use elsewhere, by `EducationCertifications.tsx` for Education) — the new layout (circular logo node, left-column date, right-column description) is different enough from the generic bullet-list timeline that it doesn't fit `TimelineSection`'s shape, and it has only one consumer, so it's implemented directly in this file rather than extracted.

- [ ] **Step 1: Rewrite `src/components/Experience.tsx`**

```tsx

import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';

interface WorkExperienceItem {
  company: string;
  companyInitial: string;
  logoSrc?: string;
  role: string;
  period: string;
  description: string;
}

const workExperience: WorkExperienceItem[] = [
  {
    company: "Deloitte Consulting SEA",
    companyInitial: "D",
    role: "Consultant, AI & Data",
    period: "2024 - Present",
    description: "Lead data engineer for QA automation using AWS Bedrock and Transcribe, and architected customer churn prediction systems on SageMaker and EventBridge."
  },
  {
    company: "PwC Malaysia",
    companyInitial: "P",
    role: "Associate, Financial Risk",
    period: "2022 - 2024",
    description: "Automated IFRS 9 credit risk modeling workflows in Python and R, and built attrition models using LightGBM and XGBoost."
  }
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Work Experience" subtitle="Career Journey" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto relative">
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px border-l-2 border-dashed border-border -translate-x-1/2" />

          <div className="space-y-10 md:space-y-14">
            {workExperience.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:items-center"
              >
                <div className="flex items-center gap-4 md:block md:text-right">
                  <div className="md:hidden w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-lg font-bold text-primary shrink-0">
                    {item.logoSrc ? (
                      <img src={item.logoSrc} alt={item.company} className="w-full h-full object-contain rounded-full" />
                    ) : (
                      item.companyInitial
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.company}</h4>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                  </div>
                </div>

                <div className="hidden md:flex relative z-10 w-16 h-16 rounded-full bg-card border border-border shadow-sm items-center justify-center text-xl font-bold text-primary shrink-0">
                  {item.logoSrc ? (
                    <img src={item.logoSrc} alt={item.company} className="w-full h-full object-contain rounded-full" />
                  ) : (
                    item.companyInitial
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold">{item.role}</h4>
                  <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors.
Check in the browser: Work Experience now shows a centered vertical dashed line (desktop) with a circular badge (company initial) per entry, company name + dates to the left, role + description to the right, exactly two entries (Deloitte, PwC). On a narrow/mobile width, it stacks into a single column with the circle inline next to the company name.

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.tsx
git commit -m "feat: restyle Work Experience as a centered logo timeline"
```

---

### Task R4: Merge Certifications and Achievements into a badge grid

**Files:**
- Modify: `src/components/EducationCertifications.tsx`

**Interfaces:** `id="education"` unchanged. `Education` (via the shared `TimelineSection`) is unchanged in content and stays full-width now (the old two-column split with Achievements in a side column is gone). The old `certifications: TimelineItem[]` array and the old plain-list `achievements` are replaced by one combined `certificationsAndAchievements` badge array feeding a badge-grid layout.

- [ ] **Step 1: Rewrite `src/components/EducationCertifications.tsx`**

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { GraduationCap, Award } from 'lucide-react';

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

interface BadgeItem {
  name: string;
  issuer: string;
  badgeSrc?: string;
}

const certificationsAndAchievements: BadgeItem[] = [
  { name: "AWS Certified Machine Learning Engineer - Associate", issuer: "Amazon Web Services" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
  { name: "Applied Data Science Lab", issuer: "WorldQuant University" },
  { name: "Yayasan Peneraju Scholarship", issuer: "Professional Certification Funding" },
  { name: "MARA Young Talent Program (YTP) Scholarship", issuer: "UK University Placement" }
];

const EducationCertifications = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Education & Certifications" subtitle="Academic Background" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto">
          <TimelineSection title="Education" icon={GraduationCap} items={education} />

          <div>
            <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
              <Award size={24} className="text-primary" />
              <h3 className="text-2xl font-bold uppercase tracking-wider">Certifications & Achievements</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {certificationsAndAchievements.map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  {badge.badgeSrc ? (
                    <img src={badge.badgeSrc} alt={badge.name} className="w-20 h-20 object-contain" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Award className="w-9 h-9 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold leading-tight">{badge.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{badge.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors.
Check in the browser: Education timeline is unchanged in content (3 entries, full width). Below it, "Certifications & Achievements" shows a 5-item badge grid (icon-in-a-rounded-square + name + issuer caption), wrapping to fewer columns on narrower widths. No more two-column split, no more separate "Achievements" trophy block.

- [ ] **Step 3: Commit**

```bash
git add src/components/EducationCertifications.tsx
git commit -m "feat: merge Certifications and Achievements into a badge grid"
```

---

### Task R5: Make Projects an auto-sliding carousel

**Files:**
- Modify: `src/components/Projects.tsx`

**Interfaces:** `id="projects"` unchanged. `ProjectCard` keeps the same prop shape (`{ icon, title, subtitle?, description, outcome, techStack }`) from round 1, just no longer wraps itself in a `useScrollReveal` ref (scroll-reveal-on-first-view doesn't apply cleanly to carousel slides that are off-screen via transform, not layout, so it's dropped for this component only — the section title above it keeps its own reveal).

- [ ] **Step 1: Rewrite `src/components/Projects.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Cloud, BrainCircuit, Smartphone } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from './ui/carousel';

interface ProjectItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  outcome: string;
  techStack: string[];
}

const ProjectCard = ({ icon, title, subtitle, description, outcome, techStack }: ProjectItemProps) => (
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
);

const projects: ProjectItemProps[] = [
  {
    icon: <Cloud className="h-7 w-7" />,
    title: "Personal Portfolio & Serverless Architecture",
    subtitle: "Cloud Engineering",
    description: "Designed and deployed this site's own serverless backend on AWS — CI/CD, edge caching, WAF-protected APIs — as a live demonstration of production cloud architecture.",
    outcome: "A zero-maintenance, globally-cached site with sub-second load times and no idle infrastructure cost.",
    techStack: ["React", "TypeScript", "AWS Amplify", "Lambda", "DynamoDB", "CloudFront"]
  },
  {
    icon: <BrainCircuit className="h-7 w-7" />,
    title: "Agentic GraphRAG Framework",
    subtitle: "Master's Thesis · Universiti Malaya",
    description: "Built a hybrid knowledge-graph and retrieval system using LangChain and Neo4j to reason over cross-jurisdictional regulatory text across Southeast Asian markets.",
    outcome: "A framework that answers multi-hop regulatory compliance questions flat RAG pipelines can't handle.",
    techStack: ["Python", "LangChain", "Neo4j", "Bedrock"]
  },
  {
    icon: <Smartphone className="h-7 w-7" />,
    title: "MYSignLingo",
    subtitle: "Master's Coursework · Universiti Malaya",
    description: "Built a real-time computer-vision app translating sign language to text, using MediaPipe for hand tracking and a TensorFlow classifier.",
    outcome: "A working prototype recognizing gestures in real time from a standard webcam, no specialized hardware.",
    techStack: ["Computer Vision", "Python", "MediaPipe", "TensorFlow"]
  }
];

const AUTOPLAY_INTERVAL_MS = 4000;

const ProjectsSection = () => {
  const titleRef = useScrollReveal<HTMLDivElement>();
  const [api, setApi] = useState<CarouselApi>();
  const isHovering = useRef(false);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (isHovering.current) return;
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section id="projects" className="section bg-background">
      <div className="section-inner">
        <div ref={titleRef} className="reveal-text">
          <SectionTitle subtitle="Featured Work" title="Projects" align="left" />
        </div>

        <div
          onMouseEnter={() => { isHovering.current = true; }}
          onMouseLeave={() => { isHovering.current = false; }}
        >
          <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent>
              {projects.map((project, i) => (
                <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <ProjectCard {...project} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-3 mt-8">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors.
Check in the browser: Projects section shows a horizontally-sliding carousel (1 card per view on mobile, 2 on tablet, 3 on desktop) that auto-advances roughly every 4 seconds and loops; hovering over the carousel pauses the auto-advance; the two circular prev/next buttons below the carousel work; all three projects' content matches what was there before (same title/description/outcome/tech-stack text, just in carousel slides now instead of a static grid).

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.tsx
git commit -m "feat: make Projects section an auto-sliding carousel"
```

---

### Task R6: Simplify Contact section (remove phone/location, add LinkedIn to a compact link list)

**Files:**
- Modify: `src/components/Contact.tsx`

**Interfaces:** `id="contact"` unchanged. The `handleDownloadCV` function and its Google Drive URL are unchanged and stay in this file (the "Download Resume" button stays in Contact, per explicit user instruction — it does NOT move to the footer).

- [ ] **Step 1: Rewrite `src/components/Contact.tsx`**

```tsx
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
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

        <div className="max-w-md mx-auto text-center">
          <div ref={contactRef} className="reveal-text space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <p className="text-muted-foreground">
                Ready to collaborate? Let's get in touch!
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href="mailto:aidiel.haikal0708@gmail.com"
                className="inline-flex items-center text-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} className="mr-2" />
                aidiel.haikal0708@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/mohamedziat/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} className="mr-2" />
                linkedin.com/in/mohamedziat
              </a>
              <a
                href="https://github.com/AidielZiat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:text-primary transition-colors"
              >
                <Github size={18} className="mr-2" />
                github.com/AidielZiat
              </a>
            </div>

            <div className="flex justify-center pt-2">
              <button onClick={handleDownloadCV} className="btn-primary flex items-center gap-2">
                <FileText size={18} />
                Download Resume
              </button>
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

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors.
Check in the browser: Contact section shows "Contact" / "Ready to collaborate? Let's get in touch!" then Email, LinkedIn, GitHub as plain text links in that order (no circular icon backgrounds, no Phone or Location rows), and the "Download Resume" button below them still opens the CV link in a new tab.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: simplify Contact section, add LinkedIn, drop phone and location"
```

---

### Task R7: Trim Footer down to copyright + Back to top only

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:** `Footer` keeps the same default export (no props), still rendered from `Index.tsx` (no change needed there) — only its internal content shrinks.

- [ ] **Step 1: Rewrite `src/components/Footer.tsx`** — remove the entire 3-column grid (name/tagline/social icons, Pages links, Contact column), keep only the copyright line and "Back to top" button

```tsx

import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background relative">
      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
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

Note: this drops the `border-t border-border` that previously sat on the `<footer>` tag, consistent with Task R2's "no dividers between sections" change, and drops the now-unused `Github`/`Linkedin`/`Mail` icon imports (nothing in this trimmed file uses them anymore).

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors (confirms no unused-import issue slipped through, though note `no-unused-vars` is off in this repo's eslint config so this is a manual read-check, not something lint would catch).
Check in the browser: after Contact, the page ends with a thin bar showing only the copyright line and a working "Back to top" button — no "Aidiel Ziat" name/tagline, no social icons, no "Pages" list, no separate "Contact" column.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: trim Footer to copyright and Back to top only"
```

---

### Task R8: Replace the snap-carousel Projects with a continuously-scrolling marquee

**Files:**
- Modify: `src/components/Projects.tsx`
- Modify: `src/styles/animations.css`

**Interfaces:** `id="projects"` unchanged. `ProjectItemProps`/`ProjectCard` keep the same shape as R5, minus the `useScrollReveal` per-card wrapper (already dropped in R5). This task removes R5's embla `Carousel`/`CarouselContent`/`CarouselItem`/`CarouselPrevious`/`CarouselNext`/`CarouselApi` usage and the `setApi`/`useEffect`/`useRef`/`useState`/`isHovering`/`setInterval` autoplay machinery entirely, replacing it with a pure-CSS infinite marquee (continuous constant-speed horizontal scroll, not discrete slide-and-pause), reusing the `@keyframes marquee` already defined in `src/styles/animations.css` (previously only used by the unrelated `.marquee`/`.marquee-content` utility classes, which stay as-is — this task adds new, separate classes for the project cards row rather than reusing `.marquee-content` directly, since that class is `inline-block`/`whitespace-nowrap`-based and the project cards need `flex`).

**Context:** The user showed the actual rendered HTML of their colleague's Projects section, which uses a continuously-translating flex track (`transform: translate3d(...)`) — always moving at a constant rate, not embla's discrete snap-to-next-slide-every-N-seconds behavior implemented in R5. This task swaps to that continuous-motion technique. To keep scope tight, this implements the core ask (constant-speed auto-scroll, pauses on hover) without the colleague's additional drag-to-scroll and manual prev/next-button position-tracking, which would be substantially more code for a "nice to have" on top of the already-satisfied core request.

- [ ] **Step 1: Add marquee-track keyframe reuse and new pause-on-hover CSS to `src/styles/animations.css`**

Add this block right after the existing `@keyframes marquee { ... }` block (do not duplicate the keyframe — reuse it by name):

```css
/* Continuously-scrolling project cards row (reuses the `marquee` keyframe above) */
.projects-marquee {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
}

.projects-marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.projects-marquee:hover .projects-marquee-track {
  animation-play-state: paused;
}
```

- [ ] **Step 2: Rewrite `src/components/Projects.tsx`**

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

const ProjectCard = ({ icon, title, subtitle, description, outcome, techStack }: ProjectItemProps) => (
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
);

const projects: ProjectItemProps[] = [
  {
    icon: <Cloud className="h-7 w-7" />,
    title: "Personal Portfolio & Serverless Architecture",
    subtitle: "Cloud Engineering",
    description: "Designed and deployed this site's own serverless backend on AWS — CI/CD, edge caching, WAF-protected APIs — as a live demonstration of production cloud architecture.",
    outcome: "A zero-maintenance, globally-cached site with sub-second load times and no idle infrastructure cost.",
    techStack: ["React", "TypeScript", "AWS Amplify", "Lambda", "DynamoDB", "CloudFront"]
  },
  {
    icon: <BrainCircuit className="h-7 w-7" />,
    title: "Agentic GraphRAG Framework",
    subtitle: "Master's Thesis · Universiti Malaya",
    description: "Built a hybrid knowledge-graph and retrieval system using LangChain and Neo4j to reason over cross-jurisdictional regulatory text across Southeast Asian markets.",
    outcome: "A framework that answers multi-hop regulatory compliance questions flat RAG pipelines can't handle.",
    techStack: ["Python", "LangChain", "Neo4j", "Bedrock"]
  },
  {
    icon: <Smartphone className="h-7 w-7" />,
    title: "MYSignLingo",
    subtitle: "Master's Coursework · Universiti Malaya",
    description: "Built a real-time computer-vision app translating sign language to text, using MediaPipe for hand tracking and a TensorFlow classifier.",
    outcome: "A working prototype recognizing gestures in real time from a standard webcam, no specialized hardware.",
    techStack: ["Computer Vision", "Python", "MediaPipe", "TensorFlow"]
  }
];

// Rendered twice back-to-back so the marquee's `translateX(-50%)` end point
// lines up exactly with where the duplicate set begins, making the loop seamless.
const trackProjects = [...projects, ...projects];

const ProjectsSection = () => {
  const titleRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="projects" className="section bg-background">
      <div className="section-inner">
        <div ref={titleRef} className="reveal-text">
          <SectionTitle subtitle="Featured Work" title="Projects" align="left" />
        </div>

        <div className="projects-marquee">
          <div className="projects-marquee-track">
            {trackProjects.map((project, i) => (
              <div key={i} className="w-[320px] shrink-0 pr-8">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors (baseline at this point: 3 pre-existing errors — `command.tsx:24`, `textarea.tsx:5`, `tailwind.config.ts` require-import line).
Run: `npm run build` — expect success.
Check in the browser (dev server already running on port 8080): the Projects row scrolls continuously and smoothly to the left at a constant speed (not snapping card-by-card with pauses), loops seamlessly with no visible jump/reset, and stops moving while the mouse hovers anywhere over the row, resuming when the mouse leaves. Confirm `package.json` is untouched (no new dependency — this removes the embla `Carousel` usage rather than adding anything).

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.tsx src/styles/animations.css
git commit -m "feat: replace snap-carousel Projects with a continuous marquee"
```

---

### Task R9: Add Education to nav, add spacing in Education & Certifications, remove redundant Contact heading

**Files:**
- Modify: `src/components/header/NavigationLinks.tsx`
- Modify: `src/components/header/MobileMenu.tsx`
- Modify: `src/components/EducationCertifications.tsx`
- Modify: `src/components/Contact.tsx`

**Interfaces:** No prop/type changes anywhere — these are all small, self-contained edits within existing components.

- [ ] **Step 1: Add an "Education" nav link to `src/components/header/NavigationLinks.tsx`**

Change:

```tsx
const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];
```

to:

```tsx
const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
];
```

- [ ] **Step 2: Add the same "Education" nav link to `src/components/header/MobileMenu.tsx`**

Change:

```tsx
const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];
```

to:

```tsx
const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
];
```

- [ ] **Step 3: Add spacing between the Education timeline and the Certifications & Achievements badge grid in `src/components/EducationCertifications.tsx`**

Change:

```tsx
          <TimelineSection title="Education" icon={GraduationCap} items={education} />

          <div>
            <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
              <Award size={24} className="text-primary" />
              <h3 className="text-2xl font-bold uppercase tracking-wider">Certifications & Achievements</h3>
            </div>
```

to:

```tsx
          <TimelineSection title="Education" icon={GraduationCap} items={education} />

          <div className="mt-10">
            <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
              <Award size={24} className="text-primary" />
              <h3 className="text-2xl font-bold uppercase tracking-wider">Certifications & Achievements</h3>
            </div>
```

- [ ] **Step 4: Remove the redundant "Contact" sub-heading in `src/components/Contact.tsx`**

The section already shows a heading via `<SectionTitle title="Get in Touch" subtitle="Contact Me" />` right above this block — the inner `<h3>Contact</h3>` duplicates that. Remove the wrapping `<div>`/`<h3>` and keep just the tagline paragraph.

Change:

```tsx
          <div ref={contactRef} className="reveal-text space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <p className="text-muted-foreground">
                Ready to collaborate? Let's get in touch!
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
```

to:

```tsx
          <div ref={contactRef} className="reveal-text space-y-6">
            <p className="text-muted-foreground">
              Ready to collaborate? Let's get in touch!
            </p>

            <div className="flex flex-col items-center gap-3">
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run lint` — expect no new errors (baseline at this point: 3 pre-existing errors — `command.tsx:24`, `textarea.tsx:5`, `tailwind.config.ts` require-import line).
Run: `npm run build` — expect success.
Check in the browser (dev server already running on port 8080):
- Header nav (desktop and mobile) now shows Experience, Education, Projects in that order, and clicking "Education" scrolls to the Education & Certifications section.
- There's visibly more breathing room between the last Education timeline entry and the "Certifications & Achievements" heading.
- The Contact section shows only ONE heading ("Get in Touch", from the pill+title pattern used by every other section) directly followed by the "Ready to collaborate? Let's get in touch!" tagline — no second "Contact" sub-heading above it.

- [ ] **Step 6: Commit**

```bash
git add src/components/header/NavigationLinks.tsx src/components/header/MobileMenu.tsx src/components/EducationCertifications.tsx src/components/Contact.tsx
git commit -m "feat: add Education to nav, space out certifications, remove duplicate Contact heading"
```
