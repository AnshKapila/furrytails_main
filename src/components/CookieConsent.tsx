'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

// Cookie consent: Google Analytics loads only after the visitor clicks Accept.
// The choice lives in localStorage; the Cookie Policy page can reopen the
// banner through CookieChoiceButton (the RESET_EVENT below).

const GA_ID = 'G-V1STLY9M7V';
const STORAGE_KEY = 'ft_cookie_consent';
export const RESET_EVENT = 'ft:cookie-consent-reset';

type Choice = 'accepted' | 'declined';

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private mode or blocked storage: the choice holds for this page only.
  }
}

/** Expire Google Analytics' cookies on this domain and its parent. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid') {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`;
      });
    }
  });
}

export default function CookieConsent() {
  // undefined until mounted, so the server render and first client render match.
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);

  useEffect(() => {
    setChoice(readChoice());
    const reopen = () => setChoice(null);
    window.addEventListener(RESET_EVENT, reopen);
    return () => window.removeEventListener(RESET_EVENT, reopen);
  }, []);

  const decide = (next: Choice) => {
    const hadAnalytics = readChoice() === 'accepted';
    saveChoice(next);
    setChoice(next);
    if (next === 'declined' && hadAnalytics) {
      // Analytics already ran on this page. Switch it off first (Google's
      // documented opt-out flag) - otherwise it rewrites its session cookie
      // before the reload - then clear its cookies and reload.
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
      window.location.reload();
    }
  };

  return (
    <>
      {choice === 'accepted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {choice === null && (
        <div
          role="region"
          aria-label="Cookie consent"
          // bottom-24 keeps it clear of the loyalty pill (left) and WhatsApp button (right)
          className="fixed inset-x-4 bottom-24 z-[2147483000] mx-auto max-w-[620px] bg-[#3B3A38] text-[#F8F5F1] px-5 py-4 md:px-6 md:py-5 shadow-[0_8px_32px_rgba(59,58,56,0.25)] flex flex-col sm:flex-row sm:items-center gap-4"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          <p className="text-[0.8125rem] font-light leading-[1.55] text-[#F8F5F1]/90 flex-1">
            We use analytics cookies to understand how the site is used. They only load if you accept.{' '}
            <Link href="/cookie-settings" className="underline underline-offset-4 decoration-[#F8F5F1]/40 hover:decoration-[#F8F5F1]">
              Cookie Policy
            </Link>
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => decide('declined')}
              className="px-4 py-2 text-[0.75rem] tracking-[0.06em] uppercase border border-[#F8F5F1]/40 hover:border-[#F8F5F1] transition-colors"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => decide('accepted')}
              className="px-4 py-2 text-[0.75rem] tracking-[0.06em] uppercase bg-[#F8F5F1] text-[#3B3A38] hover:bg-[#E9E2D7] transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** "Change cookie choice" - reopens the banner. Used on the Cookie Policy page. */
export function CookieChoiceButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(RESET_EVENT))}
      className="mt-1 inline-flex px-4 py-2 text-[0.75rem] tracking-[0.06em] uppercase border border-[#3B3A38] text-[#3B3A38] hover:bg-[#3B3A38] hover:text-[#F8F5F1] transition-colors"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      Change cookie choice
    </button>
  );
}
