import Hero     from '../components/Hero.jsx';
import Services from '../components/Services.jsx';
import Gallery  from '../components/Gallery.jsx';
import About    from '../components/About.jsx';
import Clients  from '../components/Clients.jsx';
import Contact  from '../components/Contact.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Clients />
      <Contact />
    </>
  );
}
