import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Calculator, Percent, DollarSign, TrendingUp, Building, BarChart, PieChart } from 'lucide-react';

export default async function ToolsPage() {
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
            <h1 className="text-3xl font-semibold text-blue-900">Investment Tools</h1>
            <p className="text-gray-600 mt-1">Calculate and analyze your real estate investments</p>
          </div>
          
          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* DSCR Calculator */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Calculator className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">DSCR Calculator</h3>
                </div>
                <p className="text-gray-600 mb-4">Calculate your Debt Service Coverage Ratio to determine if your property qualifies for investment financing.</p>
                <Link 
                  href="#" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Calculator
                </Link>
              </div>
            </div>
            
            {/* ROI Calculator */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Percent className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">ROI Calculator</h3>
                </div>
                <p className="text-gray-600 mb-4">Analyze your potential return on investment for property acquisitions and compare investment opportunities.</p>
                <Link 
                  href="#" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Calculator
                </Link>
              </div>
            </div>
            
            {/* Cash Flow Analysis */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <DollarSign className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Cash Flow Analysis</h3>
                </div>
                <p className="text-gray-600 mb-4">Project monthly and annual cash flow for your investment properties, including taxes, insurance, and maintenance.</p>
                <Link 
                  href="#" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Tool
                </Link>
              </div>
            </div>
            
            {/* Mortgage Comparison */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <BarChart className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Mortgage Comparison</h3>
                </div>
                <p className="text-gray-600 mb-4">Compare different mortgage options side by side to find the best terms for your investment strategy.</p>
                <Link 
                  href="#" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Tool
                </Link>
              </div>
            </div>
            
            {/* Tax Estimator */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <PieChart className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Tax Estimator</h3>
                </div>
                <p className="text-gray-600 mb-4">Calculate potential tax benefits from real estate investments, including depreciation and deductible expenses.</p>
                <Link 
                  href="#" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Calculator
                </Link>
              </div>
            </div>
            
            {/* Renovation ROI */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Building className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Renovation ROI</h3>
                </div>
                <p className="text-gray-600 mb-4">Estimate the return on investment for property renovations and determine which improvements add the most value.</p>
                <Link 
                  href="#" 
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Open Calculator
                </Link>
              </div>
            </div>
          </div>
          
          {/* Featured Tool: DSCR Calculator */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Featured Tool: DSCR Calculator</h2>
            
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Property Purchase Price</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input 
                          type="text" 
                          className="pl-7 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="250,000" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="20" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                      <div className="relative mt-1">
                        <input 
                          type="text" 
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="6.75" 
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
                      <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                        <option>30</option>
                        <option>15</option>
                        <option>10</option>
                        <option>7</option>
                        <option>5</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rental Income</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input 
                          type="text" 
                          className="pl-7 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="2,000" 
                        />
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-2">
                      Calculate DSCR
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Results</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500">Loan Amount</div>
                      <div className="text-lg font-medium text-gray-900">$200,000</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Monthly Payment (P&I)</div>
                      <div className="text-lg font-medium text-gray-900">$1,298</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">DSCR Ratio</div>
                      <div className="text-2xl font-bold text-blue-700">1.54</div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-500 mb-2">Qualification Status</div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm inline-block">
                        Qualifies for DSCR Loan
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Most lenders require a minimum DSCR of 1.25 for investment properties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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