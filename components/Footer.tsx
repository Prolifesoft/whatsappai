import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-8 h-8 text-brand-green"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.75.45 3.41 1.27 4.9L2 22l5.25-1.38c1.44.78 3.03 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.83S17.5 2 12.04 2zM9.53 16.23h-.11c-.57 0-1.25-.22-2.1-.66L7 15.38l-1.33.7c-.22.12-.46.06-.61-.12s-.16-.41-.04-.63l.89-1.63c-.45-.7-.7-1.48-.7-2.31 0-2.67 2.16-4.84 4.84-4.84.62 0 1.21.12 1.74.33l.4.15 1.5-1.5c.2-.2.51-.2.71 0s.2.51 0 .71l-1.5 1.5.15.4c.21.53.33 1.12.33 1.74.01 2.67-2.15 4.84-4.83 4.84zm1.09-3.32c-.17-.09-.37-.14-.58-.14-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.21 0 .41-.05.58-.14l2.17.65c-.39.51-.94.85-1.56.97v.75c0 .28.22.5.5.5s.5-.22.5-.5v-.75c1.4-.29 2.5-1.5 2.5-2.91 0-1.07-.57-2.01-1.42-2.52l-2.19.65z"/>
      </svg>
      <span className="font-bold text-xl text-white">AgentAI</span>
    </div>
  );

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
        {children}
    </a>
);


const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
                <Link to="/"><Logo /></Link>
                <p className="mt-4 text-slate-400 max-w-sm">
                    WhatsApp işinizi yapay zeka ile güçlendirerek müşteri iletişiminizi bir üst seviyeye taşıyın.
                </p>
                 <div className="flex space-x-4 mt-6">
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                    </SocialIcon>
                    <SocialIcon href="#">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.011c0 3.486 1.83 6.533 4.545 8.214.332.06.452-.144.452-.32l0-1.127c-1.776.385-2.152-.863-2.152-.863-.302-.767-.738-.971-.738-.971-.603-.413.045-.405.045-.405.667.047 1.018.685 1.018.685.592 1.014 1.553.72 1.932.552.06-.429.23-.72.42-0.885-1.474-.168-3.024-.737-3.024-3.283 0-.726.26-1.32.685-1.786-.068-.17-.297-.845.065-1.761 0 0 .558-.179 1.825.682a6.315 6.315 0 013.32-.089c1.267-.86 1.825-.682 1.825-.682.363.916.133 1.591.065 1.761.427.466.685 1.06.685 1.786 0 2.553-1.553 3.113-3.032 3.278.238.204.45.61.45 1.23l0 1.822c0 .178.12.383.455.32C20.174 18.542 22 15.495 22 12.01C22 6.477 17.523 2 12 2z" clipRule="evenodd"></path></svg>
                    </SocialIcon>
                </div>
            </div>
            <div className="md:col-span-2">
                <h3 className="font-semibold text-white tracking-wider">Çözümler</h3>
                <ul className="mt-4 space-y-2">
                    <li><Link to="/solutions/ecommerce" className="hover:text-white transition-colors">E-Ticaret</Link></li>
                    <li><Link to="/solutions/health" className="hover:text-white transition-colors">Sağlık</Link></li>
                    <li><Link to="/solutions/education" className="hover:text-white transition-colors">Eğitim</Link></li>
                    <li><Link to="/solutions/tourism" className="hover:text-white transition-colors">Turizm</Link></li>
                </ul>
            </div>
             <div className="md:col-span-2">
                <h3 className="font-semibold text-white tracking-wider">Kaynaklar</h3>
                <ul className="mt-4 space-y-2">
                    <li><Link to="/resources/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    <li><Link to="/resources/help-center" className="hover:text-white transition-colors">Yardım Merkezi</Link></li>
                    <li><Link to="/resources/api-docs" className="hover:text-white transition-colors">API Dokümanları</Link></li>
                </ul>
            </div>
             <div className="md:col-span-2">
                <h3 className="font-semibold text-white tracking-wider">Şirket</h3>
                <ul className="mt-4 space-y-2">
                    <li><Link to="/company/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                    <li><Link to="/company/careers" className="hover:text-white transition-colors">Kariyer</Link></li>
                    <li><Link to="/company/contact" className="hover:text-white transition-colors">İletişim</Link></li>
                </ul>
            </div>
             <div className="md:col-span-2">
                <h3 className="font-semibold text-white tracking-wider">Yasal</h3>
                <ul className="mt-4 space-y-2">
                    <li><Link to="/legal/privacy" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                    <li><Link to="/legal/terms" className="hover:text-white transition-colors">Kullanım Şartları</Link></li>
                </ul>
            </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} AgentAI. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;