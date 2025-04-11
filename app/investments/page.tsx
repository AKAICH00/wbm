import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Search, RefreshCw, ArrowUp, ArrowDown, Plus, ChevronRight } from 'lucide-react';

export default async function InvestmentsPage() {
  const { userId } = await auth();
  
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
            <h1 className="text-3xl font-semibold text-blue-900">Investments</h1>
            <p className="text-gray-600 mt-1">Track your investments and monitor returns</p>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
              <div className="text-sm font-medium text-gray-500">Total Capital Invested</div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">$865,000</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  6.8%
                </span>
                <span className="text-gray-500 ml-2">vs last year</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
              <div className="text-sm font-medium text-gray-500">Monthly Cash Flow</div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">$7,250</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  12.4%
                </span>
                <span className="text-gray-500 ml-2">vs last quarter</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
              <div className="text-sm font-medium text-gray-500">Annual ROI</div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">8.2%</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  1.5%
                </span>
                <span className="text-gray-500 ml-2">vs target</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
              <div className="text-sm font-medium text-gray-500">Total Equity</div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">$215,000</span>
              </div>
              <div className="mt-1 flex items-center text-xs">
                <span className="text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  18.2%
                </span>
                <span className="text-gray-500 ml-2">from purchase</span>
              </div>
            </div>
          </div>
          
          {/* Investments Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-900">Your Investments</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              <span>New Investment</span>
            </button>
          </div>
          
          {/* Investment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Investment Card 1 */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">123 Investment Ave</h3>
                    <p className="text-gray-600 text-sm">Single Family Residence</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested Amount</span>
                    <span className="font-medium text-gray-900">$80,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value</span>
                    <span className="font-medium text-gray-900">$95,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Return</span>
                    <span className="font-medium text-green-600">$850</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-medium text-green-600">12.75%</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    View Investment Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Investment Card 2 */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">456 Cash Flow Blvd</h3>
                    <p className="text-gray-600 text-sm">Duplex</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested Amount</span>
                    <span className="font-medium text-gray-900">$55,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value</span>
                    <span className="font-medium text-gray-900">$62,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Return</span>
                    <span className="font-medium text-green-600">$575</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-medium text-green-600">10.5%</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    View Investment Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Investment Card 3 */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">789 Rental Lane</h3>
                    <p className="text-gray-600 text-sm">Triplex</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Refinancing</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested Amount</span>
                    <span className="font-medium text-gray-900">$31,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value</span>
                    <span className="font-medium text-gray-900">$42,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Return</span>
                    <span className="font-medium text-green-600">$325</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-medium text-green-600">9.8%</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    View Investment Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-900">Recent Transactions</h2>
              <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Property</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Type</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Amount</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-600">May 10, 2023</td>
                    <td className="py-4 px-4 text-gray-900">123 Investment Ave</td>
                    <td className="py-4 px-4 text-gray-600">Income</td>
                    <td className="py-4 px-4 text-green-600">+$850</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Received</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-600">May 5, 2023</td>
                    <td className="py-4 px-4 text-gray-900">456 Cash Flow Blvd</td>
                    <td className="py-4 px-4 text-gray-600">Income</td>
                    <td className="py-4 px-4 text-green-600">+$575</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Received</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-600">May 3, 2023</td>
                    <td className="py-4 px-4 text-gray-900">789 Rental Lane</td>
                    <td className="py-4 px-4 text-gray-600">Income</td>
                    <td className="py-4 px-4 text-green-600">+$325</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Received</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-600">Apr 28, 2023</td>
                    <td className="py-4 px-4 text-gray-900">789 Rental Lane</td>
                    <td className="py-4 px-4 text-gray-600">Expense</td>
                    <td className="py-4 px-4 text-red-600">-$450</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Maintenance</span></td>
                  </tr>
                </tbody>
              </table>
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