import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Mail, Linkedin, MapPin, Phone, Github, FileText } from 'lucide-react';
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

        <div className="max-w-2xl mx-auto">
          <div
            ref={contactRef}
            className="reveal-text space-y-6"
          >
            <h3 className="text-2xl font-bold text-center">Let's Connect</h3>
            <p className="text-foreground/80 text-center">
              I'm always open to conversations about AI, data, and financial services — particularly where they intersect with fintech and e-commerce. Reach out through any of the channels below, or grab a copy of my resume.
            </p>

            <div className="flex justify-center pt-2">
              <button onClick={handleDownloadCV} className="btn-primary flex items-center gap-2">
                <FileText size={18} />
                Download Resume
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:aidiel.haikal0708@gmail.com" className="font-medium hover:text-primary transition-colors">
                    aidiel.haikal0708@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Linkedin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/mohamedziat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    linkedin.com/in/mohamedziat
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Github size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">GitHub</p>
                  <a
                    href="https://github.com/AidielZiat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    github.com/AidielZiat
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+60122803585" className="font-medium hover:text-primary transition-colors">
                    +60 19 854 0708
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;