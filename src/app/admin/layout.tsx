import { LayoutDashboard, Camera, FolderOpen, Award, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-bold">LUMIERE Admin</h1>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <Link 
              href="/admin" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >
              <LayoutDashboard size={20} className="mr-3" />
              Dashboard
            </Link>
            
            <Link 
              href="/admin/photos" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >
              <Camera size={20} className="mr-3" />
              Photos
            </Link>
            
            <Link 
              href="/admin/categories" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >
              <FolderOpen size={20} className="mr-3" />
              Categories
            </Link>
            
            <Link 
              href="/admin/awards" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >
              <Award size={20} className="mr-3" />
              Awards
            </Link>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Link 
              href="/admin/login" 
              className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              Logout
            </Link>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}