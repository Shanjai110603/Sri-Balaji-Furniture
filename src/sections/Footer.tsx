import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { FacebookLogo, InstagramLogo, TwitterLogo, WhatsappLogo, Circle } from '@phosphor-icons/react';
import styles from './Footer.module.css';
import { useLang } from '../context/LanguageContext';



const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-footer'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 90%" } }
    );
  }, { scope: sectionRef });

  return (
    <footer id="contact" className={`${styles.footer} bg-dark`} ref={sectionRef}>
      <div className="container">
        <div className={styles.gridFooter}>
          <div className={`${styles.footerCol} gsap-footer`}>
            <a href="#" className={styles.footerLogo}>Sri Balaji <span>Wood Works</span></a>
            <p style={{ color: '#a0a0a0', marginBottom: '1.5rem', maxWidth: '300px' }}>{t('footer.tagline')}</p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><FacebookLogo weight="fill" /></a>
              <a href="#" className={styles.socialIcon}><InstagramLogo weight="fill" /></a>
              <a href="#" className={styles.socialIcon}><TwitterLogo weight="fill" /></a>
              <a href="https://wa.me/919791983075" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}><WhatsappLogo weight="fill" /></a>
            </div>
          </div>

          <div className={`${styles.footerCol} gsap-footer`}>
            <h3>{t('footer.links')}</h3>
            <ul>
              <li><Circle weight="fill" size={8} style={{marginRight: '8px', color: 'var(--accent)'}} /> <a href="#home">Home</a></li>
              <li><Circle weight="fill" size={8} style={{marginRight: '8px', color: 'var(--accent)'}} /> <a href="#about">Our Story</a></li>
              <li><Circle weight="fill" size={8} style={{marginRight: '8px', color: 'var(--accent)'}} /> <a href="#products">Products</a></li>
              <li><Circle weight="fill" size={8} style={{marginRight: '8px', color: 'var(--accent)'}} /> <a href="#gallery">Gallery</a></li>
            </ul>
          </div>

          <div className={`${styles.footerCol} gsap-footer`}>
            <h3>{t('footer.contact')}</h3>
            <ul style={{ color: '#a0a0a0' }}>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Unit 2:</strong> Palani Rd, Udumalaipettai, TN 642126
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Phone:</strong> +91 97919 83075
              </li>
              <li>
                <strong>Email:</strong> contact@sribalajiwoods.com
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.footerBottom} gsap-footer`}>
          <p>&copy; {new Date().getFullYear()} {t('footer.copy')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
