import { Camera, Star, Award, Users } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold gradient-text hover:scale-105 transition-transform">
              LUMIERE
            </Link>
            <div className="hidden md:flex items-baseline space-x-8">
              <Link href="/" className="text-primary border-b border-primary px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/work" className="text-foreground-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                Work
              </Link>
              <Link href="/about" className="text-foreground-secondary hover:text-primary px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background-secondary to-background"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_70%)]"></div>
        
        <div className="relative text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="mb-8 animate-float">
            <Camera size={80} className="mx-auto text-primary mb-6 drop-shadow-lg" />
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="gradient-text">LUMIERE</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-foreground-secondary mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up">
            Elegant food photography showcasing culinary artistry through the lens of creativity and passion
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
            <Link href="/work">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-background font-semibold px-8 py-4 text-lg hover-lift">
                View Portfolio
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-background px-8 py-4 text-lg hover-lift">
                About Me
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">500+</h3>
              <p className="text-foreground-muted">Photos Captured</p>
            </div>
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">50+</h3>
              <p className="text-foreground-muted">Happy Clients</p>
            </div>
            <div className="text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">15+</h3>
              <p className="text-foreground-muted">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="gradient-text">Featured Work</span>
            </h2>
            <p className="text-foreground-secondary text-xl max-w-3xl mx-auto leading-relaxed">
              A glimpse into the world of culinary artistry captured through my lens
            </p>
          </div>
          
          {/* Featured photos grid */}
          <div className="photo-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="group relative aspect-square bg-background-secondary rounded-xl overflow-hidden hover-lift cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center justify-center h-full">
                  <Camera size={48} className="text-foreground-muted group-hover:text-primary transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16 animate-slide-up">
            <Link href="/work">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-background px-8 py-4 text-lg hover-lift">
                View All Work
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-background-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-primary fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl sm:text-3xl font-light text-foreground-secondary mb-8 italic leading-relaxed">
              &ldquo;Lumiere captures not just food, but the soul of culinary artistry. Every shot tells a story of passion and perfection.&rdquo;
            </blockquote>
            <cite className="text-primary font-semibold text-lg">— Chef Marcus Williams</cite>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold gradient-text mb-6">LUMIERE</h3>
            <p className="text-foreground-muted text-lg mb-6 max-w-2xl mx-auto">
              Elegant food photography showcasing culinary artistry with passion and precision
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <Link href="/work" className="text-foreground-secondary hover:text-primary transition-colors">
                Portfolio
              </Link>
              <Link href="/about" className="text-foreground-secondary hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/api-docs" className="text-foreground-secondary hover:text-primary transition-colors">
                API Docs
              </Link>
            </div>
            <p className="text-foreground-muted text-sm">
              &copy; 2024 Lumiere Culinary Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}