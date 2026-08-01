import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md';
    
    const variants = {
      primary: 'bg-[var(--color-gfs-blue)] text-white hover:bg-blue-600 focus-visible:ring-[var(--color-gfs-blue)]',
      secondary: 'bg-[var(--color-gfs-surface)] text-[var(--color-gfs-text)] border border-[var(--color-gfs-border)] hover:bg-[var(--color-gfs-hover)] focus-visible:ring-[var(--color-gfs-border-focus)]',
      danger: 'bg-[var(--color-gfs-red)] text-white hover:bg-red-600 focus-visible:ring-[var(--color-gfs-red)]',
      outline: 'border border-[var(--color-gfs-border)] text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] focus-visible:ring-[var(--color-gfs-border-focus)]',
      ghost: 'text-[var(--color-gfs-text-secondary)] hover:text-[var(--color-gfs-text)] hover:bg-[var(--color-gfs-hover)] focus-visible:ring-[var(--color-gfs-border-focus)]',
    };

    const sizes = {
      default: 'h-[36px] px-4 py-2 text-[13px]', // 36px height
      sm: 'h-[32px] px-3 py-1.5 text-[12px]',
      icon: 'h-[32px] w-[32px]', // 32px icon button
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
