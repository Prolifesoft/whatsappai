import React from 'react';
import { useAuth } from '../../auth/AuthContext';

const AccountSettings: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Hesap Ayarları</h1>
            <p className="mt-1 text-slate-600">Profil bilgilerinizi ve şifrenizi güncelleyin.</p>

            <div className="mt-8 space-y-8">
                {/* Profile Information */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-4">Profil Bilgileri</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Ad Soyad</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    defaultValue={user?.name}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-posta Adresi</label>
                                <input
                                    type="email"
                                    id="email"
                                    defaultValue={user?.email}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3 bg-slate-50"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                Bilgileri Güncelle
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Change Password */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-4">Şifre Değiştir</h2>
                     <form className="space-y-4">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700">Mevcut Şifre</label>
                            <input
                                type="password"
                                id="currentPassword"
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                            />
                        </div>
                         <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700">Yeni Şifre</label>
                            <input
                                type="password"
                                id="newPassword"
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                            />
                        </div>
                         <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Yeni Şifre (Tekrar)</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                            />
                        </div>
                         <div className="text-right">
                             <button type="submit" className="bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-lg transition-colors">
                                Şifreyi Değiştir
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;