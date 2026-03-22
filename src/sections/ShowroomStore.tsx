import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MapPin, Phone, CheckCircle } from '@phosphor-icons/react';
import styles from './ShowroomStore.module.css';
import { useLang } from '../context/LanguageContext';

const ShowroomStore: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );

    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-elem'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, { scope: sectionRef });

  return (
    <section className="section bg-light" ref={sectionRef}>
      <div className="container">
        <div className="text-center gsap-title">
          <span className="subtitle">{t('showroom.subtitle')}</span>
          <h2>{t('showroom.h2')}</h2>
          <div className="separator mx-auto"></div>
        </div>

        <div className={styles.showroomWrapper}>
          <div className={`${styles.imageCol} gsap-elem`}>
            {/* Using a premium furniture showroom image */}
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200" alt="Sri Balaji Furniture Showroom" loading="lazy" />
          </div>

          <div className={`${styles.contentCol} gsap-elem`}>
            <h3>{t('showroom.h2')}</h3>
            <p>{t('showroom.desc')}</p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <CheckCircle size={24} weight="fill" className={styles.icon} />
                <span>{t('showroom.f1')}</span>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle size={24} weight="fill" className={styles.icon} />
                <span>{t('showroom.f2')}</span>
              </div>
              <div className={styles.featureItem}>
                <CheckCircle size={24} weight="fill" className={styles.icon} />
                <span>{t('showroom.f3')}</span>
              </div>
            </div>

            <div className={styles.actionBtns}>
              {/* Unit 2 Map Link */}
              <a href="https://maps.app.goo.gl/kXh4wPqB1iB4QzX4A" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-hover-effect">
                <MapPin size={20} weight="bold" style={{marginRight: '8px'}} /> {t('showroom.dir')}
              </a>
              <a href="tel:+919791983075" className="btn btn-outline" style={{borderColor: 'var(--primary)', color: 'var(--primary)'}}>
                <Phone size={20} weight="bold" style={{marginRight: '8px'}} /> {t('showroom.call')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomStore;
