'use client';

import { ReactNode, useEffect, useState, MouseEvent } from 'react';
import { CloseSquare } from 'iconsax-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  actionText?: string;
  onSubmit?: () => void;
  children: ReactNode;
  actionVariant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl' | '6xl';
  footer?: ReactNode;
  hideDefaultFooter?: boolean;
  disabled?: boolean;
  actionDisabled?: boolean;
  rootClassName?: string;
  panelClassName?: string;
  contentClassName?: string;
  hideCloseButton?: boolean;
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  actionText,
  onSubmit,
  children,
  actionVariant = 'primary',
  size = 'lg',
  footer,
  hideDefaultFooter = false,
  disabled = false,
  actionDisabled = false,
  rootClassName,
  panelClassName,
  contentClassName,
  hideCloseButton = false,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'overlay';
    }
    return () => {
      document.body.style.overflow = 'overlay';
    };
  }, [open]);

  if (!mounted || !open) return null;

  const handleClose = () => {
    if (!disabled) {
      onClose();
    }
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
  };

  const modalContent = (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4', rootClassName)}>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={handleBackdropClick} 
        aria-hidden="true" 
      />

      <div
        className={cn(
          `relative w-full ${sizeClasses[size]} rounded-sm bg-background border border-border flex flex-col shadow-2xl max-h-[90vh] animate-in fade-in zoom-in-95 duration-200`,
          panelClassName
        )}
      >
        {title ? (
          <div className="flex items-start justify-between p-4 md:p-6 mb-4 md:mb-6 shrink-0 border-b border-border">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {!hideCloseButton && (
              <button
                onClick={handleClose}
                disabled={disabled}
                className="rounded-full hover:bg-surface p-1 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
              >
                <CloseSquare size="24" color="currentColor" variant="Bulk" />
              </button>
            )}
          </div>
        ) : !hideCloseButton ? (
          <button
            onClick={handleClose}
            disabled={disabled}
            className="absolute top-4 right-4 z-10 rounded-full hover:bg-surface p-1 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
          >
            <CloseSquare size="24" color="currentColor" variant="Bulk" />
          </button>
        ) : null}

        <div
          className={cn(
            'flex-1 overflow-y-auto px-4 md:px-6 pb-4 md:pb-6',
            !title && 'pt-4 md:pt-6',
            contentClassName
          )}
        >
          {children}
        </div>

        {(footer || (!hideDefaultFooter && actionText && onSubmit)) && (
          <div className="p-4 md:p-6 mt-auto border-t border-border shrink-0">
            {footer ? (
              footer
            ) : !hideDefaultFooter && actionText && onSubmit ? (
              <Button
                onClick={onSubmit}
                size="lg"
                variant={actionVariant}
                disabled={disabled || actionDisabled}
                className="w-full"
              >
                {actionText}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
