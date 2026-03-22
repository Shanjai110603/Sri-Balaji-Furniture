import { useEffect } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Products from '../sections/Products';
import Materials from '../sections/Materials';
import WhyChooseUs from '../sections/WhyChooseUs';
import Gallery from '../sections/Gallery';
import Reviews from '../sections/Reviews';
import Locations from '../sections/Locations';
import OrderForm from '../sections/OrderForm';

export default function Home() {
  useEffect(() => {
    document.title = "Sri Balaji Wood Works | Premium Custom Furniture";
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
      <Locations />
    </main>
  );
}
