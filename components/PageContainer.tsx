import React from 'react';

const PageContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-white min-h-[calc(100vh-400px)]">
      <div className="container mx-auto px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 animate-fade-in-up">{title}</h1>
        <div className="prose lg:prose-lg max-w-none text-slate-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
