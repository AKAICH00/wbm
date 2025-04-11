"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { ArrowLeft, Building, Calendar, DollarSign, PieChart, Home, FileText } from 'lucide-react';

// Sample data for properties (same as on the properties page)
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

export default function PropertyDetailsPage() {
  const { userId } = useAuth();
  const router = useRouter();
  const params = useParams();
  const propertyId = typeof params.id === 'string' ? parseInt(params.id) : 0;
  
  // State for additional REO form fields
  const [propertyStatus, setPropertyStatus] = useState('Retained');
  const [intendedOccupancy, setIntendedOccupancy] = useState('Investment Property');
  const [monthlyExpenses, setMonthlyExpenses] = useState('350');
  const [unpaidBalance, setUnpaidBalance] = useState('');
  
  // Redirect to sign-in if not signed in - this is a protected page
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Ensure the property exists
  if (!propertiesData[propertyId]) {
    redirect('/properties');
  }
  
  const property = propertiesData[propertyId];
  
  // Calculate some values for the property
  const calculateMortgageBalance = (purchasePrice: string): string => {
    // Remove non-numeric characters and convert to number
    const price = parseFloat(purchasePrice.replace(/[^0-9.]/g, ''));
    // Calculate 80% of purchase price (typical loan-to-value ratio)
    return `$${(price * 0.8).toFixed(2)}`;
  };

  const calculateMonthlyPayment = (monthlyIncome: string): string => {
    // Remove non-numeric characters and convert to number
    const income = parseFloat(monthlyIncome.replace(/[^0-9.]/g, ''));
    // Calculate 65% of monthly income (for demonstration)
    return `$${(income * 0.65).toFixed(2)}`;
  };
  
  useEffect(() => {
    // Calculate unpaid balance based on purchase price (80% of purchase price)
    const price = parseFloat(property.purchasePrice.replace(/[^0-9.]/g, ''));
    setUnpaidBalance((price * 0.8).toFixed(2));
  }, [property.purchasePrice]);
  
  const handleSave = () => {
    // In a real app, this would save the changes to a database
    alert("Property details saved successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
      <div className="flex flex-grow">
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => router.push('/properties')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-semibold text-blue-900">{property.address}</h1>
              <p className="text-gray-600 mt-1">{property.propertyType} • {property.status}</p>
            </div>
          </div>
          
          {/* Property Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4 flex items-start">
              <DollarSign className="h-10 w-10 p-2 rounded-full bg-green-100 text-green-600 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Current Value</div>
                <div className="text-xl font-bold text-gray-900">{property.currentValue}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4 flex items-start">
              <Calendar className="h-10 w-10 p-2 rounded-full bg-blue-100 text-blue-600 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Purchase Date</div>
                <div className="text-xl font-bold text-gray-900">{property.purchaseDate}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4 flex items-start">
              <Building className="h-10 w-10 p-2 rounded-full bg-purple-100 text-purple-600 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Monthly Income</div>
                <div className="text-xl font-bold text-gray-900">{property.monthlyIncome}</div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4 flex items-start">
              <PieChart className="h-10 w-10 p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3" />
              <div>
                <div className="text-sm text-gray-500">DSCR</div>
                <div className="text-xl font-bold text-gray-900">{property.dscr}</div>
              </div>
            </div>
          </div>
          
          {/* REO Form Details */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 mb-6">
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Schedule of Real Estate Owned Details</h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              These details are used when generating the Schedule of Real Estate Owned for mortgage applications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
                <input 
                  type="text" 
                  value={property.address}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              {/* Property Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Value</label>
                <input 
                  type="text" 
                  value={property.currentValue !== "--" ? property.currentValue : property.purchasePrice}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={propertyStatus}
                  onChange={(e) => setPropertyStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Sold">Sold</option>
                  <option value="Pending Sale">Pending Sale</option>
                  <option value="Retained">Retained</option>
                </select>
              </div>
              
              {/* Intended Occupancy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intended Occupancy</label>
                <select 
                  value={intendedOccupancy}
                  onChange={(e) => setIntendedOccupancy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Investment Property">Investment Property</option>
                  <option value="Primary Residence">Primary Residence</option>
                  <option value="Second Home">Second Home</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Monthly Insurance, Taxes, Association Dues */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Insurance, Taxes, Association Dues
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input 
                    type="text" 
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                    className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              {/* Monthly Rental Income */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rental Income</label>
                <input 
                  type="text" 
                  value={property.monthlyIncome}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              {/* Unpaid Balance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unpaid Balance</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input 
                    type="text" 
                    value={unpaidBalance}
                    onChange={(e) => setUnpaidBalance(e.target.value)}
                    className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              {/* Monthly Mortgage Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Mortgage Payment
                </label>
                <input 
                  type="text" 
                  value={calculateMonthlyPayment(property.monthlyIncome)}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              
              {/* For 2-4 Unit or Investment Property */}
              <div className="md:col-span-2">
                <div className="bg-blue-50 rounded-md p-4 mb-4">
                  <h3 className="font-medium text-blue-800 mb-2">For 2-4 Unit or Investment Property</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rental Income</label>
                      <input 
                        type="text" 
                        value={property.monthlyIncome}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Net Monthly Rental Income</label>
                      <input 
                        type="text" 
                        value={`$${(parseFloat(property.monthlyIncome.replace(/[^0-9.]/g, '')) - parseFloat(monthlyExpenses)).toFixed(2)}`}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
      
      <footer className="w-full p-4 text-center text-xs text-gray-600 border-t border-gray-200">
        <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 hover:underline">Privacy Policy</Link>
        <span className="mx-1">|</span>
        <span>© {new Date().getFullYear()} Wealth Builder Mortgage Educators</span>
      </footer>
    </div>
  );
} 