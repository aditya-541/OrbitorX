import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar          from './components/Navbar.jsx';
import Footer          from './components/Footer.jsx';
import CornerComet     from './components/CornerComet.jsx';
import StarfieldCanvas from './components/StarfieldCanvas.jsx';
import Preloader       from './components/Preloader.jsx';
import MagneticCursor  from './components/MagneticCursor.jsx';
import CursorTrail     from './components/CursorTrail.jsx';
import FloatingCTA     from './components/FloatingCTA.jsx';
import SEOMeta         from './components/SEOMeta.jsx';
import { ToastProvider } from './components/Toast.jsx';

import HomePage    from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import WorkPage    from './pages/WorkPage.jsx';
import AboutPage   from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import EventPage    from './pages/EventPage.jsx';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setProgress((window.scrollY / max) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: 'rgba(255,255,255,0.7)',
          boxShadow: 'none',
        }}
      />
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <div className="page-enter">
      {children}
    </div>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const [booted, setBooted] = useState(() => !!sessionStorage.getItem('ob_booted'));

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

  const handleBooted = () => {
    sessionStorage.setItem('ob_booted', '1');
    setBooted(true);
  };

  if (!booted) return <Preloader onDone={handleBooted} />;

  return (
    <ToastProvider>
      <SEOMeta />
      <MagneticCursor />
      <CursorTrail />
      <ScrollProgressBar />
      <StarfieldCanvas />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Routes>
            <Route path="/"         element={<PageWrapper><HomePage /></PageWrapper>}    />
            <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
            <Route path="/work"     element={<PageWrapper><WorkPage /></PageWrapper>}    />
            <Route path="/about"    element={<PageWrapper><AboutPage /></PageWrapper>}   />
            <Route path="/contact"  element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/events/:id" element={<PageWrapper><EventPage /></PageWrapper>} />
            <Route path="*"         element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
        </main>
        <Footer />
        <CornerComet />
        <FloatingCTA />
      </div>
    </ToastProvider>
  );
}
