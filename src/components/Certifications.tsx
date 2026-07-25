import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionTitle from './ui/SectionTitle';
import { Award } from 'lucide-react';

interface BadgeItem {
  name: string;
  issuer: string;
  badgeSrc?: string;
}

const certificationsAndAchievements: BadgeItem[] = [
  { name: "AWS Certified Machine Learning Engineer - Associate", issuer: "Amazon Web Services", badgeSrc: "/badges/aws-ml-engineer-associate.png" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", badgeSrc: "/badges/aws-cloud-practitioner.png" },
  { name: "Applied Data Science Lab", issuer: "WorldQuant University", badgeSrc: "/badges/worldquant-adsl.png" },
  { name: "Yayasan Peneraju Scholarship", issuer: "Professional Certification Funding", badgeSrc: "/badges/yayasan-peneraju.jpeg" },
  { name: "MARA Young Talent Program (YTP) Scholarship", issuer: "UK University Placement", badgeSrc: "/badges/mara-ytp.png" }
];

const Certifications = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="certifications" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Certifications & Achievements" subtitle="Credentials & Recognition" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto">
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
    </section>
  );
};

export default Certifications;
