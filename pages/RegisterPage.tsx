import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Kayıt başarısız. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 pt-20">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md animate-fade-in-up">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Yeni Hesap Oluştur</h1>
                    <p className="mt-2 text-slate-600">AgentAI'yi ücretsiz denemeye başlayın.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Adınız Soyadınız</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 placeholder-slate-400 border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-brand-dark focus:border-brand-dark sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email-register" className="block text-sm font-medium text-slate-700">E-posta Adresi</label>
                        <input
                            id="email-register"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 placeholder-slate-400 border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-brand-dark focus:border-brand-dark sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password-register" className="block text-sm font-medium text-slate-700">Şifre</label>
                        <input
                            id="password-register"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-3 py-2 mt-1 placeholder-slate-400 border border-slate-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-brand-dark focus:border-brand-dark sm:text-sm"
                        />
                    </div>
                     {error && <p className="text-sm text-red-600">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-brand-dark border border-transparent rounded-md shadow-sm hover:bg-brand-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:bg-slate-400"
                        >
                            {loading ? 'Hesap Oluşturuluyor...' : 'Hesabı Oluştur'}
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center text-slate-600">
                    Zaten bir hesabınız var mı?{' '}
                    <Link to="/login" className="font-medium text-brand-dark hover:text-brand-teal">
                        Giriş Yapın
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
