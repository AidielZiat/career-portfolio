import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import TimelineSection, { TimelineItem } from './ui/TimelineSection';
import { GraduationCap, Award } from 'lucide-react';

const education: TimelineItem[] = [
  {
    title: "Masters of Artificial Intelligence",
    subtitle: "Universiti Malaya",
    period: "2024 - 2026 (Expected)",
    description: "Current CGPA: 4.0/4.0. Focused on Advanced Machine Learning and NLP.",
    logoSrc: "/logos/universiti-malaya.png"
  },
  {
    title: "BSc (Hons) Mathematics and Statistics",
    subtitle: "The University of Manchester",
    period: "2019 - 2022",
    description: "First Class Honours. Specialized in Multivariate Statistics and Machine Learning.",
    logoSrc: "/logos/manchester.png"
  },
  {
    title: "International Baccalaureate (IB) Diploma",
    subtitle: "MARA College, Banting",
    period: "2017 - 2019",
    description: "IB Score: 42/45 points.",
    logoSrc: "/logos/mara-college-banting.png"
  }
];

interface BadgeItem {
  name: string;
  issuer: string;
  badgeSrc?: string;
}

const certificationsAndAchievements: BadgeItem[] = [
  { name: "AWS Certified Machine Learning Engineer - Associate", issuer: "Amazon Web Services", badgeSrc: "/badges/aws-ml-engineer-associate.png" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", badgeSrc: "/badges/aws-cloud-practitioner.png" },
  { name: "Applied Data Science Lab", issuer: "WorldQuant University", badgeSrc: "/badges/worldquant-adsl.png" },
  { name: "Yayasan Peneraju Scholarship", issuer: "Professional Certification Funding", badgeSrc: "/badges/yayasan-peneraju.png" },
  { name: "MARA Young Talent Program (YTP) Scholarship", issuer: "UK University Placement", badgeSrc: "/badges/mara-ytp.png" }
];

const EducationCertifications = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="education" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Education & Certifications" subtitle="Academic Background" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto">
          <TimelineSection title="Education" icon={GraduationCap} items={education} />

          <div className="mt-10">
            <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
              <Award size={24} className="text-primary" />
              <h3 className="text-2xl font-bold uppercase tracking-wider">Certifications & Achievements</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {certificationsAndAchievements.map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-3">
                  {badge.badgeSrc ? (
                    <img src={badge.badgeSrc} alt={badge.name} className="w-20 h-20 object-contain" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Award className="w-9 h-9 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold leading-tight">{badge.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{badge.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationCertifications;
