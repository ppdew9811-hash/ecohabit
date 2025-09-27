'use client'

import { useEffect, useState } from 'react'
import { Logo } from '@/components/logo'
import LoginPage from './auth/login/page'
import Dashboard from './dashboard/page'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated (from localStorage)
    const user = localStorage.getItem('eha_user')
    if (user) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-green-600">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage />
}
