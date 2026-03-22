import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { PaperPlaneRight } from '@phosphor-icons/react';
import styles from './OrderForm.module.css';



const OrderForm: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', requirement: '' });
  const [toast, setToast] = useState<{message: string, type: 'error' | 'success'} | null>(null);

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
          <span className="subtitle">Let's Build It</span>
          <h2>Request a Custom Quote</h2>
          <div className="separator mx-auto"></div>
          <p className="mx-auto" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            Have a specific design in mind? Share your details and our master artisans will get back to you with a free consultation and estimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          <div className="input-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" required placeholder="John Doe" 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className={styles.formGroup} style={{ flex: 1 }}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" required placeholder="+91 98765 43210"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="req">Your Furniture Requirement</label>
            <textarea id="req" rows={4} required placeholder="E.g., I need a king size teak wood bed with carving..."
              value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})}></textarea>
          </div>
          
          <div className="text-center mt-2">
            <button type="submit" className="btn btn-primary btn-hover-effect">
              Send via WhatsApp <PaperPlaneRight weight="fill" style={{marginLeft: '8px'}} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
