import React from 'react';
import PageContainer from '../components/PageContainer';

const EducationPage: React.FC = () => {
  return (
    <PageContainer title="Eğitim Kurumları İçin Etkileşimli İletişim">
      <p className="lead">
        AgentAI; okullar, üniversiteler, kurs merkezleri ve diğer eğitim kurumları için öğrenci, veli ve aday öğrenci iletişimini modernize eder. Kayıt süreçlerinden günlük duyurulara kadar tüm iletişimi tek bir platformdan yönetin.
      </p>
      
      <h2>Kayıt ve Başvuru Süreçlerini Kolaylaştırın</h2>
      <p>
        Potansiyel öğrencilerinize hızlı ve erişilebilir bilgiler sunarak kayıt oranlarınızı artırın.
      </p>
      <ul>
        <li><strong>Aday Öğrenci Sorguları:</strong> Programlar, başvuru şartları, ücretler ve kampüs olanakları hakkındaki soruları 7/24 yanıtlayın.</li>
        <li><strong>Başvuru Süreci Desteği:</strong> Adaylara başvuru adımları hakkında rehberlik edin ve gerekli belgelerle ilgili hatırlatmalar gönderin.</li>
        <li><strong>Sanal Kampüs Turları:</strong> Okulunuzu tanıtıcı içerikleri ve videoları WhatsApp üzerinden paylaşarak adayların ilgisini çekin.</li>
      </ul>

      <h2>Öğrenci ve Veli İletişimini Güçlendirin</h2>
      <p>
        Etkili ve zamanında iletişim kurarak okul topluluğunuz arasındaki bağı kuvvetlendirin.
      </p>
      <ul>
        <li><strong>Önemli Duyurular ve Hatırlatmalar:</strong> Sınav tarihleri, etkinlikler, tatiller ve veli toplantıları gibi önemli bilgileri anında tüm ilgili kişilere ulaştırın.</li>
        <li><strong>Devamsızlık Bildirimleri:</strong> Otomatik devamsızlık bildirimleri ile velileri anında bilgilendirin.</li>
        <li><strong>Akademik Destek:</strong> Ders programları, ödev teslim tarihleri ve kaynak materyaller hakkındaki temel soruları yanıtlayarak öğrencilere destek olun.</li>
      </ul>
      <p className="mt-8">
        AgentAI ile eğitimde dijital dönüşüme liderlik edin ve iletişim süreçlerinizi daha verimli hale getirin.
      </p>
    </PageContainer>
  );
};

export default EducationPage;