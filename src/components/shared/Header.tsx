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
      <div className="page-container flex h-16 items-center justify-between py-0 md:py-0">
        <Link href="/" className="font-bold text-lg tracking-tighter text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-primary-foreground text-xs italic font-serif">
            AIC
          </span>
          Art Institute of Chicago Gallery
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="h-6 w-px bg-border mx-2"></div>
          
          {isAuthenticated && user ? (
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-surface transition-colors border border-transparent hover:border-border"
              >
                <Avatar firstName={user.firstName} lastName={user.lastName} size="sm" className="rounded-sm" />
                <span className="text-sm font-semibold text-foreground hidden sm:inline-block">
                  {user.firstName}
                </span>
                <ArrowDown2 size="14" className={isProfileOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
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
                    <Logout size="18" variant="Outline" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn btn-primary h-10 px-5 rounded-sm text-sm font-medium transition-all flex items-center gap-2"
            >
              <Profile size="18" color="currentColor" variant="Bold" />
              Sign in
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
