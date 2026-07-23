
import { NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu';

const navLinks = [
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
];

const NavigationLinks = () => (
  <>
    {navLinks.map((link) => (
      <NavigationMenuItem key={link.name}>
        <NavigationMenuLink
          href={link.href}
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 px-4 py-2"
        >
          {link.name}
        </NavigationMenuLink>
      </NavigationMenuItem>
    ))}
  </>
);

export default NavigationLinks;
