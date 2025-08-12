import Header from '@/components/Header/Header'

export default function Home() {
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Trainer - Strava Integration
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your intelligent companion for Strava training analysis and insights
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
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
          
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
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
        </div>
      </div>
    </main>
  )
}
