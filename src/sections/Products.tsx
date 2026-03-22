import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { ArrowRight, X } from '@phosphor-icons/react';
import styles from './Products.module.css';
import { useLang } from '../context/LanguageContext';



const products = [
  { id: 1, name: "Luxury Beds", img: "https://images.pexels.com/photos/6480198/pexels-photo-6480198.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 2, name: "Premium Sofas", img: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 3, name: "Dining Ensembles", img: "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 4, name: "Bespoke Wardrobes", img: "https://images.pexels.com/photos/1008692/pexels-photo-1008692.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { id: 5, name: "Executive Office", img: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const Products: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<{id: number, name: string, img: string} | null>(null);
  const { t } = useLang();

  useGSAP(() => {
    if(!sectionRef.current) return;
    
    gsap.fromTo(sectionRef.current.querySelector('.gsap-title'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );

    gsap.fromTo(sectionRef.current.querySelectorAll('.gsap-product'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <section id="products" className="section" ref={sectionRef}>
      <div className="container">
        <div className="text-center gsap-title">
          <span className="subtitle">{t('products.subtitle')}</span>
          <h2>{t('products.h2')}</h2>
          <div className="separator mx-auto"></div>
          <p className="mx-auto" style={{ maxWidth: '600px' }}>{t('products.desc')}</p>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={`${styles.productCard} gsap-product`}>
              <div className={styles.productImg} onClick={() => setSelectedProduct(product)} style={{cursor: 'pointer'}}>
                <img src={product.img} alt={product.name} loading="lazy" />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <button onClick={() => setSelectedProduct(product)} className={styles.productLink} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0}}>
                  {t('products.request')} <ArrowRight className={styles.arrow} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className={styles.lightbox} onClick={() => setSelectedProduct(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeLightbox} onClick={() => setSelectedProduct(null)}>
              <X size={24} weight="bold" />
            </button>
            <img src={selectedProduct.img} alt={selectedProduct.name} />
            <div className={styles.lightboxInfo}>
              <h3>{selectedProduct.name}</h3>
              <p>Premium handcrafted {selectedProduct.name.toLowerCase()} tailored precisely to your exact spatial requirements and aesthetic preferences.</p>
              <a href="#contact" className="btn btn-primary" onClick={() => setSelectedProduct(null)}>
                {t('products.quote')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
