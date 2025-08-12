"use client";

import Header from '@/components/Header/Header'

export default function Home() {
  const handleHealthCheck = async () => {
    try {
      const response = await fetch('/api/protected');
      const data = await response.json();
      
      if (response.ok) {
        alert(`Health Check: ${data.status}\nTimestamp: ${data.timestamp}\nUser: ${data.user.name} (${data.user.email})`);
      } else if (response.status === 401) {
        alert('Health Check Failed: You must be logged in to access this endpoint');
      } else {
        alert(`Health Check Failed: ${response.status} - ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Health Check Error: ${error}`);
    }
  };

  const handlePublicHealthCheck = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      
      if (response.ok) {
        alert(`Public Health Check: ${data.status}\nTimestamp: ${data.timestamp}\nMessage: ${data.message}`);
      } else {
        alert(`Public Health Check Failed: ${response.status}`);
      }
    } catch (error) {
      alert(`Public Health Check Error: ${error}`);
    }
  };

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

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">
              🏥 Health Check
            </h2>
            <p className="text-purple-700 mb-4">
              Test the health check endpoints to verify the API is working correctly
            </p>
            <div className="space-y-3">
              <button
                onClick={handleHealthCheck}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 w-full"
              >
                🔒 Protected Health Check (Requires Login)
              </button>
              <button
                onClick={handlePublicHealthCheck}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 w-full"
              >
                🌐 Public Health Check (No Login Required)
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
