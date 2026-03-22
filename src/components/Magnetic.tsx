import React, { useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 1, ease: 'power3.out' });
  };
  
  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
  };

  return React.cloneElement(children as React.ReactElement<any>, {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  });
}
