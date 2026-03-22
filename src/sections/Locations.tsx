import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { MapPin } from '@phosphor-icons/react';
import styles from './Locations.module.css';
import { useLang } from '../context/LanguageContext';



const locationsData = [
  {
    title: "Manufacture Unit 2",
    address: "Palani Rd, Udumalaipettai, Tamil Nadu 642126",
    link: "https://maps.app.goo.gl/NneAgzbYxTzkZm8P8",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15682.0234125741!2d77.24074215!3d10.58434775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9ce2f8cc5cd83%3A0xc6c760cdfc99b9cf!2sSri%20Balaji%20Wood%20Works!5e0!3m2!1sen!2sin!4v1701234567890!5m2!1sen!2sin"
  },
  {
    title: "Branch 2",
    address: "Bypass Rd, Udumalaipettai, Tamil Nadu 642126",
    link: "https://maps.app.goo.gl/ZmrmuRXrJePcYunJ6",
    embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7841.011706287!2d77.245!3d10.584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM1JzAyLjQiTiA3N8KwMTQnNDIuMCJF!5e0!3m2!1sen!2sin!4v1701234567891!5m2!1sen!2sin"
  }
];

const Locations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );

    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-location'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <section id="locations" className="section" ref={sectionRef}>
      <div className="container text-center">
        <div className="gsap-title">
          <span className="subtitle">{t('loc.subtitle')}</span>
          <h2>{t('loc.h2')}</h2>
          <div className="separator mx-auto"></div>
        </div>

        <div className={styles.locationsGrid}>
          {locationsData.map((loc, idx) => (
            <div key={idx} className={`${styles.locationCard} gsap-location`}>
              <h3><MapPin weight="fill" /> {loc.title}</h3>
              <p><MapPin weight="duotone" /> {loc.address}</p>
              
              <div className={styles.mapContainer}>
                <iframe src={loc.embed} width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="map-iframe"></iframe>
              </div>
              
              <a href={loc.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline dark-outline-btn w-100">
                {t('loc.directions')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
