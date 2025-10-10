import React, { useState } from 'react';
import IntegrationCard from './IntegrationCard';

const AgentIntegrationsTab: React.FC = () => {
    
    const initialIntegrations = {
        googleCalendar: false,
        zapier: true,
        hubspot: false,
        salesforce: false,
        shopify: true,
        woocommerce: false,
        stripe: false,
        webhooks: true,
    };
    
    const [integrations, setIntegrations] = useState(initialIntegrations);

    const toggleIntegration = (key: keyof typeof initialIntegrations) => {
        setIntegrations(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-xl font-bold text-slate-800">Entegrasyonlar</h2>
             <p className="mt-1 text-sm text-slate-500 mb-6">Agent'ınızı diğer favori araçlarınızla bağlayarak gücünü artırın.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IntegrationCard 
                    name="Google Takvim"
                    description="Randevuları ve toplantıları otomatik olarak takviminize ekleyin."
                    icon={<img src="https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png" alt="Google Calendar" className="w-8 h-8"/>}
                    isConnected={integrations.googleCalendar}
                    onConnect={() => toggleIntegration('googleCalendar')}
                    onDisconnect={() => toggleIntegration('googleCalendar')}
                />
                <IntegrationCard 
                    name="Zapier"
                    description="Binlerce farklı uygulamaya bağlanarak iş akışları oluşturun."
                    icon={<img src="https://zapier.cachefly.net/assets/images/embed/zapier-logo-32x32.png" alt="Zapier" className="w-8 h-8 rounded-full"/>}
                    isConnected={integrations.zapier}
                    onConnect={() => toggleIntegration('zapier')}
                    onDisconnect={() => toggleIntegration('zapier')}
                />
                <IntegrationCard 
                    name="Shopify"
                    description="Müşteri ve sipariş verilerini senkronize edin, ürünleri yönetin."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#95BF47]" fill="currentColor" viewBox="0 0 24 24"><path d="M19.333 8.333c0-3.92-2.92-7.083-6.542-7.083S6.25 4.413 6.25 8.333h13.083zM12.792 22.75c-3.621 0-6.542-3.163-6.542-7.083H4.667c0 4.88 3.553 8.75 8.125 8.75s8.125-3.87 8.125-8.75h-1.583c0 3.92-2.92 7.083-6.542 7.083zM18.167 9.5H5.083c-.458 0-.833.375-.833.833v4.584c0 .458.375.833.833.833h13.084c.458 0 .833-.375.833-.833V10.333c0-.458-.375-.833-.833-.833z" /></svg>}
                    isConnected={integrations.shopify}
                    onConnect={() => toggleIntegration('shopify')}
                    onDisconnect={() => toggleIntegration('shopify')}
                />
                 <IntegrationCard 
                    name="Webhook'lar"
                    description="Özel sistemlerinize anlık bildirimler (event) gönderin."
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                    isConnected={integrations.webhooks}
                    onConnect={() => toggleIntegration('webhooks')}
                    onDisconnect={() => toggleIntegration('webhooks')}
                />
            </div>
        </div>
    );
};

export default AgentIntegrationsTab;
