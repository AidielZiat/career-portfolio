import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Globe, Database, Smartphone, Cloud, Code2, BrainCircuit, ShieldCheck, Zap, Server, Lock, Activity } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';
import { Card, CardContent } from './ui/card';

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
  desc: string;
}

interface ProjectItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  techStack: string[];
  features?: FeatureItem[];
  isLarge?: boolean;
}

const ProjectCard = ({ icon, title, subtitle, description, techStack, features, isLarge }: ProjectItemProps) => {
  const itemRef = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  
  return (
    <div ref={itemRef} className={`reveal-text h-full ${isLarge ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
      <Card className="h-full glass-card border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-300 group flex flex-col">
        <CardContent className="p-8 flex flex-col flex-grow">
          {/* Header Section */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <div className="flex-grow">
              <h3 className={`${isLarge ? 'text-3xl' : 'text-xl'} font-bold leading-tight`}>{title}</h3>
              {subtitle && <p className="text-primary/70 text-sm font-semibold mt-1 uppercase tracking-wide">{subtitle}</p>}
            </div>
          </div>
          
          <p className={`text-foreground/70 ${isLarge ? 'text-lg mb-10' : 'text-sm mb-6'} leading-relaxed`}>
            {description}
          </p>

          {/* Detailed Features for Large Card (Mimicking Colleague) */}
          {isLarge && features && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="text-primary mt-1">{f.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-foreground/90">{f.label}</p>
                    <p className="text-xs text-foreground/60 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Tech Stack Pills */}
          <div className="mt-auto pt-8 border-t border-primary/5">
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

  // Detailed list of AWS components for the left panel
  const awsComponents = [
    { icon: <Zap size={16} />, label: "AWS Amplify", desc: "Manages hosting, CI/CD pipeline, and seamless updates." },
    { icon: <Server size={16} />, label: "Amazon S3 & CloudFront", desc: "Serves static content efficiently with global low-latency caching." },
    { icon: <Activity size={16} />, label: "Lambda & API Gateway", desc: "Powers serverless backend logic and secure API management." },
    { icon: <Database size={16} />, label: "Amazon DynamoDB", desc: "Stores visitor statistics and session metadata with high availability." },
    { icon: <ShieldCheck size={16} />, label: "AWS WAF", desc: "Protects against web threats and ensures security compliance." },
    { icon: <Lock size={16} />, label: "ACM & Route 53", desc: "Automates SSL/TLS provisioning and managed DNS routing." }
  ];
  
  return (
    <section id="projects" className="py-24 relative overflow-hidden dark-gradient-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent opacity-95"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div ref={titleRef} className="reveal-text mb-16">
          <SectionTitle 
            subtitle="Technical Portfolio" 
            title="Featured Projects" 
            align="left" 
          />

        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Panel: Detailed Serverless Architecture */}
          <ProjectCard 
            isLarge
            icon={<Cloud className="h-8 w-8" />}
            title="Personal Portfolio & Serverless Architecture"
            subtitle="Cloud Engineering & Implementation"
            description="Designed and deployed a production-grade serverless architecture to showcase real-world cloud expertise beyond theory. The site leverages managed AWS services for maximum scalability and zero operational overhead."
            features={awsComponents}
            techStack={["React", "TypeScript", "Tailwind CSS", "AWS Amplify", "Lambda", "DynamoDB", "CloudFront"]}
          />
          
          {/* Right Panel: Stacked Research & Application */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <ProjectCard 
              icon={<BrainCircuit className="h-7 w-7" />}
              title="Agentic GraphRAG Framework"
              subtitle="Master's Thesis | Universiti Malaya"
              description="Hybrid knowledge representation utilizing LangChain and Neo4j for cross-jurisdictional regulatory compliance across Southeast Asian markets."
              techStack={["Python", "LangChain", "Neo4j", "Bedrock"]}
            />
            
            <ProjectCard 
              icon={<Smartphone className="h-7 w-7" />}
              title="MYSignLingo Application"
              subtitle="Master's Coursework | Universiti Malaya"
              description="A computer vision-based application bridging communication gaps for the hearing impaired through real-time sign language translation using deep learning."
              techStack={["Computer Vision", "Python", "MediaPipe", "TensorFlow"]}
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;