import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckCircle } from '@phosphor-icons/react';
import { useLang } from '../context/LanguageContext';
import styles from './About.module.css';



const StatCounter: React.FC<{ target: number, title: string, suffix?: string }> = ({ target, title, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let current = 0;
          const duration = 2000;
          const step = target / (duration / 16);

          const updateCounter = () => {
            current += step;
            if (current < target) {
              setCount(Math.ceil(current));
              requestAnimationFrame(updateCounter);
            } else {
              setCount(target);
            }
          };
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className={styles.statItem} ref={ref}>
      <h3>{count}<span>{suffix}</span></h3>
      <p>{title}</p>
    </div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-reveal'),
      { y: 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
      }
    );

    // Parallax on image
    gsap.to('.about-parallax', {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: `.${styles.imgWrapper}`,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: sectionRef });

  return (
    <section id="about" className="section bg-light" ref={sectionRef}>
      <div className={`container ${styles.grid2}`}>
        <div className={styles.imgWrapper}>
          <div className={styles.placeholderImg} style={{ overflow: 'hidden' }}>
            <img 
              src="https://lh3.googleusercontent.com/p/AF1QipM0OKEbliM0QIU9kpmW4j5yBSkz9f2qmFi0D1jV=s1600" 
              alt="Sri Balaji Workshop" 
              loading="lazy"
              className="about-parallax"
              style={{ transform: 'scale(1.2) translateY(-10%)', transformOrigin: 'center center' }}
            />
          </div>
        </div>
        
        <div className="content">
          <span className="subtitle gsap-reveal">{t('about.subtitle')}</span>
          <h2 className="gsap-reveal">{t('about.h2')}</h2>
          <div className="separator-left gsap-reveal"></div>
          
          <p className="gsap-reveal">{t('about.p1')}</p>
          <p className="gsap-reveal">{t('about.p2')}</p>
          
          <div className={`${styles.checkList} gsap-reveal mt-2`}>
            <p><CheckCircle size={24} weight="fill" color="var(--accent)" /> {t('about.check1')}</p>
            <p><CheckCircle size={24} weight="fill" color="var(--accent)" /> {t('about.check2')}</p>
            <p><CheckCircle size={24} weight="fill" color="var(--accent)" /> {t('about.check3')}</p>
          </div>
          
          <div className={`${styles.statsGrid} gsap-reveal`}>
            <StatCounter target={30} title={t('about.stat1')} suffix="+" />
            <StatCounter target={5000} title={t('about.stat2')} suffix="+" />
            <StatCounter target={100} title={t('about.stat3')} suffix="%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
