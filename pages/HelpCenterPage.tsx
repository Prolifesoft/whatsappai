import React from 'react';
import PageContainer from '../components/PageContainer';

const HelpCategory: React.FC<{ title: string; questions: string[] }> = ({ title, questions }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">{title}</h2>
        <ul className="space-y-3 list-disc pl-5">
            {questions.map((q, i) => (
                <li key={i}><a href="#" className="text-brand-dark hover:underline">{q}</a></li>
            ))}
        </ul>
    </div>
);

const HelpCenterPage: React.FC = () => {
  return (
    <PageContainer title="Yardım Merkezi">
        <p className="lead mb-8">
            AgentAI'ye hoş geldiniz! Burada platformu kullanmanıza yardımcı olacak kaynakları ve sıkça sorulan soruların yanıtlarını bulabilirsiniz.
        </p>

        <div className="relative mb-12">
            <input 
                type="search" 
                placeholder="Nasıl yardımcı olabiliriz?" 
                className="w-full p-4 pl-12 text-lg border-2 border-slate-300 rounded-lg focus:ring-brand-dark focus:border-brand-dark"
            />
            <svg className="w-6 h-6 text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        <HelpCategory 
            title="Başlarken"
            questions={[
                "AgentAI hesabımı nasıl oluştururum?",
                "WhatsApp Business API bağlantısı nasıl yapılır?",
                "İlk yapay zeka asistanımı nasıl ayarlarım?",
                "Fiyatlandırma planları arasındaki farklar nelerdir?"
            ]}
        />

        <HelpCategory 
            title="Hesap Yönetimi"
            questions={[
                "Şifremi nasıl değiştiririm?",
                "Ekibime yeni kullanıcılar nasıl eklerim?",
                "Fatura bilgilerimi nasıl güncellerim?",
                "Aboneliğimi nasıl yönetirim?"
            ]}
        />

        <HelpCategory 
            title="Entegrasyonlar"
            questions={[
                "CRM sistemimle nasıl entegrasyon yapabilirim?",
                "Zapier entegrasyonu nasıl çalışır?",
                "Shopify mağazamı AgentAI'ye nasıl bağlarım?",
            ]}
        />
      
    </PageContainer>
  );
};

export default HelpCenterPage;