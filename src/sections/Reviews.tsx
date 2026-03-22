import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Quotes, Star } from '@phosphor-icons/react';
import styles from './Reviews.module.css';
import { useLang } from '../context/LanguageContext';






const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  const reviews = [
    { name: "Anand R.", text: t('reviews.r1') },
    { name: "Karthik P.", text: t('reviews.r2') },
    { name: "Lakshmi S.", text: t('reviews.r3') },
    { name: "Vishnu V.", text: t('reviews.r4') },
    { name: "Meena K.", text: t('reviews.r5') },
  ];

  useGSAP(() => {
    if(!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );
  }, { scope: sectionRef });

  return (
    <section className="section bg-light" ref={sectionRef}>
      <div className="container text-center gsap-title">
        <span className="subtitle">{t('reviews.subtitle')}</span>
        <h2>{t('reviews.h2')}</h2>
        <div className="separator mx-auto"></div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--accent)', color: 'var(--light)', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star weight="fill" /> 4.6/5
          </div>
          <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{t('reviews.ratingText').split('4.6/5')[0]} <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>100+</span></span>
        </div>
        
        <div className={styles.reviewsWrapper}>
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 }
            }}
            className={styles.reviewsSwiper}
          >
            {reviews.map((rev, idx) => (
              <SwiperSlide key={idx}>
                <div className={styles.reviewCard}>
                  <Quotes weight="fill" className={styles.quoteIcon} />
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => <Star key={i} weight="fill" />)}
                  </div>
                  <p>"{rev.text}"</p>
                  <h4>- {rev.name}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
