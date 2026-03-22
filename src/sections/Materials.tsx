import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Tree, ShieldCheck, Diamond } from '@phosphor-icons/react';
import styles from './Materials.module.css';



const Materials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );

    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-material'),
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <section id="materials" className={`${styles.parallaxSection} section bg-dark text-center`} ref={sectionRef}>
      <div className={styles.parallaxOverlay}></div>
      <div className="container z-1 pos-rel">
        
        <div className="text-center gsap-title">
          <span className="subtitle gold-text">Superior Quality</span>
          <h2>The Soul of Our Furniture</h2>
          <div className="separator mx-auto gold-bg"></div>
          <p className="mx-auto" style={{ maxWidth: '700px', color: '#ccc' }}>
            We source only the finest, matured timber to ensure your furniture looks magnificent and lasts for generations.
          </p>
        </div>

        <div className={styles.materialsList}>
          
          <div className={`${styles.materialItem} gsap-material`}>
            <Tree className={styles.matIcon} />
            <div className="text-left">
              <h3>First Grade Teak Wood</h3>
              <p>Known for its incredible durability and natural weather resistance, teak is the gold standard for enduring furniture.</p>
            </div>
          </div>

          <div className={`${styles.materialItem} gsap-material`}>
            <ShieldCheck className={styles.matIcon} />
            <div className="text-left">
              <h3>Authentic Rosewood</h3>
              <p>Famous for its deep, rich hues and distinct grain patterns, perfect for creating exquisite, statement pieces.</p>
            </div>
          </div>

          <div className={`${styles.materialItem} gsap-material`}>
            <Diamond className={styles.matIcon} />
            <div className="text-left">
              <h3>Premium BTC Wood</h3>
              <p>Burma Teak Wood offers unmatched stability, minimal shrinkage, and a gorgeous finish that appreciates over time.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Materials;
