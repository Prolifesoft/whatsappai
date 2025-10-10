import React from 'react';
import PageContainer from '../components/PageContainer';

const HealthPage: React.FC = () => {
  return (
    <PageContainer title="Sağlık Sektöründe Hasta İletişimini Dönüştürün">
      <p className="lead">
        AgentAI, klinikler, hastaneler ve özel muayenehaneler için hasta iletişimini kolaylaştırır, randevu yönetimini otomatikleştirir ve operasyonel verimliliği artırır. Hastalarınıza modern, hızlı ve güvenilir bir iletişim kanalı sunun.
      </p>
      
      <h2>Randevu Yönetimini Otomatikleştirin</h2>
      <p>
        Personelinizin iş yükünü azaltın ve randevu kaçırma oranlarını düşürün. Yapay zeka asistanımız tüm randevu sürecini sizin için yönetir.
      </p>
      <ul>
        <li><strong>Akıllı Randevu Planlama:</strong> Hastalarınız, uygun zaman dilimlerini sorgulayarak WhatsApp üzerinden kolayca randevu alabilir, değiştirebilir veya iptal edebilir.</li>
        <li><strong>Otomatik Hatırlatmalar:</strong> Randevu öncesi gönderilen otomatik hatırlatma mesajları sayesinde hastaların randevularını unutmasını engelleyin ("no-show" oranını azaltın).</li>
        <li><strong>Takvim Entegrasyonu:</strong> Mevcut takvim sistemlerinizle tam entegre çalışarak çakışmaları önler ve tüm randevuları tek bir yerden yönetmenizi sağlar.</li>
      </ul>

      <h2>Hasta Deneyimini İyileştirin</h2>
      <p>
        Hasta memnuniyetini artırmak için onlara kesintisiz ve anlık bilgi akışı sağlayın.
      </p>
      <ul>
        <li><strong>Tedavi Öncesi ve Sonrası Bilgilendirme:</strong> Operasyon veya tedavi öncesi hazırlık talimatlarını ve sonrası için dikkat edilmesi gerekenleri otomatik olarak gönderin.</li>
        <li><strong>Sıkça Sorulan Sorular:</strong> Kliniğinizin konumu, çalışma saatleri, anlaşmalı sigortalar gibi sıkça sorulan sorulara anında yanıt verin.</li>
        <li><strong>Geri Bildirim ve Anketler:</strong> Tedavi sonrası otomatik anketlerle hasta memnuniyetini ölçün ve hizmet kalitenizi değerlendirmek için değerli veriler toplayın.</li>
      </ul>
      <p className="mt-8">
        <strong>Not:</strong> AgentAI, tıbbi teşhis veya tedavi tavsiyesi vermez. Yalnızca bilgilendirme ve randevu yönetimi gibi operasyonel süreçleri destekler.
      </p>
    </PageContainer>
  );
};

export default HealthPage;