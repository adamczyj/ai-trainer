"use client"

import Link from "next/link"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Test Page
          </h1>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a simple test page to verify that routing is working correctly.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                Test Information
              </h2>
              <ul className="text-blue-700 space-y-1">
                <li>• Page created successfully</li>
                <li>• Routing is functional</li>
                <li>• Styling is applied</li>
                <li>• Ready for development</li>
              </ul>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <Link
                href="/"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={() => alert('Test button clicked!')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Test Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
