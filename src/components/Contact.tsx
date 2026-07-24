import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import SectionTitle from './ui/SectionTitle';

const Contact = () => {
  const contactRef = useScrollReveal<HTMLDivElement>();

  const handleDownloadCV = () => {
    window.open('https://drive.google.com/file/d/1PFyfHnXQnkTnuCyh9YX7ExW4xQGVK5EA/view?usp=drive_link', '_blank');
  };

  return (
    <section id="contact" className="section bg-background relative scroll-mt-24">
      <div className="section-inner relative z-10">
        <SectionTitle
          title="Get in Touch"
          subtitle="Contact Me"
        />

        <div className="max-w-md mx-auto text-center">
          <div ref={contactRef} className="reveal-text space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <p className="text-muted-foreground">
                Ready to collaborate? Let's get in touch!
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href="mailto:aidiel.haikal0708@gmail.com"
                className="inline-flex items-center text-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} className="mr-2" />
                aidiel.haikal0708@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/mohamedziat/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={18} className="mr-2" />
                linkedin.com/in/mohamedziat
              </a>
              <a
                href="https://github.com/AidielZiat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-foreground hover:text-primary transition-colors"
              >
                <Github size={18} className="mr-2" />
                github.com/AidielZiat
              </a>
            </div>

            <div className="flex justify-center pt-2">
              <button onClick={handleDownloadCV} className="btn-primary flex items-center gap-2">
                <FileText size={18} />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;