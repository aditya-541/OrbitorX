import { useEffect } from 'react';
import Navbar   from './components/Navbar.jsx';
import Hero     from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Gallery  from './components/Gallery.jsx';
import About    from './components/About.jsx';
import Clients  from './components/Clients.jsx';
import Contact  from './components/Contact.jsx';
import Footer   from './components/Footer.jsx';
import CornerComet from './components/CornerComet.jsx';
import StarfieldCanvas from './components/StarfieldCanvas.jsx';

export default function App() {
  useEffect(() => {
    const root = document.documentElement;

    // Pointer move -> set normalized mouse variables on :root for parallax
    const onPointer = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = (e.clientX - w / 2) / (w / 2); // -1..1
      const dy = (e.clientY - h / 2) / (h / 2); // -1..1
      root.style.setProperty('--mx', `${dx}`);
      root.style.setProperty('--my', `${dy}`);
    };

    // Scroll -> set scroll progress variable (0..1)
    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const p = window.scrollY / max;
      root.style.setProperty('--scroll', `${p}`);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <StarfieldCanvas />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <About />
          <Clients />
          <Contact />
        </main>
        <Footer />
        <CornerComet />
      </div>
    </>
  );
}
