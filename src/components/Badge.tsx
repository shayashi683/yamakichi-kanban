import { Difficulty } from '@/types';

interface BadgeProps {
  variant?: 'default' | 'difficulty';
  difficulty?: Difficulty;
  children?: React.ReactNode;
}

export default function Badge({ variant = 'default', difficulty, children }: BadgeProps) {
  if (variant === 'difficulty' && difficulty) {
    const difficultyStyles = {
      '初級': 'badge-beginner',
      '中級': 'badge-intermediate',
      '上級': 'badge-advanced',
    };

    return (
      <span className={`badge ${difficultyStyles[difficulty]}`}>
        {difficulty}
      </span>
    );
  }

  return (
    <span className="badge bg-sky-light text-deep-blue">
      {children}
    </span>
  );
}
