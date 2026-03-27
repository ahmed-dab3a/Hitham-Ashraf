import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Premium Button Component */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-accent hover:bg-orange-600 text-black font-bold shadow-lg shadow-accent/20',
      secondary: 'bg-primary hover:bg-primary-light text-white font-bold',
      outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-black font-bold',
      ghost: 'text-white hover:bg-white/10',
    };
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

/** Premium Card Component */
export const Card = ({ className, children, onClick }: { className?: string; children: React.ReactNode; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
    'bg-card-bg border border-white/10 rounded-3xl p-6 hover:border-accent/30 transition-all duration-500 shadow-xl overflow-hidden relative group',
    onClick ? 'cursor-pointer' : '',
    className
  )}>
    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />
    {children}
  </div>
);
