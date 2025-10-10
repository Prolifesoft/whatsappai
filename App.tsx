import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Page imports
import EcommercePage from './pages/EcommercePage';
import HealthPage from './pages/HealthPage';
import EducationPage from './pages/EducationPage';
import TourismPage from './pages/TourismPage';
import BlogPage from './pages/BlogPage';
import HelpCenterPage from './pages/HelpCenterPage';
import ApiDocsPage from './pages/ApiDocsPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

import { AuthProvider } from './auth/AuthContext';


const HomePage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <UseCases />
    <Testimonials />
    <Pricing />
    <FAQ />
  </>
);

// A component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      {!isDashboardRoute && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Informational Pages */}
          <Route path="/solutions/ecommerce" element={<EcommercePage />} />
          <Route path="/solutions/health" element={<HealthPage />} />
          <Route path="/solutions/education" element={<EducationPage />} />
          <Route path="/solutions/tourism" element={<TourismPage />} />
          <Route path="/resources/blog" element={<BlogPage />} />
          <Route path="/resources/help-center" element={<HelpCenterPage />} />
          <Route path="/resources/api-docs" element={<ApiDocsPage />} />
          <Route path="/company/about" element={<AboutPage />} />
          <Route path="/company/careers" element={<CareersPage />} />
          <Route path="/company/contact" element={<ContactPage />} />
          <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms" element={<TermsPage />} />
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <AppContent />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;