
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { Briefcase } from 'lucide-react';

const workExperience: TimelineItem[] = [
  {
    title: "Consultant, AI & Data",
    subtitle: "Deloitte Consulting SEA",
    period: "2024 - Present",
    details: [
      "Lead data engineer for QA automation using AWS Bedrock and Transcribe.",
      "Architected customer churn prediction systems on SageMaker and EventBridge."
    ]
  },
  {
    title: "Associate, Financial Risk",
    subtitle: "PwC Malaysia",
    period: "2022 - 2024",
    details: [
      "Automated IFRS 9 credit risk modeling workflows in Python and R.",
      "Built attrition models using LightGBM and XGBoost."
    ]
  }
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Work Experience" subtitle="Career Journey" />

        <div ref={sectionRef} className="reveal-text max-w-3xl mx-auto">
          <TimelineSection title="Experience" icon={Briefcase} items={workExperience} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
