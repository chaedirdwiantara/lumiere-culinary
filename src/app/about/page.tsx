import { Camera, Award, Mail, Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function About() {
  const skills = [
    { name: 'Food Photography', level: 95 },
    { name: 'Studio Lighting', level: 90 },
    { name: 'Photo Editing', level: 88 },
    { name: 'Creative Direction', level: 85 },
    { name: 'Brand Photography', level: 82 },
  ];

  const awards = [
    { year: '2024', title: 'Best Food Photography', organization: 'Culinary Arts Awards' },
    { year: '2023', title: 'Excellence in Visual Storytelling', organization: 'Photography Guild' },
    { year: '2022', title: 'Rising Star Photographer', organization: 'Food & Wine Magazine' },
  ];

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
              <Link href="/work" className="text-white hover:text-yellow-400 px-3 py-2 text-sm font-medium transition-colors">
                Work
              </Link>
              <Link href="/about" className="text-yellow-400 border-b border-yellow-400 px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                About Me
              </h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                I&apos;m a passionate food photographer with over 8 years of experience capturing the essence and beauty of culinary creations. My journey began in a small kitchen, photographing family recipes, and has evolved into a professional career working with renowned restaurants and food brands.
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Through my lens, I strive to tell the story behind each dish, highlighting the artistry, passion, and craftsmanship that goes into every culinary creation. My work focuses on creating images that not only showcase food but evoke emotions and memories.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gold-bg text-black hover:bg-yellow-500">
                  <Mail size={20} className="mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  <Instagram size={20} className="mr-2" />
                  Follow Me
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-800 rounded-full flex items-center justify-center">
                <Camera size={80} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Experience */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Skills &amp; Experience
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Years of dedication have honed my expertise in various aspects of food photography
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold">{skill.name}</h3>
                  <span className="text-yellow-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="gold-bg h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Awards &amp; Recognition
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Recognition for excellence in food photography and visual storytelling
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-black p-6 rounded-lg border border-gray-800 hover:border-yellow-400 transition-colors">
                <div className="text-center">
                  <Award size={48} className="text-yellow-400 mx-auto mb-4" />
                  <div className="text-yellow-400 font-bold text-lg mb-2">{award.year}</div>
                  <h3 className="text-white font-semibold mb-2">{award.title}</h3>
                  <p className="text-gray-400 text-sm">{award.organization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Ready to capture the essence of your culinary creations? Let&apos;s discuss your next photography project.
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button size="lg" className="gold-bg text-black hover:bg-yellow-500">
              <Mail size={20} className="mr-2" />
              Contact Me
            </Button>
          </div>
          
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Facebook size={24} />
            </a>
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