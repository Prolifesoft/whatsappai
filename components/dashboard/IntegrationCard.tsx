import React from 'react';

interface IntegrationCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ icon, name, description, isConnected, onConnect, onDisconnect }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex flex-col">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-slate-800">{name}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200">
        {isConnected ? (
          <button
            onClick={onDisconnect}
            className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Bağlantıyı Kes
          </button>
        ) : (
          <button
            onClick={onConnect}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Bağlan
          </button>
        )}
      </div>
    </div>
  );
};

export default IntegrationCard;
