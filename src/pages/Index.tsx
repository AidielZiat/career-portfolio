
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LogoStrip from '@/components/LogoStrip';
import Experience from '@/components/Experience';
import EducationCertifications from '@/components/EducationCertifications';
import Project from '@/components/Projects';
import SkillsGrid from '@/components/SkillsGrid';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';

const Index = () => {
  useEffect(() => {
    document.title = "AidielZiat Portfolio";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <LogoStrip />
        <Experience />
        <EducationCertifications />
        <Project />
        <SkillsGrid />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Index;
