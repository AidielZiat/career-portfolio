
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';

interface WorkExperienceItem {
  company: string;
  companyInitial: string;
  logoSrc?: string;
  role: string;
  period: string;
  description: string;
}

const workExperience: WorkExperienceItem[] = [
  {
    company: "Deloitte Consulting SEA",
    companyInitial: "D",
    logoSrc: "/logos/deloitte.jpeg",
    role: "Consultant, AI & Data",
    period: "2024 - Present",
    description: "Lead data engineer for QA automation using AWS Bedrock and Transcribe, and architected customer churn prediction systems on SageMaker and EventBridge."
  },
  {
    company: "PwC Malaysia",
    companyInitial: "P",
    logoSrc: "/logos/pwc.jpeg",
    role: "Associate, Financial Risk",
    period: "2022 - 2024",
    description: "Automated IFRS 9 credit risk modeling workflows in Python and R, and built attrition models using LightGBM and XGBoost."
  }
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Work Experience" subtitle="Career Journey" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto relative">
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px border-l-2 border-dashed border-border -translate-x-1/2" />

          <div className="space-y-10 md:space-y-14">
            {workExperience.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:items-center"
              >
                <div className="flex items-center gap-4 md:block md:text-right">
                  <div className="md:hidden w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-lg font-bold text-primary shrink-0">
                    {item.logoSrc ? (
                      <img src={item.logoSrc} alt={item.company} className="w-full h-full object-contain rounded-full" />
                    ) : (
                      item.companyInitial
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.company}</h4>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                  </div>
                </div>

                <div className="hidden md:flex relative z-10 w-16 h-16 rounded-full bg-card border border-border shadow-sm items-center justify-center text-xl font-bold text-primary shrink-0">
                  {item.logoSrc ? (
                    <img src={item.logoSrc} alt={item.company} className="w-full h-full object-contain rounded-full" />
                  ) : (
                    item.companyInitial
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-bold">{item.role}</h4>
                  <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
