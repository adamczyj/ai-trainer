'use client'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">AI Trainer</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-100">Strava Integration</span>
          </div>
        </div>
      </div>
    </header>
  )
}
