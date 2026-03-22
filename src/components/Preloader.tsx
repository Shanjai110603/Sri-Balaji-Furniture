import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Armchair } from '@phosphor-icons/react';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // 1. Counter Animation
    const counterObj = { value: 0 };
    gsap.to(counterObj, {
      value: 100,
      duration: 2.5, // plenty of time to play with the spotlight
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counterObj.value))
    });

    // 2. SVG/Icon Wipe Reveal (Blueprint Drawing illusion)
    gsap.fromTo('.svg-reveal', 
      { clipPath: 'inset(100% 0 0 0)' }, 
      { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power3.inOut', delay: 0.5 }
    );

    // 3. Ken Burns pan on the Video/Image inside the typography
    gsap.to('.video-text', { 
      backgroundPosition: '100% 50%', 
      duration: 6, 
      ease: 'none', 
      repeat: -1, 
      yoyo: true 
    });

    // 4. Grand Exit Sequence
    const tl = gsap.timeline({
      delay: 2.8,
      onComplete: () => {
        onComplete();
      }
    });

    tl.to('.counter', { opacity: 0, y: -20, duration: 0.4 })
      // Content scales and fades away
      .to('.content-wrapper', { scale: 1.1, opacity: 0, duration: 0.8, ease: "power3.in" }, "-=0.2")
      // Final Door Split
      .to('.door-left', { xPercent: -100, duration: 1.2, ease: "power4.inOut" }, "-=0.2")
      .to('.door-right', { xPercent: 100, duration: 1.2, ease: "power4.inOut" }, "<");
      
  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 999999, pointerEvents: 'none', backgroundColor: 'transparent' }}>
      
      {/* Background Doors */}
      <div className="door-left" style={{ position: 'absolute', top: 0, left: 0, width: '51%', height: '100%', backgroundColor: '#0a0a0a', zIndex: 1 }}></div>
      <div className="door-right" style={{ position: 'absolute', top: 0, right: 0, width: '51%', height: '100%', backgroundColor: '#0a0a0a', zIndex: 1 }}></div>
      
      {/* Content Wrapper */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505' }}>
        
        {/* Loading Counter */}
        <div className="counter" style={{ position: 'absolute', bottom: '10vh', fontFamily: '"Inter", sans-serif', color: '#B8860B', fontSize: '1rem', letterSpacing: '4px', fontWeight: 300, zIndex: 4 }}>
          {progress.toString().padStart(3, '0')}%
        </div>

        {/* Blueprint Icon Wipe */}
        <div className="svg-reveal" style={{ marginBottom: '1.5rem', opacity: 1, zIndex: 4 }}>
          <Armchair size={100} weight="thin" color="#d4af37" />
        </div>
        
        {/* Cinematic Video Typography Mask */}
        <h1 className="video-text" style={{ 
          fontFamily: '"Playfair Display", serif', 
          fontSize: 'clamp(3rem, 12vw, 9rem)', 
          margin: 0, 
          // High-end glowing wood grain texture standing in for video
          backgroundImage: 'url("https://images.unsplash.com/photo-1606170033648-5d55a3edf314?q=80&w=2640&auto=format&fit=crop")',
          backgroundSize: '150% auto',
          backgroundPosition: '0% 50%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1,
          textAlign: 'center',
          zIndex: 4
        }}>
          SRI BALAJI<br/><span style={{ fontSize: 'clamp(1rem, 4vw, 3rem)', letterSpacing: '10px', display: 'block', marginTop: '-1rem', fontFamily: '"Inter", sans-serif', fontWeight: 300 }}>WOOD WORKS</span>
        </h1>

      </div>
    </div>
  );
};

export default Preloader;
