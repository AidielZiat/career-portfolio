
import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background border-t border-border relative">
      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-4">Aidiel Ziat</h3>
            <p className="text-muted-foreground mb-6">
              Leveraging consulting expertise in financial services to build resilient, AI-driven systems — with an eye toward fintech and e-commerce.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/mohamedziat/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/AidielZiat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Pages</h3>
            <ul className="space-y-2.5">
              <li><a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-muted-foreground mb-4">
              Ready to collaborate? Let's get in touch!
            </p>
            <a
              href="mailto:aidiel.haikal0708@gmail.com"
              className="inline-flex items-center text-primary hover:underline"
            >
              <Mail size={18} className="mr-2" />
              aidiel.haikal0708@gmail.com
            </a>
            <div className="mt-2">
              <a
                href="https://github.com/AidielZiat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={18} className="mr-2" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Aidiel Ziat. All rights reserved.
          </p>

          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Back to top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
