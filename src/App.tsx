import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { LanguageProvider } from './context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WhatsappLogo } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Footer from './sections/Footer';

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
        <a href="https://wa.me/919791983075?text=Hi!%20I'm%20interested%20in%20custom%20furniture." className="floating-wa" target="_blank" rel="noopener noreferrer" style={{
          position: 'fixed', bottom: 30, right: 30, background: '#25D366', color: 'white', width: 65, height: 65, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)', zIndex: 9999,
          fontSize: '2.5rem'
        }}>
          <WhatsappLogo weight="fill" />
        </a>
      </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
