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
