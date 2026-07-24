
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background relative">
      <div className="container max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
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
