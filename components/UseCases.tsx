import React from 'react';

const CheckIcon: React.FC = () => (
  <svg className="w-6 h-6 text-brand-green flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

interface UseCaseProps {
    sector: string;
    title: string;
    description: string;
    points: string[];
    imageUrl: string;
    imageAlt: string;
    reverseLayout?: boolean;
}

const UseCase: React.FC<UseCaseProps> = ({ sector, title, description, points, imageUrl, imageAlt, reverseLayout = false }) => (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className={`p-8 bg-slate-100 rounded-2xl ${reverseLayout ? 'md:order-last' : ''}`}>
            <img src={imageUrl} alt={imageAlt} className="rounded-xl shadow-2xl w-full h-auto object-cover" />
        </div>
        <div className={reverseLayout ? 'md:order-first' : ''}>
            <span className="text-brand-dark font-bold uppercase">{sector}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mt-2 mb-4">{title}</h3>
            <p className="text-slate-600 mb-6">{description}</p>
            <ul className="space-y-3">
                {points.map((point, index) => (
                    <li key={index} className="flex items-center"><CheckIcon /> {point}</li>
                ))}
            </ul>
        </div>
    </div>
);


const UseCases: React.FC = () => {
    const useCasesData: UseCaseProps[] = [
        {
            sector: "E-Ticaret",
            title: "Satışlarınızı ve Müşteri Sadakatini Artırın",
            description: "Müşterilerinizin ürün sorularını anında yanıtlayın, stok durumunu bildirin ve sepet terk etme oranını düşürün. Kişiselleştirilmiş ürün önerileriyle satışlarınızı katlayın.",
            points: [
                "7/24 satış desteği ve ürün bilgisi",
                "Sipariş takibi ve kargo durumu bildirimleri",
                "Otomatik ödeme hatırlatmaları"
            ],
            imageUrl: "https://picsum.photos/seed/ecommerce/600/400",
            imageAlt: "E-commerce Use Case",
            reverseLayout: false,
        },
        {
            sector: "Sağlık & Güzellik",
            title: "Randevu Yönetimini Kolaylaştırın",
            description: "Hastalarınız veya danışanlarınız için randevu oluşturma, hatırlatma ve iptal etme süreçlerini otomatikleştirin. Personelinizin iş yükünü hafifletin, memnuniyeti artırın.",
            points: [
                "Otomatik randevu planlama ve takvim entegrasyonu",
                "Randevu öncesi ve sonrası bilgilendirme mesajları",
                "Sıkça sorulan medikal sorulara ön bilgilendirme"
            ],
            imageUrl: "https://picsum.photos/seed/health/600/400",
            imageAlt: "Health Sector Use Case",
            reverseLayout: true,
        },
        {
            sector: "Eğitim",
            title: "Öğrenci ve Veli İletişimini Güçlendirin",
            description: "Kayıt süreçlerini basitleştirin, önemli duyuruları anında paylaşın ve velilerle etkili bir iletişim köprüsü kurun. Eğitim kurumunuzun dijital dönüşümüne liderlik edin.",
            points: [
                "7/24 kayıt ve program bilgisi",
                "Otomatik devamsızlık bildirimleri",
                "Sınav ve etkinlik hatırlatmaları"
            ],
            imageUrl: "https://picsum.photos/seed/education/600/400",
            imageAlt: "Education Sector Use Case",
            reverseLayout: false,
        },
        {
            sector: "Turizm & Otelcilik",
            title: "Misafir Deneyimini Dijitale Taşıyın",
            description: "Rezervasyon anından konaklama sonrasına kadar misafirlerinize 7/24 hizmet sunun. Oda servisi taleplerini alın, tur önerileri sunun ve memnuniyeti en üst düzeye çıkarın.",
            points: [
                "Anlık rezervasyon ve müsaitlik sorgulama",
                "Dijital konsiyerj (oda servisi, talepler)",
                "Otomatik varış öncesi bilgilendirme"
            ],
            imageUrl: "https://picsum.photos/seed/tourism/600/400",
            imageAlt: "Tourism Sector Use Case",
            reverseLayout: true,
        },
        {
            sector: "Emlak",
            title: "Mülk Sorgulamalarını ve Randevuları Otomatikleştirin",
            description: "Potansiyel alıcı ve kiracıların mülk hakkındaki sorularını 7/24 yanıtlayın, mülk gösterme randevularını planlayın ve portföyünüzü anında paylaşın.",
            points: [
                "Anlık mülk bilgisi ve fotoğraf paylaşımı",
                "Otomatik randevu planlama ve hatırlatmalar",
                "Kredi ve uygunluk hakkında ön bilgilendirme"
            ],
            imageUrl: "https://picsum.photos/seed/realestate/600/400",
            imageAlt: "Real Estate Use Case",
            reverseLayout: false,
        },
        {
            sector: "Otomotiv",
            title: "Servis Randevularından Satış Sonrasına Kusursuz Deneyim",
            description: "Müşterilerinizin test sürüşü ve servis randevularını kolayca almasını sağlayın. Araç durumu, bakım hatırlatmaları ve yeni model bilgileriyle müşteri bağını güçlendirin.",
            points: [
                "Test sürüşü ve servis randevu otomasyonu",
                "Periyodik bakım hatırlatmaları",
                "Yeni model ve kampanya duyuruları"
            ],
            imageUrl: "https://picsum.photos/seed/automotive/600/400",
            imageAlt: "Automotive Use Case",
            reverseLayout: true,
        },
         {
            sector: "Finans & Bankacılık",
            title: "Bankacılık İşlemlerini Güvenli ve Hızlı Hale Getirin",
            description: "Müşterilerinizin hesap bakiyesi sorgulama, borç bilgisi öğrenme gibi temel bankacılık işlemlerini WhatsApp üzerinden güvenli bir şekilde yapmasını sağlayın.",
            points: [
                "Hesap bakiyesi ve borç sorgulama",
                "Kredi başvurusu ön bilgilendirmesi",
                "Güvenlik uyarıları ve bilgilendirmeler"
            ],
            imageUrl: "https://picsum.photos/seed/finance/600/400",
            imageAlt: "Finance Use Case",
            reverseLayout: false,
        },
        {
            sector: "Hukuk Büroları",
            title: "Müvekkil İletişimini ve Randevu Takibini Kolaylaştırın",
            description: "Potansiyel müvekkillerin ilk iletişimini yönetin, danışmanlık randevuları oluşturun ve dava durumu hakkında temel güncellemeler sunun.",
            points: [
                "Otomatik danışmanlık randevusu oluşturma",
                "Dava durumu hakkında temel bilgilendirmeler",
                "Belge gereksinimleri hakkında hatırlatmalar"
            ],
            imageUrl: "https://picsum.photos/seed/legal/600/400",
            imageAlt: "Legal Services Use Case",
            reverseLayout: true,
        },
        {
            sector: "Spor Salonları",
            title: "Üye Etkileşimini ve Motivasyonunu Artırın",
            description: "Üyelik paketleri hakkında bilgi verin, ders programlarını paylaşın ve üye kayıtlarını kolaylaştırın. Otomatik ders hatırlatmaları ile üyelerinizi aktif tutun.",
            points: [
                "Üyelik ve ders paketi bilgileri",
                "Ders rezervasyonu ve iptali",
                "Antrenman ve beslenme ipuçları paylaşımı"
            ],
            imageUrl: "https://picsum.photos/seed/fitness/600/400",
            imageAlt: "Fitness & Gyms Use Case",
            reverseLayout: false,
        },
        {
            sector: "Restoran & Paket Servis",
            title: "Siparişleri Alın, Rezervasyonları Yönetin",
            description: "Müşterilerinizin menüyü görüntülemesini, doğrudan WhatsApp üzerinden sipariş vermesini ve masa rezervasyonu yapmasını sağlayın.",
            points: [
                "Doğrudan sipariş alma ve ödeme yönlendirmesi",
                "Masa rezervasyonu yönetimi",
                "Sipariş durumu ve kurye bilgisi"
            ],
            imageUrl: "https://picsum.photos/seed/food/600/400",
            imageAlt: "Restaurants Use Case",
            reverseLayout: true,
        },
        {
            sector: "Etkinlik Yönetimi",
            title: "Bilet Satışından Etkinlik Gününe Sorunsuz İletişim",
            description: "Etkinlikler hakkında bilgi verin, bilet satış linkleri paylaşın ve katılımcıların sorularını yanıtlayın. Etkinlik öncesi hatırlatmalar ile herkesi bilgilendirin.",
            points: [
                "Etkinlik bilgisi ve bilet satışı",
                "Katılımcı SSS'lerini yanıtlama",
                "Etkinlik günü hatırlatma ve lokasyon paylaşımı"
            ],
            imageUrl: "https://picsum.photos/seed/events/600/400",
            imageAlt: "Event Management Use Case",
            reverseLayout: false,
        },
        {
            sector: "Lojistik & Kargo",
            title: "Kargo Takibini ve Müşteri Desteğini Otomatikleştirin",
            description: "Müşterilerin kargo takip numaralarıyla gönderi durumlarını anlık olarak sorgulamasını sağlayın. Teslimat adresi değişikliklerini ve sıkça sorulan soruları otomatik yönetin.",
            points: [
                "Anlık kargo durumu sorgulama",
                "Teslimat günü ve saati bilgilendirmesi",
                "Adres ve teslimat notu güncelleme"
            ],
            imageUrl: "https://picsum.photos/seed/logistics/600/400",
            imageAlt: "Logistics Use Case",
            reverseLayout: true,
        },
        {
            sector: "Kamu Hizmetleri",
            title: "Vatandaş Bilgilendirme Süreçlerini Modernleştirin",
            description: "Kamu duyurularını, vergi ödeme tarihlerini ve resmi prosedürler hakkındaki bilgileri vatandaşlara anında ulaştırın. Personelin yükünü hafifletin.",
            points: [
                "Borç sorgulama ve ödeme hatırlatmaları",
                "Resmi duyuru ve bilgilendirmeler",
                "Randevu ve başvuru süreçleri hakkında bilgi"
            ],
            imageUrl: "https://picsum.photos/seed/government/600/400",
            imageAlt: "Public Services Use Case",
            reverseLayout: false,
        },
        {
            sector: "Güzellik & Bakım",
            title: "Randevuları Yönetin, Müşteri Sadakatini Artırın",
            description: "Müşterilerinizin hizmetler hakkında bilgi almasını, randevu oluşturmasını ve değiştirmesini sağlayın. Özel kampanya duyuruları ile müşteri geri dönüşlerini artırın.",
            points: [
                "Hizmet menüsü ve fiyat bilgisi",
                "Kolay randevu alma ve iptal etme",
                "Özel günler ve kampanyalar hakkında bilgilendirme"
            ],
            imageUrl: "https://picsum.photos/seed/beauty/600/400",
            imageAlt: "Beauty Salons Use Case",
            reverseLayout: true,
        },
         {
            sector: "İşe Alım & İK",
            title: "Aday Tarama ve İletişim Süreçlerini Hızlandırın",
            description: "İş ilanları hakkında bilgi verin, adayların ilk sorularını yanıtlayın ve mülakatları planlayın. İK ekibinizin en iyi yeteneklere odaklanmasını sağlayın.",
            points: [
                "İş ilanı hakkında otomatik bilgi verme",
                "Aday ön eleme soruları",
                "Mülakat planlama ve hatırlatmaları"
            ],
            imageUrl: "https://picsum.photos/seed/hr/600/400",
            imageAlt: "Recruitment & HR Use Case",
            reverseLayout: false,
        },
    ];

  return (
    <section id="use-cases" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Farklı Sektörler, Tek Çözüm</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            AgentAI, e-ticaretten finansa, sağlıktan otomotive kadar 15'ten fazla sektörde işletmelere güç katıyor.
          </p>
        </div>

        {useCasesData.map((useCase, index) => (
             <UseCase key={index} {...useCase} />
        ))}
        
      </div>
    </section>
  );
};

export default UseCases;