"use client";

import React, { useState } from 'react';
import { X, Download, FileText } from 'lucide-react';

// Sample property data type
type Property = {
  address: string;
  propertyType: string;
  purchaseDate: string;
  purchasePrice: string;
  currentValue: string;
  monthlyIncome: string;
  dscr: string;
  status: string;
};

interface REOFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

export default function REOFormModal({ isOpen, onClose, properties }: REOFormModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const generatePDF = () => {
    setIsLoading(true);
    // In a real implementation, this would call an API endpoint to generate the PDF
    setTimeout(() => {
      setIsLoading(false);
      // This would be a real download in production
      alert("Schedule of Real Estate Owned PDF generated and downloaded!");
      onClose();
    }, 1500);
  };

  const formatCurrency = (value: string) => {
    if (value === "--") return "--";
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    return `$${numericValue}`;
  };

  const calculateMortgageBalance = (purchasePrice: string): string => {
    // Remove non-numeric characters and convert to number
    const price = parseFloat(purchasePrice.replace(/[^0-9.]/g, ''));
    // Calculate 80% of purchase price (typical loan-to-value ratio)
    return formatCurrency((price * 0.8).toFixed(2));
  };

  const calculateMonthlyPayment = (monthlyIncome: string): string => {
    // Remove non-numeric characters and convert to number
    const income = parseFloat(monthlyIncome.replace(/[^0-9.]/g, ''));
    // Calculate 65% of monthly income (for demonstration)
    return formatCurrency((income * 0.65).toFixed(2));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 text-blue-600 mr-2" />
            Schedule of Real Estate Owned
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-4">
          <div className="bg-gray-100 p-5 mb-6 rounded-lg">
            <h3 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">
              Section 3: Financial Information — Real Estate
            </h3>
            <p className="text-sm mb-2">This section lists all properties you currently own and what you owe on them.</p>
            
            {/* REO Form Preview */}
            <div className="border border-gray-300 rounded bg-white">
              {/* Column Headers */}
              <div className="grid grid-cols-9 bg-blue-50 text-xs font-semibold text-blue-800 p-2 border-b border-gray-300">
                <div className="col-span-2">Address</div>
                <div>Status</div>
                <div>Intended Occupancy</div>
                <div>Monthly Insurance, Taxes, etc.</div>
                <div>Monthly Rental Income</div>
                <div>Property Value</div>
                <div>Mortgage Balance</div>
                <div>Monthly Payment</div>
              </div>
              
              {/* Property Rows */}
              {properties.map((property, index) => (
                <div key={index} className="grid grid-cols-9 text-xs p-2 border-b border-gray-300">
                  <div className="col-span-2">{property.address}</div>
                  <div>{property.status === "Under Contract" ? "Pending Sale" : property.status}</div>
                  <div>Investment, Primary Residence, or Second Home</div>
                  <div>{property.monthlyIncome.includes("Est") ? "$350 (Est.)" : "$350"}</div>
                  <div>{property.monthlyIncome}</div>
                  <div>{formatCurrency(property.currentValue === "--" ? property.purchasePrice : property.currentValue)}</div>
                  <div>{calculateMortgageBalance(property.purchasePrice)}</div>
                  <div>{calculateMonthlyPayment(property.monthlyIncome)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> This form will include all properties currently in your portfolio. The PDF will be formatted 
              according to standard mortgage application requirements (Freddie Mac Form 65).
            </p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={generatePDF}
              disabled={isLoading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              <Download className="h-5 w-5 mr-2" />
              {isLoading ? 'Generating PDF...' : 'Generate & Download PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 