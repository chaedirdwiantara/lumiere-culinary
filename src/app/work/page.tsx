import { Camera, Filter } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Work() {
  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-white hover:text-yellow-400 transition-colors">
              LUMIERE
            </Link>
            <div className="hidden md:flex items-baseline space-x-8">
              <Link href="/" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/work" className="text-yellow-400 border-b border-yellow-400 px-3 py-2 text-sm font-medium">
                Work
              </Link>
              <Link href="/about" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              My Work
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of culinary photography showcasing the beauty and artistry of food
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <span className="text-gray-400 text-sm">Filter by category:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={index === 0 ? "primary" : "outline"}
                  size="sm"
                  className={index === 0 ? "gold-bg text-black" : "border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }, (_, index) => (
              <div 
                key={index}
                className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer image-hover"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera size={48} className="text-gray-600" />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-semibold mb-2">Photo Title {index + 1}</h3>
                    <p className="text-gray-300 text-sm">Category Name</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Load More Photos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-4">LUMIERE</h3>
            <p className="text-gray-400 text-sm mb-4">
              Elegant food photography showcasing culinary artistry
            </p>
            <p className="text-gray-400 text-sm">
              &copy; 2024 Lumiere Culinary Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}