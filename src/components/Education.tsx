import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { GraduationCap } from 'lucide-react';

const education: TimelineItem[] = [
  {
    title: "Masters of Artificial Intelligence",
    subtitle: "Universiti Malaya",
    period: "2024 - 2026 (Expected)",
    description: "Current CGPA: 4.0/4.0. Focused on Advanced Machine Learning and NLP.",
    logoSrc: "/logos/universiti-malaya.jpeg"
  },
  {
    title: "BSc (Hons) Mathematics and Statistics",
    subtitle: "The University of Manchester",
    period: "2019 - 2022",
    description: "First Class Honours. Specialized in Multivariate Statistics and Machine Learning.",
    logoSrc: "/logos/manchester.jpeg"
  },
  {
    title: "International Baccalaureate (IB) Diploma",
    subtitle: "MARA College, Banting",
    period: "2017 - 2019",
    description: "IB Score: 42/45 points.",
    logoSrc: "/logos/mara-college-banting.png"
  }
];

const Education = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Education" subtitle="Academic Background" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto">
          <TimelineSection title="Education" icon={GraduationCap} items={education} />
        </div>
      </div>
    </section>
  );
};

export default Education;
