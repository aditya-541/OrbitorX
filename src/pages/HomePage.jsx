import Hero         from '../components/Hero.jsx';
import Services     from '../components/ServicesScroll.jsx';
import Gallery      from '../components/Gallery.jsx';
import About        from '../components/About.jsx';
import Clients      from '../components/Clients.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact      from '../components/Contact.jsx';
import Newsletter   from '../components/Newsletter.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Clients />
      <Testimonials />
      <Contact />
      <Newsletter />
    </>
  );
}
