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
