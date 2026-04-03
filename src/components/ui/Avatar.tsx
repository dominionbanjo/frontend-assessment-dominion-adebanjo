import { cn } from '@/lib/utils';

interface AvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Avatar({ firstName, lastName, size = 'md', className }: AvatarProps) {
  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div 
      className={cn(
        "rounded-sm bg-muted flex items-center justify-center text-muted-foreground font-medium shrink-0 overflow-hidden border border-border",
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
