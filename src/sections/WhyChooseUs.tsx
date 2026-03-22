import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Medal, Users, Star, Sliders, Tag, Truck } from '@phosphor-icons/react';
import styles from './WhyChooseUs.module.css';
import { useLang } from '../context/LanguageContext';





const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const features = [
    { icon: Medal, title: t('why.f1.title'), text: t('why.f1.text') },
    { icon: Users, title: t('why.f2.title'), text: t('why.f2.text') },
    { icon: Star, title: t('why.f3.title'), text: t('why.f3.text') },
    { icon: Sliders, title: t('why.f4.title'), text: t('why.f4.text') },
    { icon: Tag, title: t('why.f5.title'), text: t('why.f5.text') },
    { icon: Truck, title: t('why.f6.title'), text: t('why.f6.text') },
  ];

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );

    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-feature'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <section id="why-us" className="section bg-light" ref={sectionRef}>
      <div className="container text-center">
        <div className="gsap-title">
          <span className="subtitle">{t('why.subtitle')}</span>
          <h2>{t('why.h2')}</h2>
          <div className="separator mx-auto"></div>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((item, idx) => (
            <div key={idx} className={`${styles.card} gsap-feature`}>
              <div className={styles.iconWrap}>
                <item.icon className={styles.icon} weight="duotone" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="gsap-title mt-2" style={{ marginTop: '3rem' }}>
          <a href="#contact" className="btn btn-primary btn-hover-effect">{t('why.cta')}</a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
