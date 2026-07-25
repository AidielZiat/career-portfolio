interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md py-6 px-6 animate-fade-in border-t border-border">
      <nav className="flex flex-col space-y-4">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-lg font-medium text-foreground hover:text-primary py-2 transition-colors duration-200"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}

        <div className="pt-4">
          <a
            href="#contact"
            className="btn-primary flex justify-center py-3 text-base font-bold"
            onClick={onClose}
          >
            Get in Touch
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
