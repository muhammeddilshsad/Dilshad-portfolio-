import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Experience from '../components/sections/Experience';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Services from '../components/sections/Services';
import Skills from '../components/sections/Skills';
import TechMarquee from '../components/sections/TechMarquee';

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
    </>
  );
}
