import React from 'react';
import PageContainer from '../components/PageContainer';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 text-sm leading-relaxed overflow-x-auto border border-slate-700">
    <code>{children}</code>
  </pre>
);

const Divider: React.FC = () => <hr className="my-10 border-slate-200" />;

const ApiDocsPage: React.FC = () => {
  return (
    <PageContainer title="Evolution API Entegrasyon Rehberi">
      <p className="lead">
        Evolution API sunucunuzu paket satın alan müşterileriniz için çok kiracılı (multi-tenant) bir WhatsApp hizmeti olarak
        işletirken bu rehberdeki adımları izleyin. Her bölüm kendi altyapınızı kurup müşterilerinizin panellerini etkinleştirmek
        için gerekli uç noktaları, parametreleri ve kontrol listelerini içerir.
      </p>

      <Divider />

      <h2 className="text-2xl font-semibold">0. Müşteri Paneli (Dashboard) Yol Haritası</h2>
      <p>
        Paket satın alan müşterilerin oturum açıp WhatsApp oturumlarını yönetebileceği bir panel kurmak için aşağıdaki
        iş kalemlerini sırayla tamamlayın. Bu kontrol listesi geliştirmenin hangi aşamada olduğunu takip etmeyi ve API
        entegrasyon adımlarını hangi bileşenlerin kullanacağını netleştirmeyi amaçlar.
      </p>
      <div className="overflow-x-auto rounded-lg border border-slate-200 mt-4">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Kategori</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Beklenen çıktı</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Notlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr className="bg-white">
              <td className="px-4 py-3">Kimlik doğrulama ve yetkilendirme</td>
              <td className="px-4 py-3">Müşteri hesap açma, oturum açma ve token saklama akışları</td>
              <td className="px-4 py-3">Evolution API master token yalnızca yönetici tarafında tutulmalı; müşterilere instance token dağıtımı yapılmalı.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3">Müşteri başına instance yönetimi</td>
              <td className="px-4 py-3">Instance oluşturma, QR kod görüntüleme, bağlantı durumu ve yeniden başlatma kontrolleri</td>
              <td className="px-4 py-3">Bu ekranlar doğrudan 3. bölümdeki lifecycle uç noktalarını tüketecek.</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3">Mesajlaşma araçları</td>
              <td className="px-4 py-3">Tekil mesaj gönderimi, medya yükleme, kampanya/senaryo şablonları</td>
              <td className="px-4 py-3">Gönderim geçmişi ve hata kayıtları için tablo + filtre tasarlayın.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3">Webhook &amp; etkinlik günlükleri</td>
              <td className="px-4 py-3">Webhook URL ayarları, alınan olay listesini gösteren log ekranı</td>
              <td className="px-4 py-3">Loglar; event tipi, tarih, payload özetini içermeli. Uyarı/alarmlar için queue veya e-posta tetikleyicileri planlayın.</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3">Faturalandırma ve paket yönetimi</td>
              <td className="px-4 py-3">Paket kotası, yenileme tarihleri ve kullanım sayaçları</td>
              <td className="px-4 py-3">Instance kota limitleri aşıldığında API erişimini sınırlayacak politikaları belirleyin.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3">Destek ve operasyon araçları</td>
              <td className="px-4 py-3">Manuel müdahale için admin paneli, sistem sağlık göstergeleri</td>
              <td className="px-4 py-3">Sunucu sağlık kontrolleri ve log takibi için bu sayfadaki API testlerini yeniden kullanın.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Her modül hazır olduğunda ilgili API bölümlerine geri dönerek istemci tarafı çağrılarını ve güvenlik kontrollerini
        entegre edin. Aşağıdaki başlıklar bu yol haritasına göre sırasıyla sunucu, kimlik doğrulama ve instance yönetimi
        aşamalarını detaylandırır.
      </p>

      <Divider />

      <h2 className="text-2xl font-semibold">1. Sunucuyu Hazırlama ve Sağlık Kontrolleri</h2>
      <p>
        Evolution API&apos;yi Docker ile kurduysanız servis varsayılan olarak <code>http://HOST:8080</code> adresinde çalışır.
        {' '}İlk doğrulama için konteynerin açık olduğundan emin olun ve kök uç noktaya bir GET isteği göndererek servis
        mesajını kontrol edin.
      </p>
      <CodeBlock>
        {`# Docker kurulumu için tipik başlatma
docker compose up -d

# Sağlık kontrolü
GET http://localhost:8080/

{
  "message": "Welcome to the Evolution API, it is working!"
}`}
      </CodeBlock>
      <p>
        Üretimde mutlaka bir alan adı ve HTTPS kullanın. Reverse proxy arkasında çalıştırıyorsanız <code>ALLOWED_ORIGINS</code>
        ve <code>PORT</code> gibi ortam değişkenlerini Postman koleksiyonundaki değerlerle eşleştirin.
      </p>

      <Divider />

      <h2 className="text-2xl font-semibold">2. Kimlik Doğrulama Modeli</h2>
      <p>
        Evolution API iki seviyeli anahtar kullanır: yönetici (master) token ve instance bazlı token. API çağrılarında
        kullanılacak <code>apikey</code> başlığı aşağıdaki tablodaki kurallara göre belirlenir.
      </p>
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Senaryo</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Kullanılacak anahtar</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Notlar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr className="bg-white">
              <td className="px-4 py-3">Yeni instance oluşturma ve silme</td>
              <td className="px-4 py-3 font-mono text-xs">MASTER_TOKEN</td>
              <td className="px-4 py-3">Yalnızca yönetici panelinden saklanmalı, müşterilerle paylaşılmamalıdır.</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3">Instance içi mesaj gönderme</td>
              <td className="px-4 py-3 font-mono text-xs">INSTANCE_TOKEN</td>
              <td className="px-4 py-3">Instance oluşturulurken verdiğiniz <code>token</code> değeridir.</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3">Webhook doğrulaması</td>
              <td className="px-4 py-3 font-mono text-xs">Webhook talebindeki <code>apikey</code></td>
              <td className="px-4 py-3">Gelen çağrıların ilgili instance token&apos;ı ile geldiğini doğrulayın.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4">
        Yanlış bir anahtar kullanıldığında servis <code>401 Unauthorized</code> döndürür.{' '}
        Bu durumda instance token&apos;ını yeniden oluşturmak için yönetici panelinizden <code>/instance/delete</code>
        &rarr; <code>/instance/create</code> akışını kullanın.
      </p>

      <Divider />

      <h2 className="text-2xl font-semibold">3. Instance Yaşam Döngüsü</h2>
      <p>
        Her müşteri için ayrı bir instance açarak cihaz bağlantısını izole edebilirsiniz. Aşağıdaki örnekler Evolution API v2
        uç noktalarına göre hazırlanmıştır.
      </p>

      <h3 className="text-xl font-semibold mt-8">3.1 Temel Instance Oluşturma</h3>
      <p>
        Master token ile <code>/instance/create</code> uç noktasına istek atın. <code>qrcode</code> alanını <code>true</code>
        gönderdiğinizde yanıt gövdesine taratılabilir QR kodu da eklenir.
      </p>
      <CodeBlock>
        {`POST /instance/create
Content-Type: application/json
apikey: MASTER_TOKEN

{
  "instanceName": "magaza-support",
  "token": "magaza-support-key",
  "qrcode": true
}`}
      </CodeBlock>
      <CodeBlock>
        {`{
  "instance": {
    "instanceName": "magaza-support",
    "status": "created"
  },
  "hash": {
    "apikey": "magaza-support-key"
  },
  "qrcode": {
    "code": "000-111",
    "base64": "data:image/png;base64,..."
  }
}`}
      </CodeBlock>

      <h3 className="text-xl font-semibold mt-10">3.2 Webhook ve Olay Tetikleri</h3>
      <p>
        Gerçek zamanlı bildirimler için aynı uç noktada <code>webhook</code>, <code>webhookByEvents</code> ve
        <code>events</code> alanlarını doldurun. <code>webhookByEvents</code> true olduğunda sadece seçtiğiniz olaylar gönderilir.
      </p>
      <CodeBlock>
        {`POST /instance/create
Content-Type: application/json
apikey: MASTER_TOKEN

{
  "instanceName": "magaza-crm",
  "token": "magaza-crm-key",
  "qrcode": true,
  "webhook": "https://panel.sirketim.com/webhooks/evolution",
  "webhookByEvents": true,
  "events": [
    "QRCODE_UPDATED",
    "MESSAGES_UPSERT",
    "MESSAGES_UPDATE",
    "MESSAGES_DELETE",
    "SEND_MESSAGE",
    "CONNECTION_UPDATE"
  ]
}`}
      </CodeBlock>
      <p>
        Webhook payload&apos;larında <code>event</code>, <code>instanceName</code>, <code>payload</code> alanları bulunur. Panelinizde
        müşteri aktivitelerini güncellemek için bu alanları kullanın.
      </p>

      <h3 className="text-xl font-semibold mt-10">3.3 Bağlantı İzleme ve Bakım</h3>
      <p>
        Instance yaşam döngüsündeki kritik uç noktalar aşağıdaki tabloda özetlenmiştir. Yanıtlar her zaman JSON döndürür.
      </p>
      <div className="overflow-x-auto rounded-lg border border-slate-200 mt-4">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-700">Uç nokta</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Açıklama</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Kullanılacak token</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr className="bg-white">
              <td className="px-4 py-3 font-mono text-xs">GET /instance/fetchInstances</td>
              <td className="px-4 py-3">Tüm instance&apos;ların durumunu listeler.</td>
              <td className="px-4 py-3">MASTER_TOKEN</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3 font-mono text-xs">GET /instance/connect/{{instanceName}}</td>
              <td className="px-4 py-3">Tarayıcıda taratılacak QR kodunu döndürür.</td>
              <td className="px-4 py-3">INSTANCE_TOKEN</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-mono text-xs">GET /instance/connectionState/{{instanceName}}</td>
              <td className="px-4 py-3">Bağlantı durumu ve son hata detaylarını verir.</td>
              <td className="px-4 py-3">INSTANCE_TOKEN</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3 font-mono text-xs">PUT /instance/restart/{{instanceName}}</td>
              <td className="px-4 py-3">WhatsApp bağlantısını sıfırlar.</td>
              <td className="px-4 py-3">INSTANCE_TOKEN</td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3 font-mono text-xs">DELETE /instance/logout/{{instanceName}}</td>
              <td className="px-4 py-3">Cihazı WhatsApp&apos;tan çıkarır.</td>
              <td className="px-4 py-3">INSTANCE_TOKEN</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-4 py-3 font-mono text-xs">DELETE /instance/delete/{{instanceName}}</td>
              <td className="px-4 py-3">Instance yapılandırmasını tamamen siler.</td>
              <td className="px-4 py-3">MASTER_TOKEN</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Divider />

      <h2 className="text-2xl font-semibold">4. Mesaj Gönderimi</h2>
      <p>
        Mesaj uç noktaları <code>/message</code> kökünde gruplanmıştır. Aynı numaraya tekrar eden iletilerde Evolution API mesaj
        anahtarını (<code>key.id</code>) döndürdüğü için log tutabilir veya müşterinizin panelinde iletim durumunu gösterebilirsiniz.
      </p>

      <h3 className="text-xl font-semibold mt-8">4.1 Metin Mesajı</h3>
      <CodeBlock>
        {`POST /message/sendText/magaza-support
Content-Type: application/json
apikey: magaza-support-key

{
  "number": "905551112233",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "textMessage": {
    "text": "Evolution API üzerinden gönderilen deneme mesajıdır.\\n\\n*Kalın*, _italik_ ve emoji desteği mevcuttur."
  }
}`}
      </CodeBlock>

      <h3 className="text-xl font-semibold mt-8">4.2 Medya Mesajı</h3>
      <CodeBlock>
        {`POST /message/sendMedia/magaza-support
Content-Type: application/json
apikey: magaza-support-key

{
  "number": "905551112233",
  "options": {
    "delay": 1200,
    "presence": "composing"
  },
  "mediaMessage": {
    "mediatype": "image",
    "caption": "Evolution API ile gönderilen ürün görseli",
    "media": "https://evolution-api.com/files/evolution-api.jpg"
  }
}`}
      </CodeBlock>
      <p>
        Medya adreslerinin herkese açık ve HTTPS olması zorunludur. Dosya yüklemek için <code>/message/sendMediaFile</code>
        uç noktasını kullanabilir ve <code>form-data</code> ile gönderebilirsiniz.
      </p>

      <h3 className="text-xl font-semibold mt-8">4.3 Teslimat ve Otomasyon İpuçları</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Webhook olaylarında <code>MESSAGES_UPSERT</code> ve <code>MESSAGES_UPDATE</code> kayıtlarını dinleyerek yanıtları CRM
          panelinize aktarın.
        </li>
        <li>
          <code>options.delay</code> ve <code>options.presence</code> değerleriyle insan benzeri yazma davranışı simüle edebilirsiniz.
        </li>
        <li>
          Tekil mesaj limitleri için Evolution API yapılandırmasındaki <code>RATE_LIMIT_*</code> ortam değişkenlerini müşteri
          paketlerinize göre uyarlayın.
        </li>
      </ul>

      <Divider />

      <h2 className="text-2xl font-semibold">5. Hata Yönetimi ve Sorun Giderme</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>401 Unauthorized:</strong> Yanlış token kullanımı. Instance token&apos;ının doğru müşteriye ait olduğunu kontrol edin.
        </li>
        <li>
          <strong>422 Unprocessable Entity:</strong> JSON gövdesi şemaya uymuyor. Postman koleksiyonundaki örnekleri referans alın.
        </li>
        <li>
          <strong>5xx Hataları:</strong> Sunucu loglarını inceleyin ve gerekirse <code>PUT /instance/restart/{{instanceName}}</code>
          çağrısı ile oturumu tazeleyin.
        </li>
      </ul>
      <p className="mt-6">
        İlerleyen entegrasyon adımlarında anket, konum, interaktif mesajlar gibi gelişmiş özellikleri Postman koleksiyonundaki
        ilgili klasörlere bakarak ekleyebiliriz. Hazır olduğunuzda sonraki görevleri beraber planlarız.
      </p>
    </PageContainer>
  );
};

export default ApiDocsPage;
