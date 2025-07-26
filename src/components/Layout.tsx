'use client';

import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserDropdown } from './Dropdowns';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || user.email || 'User');
      } catch {
        setUserName('User');
      }
    }
  }, []);

  return (
    <div className="w-[1563px] relative">
      <header className="flex items-center bg-white w-[1563px] h-[68px] gap-[32px] p-4 gap-8">
        <div className="flex items-center">
          <h1 className="font-semibold text-[24px] leading-[36px] tracking-normal text-gray-900">ticktock</h1>
        </div>
        <nav className="flex items-center w-[686.5px] h-[21px] gap-8">
          <Link href="/dashboard" className="w-[79px] h-[21px]">
          <span className="w-[79px] h-[21px] font-medium text-sm leading-[21px] tracking-normal text-center text-gray-900">Timesheets</span>
          </Link>
        </nav>
        <div className='flex items-center gap-4 justify-end w-[686.5px] h-[24px]'>
        <UserDropdown userName={userName} handleLogout={handleLogout} />
        </div>
      </header>

      <div className="absolute flex w-[1280px] h-[522px] top-[95px] left-[141.5px] gap-4">
        {children}
      </div>
    </div>
  );
};