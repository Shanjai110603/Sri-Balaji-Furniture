import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { PenNib, Tag, Truck, ShieldStar } from '@phosphor-icons/react';
import styles from './WhyChooseUs.module.css';



const features = [
  { icon: PenNib, title: "Custom Design Support", text: "Work directly with our artisans to bring your exact vision to life." },
  { icon: Tag, title: "Affordable Pricing", text: "Premium quality without the middleman markup. Direct from our workshop." },
  { icon: Truck, title: "Fast Delivery", text: "Efficient production timelines ensuring you get your furniture on schedule." },
  { icon: ShieldStar, title: "Strong & Durable", text: "Built with structural integrity guaranteeing decades of reliable use." },
];

const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
          <span className="subtitle">The Balaji Difference</span>
          <h2>Why Choose Us</h2>
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
          <a href="#contact" className="btn btn-primary btn-hover-effect">Call Now for Free Consultation</a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
