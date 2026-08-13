'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ProfileDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileContextValue {
  details: ProfileDetails;
  updateDetails: (newDetails: Partial<ProfileDetails>) => void;
  isLoaded: boolean;
}

const defaultDetails: ProfileDetails = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [details, setDetails] = useState<ProfileDetails>(defaultDetails);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('furrytail_profile');
      if (stored) {
        setDetails(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse profile from local storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when details change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('furrytail_profile', JSON.stringify(details));
    }
  }, [details, isLoaded]);

  const updateDetails = (newDetails: Partial<ProfileDetails>) => {
    setDetails((prev) => ({ ...prev, ...newDetails }));
  };

  return (
    <ProfileContext.Provider value={{ details, updateDetails, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return ctx;
}
