import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'power2.out' });
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.5, ease: 'power2.out' });
    };

    const addHover = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { scale: 2, backgroundColor: 'rgba(184, 134, 11, 0.1)', borderColor: 'var(--accent)', duration: 0.3 });
    };
    const removeHover = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'var(--text-muted)', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    
    // Attach hover effects to links/buttons
    const hoverElements = document.querySelectorAll('a, button, input, textarea, .gsap-product, .swiper-slide img');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={followerRef} className="cursor-follower"></div>
    </>
  );
};

export default CustomCursor;
