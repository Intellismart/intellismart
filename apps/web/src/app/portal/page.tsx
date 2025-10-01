'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Guard from '@/components/Guard'

export default function PortalPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Get user data from localStorage (Guard component ensures authentication)
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        router.push('/login')
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Completed',
      amount: '$299.00',
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'Processing',
      amount: '$149.00',
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Completed',
      amount: '$79.00',
      items: 2
    }
  ]

  const subscriptions = [
    {
      id: 'SUB-001',
      name: 'AI Agent Platform',
      status: 'Active',
      nextBilling: 'Feb 15, 2024',
      amount: '$99/month'
    }
  ]

  return (
    <Guard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-600">{user?.company || 'IntelliSMART Customer'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue rounded-lg">
                  <span className="text-white text-2xl">🛒</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">{recentOrders.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-gold rounded-lg">
                  <span className="text-black text-2xl">💳</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                  <p className="text-2xl font-semibold text-gray-900">{subscriptions.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-silver rounded-lg">
                  <span className="text-black text-2xl">👤</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Account Type</p>
                  <p className="text-2xl font-semibold text-gray-900 capitalize">{user?.role || 'customer'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="p-6">
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.amount}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No orders yet</p>
                )}
                <div className="mt-4">
                  <button className="w-full bg-gold hover:bg-gold/90 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
                    View All Orders
                  </button>
                </div>
              </div>
            </div>

            {/* Subscriptions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Active Subscriptions</h2>
              </div>
              <div className="p-6">
                {subscriptions.length > 0 ? (
                  <div className="space-y-4">
                    {subscriptions.map((subscription) => (
                      <div key={subscription.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-gray-900">{subscription.name}</p>
                            <p className="text-sm text-gray-600">Next billing: {subscription.nextBilling}</p>
                          </div>
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {subscription.status}
                          </span>
                        </div>
                        <p className="font-semibold text-gold">{subscription.amount}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No active subscriptions</p>
                )}
                <div className="mt-4">
                  <button className="w-full bg-gold hover:bg-gold/90 text-black px-4 py-2 rounded-lg font-semibold transition-colors">
                    Manage Subscriptions
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors">
                  <span className="block text-2xl mb-2">🛒</span>
                  <span className="font-semibold">Browse Store</span>
                </button>
                <button className="p-4 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors">
                  <span className="block text-2xl mb-2">💼</span>
                  <span className="font-semibold">Post Project</span>
                </button>
                <button className="p-4 bg-silver text-black rounded-lg hover:bg-silver/90 transition-colors">
                  <span className="block text-2xl mb-2">📊</span>
                  <span className="font-semibold">View Reports</span>
                </button>
                <button className="p-4 bg-red text-white rounded-lg hover:bg-red/90 transition-colors">
                  <span className="block text-2xl mb-2">🔒</span>
                  <span className="font-semibold">Security</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Guard>
  )
}
