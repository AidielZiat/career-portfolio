import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import { Calendar, GraduationCap, Award, Briefcase, Trophy, Code2 } from 'lucide-react';

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  details?: string[];
}

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

const workExperience: TimelineItem[] = [
  {
    title: "Consultant (AI & Data)",
    subtitle: "Deloitte Consulting SEA",
    period: "2024 - Present",
    details: [
      "Lead Data Engineer for QA Automation using AWS Bedrock and Transcribe.",
      "Architected customer churn systems using SageMaker and EventBridge."
    ]
  },
  {
    title: "Associate (Financial Risk)",
    subtitle: "PwC Malaysia",
    period: "2022 - 2024",
    details: [
      "Automated IFRS 9 credit risk modeling workflows using Python and R.",
      "Developed attrition models using LightGBM and XGBoost."
    ]
  }
];

const certifications: TimelineItem[] = [
  { title: "AWS Certified Machine Learning Engineer - Associate", subtitle: "Amazon Web Services", period: "2026" },
  { title: "AWS Cloud Practitioner", subtitle: "Amazon Web Services", period: "2025" },
  { title: "Applied Data Science Lab", subtitle: "WorldQuant University", period: "2024" }
];

// Skills extracted directly from your CV 
const skillCategories = [
  { 
    name: "Languages & Frameworks", 
    skills: ["Python", "SQL", "R", "C++", "PyTorch", "TensorFlow", "LightGBM", "XGBoost"] 
  },
  { 
    name: "Cloud & Data Engineering", 
    skills: ["AWS", "SageMaker", "Step Functions", "Lambda", "S3", "Azure", "Databricks", "Glue"] 
  }
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  const TimelineSection = ({ title, icon: Icon, items }: { title: string, icon: any, items: TimelineItem[] }) => (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
        <Icon size={24} className="text-primary" />
        <h3 className="text-2xl font-bold uppercase tracking-wider">{title}</h3>
      </div>
      <div className="space-y-8 border-l-2 border-primary/20 ml-3 pl-8 relative">
        {items.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-primary/80">{item.period}</span>
              <h4 className="text-lg font-bold leading-tight">{item.title}</h4>
              <p className="text-muted-foreground font-medium">{item.subtitle}</p>
              {item.description && <p className="text-sm text-foreground/70 mt-1">{item.description}</p>}
              {item.details && (
                <ul className="mt-2 space-y-1">
                  {item.details.map((detail, i) => (
                    <li key={i} className="text-xs text-foreground/60 flex gap-2">
                      <span className="text-primary">•</span> {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="experience" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Resume" subtitle="Career Journey" />
        
        <div ref={sectionRef} className="reveal-text grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          {/* Left Column: Education & Certifications */}
          <div>
            <TimelineSection title="Education" icon={GraduationCap} items={education} />
            <TimelineSection title="Certifications" icon={Award} items={certifications} />
          </div>

          {/* Right Column: Experience, Achievements & Skills */}
          <div>
            <TimelineSection title="Experience" icon={Briefcase} items={workExperience} />
            
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
                <Trophy size={24} className="text-primary" />
                <h3 className="text-2xl font-bold uppercase tracking-wider">Achievements</h3>
              </div>
              <ul className="space-y-4 ml-3 mb-12">
                <li className="flex flex-col">
                   <span className="font-bold">Yayasan Peneraju Scholarship</span>
                   <span className="text-sm text-muted-foreground text-foreground/60">Professional Certification Funding</span>
                </li>
                <li className="flex flex-col">
                   <span className="font-bold">MARA Young Talent Program (YTP) Scholarship</span>
                   <span className="text-sm text-muted-foreground text-foreground/60">Selected for an education programme to study at a top 50 university in the United Kingdom.</span>
                </li>
              </ul>

              {/* New Technical Skills Bubbles Section */}
              <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
                <Code2 size={24} className="text-primary" />
                <h3 className="text-2xl font-bold uppercase tracking-wider">Technical Skills</h3>
              </div>
              <div className="space-y-6 ml-3">
                {skillCategories.map((category, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">{category.name}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;