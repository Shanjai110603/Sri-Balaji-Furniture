import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Storefront, WhatsappLogo } from '@phosphor-icons/react';
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import Magnetic from '../components/Magnetic';
import { useLang } from '../context/LanguageContext';



const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    // Parallax
    gsap.to(bgRef.current, {
      yPercent: 40,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Content animation
    const tl = gsap.timeline();
    tl.from('.hero-elem', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className={styles.hero} id="home">
      <div className={styles.heroBgWrapper}>
        <div 
          ref={bgRef} 
          className={styles.heroBg} 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000')` }}
        />
        <div className={styles.overlay}></div>
      </div>

      <div ref={contentRef} className={styles.heroContent}>
        <span className={`${styles.subtitle} hero-elem`}>{t('hero.subtitle')}</span>
        <h1 className="hero-elem">{t('hero.h1').split('\n').map((line, i) => <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>)}</h1>
        <p className="hero-elem">{t('hero.desc')}</p>
        
        <div className={`${styles.heroBtns} hero-elem`} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Magnetic>
            <a href="#products" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              {t('hero.explore')} <ArrowRight className={styles.icon} weight="bold" />
            </a>
          </Magnetic>
          <Magnetic>
            <Link to="/store" className="btn btn-outline" style={{ display: 'inline-flex' }}>
              {t('hero.visit')} <Storefront className={styles.icon} weight="bold" />
            </Link>
          </Magnetic>
          <Magnetic>
            <a href="https://wa.me/919791983075" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', borderColor: '#25D366', color: '#25D366' }}>
              {t('hero.whatsapp')} <WhatsappLogo className={styles.icon} weight="fill" />
            </a>
          </Magnetic>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}></div>
        <p>Scroll</p>
      </div>
    </section>
  );
};

export default Hero;
