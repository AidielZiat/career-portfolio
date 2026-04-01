import { useScrollReveal } from '@/hooks/useScrollReveal';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroContent = () => {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const subtitleRef = useScrollReveal<HTMLParagraphElement>({
    threshold: 0.2
  });
  const ctaRef = useScrollReveal<HTMLDivElement>({
    threshold: 0.3
  });

  const handleDownloadCV = () => {
    window.open('https://drive.google.com/file/d/1PFyfHnXQnkTnuCyh9YX7ExW4xQGVK5EA/view?usp=drive_link', '_blank');
  };

  return (
    <div className="max-w-3xl">
      <p className="inline-block mb-4 px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in backdrop-blur-sm border border-primary/20">
        Technology Consultant 
      </p>
      
      {/* Updated to text-primary and added a subtle green glow */}
      <h1 
        ref={titleRef} 
        className="reveal-text text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-primary drop-shadow-[0_0_15px_rgba(57,255,20,0.2)]"
      >
        Creating the best experiences for users, with a focus on AI and data-driven solutions.
      </h1>

      <div ref={subtitleRef} className="reveal-text">
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-4">
          Seems like you've reached here.
        </p>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-4">
          Hey there! I'm Aidiel, a Consultant in AI & Data at Deloitte SEA. 
        </p>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-8">
          I enjoy working with teams to drive innovation and deliver experiences to users. Feel free to explore my portfolio to see how I've contributed to various projects and initiatives in the tech space.
        </p>
      </div>
      
      <div ref={ctaRef} className="reveal-text flex flex-wrap gap-4">
        {/* btn-primary will now automatically be green because of your base.css update */}
        <a href="#experience" className="btn-primary">
          View My Experience
        </a>
        
        <a 
          href="https://www.linkedin.com/in/mohamedziat/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-secondary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          Connect via LinkedIn
        </a>

        {/* Updated CV Button: Swapped orange classes for primary (neon green) */}
        <Button 
          onClick={handleDownloadCV} 
          variant="outline" 
          className="text-base font-medium h-auto py-2.5 px-6 border-primary/40 text-primary hover:bg-primary/10 flex items-center gap-2 transition-all duration-300"
        >
          <FileText size={18} />
          My Updated CV
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;