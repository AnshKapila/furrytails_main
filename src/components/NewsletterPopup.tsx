'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Check if they've seen it before
    const hasSeen = localStorage.getItem('ft_newsletter_seen');
    if (!hasSeen) {
      // Delay popup slightly for better UX
      const timer = setTimeout(() => setIsOpen(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('ft_newsletter_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-500">
      <div 
        className="relative bg-white w-full max-w-[400px] md:max-w-[480px] aspect-[3/4] md:aspect-square flex flex-col justify-center items-center text-center p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in-95 duration-500"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#BEB8AF] hover:text-[#3B3A38] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8D9A83]"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8D9A83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-display font-light text-[#3B3A38]">Welcome to the Pack.</h2>
            <p className="text-[0.875rem] text-[#68735F] font-light leading-relaxed">
              Check your inbox for your 15% off code. The ritual begins soon.
            </p>
          </div>
        ) : (
          <>
            <span className="block text-[0.625rem] font-normal tracking-[0.25em] uppercase text-[#8D9A83] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
              Join Furry Tail
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-light text-[#3B3A38] mb-4">
              Unlock 15% Off
            </h2>
            <p className="text-[0.875rem] text-[#68735F] font-light leading-relaxed mb-6">
              Subscribe to get 15% off your first order with code <strong className="font-normal text-[#3B3A38]">FURRYTAIL15</strong>, plus exclusive offers, discounts, and early access to new rituals.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F5F1] border border-[#D8CFC4] px-4 py-3 text-[0.875rem] text-[#3B3A38] placeholder:text-[#BEB8AF] focus:outline-none focus:border-[#8D9A83] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#3B3A38] text-[#F8F5F1] px-4 py-3 text-[0.75rem] font-normal tracking-[0.1em] uppercase hover:bg-[#2A2928] active:bg-[#2A2928] transition-colors disabled:opacity-50"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                {status === 'loading' ? 'Subscribing...' : 'Get 15% Off'}
              </button>
              {status === 'error' && (
                <p className="text-[0.75rem] text-[#c0392b] mt-1">Something went wrong. Please try again.</p>
              )}
            </form>
            
            <p className="text-[0.625rem] text-[#BEB8AF] font-normal mt-6 leading-relaxed px-4" style={{ fontFamily: 'var(--font-inter)' }}>
              By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
