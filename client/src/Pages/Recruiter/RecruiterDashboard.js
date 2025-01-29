import React, { useState } from 'react';

export const RecruiterDashboard = () => {
  const recentApplications = [
    { id: 1, name: 'John Smith', role: 'Frontend Developer', status: 'Screening', date: '2025-01-25' },
    { id: 2, name: 'Emily Brown', role: 'Product Manager', status: 'Interview', date: '2025-01-24' },
    { id: 3, name: 'Michael Lee', role: 'UX Designer', status: 'Offer', date: '2025-01-23' },
    { id: 4, name: 'Sarah Wilson', role: 'Backend Developer', status: 'Rejected', date: '2025-01-22' }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Schedule Interview
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
            Post New Job
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Applications</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Jobs</p>
              <h3 className="text-2xl font-bold">45</h3>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">↑ 5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Interviews Scheduled</p>
              <h3 className="text-2xl font-bold">28</h3>
            </div>
          </div>
          <p className="text-purple-500 text-sm mt-2">Next: Today at 2 PM</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Time to Hire (Avg)</p>
              <h3 className="text-2xl font-bold">18 days</h3>
            </div>
          </div>
          <p className="text-orange-500 text-sm mt-2">↓ 3 days from last month</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Applications</h3>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-4 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border rounded-lg">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4 px-4">Candidate</th>
                <th className="text-left py-4 px-4">Role</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Date</th>
                <th className="text-left py-4 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications
                .filter(app => 
                  app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  app.role.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((application) => (
                <tr key={application.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{application.name}</td>
                  <td className="py-4 px-4">{application.role}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      application.status === 'Screening' ? 'bg-blue-100 text-blue-800' :
                      application.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
                      application.status === 'Offer' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{application.date}</td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};