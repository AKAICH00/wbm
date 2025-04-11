"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building, 
  PiggyBank, 
  FileText, 
  Calculator, 
  Calendar, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Properties', path: '/properties', icon: Building },
    { name: 'Investments', path: '/investments', icon: PiggyBank },
    { name: 'Loans', path: '/loans', icon: FileText },
    { name: 'Tools', path: '/tools', icon: Calculator },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
  ];
  
  const accountItems = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Sign Out', path: '/sign-out', icon: LogOut },
  ];

  return (
    <>
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-50 border-r border-blue-100 h-full hidden md:block">
        <div className="p-4">
          <h2 className="text-blue-900 font-medium mb-4 px-4 text-sm uppercase tracking-wider">Main Menu</h2>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-800 bg-blue-100'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <h2 className="text-blue-900 font-medium mt-8 mb-4 px-4 text-sm uppercase tracking-wider">Account</h2>
          <nav className="space-y-1">
            {accountItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path} 
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-800 bg-blue-100'
                    : 'text-gray-700 hover:bg-blue-100 hover:text-blue-800'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      
      {/* Mobile Sidebar Toggle Button - Shown on small screens */}
      <div className="md:hidden fixed bottom-4 right-4 z-10">
        <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </>
  );
} 