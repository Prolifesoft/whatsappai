import React from 'react';
import PageContainer from '../components/PageContainer';

const TermsPage: React.FC = () => {
  return (
    <PageContainer title="Kullanım Şartları">
      <p><strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>

      <p>
        Lütfen AgentAI hizmetlerini ("Hizmet") kullanmadan önce bu Kullanım Şartlarını ("Şartlar") dikkatlice okuyun. Hizmete erişiminiz ve kullanımınız, bu Şartları kabul etmenize ve bunlara uymanıza bağlıdır.
      </p>
      
      <h2>1. Hesaplar</h2>
      <p>
        Bizde bir hesap oluşturduğunuzda, bize her zaman doğru, eksiksiz ve güncel bilgiler vermeniz gerekir. Bunu yapmamanız, Şartların ihlali anlamına gelir ve Hizmetimizdeki hesabınızın derhal feshedilmesine neden olabilir. Hesabınızın ve şifrenizin güvenliğini sağlamaktan siz sorumlusunuz.
      </p>

      <h2>2. Fikri Mülkiyet</h2>
      <p>
        Hizmet ve orijinal içeriği, özellikleri ve işlevselliği AgentAI ve lisans verenlerinin münhasır mülkiyetindedir ve öyle kalacaktır. Hizmet, telif hakkı, ticari marka ve diğer yasalarla korunmaktadır.
      </p>

      <h2>3. Yasaklanmış Kullanımlar</h2>
      <p>Hizmeti yalnızca yasal amaçlar için kullanmayı kabul edersiniz. Aşağıdaki amaçlarla hizmeti kullanamazsınız:</p>
      <ul>
        <li>Yürürlükteki herhangi bir ulusal veya uluslararası yasayı veya yönetmeliği ihlal edecek şekilde.</li>
        <li>Yasa dışı, istenmeyen veya spam niteliğinde materyal göndermek veya gönderilmesini sağlamak.</li>
        <li>Şirketi, bir Şirket çalışanını, başka bir kullanıcıyı veya başka herhangi bir kişiyi veya kurumu taklit etmek veya taklit etmeye teşebbüs etmek.</li>
        <li>WhatsApp'ın veya diğer ilgili platformların kullanım politikalarını ihlal etmek.</li>
      </ul>

      <h2>4. Fesih</h2>
      <p>
        Şartları ihlal etmeniz de dahil olmak üzere, herhangi bir nedenle, önceden bildirimde bulunmaksızın veya yükümlülük altına girmeksizin hesabınızı derhal feshedebilir veya askıya alabiliriz.
      </p>

      <h2>5. Sorumluluğun Sınırlandırılması</h2>
      <p>
        AgentAI veya yöneticileri, çalışanları, ortakları, acenteleri, tedarikçileri veya iştirakleri, yasaların izin verdiği azami ölçüde, hizmeti kullanımınızdan kaynaklanan dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai zararlardan sorumlu tutulamaz.
      </p>

      <h2>6. Değişiklikler</h2>
      <p>
        Tamamen kendi takdirimize bağlı olarak, bu Şartları herhangi bir zamanda değiştirme veya değiştirme hakkını saklı tutarız. Bir revizyonun önemli olması durumunda, yeni şartların yürürlüğe girmesinden en az 30 gün önce bildirimde bulunmaya çalışacağız.
      </p>
      
      <p className="mt-8">
        Bu Şartlar hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin.
      </p>
    </PageContainer>
  );
};

export default TermsPage;