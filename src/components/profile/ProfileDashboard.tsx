'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProfileDetails from './ProfileDetails';
import OrdersHistory from './OrdersHistory';
import WishlistView from './WishlistView';

type Tab = 'details' | 'orders' | 'wishlist';

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('details');

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-24">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-10">
        
        {/* Main Tabs */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab('details')}
            className={`text-left text-[0.875rem] transition-colors ${activeTab === 'details' ? 'text-[#3B3A38] font-medium' : 'text-[#68735F] hover:text-[#3B3A38]'}`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`text-left text-[0.875rem] transition-colors ${activeTab === 'orders' ? 'text-[#3B3A38] font-medium' : 'text-[#68735F] hover:text-[#3B3A38]'}`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Orders History
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`text-left text-[0.875rem] transition-colors ${activeTab === 'wishlist' ? 'text-[#3B3A38] font-medium' : 'text-[#68735F] hover:text-[#3B3A38]'}`}
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Wish List
          </button>
        </div>

        {/* Supplementary Links */}
        <div className="border-t border-[#E9E2D7] pt-8 flex flex-col gap-4">
          <Link
            href="/shop"
            className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Browse Products
          </Link>
          <Link
            href="/#contact"
            className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Get in Touch
          </Link>
          <Link
            href="/shipping"
            className="text-left text-[0.875rem] text-[#68735F] hover:text-[#3B3A38] transition-colors"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Shipping & Returns
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow">
        {activeTab === 'details' && <ProfileDetails />}
        {activeTab === 'orders' && <OrdersHistory />}
        {activeTab === 'wishlist' && <WishlistView />}
      </div>
      
    </div>
  );
}
