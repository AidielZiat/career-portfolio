import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

interface Highlight {
  label: string;
  text: string;
}

interface WorkExperienceItem {
  company: string;
  companyInitial: string;
  logoSrc?: string;
  role: string;
  period: string;
  summary: string;
  highlights: Highlight[];
}

const workExperience: WorkExperienceItem[] = [
  {
    company: "Deloitte Consulting SEA",
    companyInitial: "D",
    logoSrc: "/logos/deloitte.jpeg",
    role: "Consultant, AI & Data",
    period: "2024 - Present",
    summary: "Lead data engineer for QA automation using AWS Bedrock and Transcribe, and architected customer churn prediction systems on SageMaker and EventBridge.",
    highlights: [
      {
        label: "Data architecture & engineering",
        text: "Designed dimensional data models and end-to-end ETL pipelines across AWS and Azure ecosystems (S3, Glue, RDS, Databricks), building scalable data lakes that handled incremental loads, late-arriving data, and full auditability for enterprise-scale datasets."
      },
      {
        label: "AI/ML solution delivery",
        text: "Architected and deployed machine learning systems in production, including a SageMaker-based churn prediction model with automated EventBridge orchestration, and an LLM-powered sentiment analysis pipeline using AWS Bedrock and Amazon Transcribe for large-scale audio processing."
      },
      {
        label: "Process automation & cost impact",
        text: "Delivered automation solutions that generated measurable business value, including a ~40% reduction in operational costs through automated transcription and compliance monitoring workflows."
      },
      {
        label: "Natural language & analytics tools",
        text: "Built an AI chatbot enabling natural language querying of complex workforce data, integrated with Power BI to deliver a hybrid analytical experience for non-technical business users."
      },
      {
        label: "Stakeholder management & governance",
        text: "Led UAT coordination and sign-off across technology and business teams, and managed client/vendor relationships (including AWS) through weekly cadences and demonstrations to secure project funding and alignment."
      }
    ]
  },
  {
    company: "PwC Malaysia",
    companyInitial: "P",
    logoSrc: "/logos/pwc.jpeg",
    role: "Associate, Financial Risk",
    period: "2022 - 2024",
    summary: "Automated IFRS 9 credit risk modeling workflows in Python and R, and built attrition models using LightGBM and XGBoost.",
    highlights: [
      {
        label: "Credit risk model development",
        text: "Built Point-in-Time and Through-the-Cycle Probability of Default models using logistic regression, integrating macroeconomic variables (GDP growth, OPR, unemployment) to produce forward-looking, scenario-weighted PD estimates in line with MFRS9/IFRS9 regulatory requirements."
      },
      {
        label: "Credit scorecard design & optimization",
        text: "Developed application/behavioural scorecards using logistic regression with WoE binning and Information Value-based feature selection, optimizing cut-off thresholds by balancing Gini coefficient performance against portfolio risk appetite."
      },
      {
        label: "Model validation & monitoring",
        text: "Established robust validation frameworks using Gini/AUC metrics and Population Stability Index monitoring to ensure ongoing model performance and stability."
      },
      {
        label: "Advanced analytics & ML",
        text: "Applied machine learning techniques (LightGBM, XGBoost) with hyperparameter tuning (Optuna, GridSearchCV) and SHAP explainability on large-scale datasets to uncover predictive drivers of employee attrition."
      }
    ]
  }
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section bg-background">
      <div className="section-inner">
        <SectionTitle title="Work Experience" subtitle="Career Journey" />

        <div ref={sectionRef} className="reveal-text max-w-4xl mx-auto">
          <div className="space-y-16 border-l-2 border-dashed border-border ml-3 pl-8 relative">
            {workExperience.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-lg font-bold text-primary shrink-0 overflow-hidden">
                      {item.logoSrc ? (
                        <img src={item.logoSrc} alt={item.company} className="w-full h-full object-contain p-1.5" />
                      ) : (
                        item.companyInitial
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{item.company}</h4>
                      <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                        {item.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">{item.period}</span>
                </div>

                <p className="bg-muted/50 border border-border rounded-lg p-5 text-sm text-foreground/80 leading-relaxed mb-4">
                  {item.summary}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {item.highlights.map((highlight, i) => (
                    <div key={i} className="flex gap-3 rounded-lg border border-border p-4">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        <span className="font-semibold text-foreground">{highlight.label}: </span>
                        {highlight.text}
                      </p>
                    </div>
                  ))}
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
