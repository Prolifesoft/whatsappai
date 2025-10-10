import React from 'react';
import PageContainer from '../components/PageContainer';

const ContactPage: React.FC = () => {
  return (
    <PageContainer title="İletişime Geçin">
      <p className="lead">
        AgentAI hakkında sorularınız mı var veya işletmeniz için nasıl bir çözüm sunabileceğimizi mi merak ediyorsunuz? Ekibimiz size yardımcı olmaktan mutluluk duyar.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Bize Ulaşın</h2>
          <p className="mt-2 text-slate-600">Aşağıdaki formu doldurabilir veya doğrudan bizimle iletişime geçebilirsiniz.</p>
          <div className="mt-8 space-y-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-brand-dark flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-slate-700">Adres</h3>
                <p className="text-slate-600">Teknoloji Parkı, No:123, 34000 İstanbul, Türkiye</p>
              </div>
            </div>
            <div className="flex items-start">
              <svg className="w-6 h-6 text-brand-dark flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-slate-700">E-posta</h3>
                <p className="text-slate-600">Satış: <a href="mailto:satis@agentai.com" className="text-brand-dark hover:underline">satis@agentai.com</a></p>
                <p className="text-slate-600">Destek: <a href="mailto:destek@agentai.com" className="text-brand-dark hover:underline">destek@agentai.com</a></p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
            <form action="#" method="POST" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Adınız Soyadınız</label>
                    <div className="mt-1">
                        <input type="text" name="name" id="name" required className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-posta Adresiniz</label>
                    <div className="mt-1">
                        <input type="email" name="email" id="email" required className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Mesajınız</label>
                    <div className="mt-1">
                        <textarea name="message" id="message" rows={5} required className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"></textarea>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full bg-brand-dark hover:bg-brand-teal text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Mesajı Gönder
                    </button>
                </div>
            </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default ContactPage;