import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Tree, ShieldCheck, Diamond } from '@phosphor-icons/react';
import styles from './Materials.module.css';
import { useLang } from '../context/LanguageContext';



const Materials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

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
          <span className="subtitle gold-text">{t('mat.subtitle')}</span>
          <h2>{t('mat.h2')}</h2>
          <div className="separator mx-auto gold-bg"></div>
          <p className="mx-auto" style={{ maxWidth: '700px', color: '#ccc' }}>{t('mat.desc')}</p>
        </div>

        <div className={styles.materialsList}>
          
          <div className={`${styles.materialItem} gsap-material`}>
            <Tree className={styles.matIcon} />
            <div className="text-left">
              <h3>{t('mat.m1.title')}</h3>
              <p>{t('mat.m1.desc')}</p>
            </div>
          </div>

          <div className={`${styles.materialItem} gsap-material`}>
            <ShieldCheck className={styles.matIcon} />
            <div className="text-left">
              <h3>{t('mat.m2.title')}</h3>
              <p>{t('mat.m2.desc')}</p>
            </div>
          </div>

          <div className={`${styles.materialItem} gsap-material`}>
            <Diamond className={styles.matIcon} />
            <div className="text-left">
              <h3>{t('mat.m3.title')}</h3>
              <p>{t('mat.m3.desc')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Materials;
