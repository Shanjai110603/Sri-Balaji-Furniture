import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { MapPin, Phone, Clock } from '@phosphor-icons/react';
import styles from './Locations.module.css';
import { useLang } from '../context/LanguageContext';



// Locations data is now inside the component to use the t() function

const Locations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const locationsData = [
    {
      title: t('loc.u2.title'),
      address: t('loc.u2.addr'),
      phone: t('loc.u2.phone'),
      time: t('loc.u2.time'),
      link: "https://maps.app.goo.gl/kXh4wPqB1iB4QzX4A", // Correct Unit 2 map link
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.6395353846663!2d77.2400557!3d10.584218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9ce2f8cc5cd83%3A0xc6c760cdfc99b9cf!2sSri%20Balaji%20Wood%20Works!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
    },
    {
      title: t('loc.b2.title'),
      address: t('loc.b2.addr'),
      phone: t('loc.b2.phone'),
      time: t('loc.b2.time'),
      link: "https://maps.app.goo.gl/ZmrmuRXrJePcYunJ6", // Maintained original branch 2 link
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.585507421867!2d77.2429402!3d10.5878844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9ce542b93fcb9%3A0x868b8e05d045bfd3!2sSri%20Balaji%20Wood%20Work%20and%20Furniture!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
    }
  ];

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
              <p><MapPin weight="duotone" /> <span>{loc.address}</span></p>
              <p><Phone weight="duotone" /> <a href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`} style={{color: 'inherit'}}>{loc.phone}</a></p>
              <p><Clock weight="duotone" /> <span>{loc.time}</span></p>
              
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
