import { ReactNode } from 'react';

interface WarningBoxProps {
  type?: 'warning' | 'tip' | 'danger';
  title?: string;
  children: ReactNode;
}

export default function WarningBox({ type = 'warning', title, children }: WarningBoxProps) {
  const styles = {
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      titleText: 'text-amber-900',
      borderLeft: 'border-l-4 border-l-amber-500'
    },
    tip: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      titleText: 'text-blue-900',
      borderLeft: 'border-l-4 border-l-blue-500'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      titleText: 'text-red-900',
      borderLeft: 'border-l-4 border-l-red-600'
    }
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} ${style.borderLeft} rounded-lg p-5 my-6`}>
      {title && (
        <h4 className={`font-bold ${style.titleText} mb-2 text-sm uppercase tracking-wide`}>
          {title}
        </h4>
      )}
      <div className={`${style.text} text-sm leading-relaxed`}>
        {children}
      </div>
    </div>
  );
}
