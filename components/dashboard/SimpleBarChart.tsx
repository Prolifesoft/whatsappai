import React from 'react';

interface ChartData {
    name: string;
    sent: number;
    received: number;
}

interface SimpleBarChartProps {
    data: ChartData[];
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.flatMap(d => [d.sent, d.received]));

    return (
        <div className="h-72 w-full flex items-end justify-between space-x-2">
            {data.map((item, index) => {
                const sentHeight = (item.sent / maxValue) * 100;
                const receivedHeight = (item.received / maxValue) * 100;

                return (
                    <div key={index} className="flex-1 flex flex-col items-center h-full">
                        <div className="flex-1 flex items-end w-full justify-center space-x-1">
                             <div 
                                className="w-1/2 bg-brand-teal rounded-t-md transition-all duration-500"
                                style={{ height: `${sentHeight}%` }}
                                title={`Gönderilen: ${item.sent}`}
                            ></div>
                             <div 
                                className="w-1/2 bg-brand-green rounded-t-md transition-all duration-500"
                                style={{ height: `${receivedHeight}%` }}
                                title={`Alınan: ${item.received}`}
                            ></div>
                        </div>
                        <span className="text-xs text-slate-500 mt-2">{item.name}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default SimpleBarChart;
