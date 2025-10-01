'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface GuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requiredRole?: string
  fallbackPath?: string
}

interface User {
  id: string
  email: string
  role: string
  isAuthenticated: boolean
}

// Mock auth state - in real app this would come from context or auth provider
const mockUser: User = {
  id: '',
  email: '',
  role: 'guest',
  isAuthenticated: false
}

export default function Guard({
  children,
  requireAuth = true,
  requiredRole,
  fallbackPath = '/login'
}: GuardProps) {
  const [user, setUser] = useState<User>(mockUser)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status from localStorage
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth-token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser({
            id: parsedUser.id,
            email: parsedUser.email,
            role: parsedUser.role,
            isAuthenticated: true
          })
        } else {
          setUser(mockUser)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(mockUser)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Handle redirects after loading is complete
  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user.isAuthenticated) {
        console.log('Redirecting to login - not authenticated')
        router.push(fallbackPath)
        return
      }

      if (requiredRole && user.role !== requiredRole) {
        console.log('Redirecting to unauthorized - insufficient role')
        router.push('/unauthorized')
        return
      }
    }
  }, [user, isLoading, requireAuth, requiredRole, fallbackPath, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user.isAuthenticated) {
    return null // Will redirect via useEffect
  }

  if (requiredRole && user.role !== requiredRole) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}

// Utility function to check if user has required permissions
export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  const roleHierarchy = {
    guest: 0,
    user: 1,
    admin: 2,
    superadmin: 3
  }

  return (roleHierarchy[userRole as keyof typeof roleHierarchy] || 0) >=
         (roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0)
}

// Hook for components to access auth state
export const useAuth = () => {
  const [user, setUser] = useState<User>(mockUser)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth-token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          setUser({
            id: parsedUser.id,
            email: parsedUser.email,
            role: parsedUser.role,
            isAuthenticated: true
          })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      }
    }

    checkAuth()
  }, [])

  return { user }
}
