"use client"

import Header from '@/components/Header/Header'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Trainer - Strava Integration
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your intelligent companion for Strava training analysis and insights
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              ✅ Setup Complete!
            </h2>
            <div className="text-left text-green-700 space-y-2">
              <p>• AuthJS packages installed</p>
              <p>• Prisma configured with Neon PostgreSQL</p>
              <p>• Database schema created</p>
              <p>• Basic app structure ready</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">
              🔧 Next Steps
            </h2>
            <div className="text-left text-blue-700 space-y-2">
              <p>• Test database connection</p>
              <p>• Complete AuthJS configuration</p>
              <p>• Test Strava OAuth flow</p>
              <p>• Integrate with existing Strava client</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/test"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              🧪 Go to Test Page
            </Link>
            
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/health')
                  const data = await response.json()
                  alert(`Health Check: ${data.status}\nMessage: ${data.message}\nTime: ${data.timestamp}`)
                } catch (error) {
                  alert(`Health Check Failed: ${error}`)
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
            >
              🏥 Health Check
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
