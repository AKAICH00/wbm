import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Plus, Search, Filter, Clock, BadgeCheck, XCircle, ChevronRight } from 'lucide-react';

export default async function LoansPage() {
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
            <h1 className="text-3xl font-semibold text-blue-900">Loan Applications</h1>
            <p className="text-gray-600 mt-1">Track and manage your loan applications</p>
          </div>
          
          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <input 
                type="text" 
                placeholder="Search loans..." 
                className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex space-x-2 w-full md:w-auto">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                <span>New Application</span>
              </button>
              <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                <span>Filter</span>
              </button>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-5">
              <div className="flex items-center">
                <div className="rounded-full p-2 bg-blue-100 mr-3">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">In Progress</div>
                  <div className="text-xl font-bold text-gray-900">2</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-5">
              <div className="flex items-center">
                <div className="rounded-full p-2 bg-green-100 mr-3">
                  <BadgeCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Approved</div>
                  <div className="text-xl font-bold text-gray-900">3</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-5">
              <div className="flex items-center">
                <div className="rounded-full p-2 bg-yellow-100 mr-3">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Pending Documents</div>
                  <div className="text-xl font-bold text-gray-900">1</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-blue-100 p-5">
              <div className="flex items-center">
                <div className="rounded-full p-2 bg-red-100 mr-3">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Denied</div>
                  <div className="text-xl font-bold text-gray-900">0</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Loan Applications */}
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Your Active Loan Applications</h2>
          
          <div className="space-y-4 mb-8">
            {/* Application Card 1 - In Progress */}
            <div className="bg-white border border-blue-100 rounded-lg shadow-md overflow-hidden">
              <div className="border-l-4 border-blue-500">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mb-2">In Progress</span>
                      <h3 className="text-xl font-semibold text-gray-900">123 Investment Ave Refinance</h3>
                      <p className="text-gray-600 text-sm mt-1">DSCR Loan • 30-Year Fixed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-medium">$320,000</p>
                      <p className="text-sm text-gray-600">Loan Amount</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-600">Application Date:</p>
                        <p className="font-medium text-gray-900 mt-1">Apr 28, 2023</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rate:</p>
                        <p className="font-medium text-gray-900 mt-1">7.25%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Step:</p>
                        <p className="font-medium text-blue-700 mt-1">Upload Income Verification</p>
                      </div>
                      <div>
                        <Link href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                          View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Application Card 2 - Pending Documents */}
            <div className="bg-white border border-blue-100 rounded-lg shadow-md overflow-hidden">
              <div className="border-l-4 border-yellow-500">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 mb-2">Pending Documents</span>
                      <h3 className="text-xl font-semibold text-gray-900">456 Cash Flow Blvd Purchase</h3>
                      <p className="text-gray-600 text-sm mt-1">Conventional • 15-Year Fixed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-medium">$275,000</p>
                      <p className="text-sm text-gray-600">Loan Amount</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-600">Application Date:</p>
                        <p className="font-medium text-gray-900 mt-1">May 5, 2023</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rate:</p>
                        <p className="font-medium text-gray-900 mt-1">6.75%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Step:</p>
                        <p className="font-medium text-yellow-700 mt-1">Property Appraisal Needed</p>
                      </div>
                      <div>
                        <Link href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                          View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Application Card 3 - Approved */}
            <div className="bg-white border border-blue-100 rounded-lg shadow-md overflow-hidden">
              <div className="border-l-4 border-green-500">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 mb-2">Approved</span>
                      <h3 className="text-xl font-semibold text-gray-900">789 Rental Lane Investment</h3>
                      <p className="text-gray-600 text-sm mt-1">DSCR Loan • 30-Year Fixed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-medium">$155,000</p>
                      <p className="text-sm text-gray-600">Loan Amount</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-gray-600">Application Date:</p>
                        <p className="font-medium text-gray-900 mt-1">Mar 12, 2023</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rate:</p>
                        <p className="font-medium text-gray-900 mt-1">6.95%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Closing Date:</p>
                        <p className="font-medium text-green-700 mt-1">Jun 7, 2023</p>
                      </div>
                      <div>
                        <Link href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                          View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comparison Table */}
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Loan Rate Comparison</h2>
          
          <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden mb-6">
            <table className="min-w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Loan Type</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Term</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Rate</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Points</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">APR</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900">DSCR</td>
                  <td className="py-4 px-4 text-gray-900">30-Year Fixed</td>
                  <td className="py-4 px-4 text-gray-900">6.875%</td>
                  <td className="py-4 px-4 text-gray-900">0.5</td>
                  <td className="py-4 px-4 text-gray-900">7.125%</td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">Apply</button>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900">DSCR</td>
                  <td className="py-4 px-4 text-gray-900">30-Year Fixed</td>
                  <td className="py-4 px-4 text-gray-900">6.5%</td>
                  <td className="py-4 px-4 text-gray-900">1.5</td>
                  <td className="py-4 px-4 text-gray-900">6.875%</td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">Apply</button>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900">Conventional</td>
                  <td className="py-4 px-4 text-gray-900">30-Year Fixed</td>
                  <td className="py-4 px-4 text-gray-900">6.25%</td>
                  <td className="py-4 px-4 text-gray-900">0</td>
                  <td className="py-4 px-4 text-gray-900">6.375%</td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">Apply</button>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900">Conventional</td>
                  <td className="py-4 px-4 text-gray-900">15-Year Fixed</td>
                  <td className="py-4 px-4 text-gray-900">5.875%</td>
                  <td className="py-4 px-4 text-gray-900">0.25</td>
                  <td className="py-4 px-4 text-gray-900">6.0%</td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">Apply</button>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="py-4 px-4 text-gray-900">FHA</td>
                  <td className="py-4 px-4 text-gray-900">30-Year Fixed</td>
                  <td className="py-4 px-4 text-gray-900">6.125%</td>
                  <td className="py-4 px-4 text-gray-900">1.0</td>
                  <td className="py-4 px-4 text-gray-900">6.5%</td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">Apply</button>
                  </td>
                </tr>
              </tbody>
            </table>
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