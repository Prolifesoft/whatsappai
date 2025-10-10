import React from 'react';

interface TemplateCardProps {
  name: string;
  description: string;
  prompt: string;
  onSelect: (prompt: string) => void;
  isCustom?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ name, description, prompt, onSelect, isCustom }) => {
  return (
    <div className={`relative flex flex-col h-full p-4 rounded-lg border transition-shadow hover:shadow-md ${isCustom ? 'border-brand-teal' : 'border-slate-200'}`}>
      {isCustom && <div className="absolute top-2 right-2 text-xs bg-brand-teal text-white px-2 py-0.5 rounded-full">Özel</div>}
      <h3 className="font-bold text-slate-800">{name}</h3>
      <p className="text-sm text-slate-500 mt-1 flex-grow">{description}</p>
      <button 
        onClick={() => onSelect(prompt)}
        className="w-full mt-4 text-sm font-semibold py-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
      >
        Şablonu Uygula
      </button>
    </div>
  );
};

export default TemplateCard;