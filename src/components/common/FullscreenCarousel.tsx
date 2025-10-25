'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FullscreenCarouselProps {
  images: string[];
  className?: string;
}

export default function FullscreenCarousel({ images, className = '' }: FullscreenCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const [imageError, setImageError] = useState<boolean[]>(new Array(images.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);

  // Debug logging
  useEffect(() => {
    console.log('FullscreenCarousel mounted with images:', images);
  }, [images]);

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startY;
    const sensitivity = 0.5; // Adjust sensitivity
    const newOffset = deltaY * sensitivity;
    
    setScrollOffset(newOffset);
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }

    // Determine if we should change image based on scroll offset
    const threshold = 50; // Minimum drag distance to change image
    
    if (Math.abs(scrollOffset) > threshold) {
      if (scrollOffset > 0 && currentIndex > 0) {
        // Drag down = previous image
        setCurrentIndex(currentIndex - 1);
      } else if (scrollOffset < 0 && currentIndex < images.length - 1) {
        // Drag up = next image
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setScrollOffset(0);
    setStartY(0);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.touches[0].clientY - startY;
    const sensitivity = 0.5;
    const newOffset = deltaY * sensitivity;
    
    setScrollOffset(newOffset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 50;
    
    if (Math.abs(scrollOffset) > threshold) {
      if (scrollOffset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (scrollOffset < 0 && currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    setScrollOffset(0);
    setStartY(0);
  };

  // Add global mouse events
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - startY;
      const sensitivity = 0.5;
      const newOffset = deltaY * sensitivity;
      
      setScrollOffset(newOffset);
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grab';
      }

      const threshold = 50;
      
      if (Math.abs(scrollOffset) > threshold) {
        if (scrollOffset > 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        } else if (scrollOffset < 0 && currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }
      
      setScrollOffset(0);
      setStartY(0);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startY, scrollOffset, currentIndex, images.length]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden cursor-grab select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images Container */}
      <div 
        className="flex w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%) translateY(${scrollOffset}px)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full relative"
          >
            {/* Loading State */}
            {!imageLoaded[index] && !imageError[index] && (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            
            {/* Error State */}
            {imageError[index] && (
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <div>Failed to load image</div>
                </div>
              </div>
            )}
            
            {/* Image */}
            {!imageError[index] && (
              <img
                src={image}
                alt={`Carousel image ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={() => {
                  console.log(`Image ${index} loaded successfully`);
                  setImageLoaded(prev => {
                    const newLoaded = [...prev];
                    newLoaded[index] = true;
                    return newLoaded;
                  });
                }}
                onError={() => {
                  console.error(`Failed to load image ${index}:`, image);
                  setImageError(prev => {
                    const newError = [...prev];
                    newError[index] = true;
                    return newError;
                  });
                }}
                style={{ display: imageLoaded[index] ? 'block' : 'none' }}
              />
            )}
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Image Index Indicator */}
            <div className="absolute top-4 left-4 text-white/70 text-sm font-mono">
              Image {String(index).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Current Image Counter */}
      <div className="absolute top-4 right-4 text-white/70 text-sm font-mono">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Drag Instruction */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 text-xs text-center">
        Drag up/down to navigate
      </div>
    </div>
  );
}