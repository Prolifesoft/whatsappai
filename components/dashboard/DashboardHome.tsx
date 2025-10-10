import React from 'react';
import StatCard from './StatCard';
import SimpleBarChart from './SimpleBarChart';
import UsageMeter from './UsageMeter';
import { useAuth } from '../../auth/AuthContext';

interface DashboardHomeProps {
    user: NonNullable<ReturnType<typeof useAuth>['user']>;
    onNavigate: (view: string) => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ user, onNavigate }) => {
    const chartData = [
        { name: 'Pzt', sent: 30, received: 15 },
        { name: 'Sal', sent: 45, received: 25 },
        { name: 'Çar', sent: 60, received: 40 },
        { name: 'Per', sent: 50, received: 35 },
        { name: 'Cum', sent: 75, received: 50 },
        { name: 'Cmt', sent: 90, received: 60 },
        { name: 'Paz', sent: 80, received: 55 },
    ];

    const notifications = [
        { id: 1, text: 'Yeni cihaz başarıyla bağlandı.', time: '2 saat önce', type: 'success' },
        { id: 2, text: 'Aylık faturanız oluşturuldu.', time: '1 gün önce', type: 'info' },
        { id: 3, text: 'API anahtarınız son 24 saatte 1500 istek yaptı.', time: '3 gün önce', type: 'warning' },
    ];

    return (
        <div>
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Hoşgeldin, {user.name}!</h1>
                    <p className="mt-1 text-slate-600">İşte işletmenizin bugünkü özeti.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-medium text-slate-500">Mevcut Plan</p>
                    <p className="text-lg font-bold text-brand-dark">{user.plan}</p>
                </div>
            </div>

            {/* Usage Meter and Upgrade CTA */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="w-full md:w-2/3">
                         <UsageMeter 
                            label="Aylık Mesaj Kullanımı"
                            used={user.usage.messages.sent}
                            limit={user.usage.messages.limit}
                        />
                    </div>
                    {user.plan !== 'Kurumsal' && (
                         <button 
                            // FIX: The view name for billing is 'faturalandirma', not 'billing'.
                            onClick={() => onNavigate('faturalandirma')}
                            className="w-full md:w-auto flex-shrink-0 bg-brand-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Paketi Yükselt
                        </button>
                    )}
                </div>
            </div>


            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <StatCard title="Gönderilen Mesajlar (24s)" value="1,250" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>} />
                <StatCard title="Alınan Mesajlar (24s)" value="875" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>} />
                <StatCard title="Bağlı Cihazlar" value="1" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>} />
                <StatCard title="API Hata Oranı" value="0.12%" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>

            {/* Charts and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Haftalık Mesaj Aktivitesi</h2>
                    <SimpleBarChart data={chartData} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Son Bildirimler</h2>
                    <ul className="space-y-4">
                        {notifications.map(n => (
                            <li key={n.id} className="flex items-start">
                                <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-1.5 ${n.type === 'success' ? 'bg-green-500' : n.type === 'info' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                                <div className="ml-3">
                                    <p className="text-sm text-slate-700">{n.text}</p>
                                    <p className="text-xs text-slate-500">{n.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
