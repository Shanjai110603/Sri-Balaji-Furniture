import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import styles from './Gallery.module.css';



const galleryImages = [
  "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1008692/pexels-photo-1008692.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/6480198/pexels-photo-6480198.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );
  }, { scope: sectionRef });

  return (
    <section id="gallery" className="section bg-light" ref={sectionRef}>
      <div className="container text-center gsap-title">
        <span className="subtitle">Portfolio</span>
        <h2>Recent Creations</h2>
        <div className="separator mx-auto"></div>
      </div>

      <div className={`container ${styles.galleryWrapper}`}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3, spaceBetween: 30 }
          }}
          className={styles.gallerySwiper}
        >
          {galleryImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div className={styles.galleryItem}>
                <img src={src} alt="Gallery item" loading="lazy" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
