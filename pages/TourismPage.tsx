import React from 'react';
import PageContainer from '../components/PageContainer';

const TourismPage: React.FC = () => {
  return (
    <PageContainer title="Turizm ve Otelcilikte Misafir Deneyimini Zirveye Taşıyın">
      <p className="lead">
        AgentAI; oteller, seyahat acenteleri ve tur operatörleri için misafir iletişimini baştan sona otomatikleştirir. Rezervasyon anından konaklama sonrasına kadar misafirlerinize kesintisiz ve kişiselleştirilmiş bir hizmet sunun.
      </p>
      
      <h2>Rezervasyon ve Satış Süreçlerini Otomatikleştirin</h2>
      <p>
        Potansiyel misafirlerinizin sorularını anında yanıtlayarak rezervasyon oranlarınızı yükseltin.
      </p>
      <ul>
        <li><strong>Anlık Oda ve Tur Sorgulama:</strong> Müsaitlik durumu, fiyatlar ve olanaklar hakkındaki soruları 7/24 yanıtlayarak misafirlerin karar vermesini kolaylaştırın.</li>
        <li><strong>Doğrudan Rezervasyon:</strong> WhatsApp üzerinden doğrudan rezervasyon veya ön rezervasyon alarak aracı komisyonlarını azaltın.</li>
        <li><strong>Özel Teklifler ve Paketler:</strong> Özel indirimler, tur paketleri ve ek hizmetler (spa, transfer vb.) sunarak daha fazla satış yapın.</li>
      </ul>

      <h2>Konaklama Deneyimini Geliştirin</h2>
      <p>
        Misafirlerinize konaklamaları boyunca 7/24 dijital bir konsiyerj hizmeti sunun.
      </p>
      <ul>
        <li><strong>Varış Öncesi Bilgilendirme:</strong> Check-in prosedürleri, otel konumu ve karşılama detayları gibi bilgileri otomatik olarak paylaşın.</li>
        <li><strong>Oda Servisi ve Talepler:</strong> Misafirler, oda servisi siparişlerini, havlu taleplerini veya diğer isteklerini WhatsApp üzerinden kolayca iletebilir.</li>
        <li><strong>Etkinlik ve Restoran Önerileri:</strong> Bölgedeki etkinlikler, gezilecek yerler ve restoranlar hakkında kişiselleştirilmiş öneriler sunun.</li>
      </ul>
      <p className="mt-8">
        AgentAI ile misafir memnuniyetini artırın, personel verimliliğini yükseltin ve rekabette bir adım öne çıkın.
      </p>
    </PageContainer>
  );
};

export default TourismPage;