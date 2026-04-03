'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../ui/ThemeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { login, logout } from '../../redux/slices/authSlice';
import { Profile, Logout, ArrowDown2 } from 'iconsax-react';
import Modal from '../ui/Modal';
import Avatar from '../ui/Avatar';
import { Input } from '../ui/Input';

export default function Header() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleLoginSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    
    dispatch(
      login({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      })
    );
    setIsLoginModalOpen(false);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
          <span className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center text-primary-foreground text-xs italic font-serif shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            AIC
          </span>
          <div className="flex flex-col -space-y-0.5 shrink-0">
            <span className="text-sm sm:text-base md:text-xl font-serif italic tracking-tight text-foreground leading-tight whitespace-nowrap">
              Art Institute
            </span>
            <span className="text-[9px] md:text-[11px] font-medium text-muted-foreground uppercase tracking-[0.2em] leading-tight hidden min-[400px]:block whitespace-nowrap">
              of Chicago Gallery
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          <div className="h-6 w-px bg-border/60 mx-1 sm:mx-2"></div>
          
          {isAuthenticated && user ? (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 sm:px-2 sm:py-1.5 rounded-sm hover:bg-surface transition-colors border border-transparent hover:border-border"
              >
                <Avatar firstName={user.firstName} lastName={user.lastName} size="sm" className="rounded-sm" />
                <span className="text-sm font-semibold text-foreground hidden sm:inline-block">
                  {user.firstName}
                </span>
                <ArrowDown2 size="14" color="currentColor" variant="Outline" className={isProfileOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-sm shadow-xl p-1 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">Account</p>
                    <p className="text-sm font-bold text-foreground line-clamp-1">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/5 rounded-sm transition-colors"
                  >
                    <Logout size="18" color="currentColor" variant="Outline" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn btn-primary h-10 w-10 sm:w-auto sm:px-5 p-0 rounded-sm text-sm font-medium transition-all flex items-center justify-center sm:gap-2 shadow-sm"
              aria-label="Sign in"
            >
              <Profile size="20" color="currentColor" variant="Bold" />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </div>

      <Modal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Welcome Back"
        subtitle="Sign in to your account to explore more artworks."
        actionText="Sign In"
        onSubmit={handleLoginSubmit}
      >
        <div className="flex flex-col gap-5 py-2">
          <Input 
            label="First Name"
            placeholder="Jane"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <Input 
            label="Last Name"
            placeholder="Doe"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <Input 
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </Modal>
    </header>
  );
}
