
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Project from '@/components/Projects';
import Experience from '@/components/Experience';
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
        <section id="home">
          <Hero />
        </section>
        <section id="revenue-impact">
          <Project />
        </section>
        <section id="experience">
          <Experience />
        </section>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Index;
