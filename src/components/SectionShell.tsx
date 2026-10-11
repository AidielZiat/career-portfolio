import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Footer from '@/components/Footer';

interface SectionShellProps {
  title: string;
  intro?: string;
  children: React.ReactNode;
}

// Shared chrome for the personal-portfolio sections (journey, hiking, ...).
const SectionShell = ({ title, intro, children }: SectionShellProps) => (
  <div className="flex flex-col min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-foreground/70 hover:text-foreground">
          <ArrowLeft size={16} aria-hidden="true" /> Home
        </Link>
        <ThemeToggle />
      </div>
    </header>
    <main className="flex-grow container max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-[1.0625rem] leading-[1.65] text-muted-foreground">{intro}</p>}
      <div className="mt-12">{children}</div>
    </main>
    <Footer />
  </div>
);

export default SectionShell;
