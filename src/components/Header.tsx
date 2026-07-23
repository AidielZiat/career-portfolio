
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from './ui/AnimatedLogo';
import ThemeToggle from './ui/ThemeToggle';
import {
  NavigationMenu,
  NavigationMenuList,
} from './ui/navigation-menu';
import NavigationLinks from './header/NavigationLinks';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center space-x-2 font-medium text-foreground">
            <AnimatedLogo />
            <span className="text-xl font-bold">AidielZiat</span>
          </a>

          <nav className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationLinks />
              </NavigationMenuList>
            </NavigationMenu>

            <ThemeToggle />

            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView();
              }}
              className="btn-primary text-sm ml-2"
            >
              Get in Touch
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
