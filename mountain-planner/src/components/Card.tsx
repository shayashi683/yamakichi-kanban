import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      className={`card p-4 sm:p-6 ${hover ? 'cursor-pointer transition-all hover:scale-[1.02]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
