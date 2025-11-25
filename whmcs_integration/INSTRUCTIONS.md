# AgentAI WHMCS Entegrasyon Kılavuzu

Bu React projesini WHMCS sisteminize entegre etmek için aşağıdaki adımları izleyin.

## 1. React Uygulamasını Hazırlama (Build)

1. Terminali açın ve proje dizininde şu komutu çalıştırın:
   ```bash
   npm run build
   ```
2. Bu işlem `dist` klasörü oluşturacaktır.

## 2. Dosyaları Sunucuya Yükleme

1. **JS/CSS Dosyaları:**
   - WHMCS sunucunuzda `/assets` klasörü içine `agentai` adında yeni bir klasör oluşturun.
   - `dist/assets` içindeki `.js` ve `.css` dosyalarını bu `/assets/agentai/` klasörüne yükleyin.

2. **PHP Controller Dosyası:**
   - Bu klasördeki `agentai.php` dosyasını WHMCS ana dizinine (public_html, vb.) yükleyin.

3. **Template Dosyası:**
   - Bu klasördeki `agentai.tpl` dosyasını, aktif WHMCS temanızın klasörüne yükleyin.
   - Yol genellikle şöyledir: `/templates/{aktif_temaniz}/agentai.tpl`

## 3. Template Dosyasını Düzenleme

React build işlemi her seferinde rastgele dosya isimleri (hash) üretir (örn: `index.a1b2c3.js`). Bu yüzden `agentai.tpl` dosyasını düzenleyip doğru dosya yolunu göstermelisiniz.

1. `/templates/{aktif_temaniz}/agentai.tpl` dosyasını açın.
2. Aşağıdaki satırları bulup, yüklediğiniz gerçek dosya isimleriyle değiştirin:

```html
<!-- ÖRNEK -->
<link rel="stylesheet" href="/assets/agentai/index-YOUR_HASH.css">
<script type="module" src="/assets/agentai/index-YOUR_HASH.js"></script>
```

## 4. Test Etme

Tarayıcınızda `https://whmcs-siteniz.com/agentai.php` adresine gidin. React uygulamanızın WHMCS header ve footer'ı arasında çalıştığını görmelisiniz.

## İpucu: WHMCS API ile İletişim

Şu anki React uygulaması `mockApi.tsx` kullanıyor. Gerçek verileri WHMCS'den çekmek için:
1. WHMCS içinde `includes/api/` veya özel bir `localAPI` yazarak React'in istek atacağı bir endpoint oluşturmalısınız.
2. React içindeki `auth/AuthContext.tsx` dosyasını düzenleyerek `mockApi` yerine `axios` veya `fetch` ile bu PHP endpointlerine istek atmalısınız.
