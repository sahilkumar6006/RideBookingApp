'use client'
import Layout from '../layout'
export default function DashboardPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Stats Cards */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* Add icon here */}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Vehicles</dt>
                    <dd className="text-lg font-medium text-gray-900">24</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          {/* Add more stat cards */}
        </div>
      </div>
    </Layout>
  )
} 