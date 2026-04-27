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
  return (
    <>
      <StarfieldCanvas />
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
    </>
  );
}
