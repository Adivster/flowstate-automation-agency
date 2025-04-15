
import React from 'react';

export const OfficeBackground: React.FC = () => {
  return (
    <>
      <div 
        className="absolute inset-0 will-change-transform" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>
    </>
  );
};
