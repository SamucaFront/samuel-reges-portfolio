import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { TechStack } from '@/components/TechStack/TechStack';
import { Projects } from '@/components/Projects/Projects';
import { Education } from '@/components/Education/Education';
import { Experience } from '@/components/Experience/Experience';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { useTheme } from '@/hooks/useTheme';

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <MotionConfig reducedMotion="user">
      <a href="#sobre" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Pular para o conteúdo
      </a>
      <CustomCursor />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
