'use client';

import React, { useState, useEffect } from 'react';
import { useProfile } from '@/lib/profile';

export default function ProfileDetails() {
  const { details, updateDetails, isLoaded } = useProfile();
  const [formData, setFormData] = useState(details);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isLoaded) setFormData(details);
  }, [details, isLoaded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDetails(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!isLoaded) return <div className="animate-pulse h-64 bg-[#E9E2D7] rounded-sm" />;

  return (
    <div className="max-w-xl">
      <h2 className="text-[#3B3A38] text-2xl mb-6" style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 400 }}>
        Profile Details
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[0.625rem] font-normal tracking-[0.12em] uppercase text-[#68735F]">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-[#D8CFC4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#8D9A83] transition-colors"
            placeholder="Jane Doe"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[0.625rem] font-normal tracking-[0.12em] uppercase text-[#68735F]">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-[#D8CFC4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#8D9A83] transition-colors"
            placeholder="jane@example.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-[0.625rem] font-normal tracking-[0.12em] uppercase text-[#68735F]">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-[#D8CFC4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#8D9A83] transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="text-[0.625rem] font-normal tracking-[0.12em] uppercase text-[#68735F]">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-[#D8CFC4] bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#8D9A83] transition-colors"
            placeholder="123 Main St, City, Country"
          />
        </div>
        
        <button
          type="submit"
          className="hero-btn-primary self-start mt-2"
          style={{ minHeight: '48px', padding: '0 32px' }}
        >
          {isSaved ? 'Saved successfully' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
