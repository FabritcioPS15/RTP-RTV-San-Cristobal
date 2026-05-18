import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
}

const RevealOnScroll = ({ children, className = '' }: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Reset visibility when route changes
  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]); // Re-observe when route changes

  return (
    <div
      ref={ref}
      className={`reveal-base ${isVisible ? 'reveal-visible' : 'reveal-hidden'} ${className}`}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;

