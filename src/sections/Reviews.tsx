import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Quotes, Star } from '@phosphor-icons/react';
import styles from './Reviews.module.css';



const reviews = [
  { name: "Anand R.", text: "The custom teak wood wardrobe they built for my master bedroom is simply stunning. The craftsmanship is evident in every joint." },
  { name: "Karthik P.", text: "We ordered complete office furniture. Not only was the delivery fast, but the premium feel of the wood transformed our workspace." },
  { name: "Lakshmi S.", text: "Sri Balaji Wood Works designed a beautiful rosewood dining table for us. It's the centerpiece of our home now!" },
  { name: "Vishnu V.", text: "Exceptional quality and genuine materials. The detailing on the sofa set matches exactly what was shown in the catalog." }
];

const Reviews: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
        <span className="subtitle">Testimonials</span>
        <h2>Client Experiences</h2>
        <div className="separator mx-auto"></div>
        
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
