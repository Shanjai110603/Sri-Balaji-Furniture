import { useEffect } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const storeProducts = [
  { id: 1, name: 'Royal Teak Sofa Set', price: '₹45,000', img: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, name: 'Minimalist Dining Table', price: '₹32,000', img: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, name: 'Vintage Rosewood Bed', price: '₹55,000', img: 'https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 4, name: 'Modern Accent Chair', price: '₹12,500', img: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 5, name: 'Classic Wooden Wardrobe', price: '₹48,000', img: 'https://images.pexels.com/photos/10086940/pexels-photo-10086940.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 6, name: 'Glass Center Table', price: '₹18,000', img: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export default function Store() {
  useEffect(() => {
    document.title = "Wooden Furniture Near Me | Store - Sri Balaji Wood Works Udumalpet";
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    gsap.fromTo('.store-card', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    );
  });

  const handleOrder = (productName: string) => {
    const text = `Hi! I would like to order the ${productName} directly from your online store.`;
    window.open(`https://wa.me/919791983075?text=${text}`, '_blank');
  };

  return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: 'var(--bg-light)' }}>
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="subtitle">Curated Collection</span>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.5rem', color: 'var(--primary)' }}>Online Store</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1rem auto' }}>
            Browse our ready-to-ship premium furniture directly from our Udumalaipettai workshop. 
            All orders are processed instantly via WhatsApp for personalized white-glove service.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
          {storeProducts.map(product => (
            <div key={product.id} className="store-card" style={{ backgroundColor: 'var(--light)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease' }}>
              <div style={{ height: '300px', overflow: 'hidden', cursor: 'pointer' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} />
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', color: 'var(--primary)', margin: '0 0 0.5rem 0' }}>{product.name}</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent)', margin: '0 0 1.5rem 0' }}>{product.price}</p>
                <button onClick={() => handleOrder(product.name)} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                  <WhatsappLogo size={22} weight="fill" /> Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
