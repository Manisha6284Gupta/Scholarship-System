import React from 'react';

function Logo({ width = '100px', src, alt = 'Logo' }) {
  return (
    <div style={{ 
      width, 
      borderRadius: '50%', 
      overflow: 'hidden', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <img 
        src="https://img.freepik.com/free-vector/business-management-vector_53876-44121.jpg?ga=GA1.1.1577710283.1730732183&semt=ais_hybrid" 
        alt="Logo" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
    
  );
}

export default Logo;
