import { useEffect } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Products from '../sections/Products';
import Materials from '../sections/Materials';
import WhyChooseUs from '../sections/WhyChooseUs';
import Gallery from '../sections/Gallery';
import Reviews from '../sections/Reviews';
import ShowroomStore from '../sections/ShowroomStore';
import Locations from '../sections/Locations';
import OrderForm from '../sections/OrderForm';

export default function Home() {
  useEffect(() => {
    document.title = "Sri Balaji Wood Works | Custom & Teak Furniture Shop in Udumalpet";
    
    // Intercept clicks on hash links to scroll smoothly without polluting URL
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (href && (href.startsWith('#') || href.startsWith('/#'))) {
        const id = href.replace('/#', '').replace('#', '');
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            window.scrollTo({
              top: element.offsetTop - 80, // Adjust for fixed navbar
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleHashClick);
    return () => document.removeEventListener('click', handleHashClick);
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Materials />
      <WhyChooseUs />
      <OrderForm />
      <Gallery />
      <Reviews />
      <ShowroomStore />
      <Locations />
    </main>
  );
}
