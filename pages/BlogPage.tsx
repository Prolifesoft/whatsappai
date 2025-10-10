import React from 'react';
import PageContainer from '../components/PageContainer';

const BlogPost: React.FC<{ title: string; date: string; excerpt: string }> = ({ title, date, excerpt }) => (
  <article className="py-8 border-b border-slate-200">
    <p className="text-sm text-slate-500">{date}</p>
    <h2 className="text-2xl font-bold text-slate-800 mt-2 mb-3">
      <a href="#" className="hover:text-brand-dark transition-colors">{title}</a>
    </h2>
    <p className="text-slate-600 mb-4">{excerpt}</p>
    <a href="#" className="font-semibold text-brand-dark hover:text-brand-teal transition-colors">Daha Fazla Oku &rarr;</a>
  </article>
);


const BlogPage: React.FC = () => {
  return (
    <PageContainer title="AgentAI Blog: Sektörden Haberler ve İpuçları">
      <div className="max-w-4xl">
        <p className="lead mb-12">
            Müşteri iletişimi, yapay zeka ve WhatsApp pazarlaması dünyasındaki en son trendleri, ipuçlarını ve başarı hikayelerini keşfedin.
        </p>

        <BlogPost 
            title="WhatsApp Pazarlamasında Yapay Zekanın Gücü: 2024 Trendleri"
            date="15 Temmuz 2024"
            excerpt="Yapay zeka, müşteri iletişimini kişiselleştirmenin ve otomatikleştirmenin yeni yollarını sunuyor. Bu makalede, işletmenizin büyümesine yardımcı olacak en son WhatsApp AI trendlerini inceliyoruz."
        />

        <BlogPost 
            title="Müşteri Memnuniyetini Artırmanın Kanıtlanmış 5 Yolu"
            date="28 Haziran 2024"
            excerpt="Mutlu müşteriler, sadık müşterilerdir. AgentAI gibi araçları kullanarak müşteri memnuniyetini nasıl artırabileceğinize dair pratik ve etkili 5 ipucunu sizin için derledik."
        />
        
        <BlogPost 
            title="E-Ticarette Terk Edilmiş Sepet Oranını Düşürmek İçin Stratejiler"
            date="10 Haziran 2024"
            excerpt="Terk edilmiş sepetler her e-ticaret işletmesinin kâbusudur. WhatsApp otomasyonu ile potansiyel müşterilerinizi nasıl geri kazanabileceğinizi ve satışlarınızı nasıl tamamlayabileceğinizi öğrenin."
        />
      </div>
    </PageContainer>
  );
};

export default BlogPage;