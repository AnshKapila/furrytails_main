'use client';

import { useInView } from '@/hooks/useInView';
import { ReactNode } from 'react';

export default function AnimatedSection({
  children,
  className = '',
  id,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      id={id}
      className={`anim-blur-slide ${inView ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
