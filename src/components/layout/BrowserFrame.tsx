import React from 'react';

export const BrowserFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#1c1c1f] text-[#ececf1] flex flex-col antialiased">
      {children}
    </div>
  );
};
