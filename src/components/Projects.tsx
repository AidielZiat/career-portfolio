import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Cloud, BrainCircuit, Smartphone } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import { Card, CardContent } from './ui/card';

interface ProjectItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  outcome: string;
  techStack: string[];
  imageSrc?: string;
  caseUrl?: string;
}

const ProjectCard = ({ icon, title, description, outcome, techStack, imageSrc, caseUrl }: ProjectItemProps) => (
  <Card className="h-full bg-card border-border hover:border-primary/40 transition-all duration-300 group flex flex-col overflow-hidden">
    <div className="h-48 w-full flex items-center justify-center bg-muted border-b border-border overflow-hidden">
      {imageSrc ? (
        <img src={imageSrc} alt={title} className="h-full w-full object-cover" />
      ) : (
        <div className="text-primary/30 [&_svg]:h-16 [&_svg]:w-16 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
    </div>

    <CardContent className="p-8 flex flex-col flex-grow">
      <h3 className="text-xl font-bold leading-tight mb-4">{title}</h3>

      <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        <span className="font-semibold text-foreground">Outcome: </span>
        {outcome}
      </p>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="mb-4">
          {caseUrl ? (
            <a
              href={caseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              View Case
            </a>
          ) : (
            <span
              aria-label="Case link not available yet"
              className="inline-block cursor-not-allowed rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-semibold text-muted-foreground opacity-70"
            >
              View Case
            </span>
          )}
        </div>
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
    description: "Designed and deployed this site's own serverless backend on AWS — CI/CD, edge caching, WAF-protected APIs — as a live demonstration of production cloud architecture.",
    outcome: "A zero-maintenance, globally-cached site with sub-second load times and no idle infrastructure cost.",
    techStack: ["React", "TypeScript", "AWS Amplify", "Lambda", "DynamoDB", "CloudFront"]
  },
  {
    icon: <BrainCircuit className="h-7 w-7" />,
    title: "Agentic GraphRAG Framework",
    description: "Built a hybrid knowledge-graph and retrieval system using LangChain and Neo4j to reason over cross-jurisdictional regulatory text across Southeast Asian markets.",
    outcome: "A framework that answers multi-hop regulatory compliance questions flat RAG pipelines can't handle.",
    techStack: ["Python", "LangChain", "Neo4j", "Bedrock"]
  },
  {
    icon: <Smartphone className="h-7 w-7" />,
    title: "MYSignLingo",
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
