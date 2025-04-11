import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';

export default async function DashboardPage() {
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
            <h1 className="text-3xl font-semibold text-blue-900">Investor Dashboard</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Quick Tools Card */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-medium mb-4 text-blue-800">Quick Tools</h2>
              <div className="space-y-3">
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">DSCR Calculator</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">ROI Estimator</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">Loan Comparison</a>
                <a href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">Cash Flow Analysis</a>
              </div>
            </div>
            
            {/* Loan Status Card */}
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-medium mb-4 text-blue-800">Loan Applications</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-medium text-gray-900">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Approved</span>
                  <span className="font-medium text-gray-900">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Closing Soon</span>
                  <span className="font-medium text-gray-900">1</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Portfolio Section */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-900">Your Property Portfolio</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Add Property</button>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-blue-100">
              <table className="min-w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Property</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Purchase Price</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Monthly Income</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">DSCR</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900">123 Investment Ave</td>
                    <td className="py-4 px-4 text-gray-900">$320,000</td>
                    <td className="py-4 px-4 text-gray-900">$2,100</td>
                    <td className="py-4 px-4 text-gray-900">1.32</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900">456 Cash Flow Blvd</td>
                    <td className="py-4 px-4 text-gray-900">$275,000</td>
                    <td className="py-4 px-4 text-gray-900">$1,850</td>
                    <td className="py-4 px-4 text-gray-900">1.25</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span></td>
                  </tr>
                  <tr className="hover:bg-blue-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900">789 Rental Lane</td>
                    <td className="py-4 px-4 text-gray-900">$155,000</td>
                    <td className="py-4 px-4 text-gray-900">$1,300</td>
                    <td className="py-4 px-4 text-gray-900">1.45</td>
                    <td className="py-4 px-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Refinancing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          {/* Upcoming Deadlines Section */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Upcoming Deadlines</h2>
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <li className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Loan Application Due</p>
                      <p className="text-sm text-gray-600">789 Rental Lane Refinance</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">May 15, 2023</p>
                      <p className="text-xs text-gray-600">5 days remaining</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Property Inspection</p>
                      <p className="text-sm text-gray-600">New Acquisition: 567 Investment Dr</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">May 22, 2023</p>
                      <p className="text-xs text-gray-600">12 days remaining</p>
                    </div>
                  </div>
                </li>
                <li className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Closing Date</p>
                      <p className="text-sm text-gray-600">New Duplex: 890 Cash Flow Circle</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">June 7, 2023</p>
                      <p className="text-xs text-gray-600">28 days remaining</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
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