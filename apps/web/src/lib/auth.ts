// Authentication utilities for IntelliSMART
// Handles JWT tokens, session management, and auth state

export interface User {
  id: string
  email: string
  name: string
  role: 'guest' | 'user' | 'admin' | 'superadmin'
  permissions: string[]
  avatar?: string
  company?: string
  lastLogin?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  company?: string
  agreeToTerms: boolean
}

class AuthService {
  private readonly TOKEN_KEY = 'auth-token'
  private readonly REFRESH_TOKEN_KEY = 'refresh-token'
  private readonly USER_KEY = 'auth-user'

  // Token Management
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.TOKEN_KEY, tokens.accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken)

    // Set expiry for auto-logout
    const expiryTime = Date.now() + (tokens.expiresIn * 1000)
    localStorage.setItem('token-expiry', expiryTime.toString())
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }

  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('token-expiry')
    if (!expiry) return true
    return Date.now() > parseInt(expiry)
  }

  clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.removeItem('token-expiry')
    localStorage.removeItem(this.USER_KEY)
  }

  // User Management
  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY)
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  // Authentication Status
  isAuthenticated(): boolean {
    const token = this.getAccessToken()
    const user = this.getUser()
    return !!(token && user && !this.isTokenExpired())
  }

  // Role-based Access Control
  hasRole(role: string): boolean {
    const user = this.getUser()
    if (!user) return false

    const roleHierarchy = {
      guest: 0,
      user: 1,
      admin: 2,
      superadmin: 3
    }

    const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[role as keyof typeof roleHierarchy] || 0

    return userLevel >= requiredLevel
  }

  hasPermission(permission: string): boolean {
    const user = this.getUser()
    if (!user) return false
    return user.permissions.includes(permission)
  }

  // API Integration
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // In real implementation, this would call your auth API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()

      // Store tokens and user data
      this.setTokens(data.tokens)
      this.setUser(data.user)

      return {
        user: data.user,
        tokens: data.tokens,
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Login failed. Please check your credentials.')
    }
  }

  async register(userData: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // In real implementation, this would call your auth API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()

      // Store tokens and user data
      this.setTokens(data.tokens)
      this.setUser(data.user)

      return {
        user: data.user,
        tokens: data.tokens,
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw new Error('Registration failed. Please try again.')
    }
  }

  async logout(): Promise<void> {
    try {
      // In real implementation, you might want to call a logout endpoint
      // to invalidate tokens on the server side
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getAccessToken()}`,
        },
      })
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Always clear local tokens regardless of API call result
      this.clearTokens()
    }
  }

  async refreshToken(): Promise<AuthTokens | null> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) return null

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      this.setTokens(data.tokens)

      return data.tokens
    } catch (error) {
      console.error('Token refresh error:', error)
      this.clearTokens()
      return null
    }
  }

  // MFA Support (placeholder for future implementation)
  async enableMFA(): Promise<{ qrCode: string; secret: string }> {
    // Implementation would integrate with MFA provider (Authy, Google Authenticator, etc.)
    throw new Error('MFA not yet implemented')
  }

  async verifyMFA(code: string): Promise<boolean> {
    // Implementation would verify MFA code
    throw new Error('MFA not yet implemented')
  }

  // Password Management
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAccessToken()}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    })

    if (!response.ok) {
      throw new Error('Password change failed')
    }
  }

  async resetPassword(email: string): Promise<void> {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Password reset request failed')
    }
  }

  async confirmPasswordReset(token: string, newPassword: string): Promise<void> {
    const response = await fetch('/api/auth/confirm-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    })

    if (!response.ok) {
      throw new Error('Password reset confirmation failed')
    }
  }
}

// Export singleton instance
export const authService = new AuthService()

// React hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)

      // Check if tokens exist and are valid
      if (authService.isAuthenticated()) {
        const currentUser = authService.getUser()
        setUser(currentUser)

        // Check if token needs refresh
        if (authService.isTokenExpired()) {
          const newTokens = await authService.refreshToken()
          if (newTokens) {
            const updatedUser = authService.getUser()
            setUser(updatedUser)
          } else {
            setUser(null)
          }
        }
      } else {
        setUser(null)
      }

      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    try {
      const { user: userData } = await authService.login(credentials)
      setUser(userData)
      return userData
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const { user: userData } = await authService.register(userData)
      setUser(userData)
      return userData
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    hasRole: (role: string) => authService.hasRole(role),
    hasPermission: (permission: string) => authService.hasPermission(permission),
    login,
    register,
    logout,
  }
}
