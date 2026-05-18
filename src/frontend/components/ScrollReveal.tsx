import { ReactNode, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && elementRef.current) {
      const timer = setTimeout(() => {
        elementRef.current?.classList.add('opacity-100', 'translate-y-0');
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <div 
      ref={(node) => {
        ref(node);
        if (node) {
          (elementRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={`transition-all duration-700 ease-out opacity-0 translate-y-8 ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
