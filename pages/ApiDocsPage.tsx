import React from 'react';
import PageContainer from '../components/PageContainer';

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <pre className="bg-slate-800 text-white rounded-lg p-4 overflow-x-auto">
        <code>
            {children}
        </code>
    </pre>
);

const ApiDocsPage: React.FC = () => {
  return (
    <PageContainer title="Geliştirici API Dokümanları">
      <p className="lead">
        AgentAI'nin gücünü kendi uygulamalarınıza ve sistemlerinize entegre edin. REST API'miz, mevcut altyapınızla sorunsuz bir şekilde iletişim kurmanıza olanak tanır.
      </p>
      
      <h2>Giriş</h2>
      <p>
        API'miz, AgentAI platformunun temel işlevlerini programatik olarak yönetmenize olanak sağlar. Mesaj gönderebilir, alabilir, müşteri verilerini yönetebilir ve daha fazlasını yapabilirsiniz. Tüm istekler ve yanıtlar JSON formatındadır.
      </p>

      <h2>Kimlik Doğrulama</h2>
      <p>
        API'ye yapılan tüm isteklerin kimliği doğrulanmalıdır. Hesabınızı oluşturduktan sonra, ayarlar panelinizden benzersiz bir API anahtarı (API Key) alabilirsiniz. Bu anahtarı her isteğin <code>Authorization</code> başlığında <code>Bearer</code> token olarak göndermeniz gerekmektedir.
      </p>
      <CodeBlock>
        {`Authorization: Bearer YOUR_API_KEY`}
      </CodeBlock>

      <h2>Örnek İstek: Mesaj Gönderme</h2>
      <p>
        Belirli bir telefon numarasına WhatsApp mesajı göndermek için <code>/v1/messages</code> endpoint'ine bir POST isteği yapabilirsiniz.
      </p>
      <CodeBlock>
        {`POST https://api.agentai.com/v1/messages

{
  "to": "+905551234567",
  "type": "text",
  "text": {
    "body": "Merhaba! Siparişiniz kargoya verildi."
  }
}`}
      </CodeBlock>
      
      <p className="mt-8">
        Bu sayfa, API'mize hızlı bir genel bakış sunmaktadır. Tüm endpoint'ler, parametreler ve ayrıntılı örnekler için lütfen tam dokümantasyonumuzu inceleyin (giriş yapmış kullanıcılar için mevcuttur).
      </p>
    </PageContainer>
  );
};

export default ApiDocsPage;