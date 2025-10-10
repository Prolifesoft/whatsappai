import React from 'react';

const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-brand-green flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

interface PricingCardProps {
    plan: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, period, description, features, isPopular, buttonText }) => {
    const cardClasses = `relative flex flex-col h-full p-8 rounded-2xl shadow-lg border transition-all duration-300 transform hover:-translate-y-2 ${isPopular ? 'bg-slate-800 text-white border-brand-teal' : 'bg-white border-slate-200'}`;
    const buttonClasses = `w-full mt-auto font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${isPopular ? 'bg-brand-green hover:bg-green-600 text-white' : 'bg-brand-dark hover:bg-brand-teal text-white'}`;
    
    return (
        <div className={cardClasses}>
            {isPopular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full uppercase">En Popüler</div>
            )}
            <h3 className={`text-2xl font-bold ${isPopular ? 'text-white' : 'text-slate-800'}`}>{plan}</h3>
            <p className={`mt-2 ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
            <div className="my-6">
                <span className={`text-5xl font-extrabold ${isPopular ? 'text-white' : 'text-slate-900'}`}>{price}</span>
                {period && <span className={`ml-2 text-lg ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>{period}</span>}
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span className={isPopular ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                    </li>
                ))}
            </ul>
            <a href="#" className={buttonClasses}>{buttonText}</a>
        </div>
    );
}

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-20 lg:py-28 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Şeffaf Fiyatlandırma</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        İşletmenizin ihtiyaçlarına ve bütçenize en uygun planı seçin.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <PricingCard 
                        plan="Başlangıç"
                        price="₺2499"
                        period="/ay"
                        description="Küçük işletmeler ve yeni başlayanlar için ideal."
                        features={[
                            "2,500 Mesaj/Ay",
                            "Kendi Numaranızı Bağlama (QR Kod)",
                            "SSS Otomasyonu",
                            "Temel Raporlama",
                            "E-posta Desteği"
                        ]}
                        buttonText="Plana Başla"
                    />
                    <PricingCard 
                        plan="Profesyonel"
                        price="₺4999"
                        period="/ay"
                        description="Büyüyen işletmeler ve ekipler için en iyi seçim."
                        features={[
                            "10,000 Mesaj/Ay",
                            "1 Özel WhatsApp Numarası",
                            "Randevu Sistemi ve Takvim Entegrasyonu",
                            "Satış ve Pazarlama Otomasyonu",
                            "Detaylı Raporlama",
                            "CRM Entegrasyonları",
                            "Öncelikli Destek"
                        ]}
                        isPopular={true}
                        buttonText="Plana Başla"
                    />
                    <PricingCard 
                        plan="Kurumsal"
                        price="Özel"
                        description="Büyük ölçekli ve özel ihtiyaçları olan işletmeler için."
                        features={[
                            "Limitsiz Mesaj",
                            "Çoklu Özel WhatsApp Numaraları",
                            "Özelleştirilebilir Randevu Akışları",
                            "Gelişmiş API Erişimi",
                            "Özel Entegrasyonlar",
                            "Özel Hesap Yöneticisi",
                            "7/24 Teknik Destek"
                        ]}
                        buttonText="Teklif Al"
                    />
                </div>
            </div>
        </section>
    );
};

export default Pricing;