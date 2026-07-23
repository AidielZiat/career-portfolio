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