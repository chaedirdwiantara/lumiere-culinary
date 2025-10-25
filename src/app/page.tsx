'use client';

export default function Home() {
  console.log('Page component rendering...');
  
  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#ff0000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '48px',
      fontFamily: 'Arial, sans-serif',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>HELLO WORLD!</h1>
        <p style={{ fontSize: '24px', marginTop: '20px' }}>
          Basic Next.js Test - {new Date().toLocaleTimeString()}
        </p>
        <p style={{ fontSize: '16px', marginTop: '10px', opacity: 0.8 }}>
          If you see this, React is working!
        </p>
      </div>
    </div>
  );
}