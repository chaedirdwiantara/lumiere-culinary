'use client';

import React from 'react';

interface SimpleCarouselProps {
  images: string[];
}

export default function SimpleCarousel({ images }: SimpleCarouselProps) {
  console.log('SimpleCarousel component rendered!');
  
  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#ff0000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          BASIC TEST WORKING!
        </h1>
        <p style={{ fontSize: '20px' }}>
          If you can see this red screen, React is working!
        </p>
        <p style={{ fontSize: '16px', marginTop: '20px' }}>
          Images count: {images.length}
        </p>
        <p style={{ fontSize: '16px', marginTop: '10px' }}>
          Time: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}