import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { GraduationCap, Award, Trophy } from 'lucide-react';

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

const certifications: TimelineItem[] = [
  { title: "AWS Certified Machine Learning Engineer - Associate", subtitle: "Amazon Web Services", period: "2026" },
  { title: "AWS Cloud Practitioner", subtitle: "Amazon Web Services", period: "2025" },
  { title: "Applied Data Science Lab", subtitle: "WorldQuant University", period: "2024" }
];

const achievements = [
  {
    title: "Yayasan Peneraju Scholarship",
    subtitle: "Professional Certification Funding"
  },
  {
    title: "MARA Young Talent Program (YTP) Scholarship",
    subtitle: "Selected for an education programme to study at a top 50 university in the United Kingdom."
  }
];

const EducationCertifications = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Education & Certifications" subtitle="Academic Background" />

        <div ref={sectionRef} className="reveal-text grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          <div>
            <TimelineSection title="Education" icon={GraduationCap} items={education} />
            <TimelineSection title="Certifications" icon={Award} items={certifications} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
              <Trophy size={24} className="text-primary" />
              <h3 className="text-2xl font-bold uppercase tracking-wider">Achievements</h3>
            </div>
            <ul className="space-y-4 ml-3">
              {achievements.map((achievement, i) => (
                <li key={i} className="flex flex-col">
                  <span className="font-bold">{achievement.title}</span>
                  <span className="text-sm text-muted-foreground">{achievement.subtitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
