import React from 'react';

interface UsageMeterProps {
    label: string;
    used: number;
    limit: number;
}

const UsageMeter: React.FC<UsageMeterProps> = ({ label, used, limit }) => {
    const isUnlimited = limit === Infinity;
    const percentage = isUnlimited ? 100 : Math.min((used / limit) * 100, 100);

    const getBarColor = () => {
        if (isUnlimited) return 'bg-brand-green';
        if (percentage > 90) return 'bg-red-500';
        if (percentage > 70) return 'bg-yellow-500';
        return 'bg-brand-teal';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <span className="text-sm font-semibold text-slate-600">
                    {isUnlimited 
                        ? 'Limitsiz' 
                        : `${used.toLocaleString('tr-TR')} / ${limit.toLocaleString('tr-TR')}`}
                </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getBarColor()}`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default UsageMeter;
