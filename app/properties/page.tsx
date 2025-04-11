"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import REOFormModal from '@/components/REOFormModal';
import { Search, Plus, Filter, Map, List, FileText, Download } from 'lucide-react';

// Sample data for properties
const propertiesData = [
  {
    address: "123 Investment Ave",
    propertyType: "Single Family",
    purchaseDate: "Jan 15, 2022",
    purchasePrice: "$320,000",
    currentValue: "$365,000",
    monthlyIncome: "$2,100",
    dscr: "1.32",
    status: "Active"
  },
  {
    address: "456 Cash Flow Blvd",
    propertyType: "Duplex",
    purchaseDate: "Mar 22, 2021",
    purchasePrice: "$275,000",
    currentValue: "$310,000",
    monthlyIncome: "$1,850",
    dscr: "1.25",
    status: "Active"
  },
  {
    address: "789 Rental Lane",
    propertyType: "Triplex",
    purchaseDate: "Aug 5, 2020",
    purchasePrice: "$155,000",
    currentValue: "$210,000",
    monthlyIncome: "$1,300",
    dscr: "1.45",
    status: "Refinancing"
  },
  {
    address: "567 Investment Dr",
    propertyType: "Single Family",
    purchaseDate: "Oct 17, 2022",
    purchasePrice: "$290,000",
    currentValue: "$305,000",
    monthlyIncome: "$1,950",
    dscr: "1.28",
    status: "Active"
  },
  {
    address: "890 Cash Flow Circle",
    propertyType: "Duplex",
    purchaseDate: "Pending",
    purchasePrice: "$340,000",
    currentValue: "--",
    monthlyIncome: "$2,400 (Est.)",
    dscr: "1.38 (Est.)",
    status: "Under Contract"
  }
];

export default function PropertiesPage() {
  const { userId } = useAuth();
  const [isREOModalOpen, setIsREOModalOpen] = useState(false);
  const router = useRouter();
  
  // Redirect to sign-in if not signed in - this is a protected page
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
      <div className="flex flex-grow">
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-semibold text-blue-900">Your Properties</h1>
            <p className="text-gray-600 mt-1">Manage and analyze your real estate portfolio</p>
          </div>
          
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <input 
                type="text" 
                placeholder="Search properties..." 
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                <span>Add Property</span>
              </button>
              
              <button 
                onClick={() => setIsREOModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <FileText className="h-5 w-5 mr-2" />
                <span>Generate REO PDF</span>
              </button>
              
              <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                <span>Filters</span>
              </button>
              
              <div className="hidden md:flex border rounded-md overflow-hidden">
                <button className="bg-blue-50 text-blue-700 px-3 py-2 border-r border-gray-300">
                  <List className="h-5 w-5" />
                </button>
                <button className="bg-white text-gray-700 px-3 py-2">
                  <Map className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
              <div className="text-sm text-gray-500">Total Properties</div>
              <div className="text-2xl font-bold text-gray-900">12</div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
              <div className="text-sm text-gray-500">Total Value</div>
              <div className="text-2xl font-bold text-gray-900">$3.45M</div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
              <div className="text-sm text-gray-500">Monthly Income</div>
              <div className="text-2xl font-bold text-gray-900">$21,350</div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
              <div className="text-sm text-gray-500">Average DSCR</div>
              <div className="text-2xl font-bold text-gray-900">1.35</div>
            </div>
          </div>
          
          {/* Property Listing */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Property</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Purchase Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Purchase Price</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Current Value</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Monthly Income</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">DSCR</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {propertiesData.map((property, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors cursor-pointer" 
                        onClick={() => router.push(`/properties/${index}`)}>
                      <td className="py-4 px-4 text-gray-900">{property.address}</td>
                      <td className="py-4 px-4 text-gray-600">{property.propertyType}</td>
                      <td className="py-4 px-4 text-gray-600">{property.purchaseDate}</td>
                      <td className="py-4 px-4 text-gray-900">{property.purchasePrice}</td>
                      <td className="py-4 px-4 text-green-600">{property.currentValue}</td>
                      <td className="py-4 px-4 text-gray-900">{property.monthlyIncome}</td>
                      <td className="py-4 px-4 text-gray-900">{property.dscr}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs
                          ${property.status === 'Active' ? 'bg-green-100 text-green-800' : 
                            property.status === 'Refinancing' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {property.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      
      {/* REO Form Modal */}
      <REOFormModal 
        isOpen={isREOModalOpen}
        onClose={() => setIsREOModalOpen(false)}
        properties={propertiesData}
      />
      
      <footer className="w-full p-4 text-center text-xs text-gray-600 border-t border-gray-200">
        <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 hover:underline">Privacy Policy</Link>
        <span className="mx-1">|</span>
        <span>© {new Date().getFullYear()} Wealth Builder Mortgage Educators</span>
      </footer>
    </div>
  );
} 