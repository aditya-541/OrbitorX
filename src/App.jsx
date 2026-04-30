import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar          from './components/Navbar.jsx';
import Footer          from './components/Footer.jsx';
import CornerComet     from './components/CornerComet.jsx';
import StarfieldCanvas from './components/StarfieldCanvas.jsx';

import HomePage    from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import WorkPage    from './pages/WorkPage.jsx';
import AboutPage   from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;

    const onPointer = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      root.style.setProperty('--mx', `${(e.clientX - w / 2) / (w / 2)}`);
      root.style.setProperty('--my', `${(e.clientY - h / 2) / (h / 2)}`);
    };

    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      root.style.setProperty('--scroll', `${window.scrollY / max}`);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll',      onScroll,  { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll',      onScroll);
    };
  }, []);

  return (
    <>
      <StarfieldCanvas />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/"         element={<HomePage />}    />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work"     element={<WorkPage />}    />
            <Route path="/about"    element={<AboutPage />}   />
            <Route path="/contact"  element={<ContactPage />} />
            <Route path="*"         element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <CornerComet />
      </div>
    </>
  );
}
