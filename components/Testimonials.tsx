
import React from 'react';

const testimonialData = [
  {
    quote: "AgentAI sayesinde müşteri hizmetleri maliyetlerimizi %40 oranında düşürdük. Geceleri bile satış yapabiliyor olmak harika!",
    name: "Ayşe Yılmaz",
    title: "E-Ticaret Girişimcisi, ModaButik",
    avatar: "https://picsum.photos/seed/ayse/100/100",
  },
  {
    quote: "Randevu taleplerini yönetmek artık çok kolay. Hastalarımız otomatik hatırlatmalar sayesinde randevularını unutmuyor.",
    name: "Dr. Mehmet Kaya",
    title: "Diş Hekimi, Sağlık Kliniği",
    avatar: "https://picsum.photos/seed/mehmet/100/100",
  },
  {
    quote: "Teknik destek ekibimizin üzerindeki yükü ciddi anlamda azalttı. Sık sorulan soruları AgentAI çözüyor, biz zor vakalara odaklanıyoruz.",
    name: "Elif Öztürk",
    title: "Operasyon Müdürü, Teknoloji A.Ş.",
    avatar: "https://picsum.photos/seed/elif/100/100",
  },
];

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatar }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 flex flex-col h-full">
    <div className="mb-4">
      <StarRating rating={5} />
    </div>
    <p className="text-slate-600 mb-6 flex-grow">"{quote}"</p>
    <div className="flex items-center mt-auto">
      <img className="w-12 h-12 rounded-full mr-4 object-cover" src={avatar} alt={name} />
      <div>
        <p className="font-bold text-slate-800">{name}</p>
        <p className="text-sm text-slate-500">{title}</p>
      </div>
    </div>
  </div>
);


const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Mutlu Müşterilerimiz Ne Diyor?</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Gerçek kullanıcı deneyimleri, AgentAI'nin yarattığı farkı en iyi şekilde anlatır.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
