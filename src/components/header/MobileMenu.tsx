interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const handleDownloadCV = () => {
    window.open('https://drive.google.com/file/d/1PFyfHnXQnkTnuCyh9YX7ExW4xQGVK5EA/view?usp=drive_link', '_blank');
  };

  // Removed 'Skills' from this array
  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
  ];

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-md py-6 px-6 animate-fade-in border-t border-gray-100">
      <nav className="flex flex-col space-y-4">
        {/* Experience and Projects Links */}
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-lg font-medium text-gray-900 hover:text-primary py-2 transition-colors duration-200"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}
        
        {/* Direct Download CV Button */}
        <button
          onClick={() => {
            handleDownloadCV();
            onClose();
          }}
          className="text-left text-lg font-medium text-gray-900 hover:text-primary py-2 transition-colors duration-200"
        >
          Download CV
        </button>
        
        {/* Primary Action Button */}
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