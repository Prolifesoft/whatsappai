
import React, { useState } from 'react';

const faqData = [
  {
    question: "Kurulum süreci ne kadar sürer ve teknik bilgi gerektirir mi?",
    answer: "Kurulum oldukça basittir ve genellikle 15 dakikadan az sürer. Kodlama bilgisi gerekmez. Size adım adım rehberlik eden kolay bir arayüz sunuyoruz.",
  },
  {
    question: "AgentAI hangi dilleri destekliyor?",
    answer: "AgentAI, Türkçe dahil olmak üzere 95'ten fazla dili desteklemektedir. Müşterilerinizle kendi dillerinde iletişim kurabilirsiniz.",
  },
  {
    question: "Mevcut sistemlerimle (CRM, e-ticaret platformu) entegre edebilir miyim?",
    answer: "Evet, AgentAI popüler CRM ve e-ticaret platformlarıyla kolayca entegre olabilmesi için tasarlanmıştır. Zapier ve özel API entegrasyon seçeneklerimiz mevcuttur.",
  },
  {
    question: "Yapay zeka ne zaman bir insan temsilciye devretmesi gerektiğini anlar?",
    answer: "Asistanı, belirli anahtar kelimeler, karmaşık sorular veya müşteri talebi üzerine görüşmeyi canlı bir temsilciye aktaracak şekilde kolayca ayarlayabilirsiniz.",
  },
  {
    question: "Veri güvenliği ve gizliliği nasıl sağlanıyor?",
    answer: "Veri güvenliği en büyük önceliğimizdir. Tüm veriler endüstri standardı şifreleme yöntemleriyle korunur ve KVKK/GDPR uyumlu altyapımızla güvendedir.",
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-semibold text-slate-800">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <p className="text-slate-600">
          {answer}
        </p>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Sıkça Sorulan Sorular</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Aklınızdaki soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
