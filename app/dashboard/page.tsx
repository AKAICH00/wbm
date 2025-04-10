import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  // Redirect to sign-in if not signed in - this is a protected page
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Investor Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Investment Summary Card */}
          <div className="bg-secondary rounded-lg shadow-sm border border-theme p-6">
            <h2 className="text-xl font-medium mb-4">Investment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Investments</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Invested</span>
                <span className="font-medium">$750,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Cash Flow</span>
                <span className="font-medium">$4,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average ROI</span>
                <span className="font-medium">7.2%</span>
              </div>
            </div>
          </div>
          
          {/* Quick Tools Card */}
          <div className="bg-secondary rounded-lg shadow-sm border border-theme p-6">
            <h2 className="text-xl font-medium mb-4">Quick Tools</h2>
            <div className="space-y-3">
              <a href="#" className="block hover:underline">DSCR Calculator</a>
              <a href="#" className="block hover:underline">ROI Estimator</a>
              <a href="#" className="block hover:underline">Loan Comparison</a>
              <a href="#" className="block hover:underline">Cash Flow Analysis</a>
            </div>
          </div>
          
          {/* Loan Status Card */}
          <div className="bg-secondary rounded-lg shadow-sm border border-theme p-6">
            <h2 className="text-xl font-medium mb-4">Loan Applications</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Progress</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approved</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Closing Soon</span>
                <span className="font-medium">1</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Property Portfolio Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Your Property Portfolio</h2>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-foreground hover:text-primary transition-colors">Add Property</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Property</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Purchase Price</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Monthly Income</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">DSCR</th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 px-4">123 Investment Ave</td>
                  <td className="py-4 px-4">$320,000</td>
                  <td className="py-4 px-4">$2,100</td>
                  <td className="py-4 px-4">1.32</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 bg-secondary rounded-full text-xs">Active</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">456 Cash Flow Blvd</td>
                  <td className="py-4 px-4">$275,000</td>
                  <td className="py-4 px-4">$1,850</td>
                  <td className="py-4 px-4">1.25</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 bg-secondary rounded-full text-xs">Active</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-4">789 Rental Lane</td>
                  <td className="py-4 px-4">$155,000</td>
                  <td className="py-4 px-4">$1,300</td>
                  <td className="py-4 px-4">1.45</td>
                  <td className="py-4 px-4"><span className="px-2 py-1 bg-secondary rounded-full text-xs">Refinancing</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        {/* Upcoming Deadlines Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="bg-secondary rounded-lg shadow-sm border border-theme overflow-hidden">
            <ul className="divide-y divide-border">
              <li className="p-4 hover:bg-background">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Loan Application Due</p>
                    <p className="text-sm text-muted-foreground">789 Rental Lane Refinance</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">May 15, 2023</p>
                    <p className="text-xs text-muted-foreground">5 days remaining</p>
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-background">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Property Inspection</p>
                    <p className="text-sm text-muted-foreground">New Acquisition: 567 Investment Dr</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">May 22, 2023</p>
                    <p className="text-xs text-muted-foreground">12 days remaining</p>
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-background">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Closing Date</p>
                    <p className="text-sm text-muted-foreground">New Duplex: 890 Cash Flow Circle</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">June 7, 2023</p>
                    <p className="text-xs text-muted-foreground">28 days remaining</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
      
      <footer className="w-full p-4 text-center text-xs text-muted-foreground border-t border-theme">
        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
        <span className="mx-1">|</span>
        <span>© {new Date().getFullYear()} WealthBuilder Mortgage</span>
      </footer>
    </div>
  );
} 