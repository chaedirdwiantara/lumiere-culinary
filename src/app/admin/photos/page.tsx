'use client';

import { Camera, Search, Filter, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminPhotos() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Photos</h1>
          <p className="text-gray-600 mt-2">Manage your photography portfolio</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Upload Photo
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter size={20} className="mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="text-center py-12">
            <Camera size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos uploaded</h3>
            <p className="text-gray-500 mb-6">Get started by uploading your first photo</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={20} className="mr-2" />
              Upload First Photo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}