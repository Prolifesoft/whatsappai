import React from 'react';
import { Link } from 'react-router-dom';

const PhoneMockup: React.FC = () => (
  <div className="relative w-full max-w-sm mx-auto animate-subtle-bob">
    <div className="relative z-10 w-full h-[550px] bg-slate-800 rounded-[40px] border-[14px] border-slate-800 shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl"></div>
      <div className="h-full bg-slate-100 p-2 overflow-y-auto" style={{backgroundImage: "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')"}}>
        <div className="flex flex-col space-y-3 p-3">
          {/* Chat bubbles */}
          <div className="flex justify-end">
            <div className="bg-brand-light text-slate-800 rounded-xl rounded-tr-none p-3 max-w-xs shadow">
              <p className="text-sm">Merhaba, yeni spor ayakkabı modeliniz hakkında bilgi alabilir miyim?</p>
              <p className="text-xs text-right text-slate-500 mt-1">10:30</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white text-slate-800 rounded-xl rounded-tl-none p-3 max-w-xs shadow">
              <p className="text-sm font-semibold text-brand-teal">AgentAI</p>
              <p className="text-sm">Merhaba! Elbette, yeni 'AeroBoost X' modelimizle ilgilendiğiniz için teşekkürler. Stoklarımızda mevcuttur. Hangi numara ve renk ile ilgileniyorsunuz?</p>
              <p className="text-xs text-right text-slate-500 mt-1">10:31</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-brand-light text-slate-800 rounded-xl rounded-tr-none p-3 max-w-xs shadow">
              <p className="text-sm">42 numara, siyah renk var mı?</p>
              <p className="text-xs text-right text-slate-500 mt-1">10:31</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white text-slate-800 rounded-xl rounded-tl-none p-3 max-w-xs shadow">
              <p className="text-sm font-semibold text-brand-teal">AgentAI</p>
              <p className="text-sm">Kontrol ediyorum... Evet, 42 numara siyah rengi stoklarımızda! Hemen sizin için bir sipariş oluşturabilirim. Onaylıyor musunuz?</p>
              <p className="text-xs text-right text-slate-500 mt-1">10:32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 -z-0 w-1/2 h-full bg-green-50 opacity-50 transform skew-x-[-15deg] translate-x-1/3"></div>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              WhatsApp İşletmenizi <span className="text-brand-dark">Yapay Zeka</span> ile Otomatikleştirin
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl">
              7/24 müşteri desteği sunun, satışlarınızı artırın ve operasyonel verimliliğinizi zirveye taşıyın. AgentAI, müşterilerinizle akıllı ve anlık iletişim kurar.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-brand-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                3 Gün Ücretsiz Başla
              </Link>
              <a href="#faq" className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center">
                Daha Fazla Bilgi
              </a>
            </div>
          </div>
          <div className="relative lg:pl-12">
             <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;