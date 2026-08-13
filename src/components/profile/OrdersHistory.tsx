'use client';

import React from 'react';

export default function OrdersHistory() {
  return (
    <div className="max-w-xl">
      <h2 className="text-[#3B3A38] text-2xl mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}>
        Orders History
      </h2>
      <div className="border border-[#E9E2D7] p-8 text-center flex flex-col items-center justify-center gap-4 rounded-sm">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[#8D9A83]">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <p className="text-[0.875rem] font-light text-[#3B3A38]/80 leading-[1.65]" style={{ fontFamily: 'var(--font-inter)' }}>
          You have no past orders.
        </p>
      </div>
    </div>
  );
}
