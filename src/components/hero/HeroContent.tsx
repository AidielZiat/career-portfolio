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
