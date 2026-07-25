import type { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
  details?: string[];
  logoSrc?: string;
}

interface TimelineSectionProps {
  title: string;
  icon: LucideIcon;
  items: TimelineItem[];
}

const TimelineSection = ({ title, icon: Icon, items }: TimelineSectionProps) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-8 border-b border-primary/20 pb-2">
      <Icon size={24} className="text-primary" />
      <h3 className="text-2xl font-bold uppercase tracking-wider">{title}</h3>
    </div>
    <div className="space-y-8 border-l-2 border-primary/20 ml-3 pl-8 relative">
      {items.map((item, index) => (
        <div key={index} className="relative">
          {item.logoSrc ? (
            <div className="absolute -left-[48px] top-0 w-8 h-8 rounded-full bg-card border border-border overflow-hidden flex items-center justify-center">
              <img src={item.logoSrc} alt="" className="w-full h-full object-contain p-1" />
            </div>
          ) : (
            <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
          )}
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

export default TimelineSection;
