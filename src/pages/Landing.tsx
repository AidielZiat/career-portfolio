import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

// Add new pillars (e.g. Islamic Studies, Property Investment) by appending here.
const pillars = [
  { label: 'Career Portfolio', to: '/career', wide: true },
  { label: 'My Life Journey', to: '/journey', wide: false },
  { label: 'Hiking Hobby', to: '/hiking', wide: false },
];

const cardClass =
  'flex items-center justify-center min-h-[64px] px-6 py-5 rounded-[20px] ' +
  'bg-white/60 border border-white/80 dark:bg-white/[0.18] dark:border-white/[0.35] backdrop-blur-[12px] shadow-lg ' +
  'text-neutral-900 dark:text-white font-semibold tracking-tight text-lg text-center ' +
  'transition-all duration-150 hover:-translate-y-0.5 hover:bg-white/80 dark:hover:bg-white/25 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

const Landing = () => {
  useEffect(() => {
    document.title = 'Aidiel Ziat | Personal Portfolio';
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-neutral-900 dark:bg-black dark:text-white">
      <img
        src="/images/kodiang-hero-3.jpg"
        alt="View from a limestone cliff over the paddy fields and hills of Kodiang, Kedah"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />
      {/* Scrim keeps text over the photo readable: white fade with black text in light mode, black fade with white text in dark mode */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/30 to-white/55 md:bg-gradient-to-r md:from-transparent md:via-white/5 md:via-[30%] md:to-white/65 dark:from-black/50 dark:via-black/40 dark:to-black/60 md:dark:via-black/10 md:dark:to-black/70" />
      {/* Top fade so the logo and Download CV button stay legible over bright sky */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/45 to-transparent dark:from-black/45" />

      <header className="relative z-10 flex items-center justify-between px-6 md:px-8 py-5">
        <span className="text-xl font-bold">AidielZiat</span>
        <div className="flex items-center gap-2">
          <ThemeToggle className="text-neutral-900 hover:text-neutral-900 hover:bg-black/10 dark:text-white dark:hover:text-white dark:hover:bg-white/20" />
          <a href="/cv.pdf" download className="btn-primary text-sm gap-2 min-h-[44px]">
            <Download size={16} aria-hidden="true" /> Download CV
          </a>
        </div>
      </header>

      <main className="relative z-10 container max-w-6xl mx-auto px-6 md:px-8 pb-16 pt-8 md:pt-16">
        <div className="md:ml-auto md:w-[45%] flex flex-col gap-6">
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">Hey there! I'm Aidiel.</h1>
          <p className="text-[1.0625rem] leading-[1.65]">
            This is where I grew up, Kodiang (<em>/ˈkodiaŋ/</em>) – a small town in the North Malaysia.
          </p>
          <p className="text-[1.0625rem] leading-[1.65]">
            This is my personal portfolio and feel free to click any of the items below to know me better :D
          </p>

          <nav aria-label="Portfolio sections" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {pillars.map((p) => (
              <Link key={p.to} to={p.to} className={`${cardClass} ${p.wide ? 'sm:col-span-2' : ''}`}>
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Landing;
