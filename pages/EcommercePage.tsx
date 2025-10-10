import React from 'react';
import PageContainer from '../components/PageContainer';

const EcommercePage: React.FC = () => {
  return (
    <PageContainer title="E-Ticaret İşletmeniz İçin Akıllı Çözümler">
      <p className="lead">
        AgentAI ile e-ticaret sitenizin müşteri hizmetlerini 7/24 otomatize edin, satışlarınızı artırın ve müşteri sadakatini zirveye taşıyın. Müşterileriniz en çok kullandıkları platform olan WhatsApp üzerinden size kolayca ulaşsın.
      </p>
      
      <h2>Satışlarınızı Nasıl Artırırız?</h2>
      <p>
        Yapay zeka destekli asistanımız, potansiyel müşterilerinizle anında etkileşime geçerek onları sıcak satış fırsatlarına dönüştürür.
      </p>
      <ul>
        <li><strong>7/24 Satış Asistanı:</strong> Müşterilerinizin ürün sorularını anında yanıtlar, stok durumu hakkında bilgi verir ve satın alma kararlarını hızlandırır.</li>
        <li><strong>Kişiselleştirilmiş Ürün Önerileri:</strong> Müşteri geçmişine ve ilgi alanlarına göre akıllı ürün tavsiyeleri sunarak çapraz satış ve üst satış fırsatları yaratır.</li>
        <li><strong>Terk Edilmiş Sepet Kurtarma:</strong> Sepetini yarım bırakan müşterilere nazik hatırlatmalar ve özel teklifler göndererek satışa dönme oranını artırır.</li>
      </ul>

      <h2>Müşteri Memnuniyetini Artırın</h2>
      <p>
        Sipariş süreçlerini otomatikleştirerek müşterilerinize kusursuz bir alışveriş deneyimi sunun.
      </p>
      <ul>
        <li><strong>Otomatik Sipariş Takibi:</strong> Müşteriler, siparişlerinin durumu ve kargo bilgileri hakkında anlık bilgi alabilir.</li>
        <li><strong>Hızlı Destek:</strong> İade, değişim ve sıkça sorulan sorular gibi konularda anında yanıtlar sunarak destek ekibinizin yükünü hafifletir.</li>
        <li><strong>Geri Bildirim Toplama:</strong> Sipariş sonrası otomatik anketlerle değerli müşteri geri bildirimleri toplayarak hizmet kalitenizi sürekli iyileştirin.</li>
      </ul>
      <p className="mt-8">
        AgentAI'nin e-ticaret işletmenize nasıl değer katabileceğini görmek için bugün bizimle iletişime geçin ve ücretsiz demonuzu talep edin!
      </p>
    </PageContainer>
  );
};

export default EcommercePage;