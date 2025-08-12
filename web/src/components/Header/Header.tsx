'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">AI Trainer</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-100">Strava Integration</span>
            
            {status === 'loading' ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-blue-100">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-orange-500 hover:bg-orange-700 text-white text-sm px-3 py-1 rounded transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
