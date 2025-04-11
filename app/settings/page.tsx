"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Bell, Key, User, Shield, CreditCard, Save, Mail } from 'lucide-react';

export default function SettingsPage() {
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Redirect to sign-in if not signed in - this is a protected page
  if (!userId) {
    redirect('/sign-in');
  }

  // Sample user data
  const user = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    profileImage: "https://randomuser.me/api/portraits/men/41.jpg"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
      <div className="flex flex-grow">
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-semibold text-blue-900">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
          </div>
          
          {/* Settings Layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full px-4 py-3 flex items-center text-left ${
                        activeTab === 'profile' 
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <User className="h-5 w-5 mr-3" />
                      <span>Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className={`w-full px-4 py-3 flex items-center text-left ${
                        activeTab === 'notifications' 
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`w-full px-4 py-3 flex items-center text-left ${
                        activeTab === 'security' 
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Shield className="h-5 w-5 mr-3" />
                      <span>Security</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('payment')}
                      className={`w-full px-4 py-3 flex items-center text-left ${
                        activeTab === 'payment' 
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className="h-5 w-5 mr-3" />
                      <span>Payment Methods</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="flex-grow">
              <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                    
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Profile Image */}
                      <div className="flex flex-col items-center">
                        <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden mb-3">
                          <img 
                            src={user.profileImage} 
                            alt="Profile" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Change Photo
                        </button>
                      </div>
                      
                      {/* Profile Form */}
                      <div className="flex-grow space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              defaultValue={user.name}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input 
                              type="email" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              defaultValue={user.email}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input 
                              type="tel" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              defaultValue={user.phone}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Preferred Contact Method
                            </label>
                            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                              <option>Email</option>
                              <option>Phone</option>
                              <option>Text Message</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                            placeholder="Street Address"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="City"
                            />
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="State"
                            />
                            <input 
                              type="text" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="ZIP Code"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                            <Save className="h-5 w-5 mr-2" />
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">Property Updates</p>
                              <p className="text-sm text-gray-500">Receive emails about your property status changes</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">Loan Application Updates</p>
                              <p className="text-sm text-gray-500">Receive emails about your loan application status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">Marketing Communications</p>
                              <p className="text-sm text-gray-500">Receive special offers and updates from us</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">SMS Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">Payment Reminders</p>
                              <p className="text-sm text-gray-500">Receive SMS reminders about upcoming payments</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-700">Important Alerts</p>
                              <p className="text-sm text-gray-500">Receive SMS alerts for critical updates</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                          <Save className="h-5 w-5 mr-2" />
                          Save Preferences
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Change Password</h3>
                        <div className="space-y-3 max-w-md">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter current password"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter new password"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm New Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Confirm new password"
                            />
                          </div>
                          
                          <div className="pt-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                              <Key className="h-5 w-5 mr-2" />
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-blue-800">
                            Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to log in.
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between max-w-md">
                          <div>
                            <p className="font-medium text-gray-700">Enable Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Use an authenticator app or SMS verification</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Session Management</h3>
                        <p className="text-sm text-gray-600 mb-4">You're currently signed in on 1 device</p>
                        
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">Current Session</p>
                              <p className="text-sm text-gray-500">MacBook Pro • Safari • San Francisco, CA</p>
                              <p className="text-xs text-gray-400 mt-1">Last active: Right now</p>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Current
                            </span>
                          </div>
                        </div>
                        
                        <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                          Sign out from all other devices
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Payment Methods */}
                {activeTab === 'payment' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium text-gray-900">Saved Payment Methods</h3>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            + Add New Payment Method
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="bg-blue-600 rounded p-2 mr-4">
                                <CreditCard className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Visa ending in 4242</p>
                                <p className="text-sm text-gray-500">Expires 12/2025</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-500 hover:text-gray-700 text-sm">Edit</button>
                              <button className="text-gray-500 hover:text-gray-700 text-sm">Remove</button>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="bg-blue-600 rounded p-2 mr-4">
                                <CreditCard className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">Mastercard ending in 8888</p>
                                <p className="text-sm text-gray-500">Expires 08/2024</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-500 hover:text-gray-700 text-sm">Edit</button>
                              <button className="text-gray-500 hover:text-gray-700 text-sm">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Billing Address</h3>
                        
                        <div className="max-w-md">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                              </label>
                              <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                defaultValue={user.name}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Street Address
                              </label>
                              <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter street address"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  City
                                </label>
                                <input 
                                  type="text" 
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="City"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  State
                                </label>
                                <input 
                                  type="text" 
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="State"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  ZIP Code
                                </label>
                                <input 
                                  type="text" 
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="ZIP Code"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Country
                                </label>
                                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                  <option>United States</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                                <Save className="h-5 w-5 mr-2" />
                                Save Billing Address
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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