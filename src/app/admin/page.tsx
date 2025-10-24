'use client';

import { BarChart3, Camera, FolderOpen, Award, Eye, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Photos', value: '0', icon: Camera, color: 'text-blue-600' },
    { title: 'Categories', value: '0', icon: FolderOpen, color: 'text-green-600' },
    { title: 'Awards', value: '0', icon: Award, color: 'text-yellow-600' },
    { title: 'Page Views', value: '0', icon: Eye, color: 'text-purple-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon size={32} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Photos */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Photos</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <Camera size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No photos uploaded yet</p>
              <Button className="mt-4" size="sm">
                Upload First Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Camera size={20} className="mr-2" />
              Upload New Photo
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FolderOpen size={20} className="mr-2" />
              Create Category
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Award size={20} className="mr-2" />
              Add Award
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 size={20} className="mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}