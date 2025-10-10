import React from 'react';
import PageContainer from '../components/PageContainer';

const AboutPage: React.FC = () => {
  return (
    <PageContainer title="Hakkımızda">
      <p className="lead">
        AgentAI olarak, işletmelerin müşterileriyle kurduğu iletişimi yapay zekanın gücüyle dönüştürme misyonuyla yola çıktık. Teknolojinin, insan etkileşimini daha anlamlı ve verimli hale getirebileceğine inanıyoruz.
      </p>
      
      <h2>Misyonumuz</h2>
      <p>
        Her ölçekten işletmenin, dünyanın en popüler mesajlaşma platformu olan WhatsApp üzerinden, müşterilerine kesintisiz, akıllı ve kişiselleştirilmiş bir deneyim sunmasını sağlamak. Müşteri hizmetlerini bir maliyet merkezi olmaktan çıkarıp bir büyüme motoruna dönüştürmeyi hedefliyoruz.
      </p>

      <h2>Vizyonumuz</h2>
      <p>
        İletişimde yapay zeka denildiğinde akla gelen ilk ve en güvenilir küresel platform olmak. Sürekli gelişen teknolojimizle, işletmelerin ve müşterilerinin arasındaki engelleri kaldırarak daha bağlantılı bir dünya yaratmak.
      </p>

      <h2>Hikayemiz</h2>
      <p>
        AgentAI, e-ticaret ve teknoloji alanında yıllarca deneyim kazanmış bir grup girişimci tarafından kuruldu. Müşteri iletişiminde yaşanan zorlukları ve tekrarlayan görevlerin ne kadar zaman aldığını ilk elden tecrübe ettik. Bu sorunlara çözüm bulmak amacıyla, en son yapay zeka teknolojilerini kullanarak, hem işletmelerin operasyonel yükünü hafifleten hem de son kullanıcı için harika bir deneyim sunan bir platform geliştirmeye karar verdik. Bugün, yüzlerce işletmenin müşterileriyle daha güçlü bağlar kurmasına yardımcı olmaktan gurur duyuyoruz.
      </p>

    </PageContainer>
  );
};

export default AboutPage;