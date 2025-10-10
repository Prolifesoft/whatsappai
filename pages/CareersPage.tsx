import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import ApplyModal from '../components/ApplyModal';

interface JobOpeningProps {
    title: string;
    location: string;
    type: string;
    onApply: (title: string) => void;
}

const JobOpening: React.FC<JobOpeningProps> = ({ title, location, type, onApply }) => (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
            <p className="text-slate-500 mt-1">{location} &middot; {type}</p>
        </div>
        <button 
            onClick={() => onApply(title)}
            className="mt-4 sm:mt-0 bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
            Başvur
        </button>
    </div>
);

const CareersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');

  const handleOpenModal = (title: string) => {
    setSelectedJobTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobTitle('');
  };

  return (
    <>
      <PageContainer title="Kariyer: Ekibimize Katılın!">
        <p className="lead">
          İletişimin geleceğini şekillendiren bir ekibin parçası olmak ister misiniz? AgentAI olarak, parlak, tutkulu ve yenilikçi yetenekleri aramızda görmekten heyecan duyuyoruz.
        </p>
        
        <h2>Neden AgentAI'de Çalışmalısınız?</h2>
        <p>
          Biz, çalışanlarımızın gelişimine ve mutluluğuna önem veren bir kültüre sahibiz. Size sadece bir iş değil, bir kariyer yolu sunuyoruz.
        </p>
        <ul>
          <li><strong>Yenilikçi Ortam:</strong> En son teknolojilerle çalışarak ve zorlu problemleri çözerek kendinizi sürekli geliştirme fırsatı bulun.</li>
          <li><strong>Büyüme Fırsatları:</strong> Hızla büyüyen bir şirkette sorumluluk alın ve kariyerinizde bir sonraki adımı atın.</li>
          <li><strong>Esnek Çalışma:</strong> Uzaktan çalışma ve esnek saat seçenekleriyle iş-yaşam dengenizi koruyun.</li>
          <li><strong>Harika Bir Ekip:</strong> Alanında uzman, yardımsever ve eğlenceli bir ekiple birlikte çalışın.</li>
        </ul>

        <h2 className="mt-12">Açık Pozisyonlar</h2>
        <div className="space-y-6 mt-6">
          <JobOpening 
              title="Kıdemli Backend Geliştirici (Python/Go)"
              location="Uzaktan"
              type="Tam Zamanlı"
              onApply={handleOpenModal}
          />
          <JobOpening 
              title="Yapay Zeka / Makine Öğrenmesi Uzmanı"
              location="İstanbul, TR"
              type="Tam Zamanlı"
              onApply={handleOpenModal}
          />
          <JobOpening 
              title="Ürün Yöneticisi"
              location="Uzaktan"
              type="Tam Zamanlı"
              onApply={handleOpenModal}
          />
        </div>

         <p className="mt-10 text-center text-slate-600">
          Aradığınız pozisyonu bulamadınız mı? Bize <a href="mailto:kariyer@agentai.com" className="font-semibold text-brand-dark hover:underline">kariyer@agentai.com</a> adresinden özgeçmişinizi gönderin, gelecekteki fırsatlar için sizi de değerlendirelim.
        </p>
        
      </PageContainer>
      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        jobTitle={selectedJobTitle} 
      />
    </>
  );
};

export default CareersPage;