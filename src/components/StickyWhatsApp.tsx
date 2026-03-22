import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import styles from './StickyWhatsApp.module.css';

const StickyWhatsApp: React.FC = () => {
  return (
    <a 
      href="https://wa.me/919791983075" 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.whatsappFloat}
      aria-label="Contact us on WhatsApp"
    >
      <WhatsappLogo weight="fill" />
    </a>
  );
};

export default StickyWhatsApp;
