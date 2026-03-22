import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { PaperPlaneRight, Phone } from '@phosphor-icons/react';
import styles from './OrderForm.module.css';
import { useLang } from '../context/LanguageContext';



const OrderForm: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', requirement: '' });
  const [toast, setToast] = useState<{message: string, type: 'error' | 'success'} | null>(null);
  const { t } = useLang();

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelector('.gsap-form'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );
  }, { scope: sectionRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic formatting constraint mapping to India (+91)
    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    if (phoneClean.length < 10) {
      setToast({ message: "Please enter a valid 10-digit phone number.", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setToast({ message: "Redirecting to our Master Artisans on WhatsApp...", type: "success" });
    
    setTimeout(() => {
      setToast(null);
      const text = `Hi, I am ${formData.name}. Phone: ${formData.phone}. I have a custom furniture requirement:%0A${formData.requirement}`;
      window.open(`https://wa.me/919791983075?text=${text}`, '_blank');
    }, 1500);
  };

  return (
    <section id="custom-order" className={`section ${styles.orderSection}`} ref={sectionRef}>
      
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}

      <div className={`container ${styles.glassCard} gsap-form`}>
        <div className="text-center">
          <span className="subtitle">{t('form.subtitle')}</span>
          <h2>{t('form.h2')}</h2>
          <div className="separator mx-auto"></div>
          <p className="mx-auto" style={{ maxWidth: '600px', marginBottom: '2rem' }}>{t('form.desc')}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className="input-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="name">{t('form.name')}</label>
              <input type="text" id="name" required placeholder="John Doe" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="phone">{t('form.phone')}</label>
              <input type="tel" id="phone" required placeholder="+91 98765 43210"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="req">{t('form.req')}</label>
            <textarea id="req" rows={4} required placeholder={t('form.reqPlaceholder')}
              value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})}></textarea>
          </div>
          
          <div className="text-center mt-2" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primary btn-hover-effect">
              {t('form.submit')} <PaperPlaneRight weight="fill" style={{marginLeft: '8px'}} />
            </button>
            <a href="tel:+919791983075" className="btn btn-outline dark-outline-btn">
              {t('form.call')} <Phone weight="fill" style={{marginLeft: '8px'}} />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
