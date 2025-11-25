import React, { useState } from 'react';
import { useAuth, UserPlan } from '../../auth/AuthContext';
import * as api from '../../api/mockApi';
import PayTRModal from './PayTRModal';

const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-brand-green flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

interface UpgradeCardProps {
    plan: string;
    price: string;
    rawPrice: number;
    description: string;
    features: string[];
    onUpgrade: (price: number) => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ plan, price, rawPrice, description, features, onUpgrade }) => {
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
            <button onClick={() => onUpgrade(rawPrice)} className="w-full mt-auto font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-brand-dark hover:bg-brand-teal text-white">
                Bu Plana Yükselt
            </button>
        </div>
    );
}


const BillingPage: React.FC<{ user: NonNullable<ReturnType<typeof useAuth>['user']> }> = ({ user }) => {
    const [paytrToken, setPaytrToken] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async (plan: string, price: number) => {
        setIsLoading(true);
        try {
            // Backend'den PayTR Token al
            const result = await api.getPaytrToken(user.id, plan, price);
            if(result.status === 'success' && result.token) {
                setPaytrToken(result.token);
                setIsModalOpen(true);
            } else {
                alert('Ödeme başlatılamadı: ' + result.reason);
            }
        } catch (error) {
            console.error(error);
            alert('Bir hata oluştu.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const PLAN_DETAILS = {
        'Başlangıç': { price: '₺2499', raw: 2499 },
        'Profesyonel': { price: '₺4999', raw: 4999 },
        'Kurumsal': { price: 'Özel', raw: 0 },
    };

    return (
        <div>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
                    <div className="text-brand-dark font-bold">Ödeme ekranı hazırlanıyor...</div>
                </div>
            )}
            
            <PayTRModal 
                isOpen={isModalOpen} 
                token={paytrToken || ''} 
                onClose={() => setIsModalOpen(false)} 
            />

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
                                rawPrice={4999}
                                description="Büyüyen işletmeler ve ekipler için en iyi seçim."
                                features={[
                                    "10,000 Mesaj/Ay",
                                    "1 Özel WhatsApp Numarası",
                                    "Randevu Sistemi ve Takvim Entegrasyonu",
                                    "Detaylı Raporlama ve CRM Entegrasyonları",
                                    "Öncelikli Destek"
                                ]}
                                onUpgrade={(price) => handleUpgrade('Profesyonel', price)}
                            />
                        )}
                         {/* Kurumsal plan için özel iletişim gerekir, PayTR genelde sabit paketlerde kullanılır */}
                         <div className="flex flex-col h-full p-8 rounded-2xl shadow-lg border bg-slate-50 border-slate-200">
                             <h3 className="text-2xl font-bold text-slate-800">Kurumsal</h3>
                             <p className="mt-2 text-slate-600">Limitsiz ihtiyaçlar için özel çözüm.</p>
                             <button className="mt-auto w-full font-bold py-3 px-6 rounded-full bg-slate-800 text-white">İletişime Geçin</button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingPage;
