'use client'

import Layout from '../layout'
export default function UsersPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Add users table here */}
          </div>
        </div>
      </div>
    </Layout>
  )
} 