import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';

export default async function CalendarPage() {
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
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-blue-900">Calendar</h1>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                <span>Add Event</span>
              </button>
            </div>
          </div>
          
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-900">May 2023</h2>
              <div className="ml-6 flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div>
              <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50">
                Today
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden mb-6">
            {/* Days of Week */}
            <div className="grid grid-cols-7 bg-blue-50">
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Sun</div>
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Mon</div>
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Tue</div>
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Wed</div>
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Thu</div>
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Fri</div>
              <div className="py-2 text-center text-xs font-medium text-blue-800 uppercase">Sat</div>
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 border-t border-gray-200">
              {/* Week 1 */}
              <div className="h-32 p-2 border-b border-r border-gray-200 text-gray-400">30</div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">1</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">2</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">3</div>
                <div className="mt-1 text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                  Property Inspection
                </div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">4</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">5</div>
                <div className="mt-1 text-xs p-1 bg-green-100 text-green-800 rounded truncate">
                  Mortgage Payment Due
                </div>
              </div>
              <div className="h-32 p-2 border-b border-gray-200">
                <div className="font-semibold">6</div>
              </div>
              
              {/* Week 2 */}
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">7</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">8</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">9</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">10</div>
                <div className="mt-1 text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                  Market Research
                </div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">11</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">12</div>
              </div>
              <div className="h-32 p-2 border-b border-gray-200">
                <div className="font-semibold">13</div>
              </div>
              
              {/* Week 3 */}
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">14</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200 bg-blue-50">
                <div className="font-semibold">15</div>
                <div className="mt-1 text-xs p-1 bg-yellow-100 text-yellow-800 rounded truncate">
                  Loan App Due
                </div>
                <div className="mt-1 text-xs p-1 bg-purple-100 text-purple-800 rounded truncate">
                  Property Tax Due
                </div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">16</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">17</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">18</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">19</div>
              </div>
              <div className="h-32 p-2 border-b border-gray-200">
                <div className="font-semibold">20</div>
              </div>
              
              {/* Week 4 */}
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">21</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">22</div>
                <div className="mt-1 text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                  Property Inspection
                </div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">23</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">24</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">25</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">26</div>
              </div>
              <div className="h-32 p-2 border-b border-gray-200">
                <div className="font-semibold">27</div>
              </div>
              
              {/* Week 5 */}
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">28</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">29</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">30</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200">
                <div className="font-semibold">31</div>
              </div>
              <div className="h-32 p-2 border-b border-r border-gray-200 text-gray-400">1</div>
              <div className="h-32 p-2 border-b border-r border-gray-200 text-gray-400">2</div>
              <div className="h-32 p-2 border-b border-gray-200 text-gray-400">3</div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Upcoming Events</h2>
            
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden">
              <div className="divide-y divide-gray-200">
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <CalendarIcon className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Property Inspection</div>
                      <div className="text-sm text-gray-600">May 22, 2023 • 10:00 AM</div>
                      <div className="text-sm text-gray-600">567 Investment Dr</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-full mr-4">
                      <CalendarIcon className="h-6 w-6 text-yellow-700" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Loan Application Due</div>
                      <div className="text-sm text-gray-600">May 15, 2023</div>
                      <div className="text-sm text-gray-600">789 Rental Lane Refinance</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <CalendarIcon className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Closing Date</div>
                      <div className="text-sm text-gray-600">June 7, 2023 • 2:00 PM</div>
                      <div className="text-sm text-gray-600">890 Cash Flow Circle</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <CalendarIcon className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Mortgage Payment Due</div>
                      <div className="text-sm text-gray-600">June 5, 2023</div>
                      <div className="text-sm text-gray-600">All Properties</div>
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