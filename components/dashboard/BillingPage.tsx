import React from 'react';
import { useAuth, UserPlan } from '../../auth/AuthContext';

const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-brand-green flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

interface UpgradeCardProps {
    plan: string;
    price: string;
    description: string;
    features: string[];
    onUpgrade: () => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, price, description, features, onUpgrade }) => {
    return (
        <div className="flex flex-col h-full p-8 rounded-2xl shadow-lg border bg-white border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800">{plan}</h3>
            <p className="mt-2 text-slate-600">{description}</p>
            <div className="my-6">
                <span className="text-5xl font-extrabold text-slate-900">{price}</span>
                <span className="ml-2 text-lg text-slate-500">/ay</span>
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span className="text-slate-600">{feature}</span>
                    </li>
                ))}
            </ul>
            <button onClick={onUpgrade} className="w-full mt-auto font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-brand-dark hover:bg-brand-teal text-white">
                Bu Plana Yükselt
            </button>
        </div>
    );
}


const BillingPage: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']> }> = ({ user }) => {

    const { upgradePlan } = useAuth();

    const invoiceHistory = [
        { id: 'INV-2024-003', date: '01/07/2024', amount: '₺4999', status: 'Ödendi' },
        { id: 'INV-2024-002', date: '01/06/2024', amount: '₺4999', status: 'Ödendi' },
        { id: 'INV-2024-001', date: '01/05/2024', amount: '₺4999', status: 'Ödendi' },
    ];
    
    const PLAN_DETAILS = {
        'Başlangıç': { price: '₺2499' },
        'Profesyonel': { price: '₺4999' },
        'Kurumsal': { price: 'Özel' },
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Faturalandırma</h1>
            <p className="mt-1 text-slate-600">Aboneliğinizi yönetin ve fatura geçmişinizi görüntüleyin.</p>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Aktif Planınız</h2>
                <div className="p-6 bg-green-50 border-2 border-dashed border-green-300 rounded-lg flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark">{user.plan}</h3>
                        <p className="text-slate-600">Mevcut aboneliğiniz.</p>
                    </div>
                    <div className="text-right mt-4 md:mt-0">
                        <p className="text-3xl font-extrabold text-slate-800">{PLAN_DETAILS[user.plan].price}</p>
                        {user.plan !== 'Kurumsal' && <p className="text-sm text-slate-500">/ay</p>}
                    </div>
                </div>
            </div>

            {/* Upgrade Options */}
            {user.plan !== 'Kurumsal' && (
                 <div className="mt-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Planınızı Yükseltin</h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {user.plan === 'Başlangıç' && (
                             <UpgradeCard 
                                plan="Profesyonel"
                                price="₺4999"
                                description="Büyüyen işletmeler ve ekipler için en iyi seçim."
                                features={[
                                    "10,000 Mesaj/Ay",
                                    "1 Özel WhatsApp Numarası",
                                    "Randevu Sistemi ve Takvim Entegrasyonu",
                                    "Detaylı Raporlama ve CRM Entegrasyonları",
                                    "Öncelikli Destek"
                                ]}
                                onUpgrade={() => upgradePlan('Profesyonel')}
                            />
                        )}
                         <UpgradeCard 
                            plan="Kurumsal"
                            price="Özel"
                            description="Büyük ölçekli ve özel ihtiyaçları olan işletmeler için."
                            features={[
                                "Limitsiz Mesaj",
                                "Çoklu Özel WhatsApp Numaraları",
                                "Gelişmiş API Erişimi",
                                "Özel Hesap Yöneticisi",
                                "7/24 Teknik Destek"
                            ]}
                            onUpgrade={() => upgradePlan('Kurumsal')}
                        />
                    </div>
                </div>
            )}
            
             {/* Invoice History */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Fatura Geçmişi</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Fatura ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tarih</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tutar</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Durum</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">İndir</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {invoiceHistory.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{invoice.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{invoice.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{invoice.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-brand-dark hover:text-brand-teal">İndir</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default BillingPage;
