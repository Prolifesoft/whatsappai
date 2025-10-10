import React from 'react';
import PageContainer from '../components/PageContainer';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageContainer title="Gizlilik Politikası">
      <p><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
      
      <p>
        AgentAI ("biz", "bize" veya "bizim") olarak, gizliliğinize ve kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası, hizmetlerimizi kullandığınızda hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.
      </p>

      <h2>1. Topladığımız Bilgiler</h2>
      <p>Hizmetlerimizi sunmak için çeşitli türde bilgiler toplarız:</p>
      <ul>
        <li><strong>Hesap Bilgileri:</strong> Kayıt sırasında adınız, e-posta adresiniz, şirket adınız ve ödeme bilgileriniz gibi bilgileri toplarız.</li>
        <li><strong>Kullanım Verileri:</strong> Hizmetlerimizi nasıl kullandığınıza dair bilgiler; IP adresi, tarayıcı türü, ziyaret edilen sayfalar ve etkileşim süreleri gibi verileri içerir.</li>
        <li><strong>Müşteri Verileri:</strong> Platformumuz aracılığıyla yönettiğiniz son kullanıcılarınıza (müşterilerinize) ait telefon numaraları ve konuşma içerikleri gibi veriler. Bu verilerin sahibi ve kontrolcüsü sizsiniz.</li>
      </ul>

      <h2>2. Bilgileri Nasıl Kullanıyoruz?</h2>
      <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
      <ul>
        <li>Hizmetlerimizi sağlamak, sürdürmek ve iyileştirmek.</li>
        <li>Hesabınızı yönetmek ve size destek sağlamak.</li>
        <li>Ödemeleri işlemek ve faturalandırma yapmak.</li>
        <li>Hizmetlerimizdeki değişiklikler veya güncellemeler hakkında sizi bilgilendirmek.</li>
        <li>Yasal yükümlülüklerimize uymak ve dolandırıcılığı önlemek.</li>
      </ul>

      <h2>3. Veri Paylaşımı</h2>
      <p>
        Kişisel bilgilerinizi, yasal bir zorunluluk olmadıkça veya hizmetlerimizi sunmak için gerekli olan üçüncü taraf hizmet sağlayıcıları (örneğin, ödeme işlemcileri, bulut altyapı sağlayıcıları) dışında kimseyle paylaşmayız. Bu sağlayıcılar, bilgilerinizi yalnızca bizim adımıza görevleri yerine getirmek için kullanmakla yükümlüdür.
      </p>

      <h2>4. Veri Güvenliği</h2>
      <p>
        Verilerinizin güvenliğini sağlamak için endüstri standardı teknik ve idari güvenlik önlemleri alıyoruz. Ancak, internet üzerinden hiçbir iletim yönteminin veya elektronik depolama yönteminin %100 güvenli olmadığını lütfen unutmayın.
      </p>
      
      <h2>5. Haklarınız</h2>
      <p>
        Kişisel verilerinizle ilgili olarak erişim, düzeltme, silme ve işlemeyi kısıtlama gibi haklara sahipsiniz. Bu haklarınızı kullanmak için bizimle <a href="mailto:destek@agentai.com" className="text-brand-dark hover:underline">destek@agentai.com</a> adresinden iletişime geçebilirsiniz.
      </p>
      
       <h2>6. Politikadaki Değişiklikler</h2>
      <p>
        Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer. Önemli değişiklikler hakkında sizi bilgilendireceğiz.
      </p>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;