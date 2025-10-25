'use client';

import React from 'react';

export default function BasicTest() {
  console.log('BasicTest component rendered!');
  
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
          Time: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}