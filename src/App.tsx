import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LanguageProvider } from './context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Footer from './sections/Footer';
import StickyWhatsApp from './components/StickyWhatsApp';

// Performance Optimization: Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store'));

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Progress Bar Animation
    gsap.to('.progress-bar', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
      <BrowserRouter>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
        {!loading && <div className="progress-bar" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '3px', backgroundColor: '#B8860B', zIndex: 1000000, transformOrigin: '0% 50%', transform: 'scaleX(0)' }}></div>}
        <CustomCursor />
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </Suspense>
        <Footer />
        <StickyWhatsApp />
      </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
